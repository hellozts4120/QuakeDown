import * as utils from './utils';
import path from 'path';
import fs from 'fs';

export default function copyFile(source, target, callback) {
    callback = utils.callback(callback);

    fs.stat(source, (err, stats) => {
        if (err) return callback(err);

        let sourceStream = fs.createReadStream(source),
            targetStream = fs.createWriteStream(target);

        sourceStream.on('error', err => {
            console.log('Error when open source file: ' + err);
            callback(err);
        });
        targetStream.on('error', err => {
            console.log('Error when open target file: ' + err);
            callback(err);
        });

        let copySize = 0;
        sourceStream.on('data', data => {
            copySize += data.length;
            console.log('copy file progress: ' + copySize + ' / ' + stats.size);
        });

        sourceStream.on('end', _ => callback(null, target));

        sourceStream.pipe(targetStream);
    })
}