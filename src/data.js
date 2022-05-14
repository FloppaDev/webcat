
//{{material_modules}}
//e.g.  import * as $material_default from "../data/materials/default.js";

//{{scene_modules}}

//{{script_modules}}

import * as $shader_default from "../data/shaders/default.js";


export class Data {

    shaders = {
        "default":{ vert: "default.vert", frag: "default.frag", module: $shader_default }
        //e.g.  shader_name: { vert: "...", frag: "...", module:$shader_default }
    };

    textures = [
        "grid.png"
        //e.g.  "path"
    ];

    sounds = [
        
        //e.g.  "path"
    ];

}
