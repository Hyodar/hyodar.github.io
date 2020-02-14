
class StringBuffer {
    constructor() {
        this.data = "";
    }

    reset() {
        this.data = "";
    }

    dump() {
        const data = this.data;
        this.reset();
        return data;
    }

    add(string) {
        this.data += string;
    }
}

export default StringBuffer;