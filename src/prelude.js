
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

    // Chains results that are errors and returns a Result.
    // Returns ok Result if there is no error. 
    static merge_err = (results /*[Result]*/) => {
        let r = Result.ok({});

        for(let result of results) {
            if(result.is_err()) {
                if(r.is_ok()) {
                    r = result;
                }

                else {
                    r.chain(result.value);
                }
            }
        }

        return r;
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
        return this.value;
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
