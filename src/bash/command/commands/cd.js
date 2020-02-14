
import { appInterface } from "../../../interfaces/Interfaces";
import filesystem from "../../../emulated_fs/Filesystem";

function cd(args, stream, piped) {
    if(!args[0]) {
        return;
    }

    const dir = filesystem.findByPath(args[0], appInterface.get().state.currentDir);

    if(dir) {
        if(!filesystem.isFolder(dir)) {
            return stream.err.write(`cd: '${args[0]}' is not a directory`);
        }

        appInterface.get().setState({
           currentDir: dir
        });
    }
}

export default cd;