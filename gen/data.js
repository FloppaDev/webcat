
import {Shader, Material} from "./shaders.js";
import {Texture} from "./textures.js";
import {Scene} from "./scene.js";

//{{material_modules}}
//e.g.  import * as $material_default from "../data/materials/default.js";

//{{shader_modules}}

//{{scene_modules}}

//{{script_modules}}

//{{config_modules}}

export class Data {

    shaders = {
        //{{shaders}}
        //e.g.  shader_name: new Shader("x.vert", "x.frag", $shader_x)
    };

    materials = {
        //{{materials}}
        //e.g.  material_name: new Material($material_x)
    };

    textures = {
        //{{textures}}
        //e.g.  texture_name: new Texture("grid.png") 
    };

    sounds = {
        //{{sounds}}
        //e.g.  sound_name: new Sound("beep.wav")
    };
    
    scenes = {
        //{{scenes}}
        //e.g.  scene_name: new Scene($scn_data_test, $scene_test)
    };

    configs = {
        //{{configs}}
        //e.g.  config_name: new Config($config_x)
    };

    constructor() {

    }

}
