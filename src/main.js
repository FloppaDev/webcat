
window.onload = main;

import {Engine} from "./engine.js";

async function main() {
    let engine = new Engine();
    let load = await engine.load();

    if(load.is_err()) {
        load.log();
        return;
    }

    engine.start();
}
