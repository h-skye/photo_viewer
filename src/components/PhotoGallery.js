import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getImgsAsync } from '../redux/actions/img-actions'

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.getImgsAsync()
    }

    renderImages(imgUrls) {
        return imgUrls.map(imgUrl => (
            <div className="image-wrapper" key={imgUrl}>
                <img className="image-item" src={imgUrl} />
            </div>
        ));
    }

    render() {
        const { images } = this.props;

        return (
            <div className="gallery"> 
                <div className="image-list">
                    {this.renderImages(images)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    images: state.images.images
});

const mapDispatchToProps = {
    getImgsAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);