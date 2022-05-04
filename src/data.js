
export class Data {

    shaders = {
        "default":{ vert: "default.vert", frag: "default.frag" },
        "a/b/c":{ vert: "a/b/c.vert", frag: "a/b/c.frag" }
        //e.g.  shader_name: { vert: "...", frag: "..." }
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
