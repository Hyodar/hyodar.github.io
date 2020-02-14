
import React from "react";

import { appInterface } from "../../../interfaces/Interfaces";
import filesystem from "../../../emulated_fs/Filesystem";
import Interweave from 'interweave';

function less(args, stream, piped) {

    if(piped) {
        return appInterface.get().setState({
            openedFile: <Interweave content={args[0]}/>
        });
    }

    const path = args[0];
    const dir = appInterface.get().state.currentDir;
    const file = filesystem.findByPath(args[0], dir);

    if(!file) {
        return stream.err.write(`less: '${path}' no such file or directory.`);
    }
    else if(filesystem.isFolder(file)) {
        return stream.err.write(`less: '${path}' is a directory.`);
    }

    return appInterface.get().setState({
        openedFile: <Interweave content={file.content}/>
    });
}

export default less;