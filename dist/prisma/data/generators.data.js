"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsers = void 0;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const fakeUser = async (role) => {
    const firstName = faker_1.faker.name.firstName();
    const lastName = faker_1.faker.name.firstName();
    const password = await hashData(firstName);
    return {
        firstname: firstName,
        lastname: lastName,
        password: password,
        picture: 'test-profile.picture.jpeg',
        email: firstName + '@mail.com',
        phone: faker_1.faker.phone.number(),
        role: role,
    };
};
const hashData = async (data) => {
    return bcrypt.hash(data, 10);
};
const generateUsers = (nbr) => {
    const users = new Array(nbr).fill(undefined);
    const returnedUsers = Promise.all(users.map((user) => (user = fakeUser(client_1.Role.PATIENT))));
    return returnedUsers;
};
exports.generateUsers = generateUsers;
//# sourceMappingURL=generators.data.js.map