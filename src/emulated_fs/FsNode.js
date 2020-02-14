
class FsNode {

    constructor(name, type, parent=null, children=[]) {
        this.name = name;
        this.type = type;
        this.parent = parent;
        this.children = children;
        this.content = "";

        this.getFullPath();
        if(parent) parent.addChild(this);
    }

    addChild(child) {
        this.children.push(child);
    }

    associateContent(file) {
        if(this.type ==='file') {
            this.content = file;
        }
    }

    getFullPath() {
        this.fullpath = this.name || '/';

        let file = this;
        while(file.parent) {
            this.fullpath = file.parent.name + '/' + this.fullpath;
            file = file.parent;
        }
    }

    getChildByName(name) {
        for(let i = 0; i < this.children.length; i++) {
            if(this.children[i].name === name) {
                return this.children[i];
            }
        }

        return null;
    }

    getRoot() {
        let file = this;
        while(file.parent) {
            file = file.parent;
        }

        return file;
    }

    shift(path) {
        if(path  ===  '') {
            return this.getRoot();
        }
        if(path  ===  '.') {
            return this;
        }
        if(path  ===  '..') {
            if(this.parent) return this.parent;
            return null;
        }

        const child = this.getChildByName(path);
        if(!child) return null;

        return child;
    }

    getContent() {
        return this.content || "";
    }

}

export default FsNode;