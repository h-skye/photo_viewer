import React from 'react';



class PhotoComponent {
    constructor(props) {
        this.props = props;
        this.url = this.props.url
    }

    componentDidMount() {
        fetch('/images')
        .then((res) => 
        console.log(res)
        res.json())
        // .then()
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