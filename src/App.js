import React, {Component} from 'react';

import FileDisplay from "./ui/FileDisplay";
import root from "./emulated_fs/Fs";
import Shell from "./ui/shell/Shell";
import UiHeader from "./ui/UiHeader";

import { appInterface } from "./interfaces/Interfaces";

import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {
            openedFile: "",
            currentDir: root
        }
    }

    componentDidMount() {
        appInterface.set(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    changeCurrentDir(newDir) {
        this.setState({
            currentDir: newDir
        });
    }

    changeOpenedFile(newFile) {
        this.setState({
            openedFile: newFile
        });
    }

    /*
    <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
    </p>
     */

    render() {
        return (
            <div className="App">

                <UiHeader
                  changeOpenedFile={(newFile) => this.changeOpenedFile(newFile)}
                ></UiHeader>

                <div className="Divider">
                    <FileDisplay appState={this.state} openedFile={this.state.openedFile}></FileDisplay>
                </div>

                <div className="Divider">
                    <Shell
                        appState={this.state}
                        currentDir={this.state.currentDir}
                        changeCurrentDir={(newDir) => this.changeCurrentDir(newDir)}
                        changeOpenedFile={(newFile) => this.changeOpenedFile(newFile)}
                    ></Shell>
                </div>

            </div>
        );
    }
}

export default App;
