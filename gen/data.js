
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

    textures = [
        //{{textures}}
        //e.g.  "path"
    ];

    sounds = [
        //{{sounds}}
        //e.g.  "path"
    ];

    constructor() {

    }

    // Load game assets.
    /*Returns Result*/
    async load(renderer /*renderer.js:Renderer*/) {
        let results = [];

        for(let [_name, shader] of Object.entries(this.shaders)) {
            results.push(await shader.build(renderer.ctx));
        }

        //TODO load other assets.

        return Result.merge_err(results);        
    }

}
