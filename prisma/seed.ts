import { PrismaClient } from '@prisma/client';
import { generateUsers } from './data';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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

  // Seeding users
  console.log('-> users : CREATING');

  const users = await generateUsers(ENTITY_COUNT.USERS);

  const createdUsers = await prisma.$transaction(
    users.map((user) => prisma.user.create({ data: user })),
  );
  console.log('-> users : DONE!');
  // end Seeding users

  console.log('[ END SEEDING ]');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
