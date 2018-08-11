# React Preload
[![npm version](https://badge.fury.io/js/react-preload.svg)](http://badge.fury.io/js/react-preload)

A React component to preload images. It renders a passed component during the loader phase, and renders its children once the images have been successfully fetched.


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
var loadingIndicator = (<div>Loading...</div>);
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
    {/* content to be rendered once loading is complete */}
</Preload>
```

## Prop types

```javascript
propTypes: {
    // Rendered on success
    children: PropTypes.element.isRequired,

    // Rendered during load
    loadingIndicator: PropTypes.node.isRequired, // Default: null

    // Array of image urls to be preloaded
    images: PropTypes.array, // Default: []

    // If set, the preloader will automatically show
    // the children content after this amount of time
    autoResolveDelay: PropTypes.number,

    // Error callback. Is passed the error
    onError: PropTypes.func,

    // Success callback
    onSuccess: PropTypes.func,

    // Whether or not we should still show the content
    // even if there is a preloading error
    resolveOnError: PropTypes.bool, // Default: true

    // Whether or not we should mount the child content after
    // images have finished loading (or after autoResolveDelay)
    mountChildren: PropTypes.bool, // Default: true
}
```

## Additional Details

This module also exposes `ImageCache` and `ImageHelper` which can be used to preload images
directly, and can be accessed via `require('react-preload').ImageCache` and
`require('react-preload').ImageHelper` respectively.

## License

[MIT][mit-license]

[mit-license]: ./LICENSE
