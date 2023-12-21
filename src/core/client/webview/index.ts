import * as alt from '@altv/client';
import * as altShared from '@altv/shared';
import * as native from '@altv/natives';

import { WebViewEvents } from '@Shared/webviewEvents';
import { ServerEvents } from '@Shared/serverEvents';

const OPEN_KEY = altShared.Enums.KeyCode.F2;

let view: alt.WebView;
let isFocused = false;

function spawnExampleVehicle() {
    alt.Events.emitServer(ServerEvents.spawnCar);
}

export function focusWebView() {
    if (isFocused) {
        view.focused = false;
        view.off(WebViewEvents.spawnCar, spawnExampleVehicle);
        view.emit(WebViewEvents.toggleVisibility, false);
        alt.Cursor.visible = false;
        alt.setGameControlsActive(true);
        native.triggerScreenblurFadeOut(100);
        isFocused = false;
    } else {
        view.focused = true;
        view.emit(WebViewEvents.toggleVisibility, true);
        view.on(WebViewEvents.spawnCar, spawnExampleVehicle);
        alt.Cursor.visible = true;
        alt.setGameControlsActive(false);
        native.triggerScreenblurFadeIn(100);
        isFocused = true;
    }
}

alt.Events.onKeyDown(async ({ key }) => {
    if (key !== OPEN_KEY) {
        return;
    }

    if (view) {
        focusWebView();
        return;
    }

    view = alt.WebView.create({ url: 'http://assets/webviews/index.html' });
    await new Promise((resolve: (...args: any[]) => void) => {
        view.once('load', resolve);
    });

    focusWebView();
});
