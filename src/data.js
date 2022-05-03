
export class Data {

    shaders = {
        default:{ vert: "default.vert", frag: "default.frag" },
        test:{ vert: "test.vert", frag: "null" }
        //e.g.  shader_name: { vert: "...", frag: "..." }
    };

    textures = {
        //{{textures}}
        //e.g.  texture_name: "path"
    };

    sounds = {
        //{{sounds}}
        //e.g.  sound_name: "path"
    }

}
