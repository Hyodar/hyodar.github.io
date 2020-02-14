
import { appInterface } from "../../../interfaces/Interfaces";
import filesystem from "../../../emulated_fs/Filesystem";

function ls(args, stream, piped) {
    const currentDir = appInterface.get().state.currentDir;
    const node = (args.length)? filesystem.findByPath(args[0], currentDir) : currentDir;

    if(!node) {
        stream.err.write(`ls: ${args[0]} no such file or directory`);
    }

    if(filesystem.isFile(node)) {
        stream.out.write(`${args[0]}`);
    }
    else {
        node.children.forEach((child) => {
            stream.out.write(`${child.name}`);
        })
    }
}

export default ls;