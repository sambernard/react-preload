import ImageCache from './ImageCache';

const ImageHelper = {
    loadImage(url, options) {
        const image = ImageCache.get(url, options);

        return new Promise((resolve, reject) => {
            const handleSuccess = () => {
                resolve(image);
            };
            const handleError = () => {
                reject(new Error('failed to preload ' + url));
            };

            if (image.complete) {
                // image is loaded, go ahead and change the state

                    if (image.naturalWidth && image.naturalHeight) {
                        // successful load
                        handleSuccess();
                    } else {
                        // IE CACHED IMAGES RACE CONDITION
                        // -------------------------------
                        // IE11 sometimes reports cached images as image.complete,
                        // but naturalWidth and naturalHeight = 0.
                        // A few ms later it will get the dimensions correct,
                        // so check a few times before rejecting it.
                        let counter = 1;
                        const checkDimensions = setInterval(() => {
                            if (image.naturalWidth && image.naturalHeight) {
                                window.clearInterval(checkDimensions);
                                handleSuccess();
                            }
                            if (counter === 3) {
                                window.clearInterval(checkDimensions);
                                handleError();
                            }
                            counter++;
                        }, 50);
                    }
            } else {
                image.addEventListener('load', handleSuccess, false);
                image.addEventListener('error', handleError, false);
            }
        });
    },

    loadImages(urls, options) {
        const promises = urls.map(url =>  this.loadImage(url, options));
        return Promise.all(promises).catch((err) => {
            console.warn(err.message);
        });
    },

    // preload without caring about the result
    stuffImages(urls, options) {
        ImageCache.stuff(urls, options);
    },
};

export default ImageHelper;
