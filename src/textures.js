
export class Texture {

    constructor(path) {
        this.path = path;
        this.gl_texture = null;
    }

    // Creates a texture from an image.
    /*Call from 'engine.js:Engine' once the renderer is initiliazed*/
    //TODO
    async load(ctx /*renderer.js:Renderer.ctx*/) {
        let {path, gl_texture} = this.path;
        let textures_dir = "data/textures";

        let img = await this.#load_image(`${textures_dir}/${path}`); 

        this.gl_texture = ctx.createTexture();
        ctx.bindTexture(ctx.TEXTURE_2D, gl_texture);

        ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, img);
        //ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST); TODO fix
    }

    // Load an image from url.
    async #load_image(url) {
        let img;
        await new Promise(resolve => {
            img = new Image();
            img.onload = resolve;
            img.src = url;
        });

        return img;
    }

}
