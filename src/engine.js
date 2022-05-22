
import {Data} from "./data.js";
import {Renderer} from "./renderer.js";
import {World} from "./world.js";
import {Input} from "./input.js";

export class Engine {

    constructor() { }

    async load() {
        this.renderer = Renderer.init();

        if(this.renderer.is_err()) {
            return this.renderer.chain(new Error("Failed to initialize engine"));
        }

        this.data = new Data();
        await this.data.load(this.renderer);

        this.world = new World();
        this.input = new Input();

        return Result.ok({});
    }

    /*Call from main.js*/
    start() {
        this.renderer.start();
    }

}
