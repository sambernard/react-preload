import ImageCache from './ImageCache';

let ImageHelper = {
    loadImage: function (url) {

        let image = ImageCache.get(url);

        return new Promise(function (resolve, reject) {
            let handleSuccess = function () {
                resolve(image);
            };

            if (image.naturalWidth && image.naturalHeight) {
                //Image is loaded, go ahead and change the state
                handleSuccess();
            } else {
                image.addEventListener('load', handleSuccess, false);
                image.addEventListener('error', reject, false);
            }

        });
    },

    loadImages: function (urls) {
        let promises =
            urls
            .map(this.loadImage.bind(this));
        return Promise.all(promises);
    },

    //preload without caring about the result
    stuffImages: function (urls) {
        ImageCache.stuff(urls);
    },
};

export default ImageHelper;
