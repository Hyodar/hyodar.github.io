
import { shellInterface } from "../../interfaces/Interfaces";

class StandardStream {

    read() {
        return shellInterface.get().state.inputLine;
    }

    write(data) {
        shellInterface.get().visual.printLn(data);
    }
}

const standardStream = new StandardStream();

export default standardStream;