
//TODO Scene objects are currently stored in Data,
// this would be better to keep Data unmodified.

window.onload = main;

import {Engine} from "./engine.js";

async function main() {
    let engine = new Engine();
    let load = await engine.load();

    if(load.is_err()) {
        load.log();
        return;
    }

    load = engine.world.load_scene("test");

    if(load.is_err()) {
        load.log();
        return;
    }

    load = engine.world.activate_scene("test");

    if(load.is_err()) {
        load.log();
        return;
    }

    engine.start();
}
