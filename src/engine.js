
import {Data} from "./data.js";
import {Renderer} from "./renderer.js";
import {World} from "./world.js";
import {Input} from "./input.js";

export class Engine {

    constructor() {
        this.data = new Data();
        this.renderer = new Renderer(this.data);
        this.world = new World();
        this.input = new Input();
    }

    /*Call from main.js*/
    start() {
        this.renderer.start();
    }

}
