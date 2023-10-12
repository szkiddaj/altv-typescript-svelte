import fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';

import swc from '@swc/core';
import esbuild from 'esbuild';
import { altvEsbuild } from 'altv-esbuild';

import { normalizeFilePath, sanitizePath } from './shared.js';

const SWC_CONFIG = {
    jsc: {
        parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: true,
        },
        transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
        },
        target: 'es2020',
    },
    sourceMaps: false,
};

const ESBUILD_BUNDLE_PATH = path.resolve('./resources/core/client/startup.js');
const ESBUILD_CONFIG = {
    entryPoints: ['./src/core/client/startup.ts'],
    outfile: ESBUILD_BUNDLE_PATH,

    plugins: [
        altvEsbuild({
            mode: 'client',

            altvEnums: true,
            bugFixes: {
                playerDamageOnFirstConnect: true,
            },
        }),
    ],

    minify: !process.env.IS_DEV_MODE,

    bundle: true,
    target: 'esnext',
    logLevel: 'silent',
    format: 'esm',
};

(async () => {
    const resolvePaths = (file, rawCode) => {
        const cleanedPath = file.replace(sanitizePath(process.cwd()), '');
        const pathSplit = cleanedPath.split('/');
        pathSplit.pop();

        let depth = 0;
        while (pathSplit[pathSplit.length - 1] !== 'core') {
            pathSplit.pop();
            depth += 1;
        }

        rawCode = rawCode.replaceAll(`@Server`, `../`.repeat(depth) + `server`);
        rawCode = rawCode.replaceAll(`@Client`, `../`.repeat(depth) + `client`);
        rawCode = rawCode.replaceAll(`@Shared`, `../`.repeat(depth) + `shared`);

        return rawCode;
    };

    const transformFileNormal = (filePath) => {
        filePath = normalizeFilePath(filePath);
        const finalPath = filePath.replace('src/', 'resources/').replace('.ts', '.js');

        let rawCode = fs.readFileSync(filePath, { encoding: 'utf-8' });
        rawCode = resolvePaths(filePath, rawCode);

        const compiled = swc.transformSync(rawCode, SWC_CONFIG);

        fs.outputFileSync(finalPath, compiled.code, { encoding: 'utf-8' });
    };

    const startTime = Date.now();
    let compileCount = 0;

    if (fs.existsSync('resources/core')) {
        fs.rmSync('resources/core', { force: true, recursive: true });
    }

    const swcFiles = glob.sync('./src/core/@(server|shared)/**/*.ts');
    for (let i = 0; i < swcFiles.length; i++) {
        transformFileNormal(swcFiles[i]);
        compileCount += 1;
    }

    await esbuild.build(ESBUILD_CONFIG);
    compileCount += glob.sync('./src/core/client/**/*.ts').length;

    console.log(`${compileCount} Files Built | ${Date.now() - startTime}ms`);
})();
