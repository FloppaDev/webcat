
//TODO keycodes table

export const keybinds = {
    left: ["Q"],
    right: ["D"],
    down: ["S"],
    up: ["Z"],
};

export class Input {

    constructor() {
        this.keys = {};
        this.actions = {};

        for (let [name, keys] of Object.entries(keybinds)) {
            this.actions[name] = new Action(this, keys);
        }

        document.addEventListener("keydown", (e)=>this.key_down(e));
        document.addEventListener("keyup", (e)=>this.key_up(e));
    }

    key_down(e) { 
        this.keys[e.keyCode] = true; 
        //TODO use KeyState instead of bool.
    } 

    key_up(e) { 
        this.keys[e.keyCode] = false; 
    } 

    get_action(name /*e.g. "left"*/) {
        return this.actions[name]; 
    }

}

class Action {

    constructor(input /*Input*/, keybinds /*e.g. ["W"]*/) {
        this.input = input;
        this.keybinds = keybinds;
    }

    pressed() {
        for (let keybind of this.keybinds) {
            let keycode = keybind.charCodeAt(0);

            if (this.input.keys[keycode]) {
                return true;
            }
        }

        return false;
    }

}

export class KeyState {

    static PRESSED = 0;
    static HELD = 1;
    static RELEASED = 2;
    static EMPTY = 3;

}
