const hash = {};
const cache = [];

const add = url => {
    if (!hash[url]) {
        hash[url] = new Image();
        hash[url].crossorigin = 'anonymous';
        hash[url].crossOrigin = 'anonymous';
        hash[url].src = url;

        cache.push(hash[url]);
    }
    return hash[url];
};

const get = url => {
    return add(url);
};

const stuff = (urls) => {
    if (urls.length > 0) {
        urls.map(add);
    }
};

const ImageCache = {
    add,
    stuff,
    get,
    hash,
    cache,
};

export default ImageCache;
