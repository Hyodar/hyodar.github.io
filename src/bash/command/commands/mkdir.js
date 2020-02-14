
import { appInterface } from "../../../interfaces/Interfaces";
import filesystem from "../../../emulated_fs/Filesystem";
import FsNode from "../../../emulated_fs/FsNode";

function mkdir(args, stream, piped) {
    const dir = filesystem.findByPath(args[0], appInterface.get().state.currentDir);

    if(dir) {
        if(filesystem.isFolder(dir)) {
            return stream.err.write(`mkdir: '${args[0]}' directory exists`);
        }
        else {
            return stream.err.write(`mkdir: '${args[0]}' file exists`);
        }
    }

    const splittedPath = args[0].split("/");

    if(splittedPath.length > 1) {
        const targetDir = filesystem.findByPath(splittedPath.slice(0, -1), appInterface.get().state.currentDir);

        if(!targetDir) {
            return stream.err.write(`mkdir: '${splittedPath.slice(0, -1).join("/")}' no such directory`);
        }

        new FsNode(splittedPath[splittedPath.length - 1], "folder", targetDir);
    }

    new FsNode(splittedPath[splittedPath.length - 1], "folder", appInterface.get().state.currentDir);
}

export default mkdir;