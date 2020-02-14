
class Interface {
    constructor() {
        this.obj = null;
    }

    set(obj) {
        this.obj = obj;
    }

    get() {
        return this.obj;
    }
}

const appInterface = new Interface();
const headerInterface = new Interface();
const shellInterface = new Interface();

export {
    appInterface,
    headerInterface,
    shellInterface
};