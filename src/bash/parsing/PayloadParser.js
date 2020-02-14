
import CommandInfo from "../command/CommandInfo";
import StringBuffer from "./StringBuffer";

class PayloadParser {
    constructor(string) {
        this.string = string;
        this.stringPos = 0;

        this.commandInfos = [];
        this.buffer = new StringBuffer();

        this.string += "&";
    }

    getChar() {
        return this.string[this.stringPos++];
    };

    skipWhitespace() {
        while(this.string[this.stringPos]  ===  " ") {
            this.stringPos++;
        }
    }

    parse() {
        let commandInfo = new CommandInfo();
        let char = '';
        let quoteFlag = false;
        let endFlag = true;

        while((char = this.getChar())) {
            // console.debug(`starting: char '${char}'`);
            endFlag = true;

            if(!quoteFlag) {
                switch(char) {
                    case "|":
                        // console.debug("pipe detected");
                        commandInfo.setOutput("pipe");
                        break;
                    case ">":
                        // console.debug("filestream detected");
                        commandInfo.setOutput("file");
                        break;
                    case "&":
                        // console.debug("& detected");
                        break;
                    default:
                        // console.debug("setting end to false");
                        endFlag = false;
                        break;
                }
            }
            else {
                // console.debug("setting end to false");
                endFlag = false;
            }

            if(!endFlag) {
                if(char  ===  " " && !quoteFlag) {
                    // getting parameters
                    // console.debug("adding parameter");
                    commandInfo.addArg(this.buffer.dump());
                    this.skipWhitespace();
                }
                else if(char  ===  '"') {
                    // opening or closing quotes
                    // console.debug("opening or closing quotes");
                    quoteFlag = !quoteFlag;
                }
                else {
                    // console.debug("adding char to buffer");
                    // console.debug("buffer: " + this.buffer.data);
                    this.buffer.add(char);
                }
            }
            else {
                // console.debug("adding last argument to command");
                commandInfo.addArg(this.buffer.dump());
                this.commandInfos.push(commandInfo);

                // console.debug("creating new command");
                const out = commandInfo.output;
                commandInfo = new CommandInfo();
                commandInfo.setInput(out);
            }
        }

        // console.debug(this.commandInfos);
        return this.commandInfos;
    }
}

export default PayloadParser;