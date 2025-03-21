import lodash from 'lodash';
import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';
import crypto from 'crypto';
import { mkdirp } from 'mkdirp';
import concat from 'concat-stream';
import streamifier from 'streamifier';

// TODO: Update local storage path
var UPLOAD_PATH = path.resolve(path.dirname('.'), '..', process.env.AVATAR_STORAGE);

export function AvatarStorage(options) {
    function AvatarStorage(opts) {
        var baseUrl = process.env.AVATAR_BASE_URL;

        var allowedStorageSystems = ['local'];
        var allowedOutputFormats = ['jpg', 'png'];

        var defaultOptions = {
            storage: 'local',
            output: 'png',
        };

        var options = (opts && lodash.isObject(opts)) ? lodash.pick(opts, lodash.keys(defaultOptions)) : {};
        options = lodash.extend(defaultOptions, options);

        this.options = lodash.forIn(options, function (value, key, object) {
            switch (key) {
                case 'storage':
                    value = String(value).toLowerCase();
                    object[key] = lodash.includes(allowedStorageSystems, value) ? value : defaultOptions[key];
                    break;

                case 'output':
                    value = String(value).toLowerCase();
                    object[key] = lodash.includes(allowedOutputFormats, value) ? value : defaultOptions[key];
                    break;
            }
        });

        this.uploadPath = UPLOAD_PATH;
        this.uploadBaseUrl = baseUrl;

        // If the avatar storage option is set to store on the local machine
        if (this.options.storage == 'local') {

            // If the directory does not exist, then create one with the name specified in the `uploadPath` variable
            // Since we have not yet implemented the try-catch logic,
            // this line might result in an implicit error if failure occurs when trying to create the directory.
            if (!fs.existsSync(this.uploadPath) && mkdirp.sync(this.uploadPath)) {

            } else {
                console.log("Failed creating directory.");
                
            }
        }
    }

    AvatarStorage.prototype._generateRandomFilename = function () {
        var bytes = crypto.pseudoRandomBytes(32);
        var checksum = crypto.createHash('MD5').update(bytes).digest('hex');
    
        return checksum + '.' + this.options.output;
    }

    AvatarStorage.prototype._createOutputStream = function (filepath, cb) {
        var that = this;

        var output = fs.createWriteStream(filepath);

        output.on('error', cb);

        output.on('finish', function () {
            cb(null, {
                destination: that.uploadPath,
                baseUrl: that.uploadBaseUrl,
                filename: path.basename(filepath),
                storage: that.options.storage
            });
        });
    
        return output;
    }

    AvatarStorage.prototype._processImage = function (image, cb) {
        var that = this;
        var batch = [];
        var filename = this._generateRandomFilename();
        var mime = 'image/png';
        // var clone = image.clone();

        switch (this.options.output) {
            case 'jpg':
                mime = 'image/jpeg';
                break;
            case 'png':
                mime = 'image/png';
                break;
            default:
                mime = 'image/png';
                break;
        }

        batch.push({
            stream: that._createOutputStream(path.join(that.uploadPath, filename), cb),
            image: image
        });
    
        lodash.each(batch, function (current) {
            current.image.getBuffer(mime, function (err, buffer) {
                if (that.options.storage == 'local') {
                    streamifier.createReadStream(buffer).pipe(current.stream);
                }
            });
        });
    }

    AvatarStorage.prototype._handleFile = function (req, file, cb) {
        var that = this;

        var fileManipulate = concat(function (imageData) {
            Jimp.read(imageData)
                .then(

                    function (image) {
                    that._processImage(image, cb);
                }
            
            
            
            
            )
                .catch(cb);




        });
    
        file.stream.pipe(fileManipulate);
    }

    AvatarStorage.prototype._removeFile = function (req, file, cb) {
        var filename = file.filename;
        var _path = path.join(this.uploadPath, filename);
        var paths = [];
    
        delete file.filename;
        delete file.destination;
        delete file.baseUrl;
        delete file.storage;

        paths = [_path];

        lodash.each(paths, function (_path) {
            fs.unlink(_path, cb);
        });
    }

    return new AvatarStorage(options);
};

export default AvatarStorage;
