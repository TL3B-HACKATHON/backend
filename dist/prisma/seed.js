"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data_1 = require("./data");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const ENTITY_COUNT = {
    USERS: 10,
};
async function main() {
    console.log('[ BEGIN SEEDING ]');
    console.log('-> superadmin && user : CREATING');
    await prisma.user.createMany({
        data: [
            {
                firstname: 'superadmin',
                lastname: 'superadmin',
                phone: '09120190129',
                password: await bcrypt.hash('superadmin', 10),
                email: 'superadmin@gmail.com',
                role: 'PATIENT',
            },
            {
                firstname: 'user',
                lastname: 'user',
                phone: '09120190129',
                password: await bcrypt.hash('user', 10),
                email: 'user@gmail.com',
                role: 'HEALTH_PROFESSIONAL',
            },
        ],
    });
    console.log('-> superadmin && user : DONE!');
    console.log('-> users : CREATING');
    const users = await (0, data_1.generateUsers)(ENTITY_COUNT.USERS);
    const createdUsers = await prisma.$transaction(users.map((user) => prisma.user.create({ data: user })));
    console.log('-> users : DONE!');
    console.log('[ END SEEDING ]');
}
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map