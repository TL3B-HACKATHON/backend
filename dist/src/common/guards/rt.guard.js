"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtGaurd = void 0;
const passport_1 = require("@nestjs/passport");
class RtGaurd extends (0, passport_1.AuthGuard)('jwt-refresh') {
    constructor() {
        super();
    }
}
exports.RtGaurd = RtGaurd;
//# sourceMappingURL=rt.guard.js.map