
class Pipe {
    constructor() {
        this.queue = [];
    }

    read() {
        return this.queue.shift() || null;
    }

    write(op) {
        this.queue.push(op);
    }
}

export default Pipe;