
import CommandManager from "./CommandManager";

class CallQueue {
    constructor() {
        this.queue = [];
    }

    add(commandInfo, stream) {
        this.queue.push({
            commandInfo: commandInfo,
            stream: stream
        });
    }

    execute() {
        let entry;
        while((entry = this.queue.shift())) {
            CommandManager.call(entry.commandInfo, entry.stream);
        }
    }

}

export default CallQueue;