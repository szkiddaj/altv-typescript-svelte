import './utility/ipc'; // Used to reconnect, do not remove.
import * as alt from '@altv/server';

import { connectLocalClient } from './utility/reconnect';
import { ServerEvents } from '@Shared/serverEvents';

alt.log(`alt:V Server - Boilerplate Started`);

alt.Events.onPlayerConnect(({ player }) => {
    alt.log(`[${player.id}] ${player.name} has connected to the server.`);

    player.model = 'mp_m_freemode_01';
    player.spawn(new alt.Vector3(36.19486618041992, 859.3850708007812, 197.71343994140625), 0);
    player.emit('log:Console', 'alt:V Server - Boilerplate Started');
});

alt.Events.onPlayer(ServerEvents.spawnCar, (player) => {
    const { x, y, z } = player.pos;
    const vehicle = alt.Vehicle.create({ model: 'schafter3', pos: new alt.Vector3(x, y, z) });

    player.setIntoVehicle(vehicle, 1);
});

connectLocalClient();
