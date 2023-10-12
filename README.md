<p align="center" style="font-size: 26px">
	<b>Typescript Boilerplate for alt:V with Svelte - v1.2</b>
</p>

<p align="center">
	<img src="https://i.imgur.com/10aPSUl.gif" width="100" title=":petsvelte:">
</p>

<p align="center">
	<sup>Super Fast Compilation</sup>
</p>

[💡 Need a Roleplay Script? Try Athena!](https://athenaframework.com/)

# Features

A simple Typescript Boilerplate that builds incredibly fast using [SWC](https://github.com/swc-project/swc) and [Esbuild](https://github.com/evanw/esbuild) (with [altv-esbuild](https://github.com/xxshady/altv-esbuild)).

-   Auto Refresh Server
-   Auto Compile TypeScript Files
-   Auto Download Resources
-   Node Packages Can Be Used On Client
-   Builds Into Single Client-Side File
-   Single Resource Code Support
-   Fastest Auto Reconnect Time on Recompile
-   Built-in Svelte for WebViews

# Installation

-   [Install NodeJS 18+](https://nodejs.org/en/download/current/)
-   [Install GIT](https://git-scm.com/downloads)

## Clone the Repository

Use the command below in any terminal, command prompt, etc.

```sh
git clone https://github.com/szkiddaj/altv-typescript-svelte
```

## Install the Repository

Use the command below in any terminal, command prompt, etc.

```sh
cd altv-typescript-svelte
npm install
```

## Download Server Files

Use the command below in any terminal, command prompt, etc. This will download all necessary server files from an additional package used by this project.

```sh
npm run update
```

## Start Production Server (Windows)

Run this command to run the server in production mode.

```
npm run windows
```

## Start Production Server (Linux)

Run this command to run the server in production mode.

```
npm run linux
```

## Start Developer Server

Run this command to run the server in development mode.

This will automatically reconnect your alt:V Client if you have `debug` mode turned on.

```
npm run dev
```

## WebView Previews

If you need to modify the WebView and want to work out of the browser, use the following command.

```
npm run svelte-dev
```

## End Server Runtime

Use the key combination `ctrl + c` to kill your server in your terminal, command prompt, etc.

## How to Add Mods, and New Resources

Always add your already compiled resources & mods into the `resources` folder.
