import ImageCache from './ImageCache';

const reflect = p => p.then(v => ({v, status: 'fulfilled' }),
                            e => ({e, status: 'rejected' }));

const ImageHelper = {
    loadImage(url, options) {
        const image = ImageCache.get(url, options);

        return new Promise((resolve, reject) => {
            const handleSuccess = () => {
                resolve(image);
            };
            const handleError = () => {
                reject(new Error(`failed to preload ${url}`));
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
                        counter += 1;
                    }, 50);
                }
            } else {
                image.addEventListener('load', handleSuccess, false);
                image.addEventListener('error', handleError, false);
            }
        });
    },

    loadImages(urls, options) {
        const promises = urls.map(url =>  reflect(this.loadImage(url, options)));
        return Promise.all(promises).then((promises) => {
            return promises.map((p) => {
                if(p.status !== 'fulfilled') {
                    throw new Exception('One or more images failed to load');
                }
                return p;
            }
        )
        });
    },

    // preload without caring about the result
    stuffImages(urls, options) {
        ImageCache.stuff(urls, options);
    },
};

export default ImageHelper;
