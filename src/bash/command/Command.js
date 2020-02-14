
class Command {

    constructor(commandInfo, callback, min_argc, pipeable, stream) {
        this.commandInfo = commandInfo;
        this.min_argc = min_argc;
        this.pipeable = pipeable;

        this.callback = callback;
        this.stream = stream;
    }

    parseArgs() {
        this.name = this.commandInfo.args.shift();

        this.args = this.commandInfo.args;
        this.piped = false;

        if(this.args.length < this.min_argc) {
            if(this.pipeable && this.commandInfo.input  ===  "pipe") {
                // try to get args from pipe
                this.args = this.stream.inp.read();
                this.piped = true;

                if(this.args.length < this.min_argc) {
                    this.stream.err.write(`${this.name}: missing arguments`);
                    return false;
                }
            }
            else {
                this.stream.err.write(`${this.name}: missing arguments`);
                return false;
            }
        }
        return true;
    }

    run() {
        if(this.parseArgs()) {
            this.callback(this.args, this.stream, this.piped);
        }
    }

}

export default Command;