"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs_1 = require("fs");
const readFile = (path) => {
    const fullPath = `.${new config_1.ConfigService().get('STORAGE_PATH')}${path}`;
    if ((0, fs_1.existsSync)(fullPath)) {
        return (0, fs_1.createReadStream)(fullPath);
    }
    throw new common_1.NotFoundException('File Not Found');
};
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map