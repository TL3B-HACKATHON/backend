"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Public = () => (0, common_1.SetMetadata)(new config_1.ConfigService().get('PUBLIC_KEY'), true);
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map