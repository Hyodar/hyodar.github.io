
import { shellInterface } from "../../interfaces/Interfaces";
import InputParser from "../../bash/parsing/InputParser";

class ShellInput {

    constructor() {
        this.inputHistory = [];
        this.historyIndex = -1;
    }

    initAll() {
        // no-op
    }

    isValidChar(char) {
        const ascii_val = char.charCodeAt(0);
        return char.length === 1 && ascii_val >= 32 && ascii_val <= 126;
    }

    handleInput(event) {
        if (!shellInterface.get().state.gettingInput) return;

        shellInterface.get().visual.holdBlinkingCursor();

        const key = event.key;

        if (key  ===  'ArrowUp') {
            this.historyIndex = Math.min(this.inputHistory.length - 1, this.historyIndex + 1);
            shellInterface.get().setState({
                inputLine: this.inputHistory[this.historyIndex] || ""
            });
            return;
        }
        if (key  ===  'ArrowDown') {
            this.historyIndex = Math.max(-1, this.historyIndex - 1);
            shellInterface.get().setState({
                inputLine: this.inputHistory[this.historyIndex] || ""
            });
            return;
        }

        if (key  ===  'Enter') {
            return shellInterface.get().input.send();
        }

        if (key  ===  'Backspace') {
            shellInterface.get().setState({inputLine: shellInterface.get().state.inputLine.slice(0, -1)});
        } else if (this.isValidChar(key)) {
            shellInterface.get().setState({inputLine: shellInterface.get().state.inputLine + key});
        }
    }

    sendCommand(line) {
        shellInterface.get().setState({
            inputLine: line
        }, () => this.send());
    }
    
    send() {
       shellInterface.get().setState({
            gettingInput: false,
            lineNum: shellInterface.get().state.lineNum + 1
        });

        const inputLine = shellInterface.get().state.inputLine;
        this.inputHistory.unshift(inputLine);
        shellInterface.get().visual.printEntry();

        new InputParser(inputLine).parse();

        shellInterface.get().setState({
            inputLine: ""
        });

        shellInterface.get().visual.initInput();
    }
}

export default ShellInput;