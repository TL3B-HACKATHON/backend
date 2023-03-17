"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractCredentials = void 0;
const common_1 = require("@nestjs/common");
exports.ExtractCredentials = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!data)
        return request.user;
    return request.user[data];
});
//# sourceMappingURL=ExtractCredentials.decorator.js.map