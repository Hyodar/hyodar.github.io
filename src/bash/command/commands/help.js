
import CommandFactory from "../CommandFactory";

function help(args, stream, piped) {
    for(const commandName in CommandFactory.commandList) {
        stream.out.write(`${commandName} - ${CommandFactory.commandList[commandName].description}`);
    }
}

export default help;