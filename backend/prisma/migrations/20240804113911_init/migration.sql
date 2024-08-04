-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'owner', 'renter');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;
