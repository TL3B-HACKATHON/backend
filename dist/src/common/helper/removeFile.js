"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const removeFile = async (path) => {
    if (!path)
        throw new common_1.BadRequestException('File Path Not Provided');
    try {
        await fs.unlinkSync(`.${new config_1.ConfigService().get('STORAGE_PATH')}${path}`);
        return { message: 'File Successfully Deleted' };
    }
    catch (error) {
        if (error.code != 'ENOENT')
            throw new common_1.GoneException('File Could Not Be Deleted');
    }
};
exports.removeFile = removeFile;
//# sourceMappingURL=removeFile.js.map