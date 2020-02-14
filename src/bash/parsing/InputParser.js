
import CallQueue from "../command/CallQueue";
import PayloadParser from "./PayloadParser";
import Pipe from "../operators/Pipe";
import Stream from "../streams/Stream";
import standardStream from '../streams/standardStream';
import FileStream from "../operators/FileStream";

class InputParser {

    constructor(line) {
        this.input = new PayloadParser(line).parse();
        this.inputPos = 0;

        this.pipe = new Pipe();
        this.callQueue = new CallQueue();
    }

    getStream(id) {
        switch(id) {
            case "shell":
                return standardStream;
            case "pipe":
                // console.debug(this.pipe)
                return this.pipe;
            case "file":
                return new FileStream(this.input[this.inputPos + 2]);
            default:
                return null;
        }
    }

    parse() {
        if(!this.input.length) return;

        this.input.forEach(commandInfo => {
           if(commandInfo.input  ===  "file") {
               this.inputPos++;
               return;
           }

           const stream = new Stream(
               this.getStream(commandInfo.input),
               this.getStream(commandInfo.output),
               standardStream
           );

           this.callQueue.add(commandInfo, stream);
           this.inputPos++;
        });

        this.callQueue.execute();
    }
}

export default InputParser;