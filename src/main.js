
window.onload = main;

import {Engine} from "./engine.js";

async function main() {
    let engine = null;

    try { 
        engine = new Engine(); 
    }catch(e) { 
        err(e); 
        throw "Failed to initialize engine."; 
    } 

    engine.start();
}
