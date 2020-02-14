import React, {Component} from 'react';

import logo from '../logo.svg';
import { headerInterface, shellInterface } from "../interfaces/Interfaces";

import './Ui.css';

class UiHeader extends Component {

    openFile(path) {
        shellInterface.get().input.sendCommand("less " + path);
    }

    componentDidMount() {
        headerInterface.set(this);
    }

    render() {
        return (
            <div className="UiHeader">
                <img src={logo} className="App-logo" alt="logo" />
                <span style={{fontWeight: "bolder", fontSize: "20px"}}>Franco B G</span>
                <button onClick={() => this.openFile("/home/user/about.html")}>About</button>
                <button onClick={() => this.openFile("/home/user/projects.html")}>Projects</button>
                <button onClick={() => this.openFile("/home/user/contact.html")}>Contact</button>
            </div>
        );
    }
}

export default UiHeader;