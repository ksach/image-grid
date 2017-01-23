# Image Grid

A grid of images given an array of image URLs. Drag and drop to reorder.

### Demo: [http://radiant-oasis-29876.herokuapp.com/](http://radiant-oasis-29876.herokuapp.com/)

## Running the app locally

```
npm install
npm start
```
Point your browser to [http://localhost:8080/](http://localhost:8080/)

To change the list of image urls go to /client/app.js and change the json file name in line 5.
For the original sample set use image-urls.json

## Browser Compatibility

This app has been tested on Chrome 38+ and Firefox 35+ on both Windows and Mac. It is not intended for touchscreen devices and does not support Safari or IE.

## Features

A grid of photos is shown given a json file containing a JSON array of image URLs. Images can be dragged and dropped to reorder.
Details to note:
* The page is responsive. The grid fills your browser width when the browser is resized.
* The images animate to their new positions when they reorder.
* Images that move from one end of a row to the opposite end of the next slide in from the side rather than on a diagonal.
* When the browser width is such that there is only one column, images animate vertically
* Lazy loading has been implemented. The images off screen load only when they are scrolled on screen or when the browser resizes such that they are on screen.
(In production I would load slightly more than what's on screen to make a more seamless user experience, but for the purposes of this I wanted you to see it happening)

## Implementation details

The grid layout was done with flexbox (which is why it has low cross-browser compatibility, in production I would add polyfills).

The main data structure is a linked list. This was done so that when reordering images I can traverse through only the images that need to be moved.

The linked list items are also indexed by id so that I can respond to mouse events in constant time.

There is also a second indexing by position (the order an image appears in the grid) which was necessary to target
the images for lazy loading in constant time. After implementing indexing by position for the purposes of lazy loading,
I could have gone back and removed the linked list structure without sacrificing time complexity,
but left it for interest.
