
window.onload = main;

import {Engine} from "./engine.js";
import {Data} from "./data.js";

async function main() {
    let data = new Data();

    let engine = new Engine(); 
    try{ engine.load_context(); }
    catch(e){ err(e); return; }

    try{ engine.load_shaders(data); }
    catch(e){ err(e); return; }

    engine.load_textures(data);
    engine.create_quad_vbo();
}
