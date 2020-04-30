import React, { Component } from 'react';
import thunk from 'redux-thunk';


export default class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
          images:[],
          imageResults: undefined
        }
        console.log('inside state: ' + this.state.images)
      }
    
    componentDidMount() {
        fetch('/images')
            .then((response) => {
                return response.ok ? response.json() : Promise.reject('Cannot communicate with fetching images')
            }).then((resultJSON) => {
                const result = JSON.stringify(resultJSON)

                this.setState( {imageResults: result}, function() {
                    console.log('state is: ' +this.state.imageResults)
                })
            }).catch((err) => {
                console.log('error in mounting: ' + err);
            })
    }



    render() {
        console.log('Render triggering')
        return (
            <div>
                {this.state.imageResults}
            </div>
        )
    }
}