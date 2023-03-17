"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const Roles = (...roles) => {
    const hashedRoles = Promise.all(roles.map((role) => bcrypt.hash(role, 10)));
    return (0, common_1.SetMetadata)(new config_1.ConfigService().get('ROLES_KEY'), hashedRoles);
};
exports.Roles = Roles;
//# sourceMappingURL=role.decorator.js.map