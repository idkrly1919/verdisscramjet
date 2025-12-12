self.__scramjet$config = {
    prefix: "/scramjet/service/",
    config: "/scramjet/scramjet.config.js",
    files: {
        wasm: "/scramjet/scramjet.wasm.wasm",
        all: "/scramjet/scramjet.all.js",
        sync: "/scramjet/scramjet.sync.js",
    },
    codec: {
        encode: (str) => encodeURIComponent(str),
        decode: (str) => decodeURIComponent(str),
    }
};