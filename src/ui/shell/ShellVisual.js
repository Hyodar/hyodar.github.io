
import React from 'react';

import { shellInterface } from "../../interfaces/Interfaces";

class ShellVisual {

    constructor() {
        this.writing = false;
        this.writingTimeout = null;
    }
    
    initAll() {
        shellInterface.get().visual.printLn("This shell is functional, try sending help to see the command list!");

        this.initBlinkingCursor();
        this.initInput();
    }

    initInput() {
        shellInterface.get().historyIndex = -1;
        shellInterface.get().setState({
            gettingInput: true,
            inputLine: "",
            lineNum: shellInterface.get().state.lineNum + 1,
        });
    }
    
    initBlinkingCursor() {
        setInterval(() => {
            shellInterface.get().setState({
                cursor: (this.writing) ? '\u{2588}' : (shellInterface.get().state.cursor === '\u{2588}') ? ' ' : '\u{2588}'
            })
        }, 500);
    }

    holdBlinkingCursor() {
        this.writing = true;

        clearTimeout(this.writingTimeout);
        this.writingTimeout = setTimeout(() => {
            this.writing = false;
        }, 500);
    }

    printLn(text, newline = true) {
        text.split("\n").forEach((txt) => {
            shellInterface.get().setState({lineNum: shellInterface.get().state.lineNum + 1});
            shellInterface.get().state.log.push(<h4 className="TerminalLogLine" key={shellInterface.get().state.log.length}>{txt || <span>&nbsp;</span>}</h4>);
        });
    }

    printEntry() {
        shellInterface.get().setState({lineNum: shellInterface.get().state.lineNum + 1});
        shellInterface.get().state.log.push(<h4 className="TerminalLogLine" key={shellInterface.get().state.log.length}>{this.getUser()}{this.getMarker(shellInterface.get().props.currentDir)}{shellInterface.get().state.inputLine}</h4>);
    }

    getMarker(dir) {
        return <span>:<span style={{color: "blue"}}>{dir.fullpath}</span>$ </span>;
    }

    getUser() {
        return <span style={{color: "lightgreen"}}>user@machine</span>;
    }
}

export default ShellVisual;