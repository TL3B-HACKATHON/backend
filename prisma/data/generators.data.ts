import { Prisma, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const fakeUser = async (role: Role): Promise<Prisma.UserCreateInput> => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const password = await hashData(firstName);
  return {
    firstname: firstName,
    lastname: lastName,
    password: password,
    picture: 'test-profile.picture.jpeg',
    email: firstName + '@mail.com',
    phone: faker.phone.number(),
    role: role,
  };
};

const hashData = async (data: string): Promise<string> => {
  return bcrypt.hash(data, 10);
};
export const generateUsers = (
  nbr: number,
): Promise<Prisma.UserCreateInput[]> => {
  const users = new Array(nbr).fill(undefined);
  const returnedUsers = Promise.all(
    users.map((user) => (user = fakeUser(Role.PATIENT))),
  );
  return returnedUsers;
};
