import { PrismaClient } from "@prisma/client";
import {faker} from "@faker-js/faker";

const prisma = new PrismaClient()

async function main() {
    for (let i = 0; i < 20; i++) {
        const product = await prisma.products.create({
            data: {
                name: faker.commerce.product(),
                stock: faker.number.int({min: 5, max: 30}),
                price: Number(faker.commerce.price({dec: 0}))
            }
        })
    }
    for (let i = 0; i < 20; i++) {
        const product = await prisma.user.create({
            data: {
                userName: faker.internet.displayName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                cart: {connect: {id : faker.number.int({min: 1, max: 20})}}
            }
        })
    }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })