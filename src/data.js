
import {Shader} from "./shaders.js";
import {Texture} from "./textures.js";
import {Scene} from "./world.js";

//{{material_modules}}
//e.g.  import * as $material_default from "../data/materials/default.js";

import * as $scene_test from "../data/scenes/test.js";

//{{script_modules}}

import * as $shader_default from "../data/shaders/default.js";


export class Data {

    shaders = {
        "default": new Shader("default.vert", "default.frag", $shader_default)
        //e.g.  shader_name: new Shader("x.vert", "x.frag", $shader_x)
    };

    textures = {
        "grid": new Texture("grid.png")
        //e.g.  texture_name: new Texture("grid.png") 
    };

    sounds = {
        
        //e.g.  sound_name: new Sound("beep.wav")
    };
    
    scenes = {
        "test": new Scene("test.json", $scene_test)
        //e.g.  scene_name: new Scene("test.json")
    };

    constructor() {

    }

}
