import ImageCache from './ImageCache';

const ImageHelper = {
    loadImage(url) {
        const image = ImageCache.get(url);

        return new Promise((resolve, reject) => {
            const handleSuccess = () => {
                resolve(image);
            };
            const handleError = () => {
                console.error('IMAGE FAIL', image);
                reject(image);
            };

            if (image.naturalWidth && image.naturalHeight) {
                // image is loaded, go ahead and change the state
                handleSuccess();
            } else {
                image.addEventListener('load', handleSuccess, false);
                image.addEventListener('error', handleError, false);
            }
        });
    },

    loadImages(urls) {
        const promises = urls.map(this.loadImage.bind(this));
        return Promise.all(promises);
    },

    // preload without caring about the result
    stuffImages(urls) {
        ImageCache.stuff(urls);
    },
};

export default ImageHelper;
