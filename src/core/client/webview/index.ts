import * as alt from 'alt-client';
import * as native from 'natives';

import { KeyCode } from 'altv-enums';
import { WebViewEvents } from '@Shared/webviewEvents';
import { ServerEvents } from '@Shared/serverEvents';

const OPEN_KEY = KeyCode.F2;

let view: alt.WebView;
let isFocused = false;

function spawnExampleVehicle() {
    alt.emitServer(ServerEvents.spawnCar);
}

export function focusWebView() {
    if (isFocused) {
        view.unfocus();
        view.off(WebViewEvents.spawnCar, spawnExampleVehicle);
        view.emit(WebViewEvents.toggleVisibility, false);
        alt.showCursor(false);
        alt.toggleGameControls(true);
        native.triggerScreenblurFadeOut(100);
        isFocused = false;
    } else {
        view.focus();
        view.emit(WebViewEvents.toggleVisibility, true);
        view.on(WebViewEvents.spawnCar, spawnExampleVehicle);
        alt.showCursor(true);
        alt.toggleGameControls(false);
        native.triggerScreenblurFadeIn(100);
        isFocused = true;
    }
}

alt.on('keydown', async (keyCode: number) => {
    if (keyCode !== OPEN_KEY) {
        return;
    }

    if (view) {
        focusWebView();
        return;
    }

    view = new alt.WebView('http://assets/webviews/index.html');
    await new Promise((resolve: (...args: any[]) => void) => {
        view.once('load', resolve);
    });

    focusWebView();
});
