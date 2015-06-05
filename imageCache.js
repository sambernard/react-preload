var hash = {};
var cache = [];

function add (url) {
    if (!hash[url]) {
        hash[url] = new Image();
        hash[url].src = url;

        cache.push(hash[url]);
    }
    return hash[url];
}

function get (url) {
    return add(url);
}

function stuff (urls) {
    if (urls.length > 0) {
        urls.map(add);
    }
}

var imageCache = {
    add: add,
    stuff: stuff,
    get: get,
    hash: hash,
    cache: cache
};

module.exports = imageCache;