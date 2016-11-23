import ImageCache from './ImageCache';

const ImageHelper = {
    loadImage(url, options) {
        const image = ImageCache.get(url, options);

        return new Promise((resolve, reject) => {
            const handleSuccess = () => {
                resolve(image);
            };
            const handleError = () => {
                reject(image);
            };

            if (image.complete) {
                // image is loaded, go ahead and change the state

                if(image.naturalWidth && image.naturalHeight) {
                    // successful load
                    handleSuccess();
                } else {
                    handleError();
                }

            } else {
                image.addEventListener('load', handleSuccess, false);
                image.addEventListener('error', handleError, false);
            }
        });
    },

    loadImages(urls, options) {
        const promises = urls.map(url =>  this.loadImage(url, options));
        return Promise.all(promises);
    },

    // preload without caring about the result
    stuffImages(urls, options) {
        ImageCache.stuff(urls, options);
    },
};

export default ImageHelper;
