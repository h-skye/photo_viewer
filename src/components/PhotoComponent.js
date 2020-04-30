import React from 'react';



class PhotoComponent {
    constructor(props) {
        this.props = props;
        this.url = this.props.url
    }

    render() {
        return (
            <div>
                <img src={this.url} /> 
            </div>
        )
    }
}

export default PhotoComponent;