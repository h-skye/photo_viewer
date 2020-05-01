# Photo Viewer

An applicationn to view a gallery of photos.

Tech Stack:
Node JS
HTML5/CSS3

## Libaries being used:

nodemon - For convenience of server testing/channges
express - For better API building

csvtojson - Converting csv to json formatting

node-cache - Caching module that works like memcached (lightweight 55kb)
  vs memory-cache (not as popular and was not updated as frequently)

React - create-react-app 
  vs setting up webpack which can take awhile

react-thunk
  vs react-saga for pure funnctions and better side effects handling
  react-saga is better for large scale and this is an SPA handling small routing

Redux - to dispatch store for asynchronous calls with react-thunk and dispatching props to components






## React Component Structure

1. Photo Gallery

  1a. filter component (dimensions)

      1a I. filtered components on sizes

      1a II. grayscale components
    
  1b. photo component

## Sources used:

Redux Project with create-react-app

https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8

https://dev.to/bnorbertjs/async-react-basics-with-redux-thunk--redux-saga-4af7

https://dzone.com/articles/loading-data-in-react-redux-thunk-redux-saga-suspe

Image Galler using React, Redux and redux-saga
https://joelhooks.com/blog/2016/03/20/build-an-image-gallery-using-redux-saga