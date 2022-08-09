
import {Keys} from './keys.js';

export class KeyState {

    static PRESSED = 0;
    static HELD = 1;
    static RELEASED = 2;
    static EMPTY = 3;

}

//TODO move it to a settings file in "../data".
export const keybinds = {
    left: [Keys.Q],
    right: [Keys.D],
    down: [Keys.S],
    up: [Keys.Z],
};

export class Record {

    constructor(key /*Keys*/, state /*KeyState*/) {
        this.key = key;
        this.state = state;
    }

}

// Handles states for all actions.
export class Input {

    constructor() {
        this.keys = {};
        this.actions = {};
        this.buffer = [];

        for (let [name, keys] of Object.entries(keybinds)) {
            this.actions[name] = new Action(this, keys);
        }

        document.addEventListener("keydown", (e)=>this.key_down.bind(this)(e));
        document.addEventListener("keyup", (e)=>this.key_up.bind(this)(e));
    }

    //TODO call before game loop.
    // Refreshes states for all keys.
    refresh() {
        for(let key of this.keys) {
            if(key == KeyState.RELEASED) {
                key = KeyState.EMPTY;
            }
        }
    }

    //TODO call before game loop. After refresh?
    // Apply inputs to key states.
    apply() {
        for(let record of buffer) {
            if(record.state == PRESSED) {
                let current = this.keys[record.key];

                if(current == KeyState.PRESSED || current == KeyState.HELD) {
                    this.keys[record.key] = KeyState.HELD; 
                }

                else {
                    this.keys[record.key] = KeyState.PRESSED; 
                }        
            }

            else if(record.state == RELEASED) {
                this.keys[e.keyCode] = KeyState.RELEASED; 
            }
        }
    }

    key_down(e) { 
        let record = new Record(e.keyCode, KeyState.PRESSED);
        this.buffer.push(record);
    } 

    key_up(e) { 
        let record = new Record(e.keyCode, KeyState.RELEASED);
        this.buffer.push(record);
    } 

    get_action(name /*e.g. "left"*/) {
        return this.actions[name]; 
    }

}

// Stores the current state for an action.
class Action {

    constructor(input /*Input*/, keybinds /*e.g. [Keys.W]*/) {
        this.input = input;
        this.keybinds = keybinds;
    }

    pressed() {
        for (let keybind of this.keybinds) {
            if (this.input.keys[keybind]) {
                return true;
            }
        }

        return false;
    }

}
