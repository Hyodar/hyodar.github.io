import React, {Component} from 'react';

class FileDisplay extends Component {

    render() {
        return (
            <div className="FileDisplay">
                <div className="Content">
                    { this.props.openedFile }
                </div>
            </div>
        );
    }
}

export default FileDisplay;