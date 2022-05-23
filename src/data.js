
import {Shader} from "./shaders.js";
import {Texture} from "./textures.js";

//{{material_modules}}
//e.g.  import * as $material_default from "../data/materials/default.js";

//{{scene_modules}}

//{{script_modules}}

import * as $shader_default from "../data/shaders/default.js";


export class Data {

    shaders = {
        "default": new Shader("default.vert", "default.frag", $shader_default)
        //e.g.  shader_name: new Shader("x.vert", "x.frag", $shader_x)
    };

    textures = [
        new Texture("grid.png")
        //e.g.  "path"
    ];

    sounds = [
        
        //e.g.  "path"
    ];

    constructor() {

    }

}
