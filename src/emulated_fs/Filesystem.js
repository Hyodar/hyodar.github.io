
import FsNode from "./FsNode";
import { shellInterface } from "../interfaces/Interfaces";
import root from "./Fs";

class Filesystem {
    constructor() {
        this.root = root;
    }

    findByPath(path, dir=this.root) {
        const splittedPath = path.split("/");
        let directory = dir;

        splittedPath.forEach(step => {
           directory = directory.shift(step);

           if(!directory) return null;
        });

        return directory;
    }

    createByPath(path, dir=this.root, type="file") {
        const splittedPath = path.split("/");
        const name = splittedPath[splittedPath.length - 1];

        if(splittedPath.length > 1) {
            const targetDir = this.findByPath(splittedPath.slice(0, -1).join("/"), dir);
            if(!targetDir) {
                shellInterface.get().visual.printLn(`'bash: ${path}' no such file or directory`);
                return null;
            }
            dir = targetDir;
        }

        let child;
        if((child = dir.getChildByName(path))) {
            if(this.isFolder(child)) {
                shellInterface.get().visual.printLn(`bash: '${path}' is a directory`);
            }
            else {
                shellInterface.get().visual.printLn(`bash: '${path}' already exists.`);
            }

            return null;
        }

        return new FsNode(name, type, dir);
    }

    isFile(node) {
        return node.type === "file";
    }

    isFolder(node) {
        return node.type === "folder";
    }
}

const filesystem = new Filesystem();

export default filesystem;