
import Command from './Command';

import cat from "./commands/cat";
import cd from "./commands/cd";
import clear from "./commands/clear";
import echo from './commands/echo';
import help from "./commands/help";
import less from "./commands/less";
import ls from "./commands/ls";
import mkdir from "./commands/mkdir";

class CommandFactory {

    static commandList = {
        'cat': {
            callback: cat,
            description: 'some description here',
            min_argc: 1,
            pipeable: true
        },
        'cd': {
            callback: cd,
            description: 'changes directories',
            min_argc: 0,
            pipeable: false
        },
        'clear': {
            callback: clear,
            description: 'clears the shell',
            min_argc: 0,
            pipeable: false
        },
        'echo': {
            callback: echo,
            description: 'some description here',
            min_argc: 0,
            pipeable: false
        },
        'help': {
            callback: help,
            description: 'displays the available commands',
            min_argc: 0,
            pipeable: false
        },
        'less': {
            callback: less,
            description: 'display a file',
            min_argc: 1,
            pipeable: true
        },
        'ls': {
            callback: ls,
            description: 'list directory contents',
            min_argc: 0,
            pipeable: false
        },
        'mkdir': {
            callback: mkdir,
            description: 'make a new directory',
            min_argc: 1,
            pipeable: false
        },
    };

    static create(commandInfo, stream) {
        const entry = this.commandList[commandInfo.args[0]];
        if(!entry) return null;

        return new Command(commandInfo, entry.callback, entry.min_argc, entry.pipeable, stream);
    }
}

export default CommandFactory;