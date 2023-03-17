"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageConfig = void 0;
const multer_1 = require("multer");
const crypto = require("crypto");
const config_1 = require("@nestjs/config");
const storageConfig = (ENV) => (0, multer_1.diskStorage)({
    destination: `.${new config_1.ConfigService().get('STORAGE_PATH')}${new config_1.ConfigService().get(ENV)}`,
    filename: (req, file, callback) => {
        crypto.randomBytes(32, (err, hash) => {
            if (err) {
                callback(err, null);
            }
            const extArray = file.mimetype.split('/');
            const extension = extArray[extArray.length - 1];
            const fileName = `${hash.toString('hex')}.${extension}`;
            callback(null, fileName);
        });
    },
});
exports.storageConfig = storageConfig;
//# sourceMappingURL=storage.config.js.map