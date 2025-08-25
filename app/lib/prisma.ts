// Prisma client file for Dark Horse Kelly
// https://www.prisma.io/docs/orm/reference/prisma-client-js

import { PrismaClient } from '../generated/prisma'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma