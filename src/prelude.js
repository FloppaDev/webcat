
// Everything in the prelude is accessible from all modules
// without any import needed.

const log = console.log;
const err = console.error;

class Result {

    static #OK = 0;
    static #ERR = 1;

    static ok = (value) => {
        return new Result(Result.#OK, value);
    }

    static err = (value /*e.g. new Error("")*/) => {
        return new Result(Result.#ERR, [value]);
    }

    constructor(ty /*e.g. Result.OK*/, value) {
        this.ty = ty;
        this.value = value;
    }

    is_ok() {
        return this.ty == Result.#OK;
    }

    is_err() {
        return this.ty == Result.#ERR;
    }

    unwrap() {
        return value;
    }

    log() {
        if(this.is_err()) {
            for(let e of this.value) {
                err(e);    
            }
        }
    }

    chain(e /*e.g. new Error("")*/) {
        this.value.push(e);
        return this;
    }

}
