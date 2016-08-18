# React Preload
[![npm version](https://badge.fury.io/js/react-preload.svg)](http://badge.fury.io/js/react-preload)

A React component to preload images. It renders a passed component during the loader phase, and renders it's children once the images have been successfully fetched.


## Installation

### npm

```bash
npm install react-preload --save
```

## Usage

```javascript
var Preload = require('react-preload').Preload;
```

```javascript
var loadingIndicator = (<div>Loading...</div>)
var images = [];

<Preload
  loadingIndicator={loadingIndicator}
  images={images}
  autoResolveDelay={3000}
  onError={this._handleImageLoadError}
  onSuccess={this._handleImageLoadSuccess}
  resolveOnError={true}
  mountChildren={true}
  >
	{/* content to be rendered once loading is complete*/}
</Preload>
```

## Prop types

```javascript
   propTypes: {
		//Rendered on success
		children: React.PropTypes.element.isRequired,

		//Rendered during load
		loadingIndicator: React.PropTypes.node.isRequired,

		//Array of image urls to be preloaded
		images: React.PropTypes.array,

		//If set, the preloader will automatically show
		//the children content after this amount of time
		autoResolveDelay: React.PropTypes.number,

		//Error callback. Is passed the error
		onError: React.PropTypes.func,

		//Success callback
		onSuccess: React.PropTypes.func,

		//Whether or not we should still show the content
		//even if there is a preloading error
		resolveOnError: React.PropTypes.bool

        //Whether or not we should mount the child content after
        //images have finished loading (or after autoResolveDelay)
        mountChildren: React.PropTypes.bool
    }
```

## Additional Details

This module also exposes `ImageCache` and `ImageHelper` which can be used to preload images
directly, and can be accessed via `require('react-preload').ImageCache` and
`require('react-preload').ImageHelper` respectively.

## License

[MIT][mit-license]

[mit-license]: ./LICENSE
