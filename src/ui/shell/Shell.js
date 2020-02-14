
import React, {Component} from 'react';

import { shellInterface } from "../../interfaces/Interfaces";
import ShellInput from "./ShellInput";
import ShellVisual from "./ShellVisual";

class Shell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gettingInput: false,
            inputLine: "",
            lineNum: 0,
            log: [],
            cursor: ""
        };

        this.visual = new ShellVisual();
        this.input = new ShellInput();
    }

    componentDidMount() {
        shellInterface.set(this);

        this.visual.initAll();
        this.input.initAll();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.increasedLog();
    }

    increasedLog() {
        const element = document.getElementsByClassName("Terminal")[0];
        element.scrollTop = element.scrollHeight;
    }

    render() {
        return (
            <div className="Terminal" onKeyDown={(ev) => this.input.handleInput(ev)} tabIndex="0">

                <div className="TerminalLog">
                    {this.state.log}
                </div>

                <h4 className="TerminalCommandLine TerminalLogLine">
                    {this.visual.getUser()}{this.visual.getMarker(this.props.currentDir)}{this.state.inputLine}{this.state.cursor}
                </h4>

            </div>
        );
    }
}

export default Shell;