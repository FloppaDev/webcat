
import {Shader} from "./shaders.js";

//{{material_modules}}
//e.g.  import * as $material_default from "../data/materials/default.js";

//{{scene_modules}}

//{{script_modules}}

//{{shader_modules}}


export class Data {

    shaders = {
        //{{shaders}}
        //e.g.  shader_name: new Shader("x.vert", "x.frag", $shader_x)
    };

    textures = [
        //{{textures}}
        //e.g.  "path"
    ];

    sounds = [
        //{{sounds}}
        //e.g.  "path"
    ];

}
