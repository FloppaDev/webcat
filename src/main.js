
window.onload = main;

import {Engine} from "./engine.js";

async function main() {
    let engine = new Engine(); 
    try{ engine.load_context(); }
    catch(e){ err(e); return; }
}
