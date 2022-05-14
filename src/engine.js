
import {Data} from "./data.js";
import {Renderer} from "./renderer.js";
import {World} from "./world.js";

export class Engine {

    constructor() {
        this.data = new Data();
        this.renderer = new Renderer(this.data);
        this.world = new World();
    }

}
