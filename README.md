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



## React Component Structure

1. Photo Gallery
  1a. filter component (dimensions)
      1a I. filtered components on sizes
      1a II. grayscale components

  1b. photo component