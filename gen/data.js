
import {Shader} from "./shaders.js";
import {Texture} from "./textures.js";

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

    textures = {
        //{{textures}}
        //e.g.  texture_name: new Texture("grid.png") 
    };

    sounds = {
        //{{sounds}}
        //e.g.  sound_name: new Sound("beep.wav")
    };

    constructor() {

    }

}
