
class CommandInfo {
    constructor() {
        this.input = "shell";
        this.output = "shell";
        this.args = [];
    }

    setInput(input) {
        this.input = input;
    }

    setOutput(output) {
        this.output = output;
    }

    addArg(arg) {
        if(!arg) return;
        this.args.push(arg);
    }
    
}

export default CommandInfo;