import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { createStore } from 'redux';


const images = () => {
    const imgs = [];

    fetch('/images')
        .then((response) => {
            return response.ok ? response.json() : Promise.reject('Cannot communicate with fetching images')
        }).then((resultJSON) => {
            
            for (let value of resultJSON) {
                imgs.push(value["url"])
            }

            return resultJSON
        }).catch((err) => {
            console.log('error in fetching');
        })
    console.log(imgs)
    return imgs;
}

console.log(images)


export default class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
          images: []
        }
        // console.log('inside state: ' + this.state.imageResults)
      }
    
    componentDidMount() {
        fetch('/images')
            .then((response) => {
                return response.ok ? response.json() : Promise.reject('Cannot communicate with fetching images')
            }).then((resultJSON) => {

                let imgURLs = []
                for (let value of resultJSON) {
                    imgURLs.push(value["url"])
                }

                this.setState( {images: imgURLs, function () {
                    console.log('img urls: ' + imgURLs)
                }})

                this.setState( {imageResults: resultJSON}, function() {
                    console.log('state is: ' + this.state.imageResults)
                })

            }).catch((err) => {
                console.log('error in mounting: ' + err);
            })        
    }

    render() {
        console.log('Render triggering')
        console.log(images)

        // console.log(this.state.images)

        // if (this.state.images) {
        //     var imgRender = this.state.images.map((img, index) => {
        //         console.log('img url is : ' + img)
        //         var image = img ? <img src={img} id={index} /> : null
    
        //         return (
        //             {image}
        //         )
        //     })
        // }

        // for (let i = 0; i < this.state.images.length; i++) {
        //     console.log(this.state.images[i])
        // }

        // let imgRender = this.state.images.map((img, index) => {
        //     console.log('img url is : ' + img)
        //     const image = img ? <img src={img} id={index} /> : null

        //     return (
        //         {image}
        //     )
        // })

        return (
            <div> 
                {/* {imgRender} */}
                <h1> Test </h1>
            </div>
        )

    }

}