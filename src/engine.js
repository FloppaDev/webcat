
import {Data} from "./data.js";
import {Renderer} from "./renderer.js";
import {World} from "./world.js";
import {Input} from "./input.js";

export class Engine {

    constructor() { }

    // Loads engine.
    async load() {
        this.renderer = Renderer.init(this);

        if(this.renderer.is_err()) {
            return this.renderer.chain(new Error("Failed to initialize engine"));
        }

        this.renderer = this.renderer.unwrap();

        this.data = new Data();
        let load = await this.#load_data();

        if(load.is_err()) {
            return load.chain(new Error("Could not load game assets"));
        }

        this.world = new World();
        this.input = new Input();

        return Result.ok({});
    }

    // Loads game assets.
    /*Returns Result*/
    async #load_data() {
        let {data, renderer} = this;
        let results = [];

        for(let [_name, shader] of Object.entries(data.shaders)) {
            results.push(await shader.build(renderer.ctx));
        }

        for(let [_name, texture] of Object.entries(data.textures)) {
            results.push(await texture.load(renderer.ctx));
        }

        //TODO load other assets.

        return Result.merge_err(results);        
    }

    // Start the engine and the game.
    /*Calls from main.js*/
    start() {
        this.renderer.start(this.world);
    }

}
