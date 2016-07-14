import mkdirp from 'mkdirp';
import path from 'path';
import {createRandomFile, isURL} from './utils';
import downloadFile from './download';
import copyFile from './copy';

// qDown(source, callback);
// qDown(source, target, callback)
export default function qDown(...args) {
    var source, callback;
    if (args.length < 2) {
        throw new Error('invalid argument number!');
    }

    source = args[0];
    if (args.length === 2) {
        callback = args[1];
        target = createRandomFile(qDown.tmpDir);
    } else {
        target = args[1];
        callback = args[2];
    }

    mkdirp(path.dirname(target), err => {
        if (err) {
            return callback(err);
        } else {
            if (isURL(source)) {
                // todo
                downloadFile(source, target, callback);
            } else {
                // todo
                copyFile(source, target, callback);
            }
        }
    });
}
