var imageCache = require('./imageCache');

var ImageHelper = {
    loadImage: function (url) {

        var image = imageCache.get(url);

        return new Promise(function (resolve, reject) {
            var handleSuccess = function(){
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
        var promises =
            urls
            .map(this.loadImage.bind(this));
        return Promise.all(promises);
    },

    //preload without caring about the result
    stuffImages: function (urls) {
        imageCache.stuff(urls);
    },
};

module.exports = ImageHelper;
