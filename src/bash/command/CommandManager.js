
import CommandFactory from "./CommandFactory";
import standardStream from "../streams/standardStream";

class CommandManager {

    static call(commandInfo, stream) {
        const command = CommandFactory.create(commandInfo, stream);

        if(command) {
            command.run();
        }
        else if(command  ===  null){
            standardStream.write(`${commandInfo.args[0]}: command not found.`);
        }
        else if(command  ===  undefined) {
            standardStream.write("invalid syntax");
        }
    }
}

export default CommandManager;