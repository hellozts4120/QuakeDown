import * as utils from './utils';
import fs from 'fs';
import request from 'request';

export function downloadFile(url, target, callback) {
	callback = utils.callback(callback);

	let stream = fs.createWriteStream(target);
	stream.on('error', err => {
		console.log('open target file with error: ' + err);
		callback(err);
	});

	let totalSize = 0;
	let downloadSize = 0;
	let req = request
		.get({
			url: url,
			encoding: null
		})
		.on('response', res => {
			if (res.statusCode !== 200) {
				return callback(new Error('status #' + res.statusCode));
			}
			totalSize = res.headers['content-length'] || null;

			res.on('data', data => {
				downloadSize += data.length;
				console.log('download file progress: ' + downloadSize + ' / ' + totalSize);			
			});
			res.on('end', _ => callback(null, target));
		})
		.pipe(stream);

}