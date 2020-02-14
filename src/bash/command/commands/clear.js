
import { shellInterface } from "../../../interfaces/Interfaces";

function clear(args, stream, piped) {
    shellInterface.get().setState({
        log: [],
        lineNum: 0
    });

    shellInterface.get().visual.initInput();
}

export default clear;