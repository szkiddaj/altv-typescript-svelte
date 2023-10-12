import './utility/ipc'; // Used to reconnect, do not remove.
import * as alt from 'alt-server';

import { connectLocalClient } from './utility/reconnect';
import { ServerEvents } from '@Shared/serverEvents';

alt.log(`alt:V Server - Boilerplate Started`);

function handlePlayerConnect(player: alt.Player) {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.model = 'mp_m_freemode_01';
    player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
    alt.emitClient(player, 'log:Console', 'alt:V Server - Boilerplate Started');
}

function spawnVehicleForPlayer(player: alt.Player) {
    const { x, y, z } = player.pos;
    const vehicle = new alt.Vehicle('schafter3', x, y, z, 0, 0, 0);

    player.setIntoVehicle(vehicle, 1);
}

alt.onClient(ServerEvents.spawnCar, spawnVehicleForPlayer);
alt.on('playerConnect', handlePlayerConnect);

connectLocalClient();
