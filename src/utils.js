import os from 'os';
import path from 'path';

let getTmpDir = os.tmpdir || os.tmpDir;

export function callback(fn) {
    let hasCallback = false;
    return function(...args) {
        if (hasCallback) {
            console.log("callback again!");
        } else {
            hasCallback = true;
            console.log("callback!");
            fn(...args);
        }
    }
}

export function createRandomString(size = 6, str = 'abcdefghijklmnopqrstuvwxyz0123456789') {
    let res = '';
    while(size) {
        res += str.charAt(Math.floor(Math.random() * (str.length + 1)));
    }

    return res;
}

export function createRandomFile(tmpDir = getTmpDir()) {
    return path.resolve(tmpDir, createRandomString(20));
}

export function isURL(url) {
    return (url.substr(0, 7) === 'http://') || (url.substr(0, 8) === 'https://');
}