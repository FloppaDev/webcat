
window.onload = main;

import {Engine} from "./engine.js";
import {Data} from "./data.js";

async function main() {
    let data = new Data();

    let engine = new Engine(); 
    try{ engine.load_context(); }
    catch(e){ err(e); return; }

    log(data.shaders);
}
