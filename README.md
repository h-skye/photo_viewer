# Photo Viewer

An applicationn to view a gallery of photos.

## Libaries being used:

nodemon - For convenience of server testing/channges
express - For better API building
cors - for CORS across browsers

csvtojson - Converting csv to json formatting

node-cache - Caching module that works like memcached (lightweight 55kb)
  vs memory-cache (not as popular and was not updated as frequently)

React - create-react-app 
  vs setting up webpack which can take awhile

react-thunk
  vs react-saga for pure functions and better side effects handling
  react-saga is better for large scale and this is an SPA handling small routing async

Redux - to dispatch store for asynchronous calls with react-thunk and dispatching props to components

## How to start up project

### Production

Build the server first on one terminal:
```npm run server```

Build the react components on another terminal:
```npm run build```

### Development

Build the server using on one terminal:
```npm run nodemon```

Build the react components on another terminal:
```npm start```

## Walkthrough

Generally you would have a home page and then a user or some verification to see images/feed (i.e. instagram)

Currently the homepage just renders all the images using React/Redux

From homepage -> user logins -> gets verified -> redirects to /images

Things missing:

Front End:

  I. Filtering dimension drop down
  
  II. Infinite scrolling passed on backend pagination fetch/re-render component
  
  III. Toggle grayscale checkbox

  Bugs:
    I. Query params needed to be fixed, hardcoded token as a temp 

## React Component Structure

1. Photo Gallery

  1a. App
    1b. Photo Gallery


## Picture dimensions query from server

I. ?width= && length=

Various sizes:
1. 300x200
2. 100x100
3. 250x250
4. 400x200
5. 300x300


II. ?page= && limit=

III. ?token=

## Sources used:

Redux Project with create-react-app

https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8

https://dev.to/bnorbertjs/async-react-basics-with-redux-thunk--redux-saga-4af7

https://dzone.com/articles/loading-data-in-react-redux-thunk-redux-saga-suspe

Image Galler using React, Redux and redux-saga
https://joelhooks.com/blog/2016/03/20/build-an-image-gallery-using-redux-saga

## Test Screenshots


![Test Image 1](/test_SS/1.png)


![Test Image 1](/test_SS/1b.png)

![Test Image 1](/test_SS/2.png)

![Test Image 1](/test_SS/2b.png)

![Test Image 1](/test_SS/3a.png)

![Test Image 1](/test_SS/3b.png)
