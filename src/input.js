
// Keycodes for "azerty" fr keyboard layout.
// These map to the physical keys (qwerty:w is the same as azerty:z).
export class Keys {

    static ESCAPE = 26;

    static SQUARE = 176;
    static KEYPAD_1 = 49;
    static KEYPAD_2 = 50;
    static KEYPAD_3 = 51;
    static KEYPAD_4 = 52;
    static KEYPAD_5 = 53;
    static KEYPAD_6 = 54;
    static KEYPAD_7 = 55;
    static KEYPAD_8 = 56;
    static KEYPAD_9 = 57;
    static KEYPAD_0 = 48;
    static KEYPAD_DEGREE = 169;
    static KEYPAD_EQUALS = 61;

    static A = 65;
    static Z = 90;
    static E = 69;
    static R = 82;
    static T = 84;
    static Y = 89;
    static U = 85;
    static I = 73;
    static O = 79;
    static P = 80;
    static CIRCUMFLEX = 0;
    static DOLLAR = 164;

    static Q = 81;
    static S = 83;
    static D = 68;
    static F = 70;
    static G = 71;
    static H = 72;
    static J = 74;
    static K = 75;
    static L = 76;
    static M = 77;
    static U_GRAVE = 165;
    static KEYPAD_MUL = 170;

    static LESS_THAN = 60;
    static W = 87;
    static X = 88;
    static C = 67;
    static V = 86;
    static B = 66;
    static N = 78;
    static COMMA = 188;
    static SEMICOLON = 59;
    static COLON = 58;
    static EXCLAMATION = 161;

    static SHIFT = 16;
    static CTRL = 17;
    static ALT = 18;
    static SPACE = 32;

    static INSERT = 45;
    static START = 36;
    static PAGE_UP = 33;
    static DELETE = 46;
    static END = 35;
    static PAGE_DOWN = 34;

    static LEFT = 37;
    static UP = 38;
    static RIGHT = 39;
    static DOWN = 40;

    static NUMPAD_0 = 96;
    static NUMPAD_1 = 97;
    static NUMPAD_2 = 98;
    static NUMPAD_3 = 99;
    static NUMPAD_4 = 100;
    static NUMPAD_5 = 101;
    static NUMPAD_6 = 102;
    static NUMPAD_7 = 103;
    static NUMPAD_8 = 104;
    static NUMPAD_9 = 105;
    static NUMPAD_DIV = 111;
    static NUMPAD_MUL = 106;
    static NUMPAD_MIN = 109;
    static NUMPAD_ADD = 107;
    static NUMPAD_DOT = 110;

}

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
            this.keys[record.key] = record.state;
        }
    }

    key_down(e) { 
        let current = this.keys[e.keyCode];

        if(current == KeyState.PRESSED || current == KeyState.HELD) {
            this.keys[e.keyCode] = KeyState.HELD; 
        }

        else {
            this.keys[e.keyCode] = KeyState.PRESSED; 
        }
    } 

    key_up(e) { 
        this.keys[e.keyCode] = KeyState.RELEASED; 
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
