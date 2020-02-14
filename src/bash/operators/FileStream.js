
import { appInterface, shellInterface } from "../../interfaces/Interfaces";
import filesystem from "../../emulated_fs/Filesystem";

class FileStream {
    constructor(input) {
        if(!input) {
            shellInterface.get().visual.printLn(`bash: syntax error`);
            this.file = null;
        }
        else {
            this.path = input.args[0];
            this.file = filesystem.findByPath(this.path, appInterface.get().state.currentDir);

            if(!this.file) {
                this.file = filesystem.createByPath(this.path, appInterface.get().state.currentDir);
            }

            else if(filesystem.isFolder(this.file)) {
                shellInterface.get().visual.printLn(`bash: '${this.path}' is a directory`);
                this.file = null;
            }
        }
    }

    read() {
        if(this.file) {
            return this.file.content;
        }
        return "";
    }

    write(string) {
        if(this.file) {
            this.file.content += string;
        }
    }
}

export default FileStream;