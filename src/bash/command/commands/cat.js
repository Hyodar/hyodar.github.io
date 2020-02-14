
import { appInterface } from "../../../interfaces/Interfaces";
import filesystem from "../../../emulated_fs/Filesystem";

function cat(args, stream, piped) {
    if(piped) {
        // concat normal string
        return stream.out.write(args);
    }

    // load file
    const dir = appInterface.get().state.currentDir;
    const file = filesystem.findByPath(args[0], dir);

    if(file) {
        if(filesystem.isFolder(file)) {
            return stream.out.write(`cat: '${args[0]}' is a directory`);
        }
        return stream.out.write(file.content || "");
    }

    stream.out.write(`cat: '${args[0]}' no such file or directory.`);
}

export default cat;