
import {Data} from "./data.js";
import {Renderer} from "./renderer.js";
import {Scene} from "./scene.js";

export class Engine {

    constructor() {
        this.data = new Data();
        this.renderer = new Renderer(data);
        this.scene = new Scene();
    }

}
