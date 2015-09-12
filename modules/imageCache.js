let hash = {};
let cache = [];

let add = url => {
    if (!hash[url]) {
        hash[url] = new Image();
        hash[url].src = url;

        cache.push(hash[url]);
    }
    return hash[url];
};

let get = url => {
    return add(url);
};

let stuff = (urls) => {
    if (urls.length > 0) {
        urls.map(add);
    }
};

let ImageCache = {
    add: add,
    stuff: stuff,
    get: get,
    hash: hash,
    cache: cache
};

export default ImageCache;
