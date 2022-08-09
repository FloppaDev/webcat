
export class World {

    constructor(data /*data.js:Data*/) {
        this.data = data; /*data.js:Data*/

        // Loaded scenes are ready for activation
        this.loaded_scenes = []; /*[str]*/

        // Active scenes are rendered
        this.active_scenes = []; /*[str]*/
    }

    update(camera /*camera.js/Camera*/) {
        for(let scene of this.active_scenes) {
            this.data.scenes[scene].update(camera);
        }
    }

    load_scene(name /*"data.js:Data.scenes[name]"*/) {
        if(this.loaded_scenes.includes(name)) {
            return Result.err(new Error(`Scene '${name}' already loaded.`));
        }

        let scene = this.data.scenes[name];

        if(scene == undefined) {
            return Result.err(new Error(`Scene '${name}' not found.`));
        }

        scene.load(this.data);
        this.loaded_scenes.push(name);

        return Result.ok();
    }

    unload_scene(name /*"data.js:Data.scenes[name]"*/) {
        //TODO
    }

    activate_scene(name /*"data.js:Data.scenes[name]"*/) {
        if(this.active_scenes.includes(name)) {
            return Result.err(new Error(`Scene '${name}' already active.`));
        }
        
        this.active_scenes.push(name);

        return Result.ok();
    }

    deactivate_scene(name /*"data.js:Data.scenes[name]"*/) {
        this.active_scenes = this.active_scenes(s => s != name);
    }

    get_active_scenes() {
        return this.active_scenes.map(s => this.data.scenes[s]);
    }

}

