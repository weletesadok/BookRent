/*
  Warnings:

  - The `rented` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "rented",
ADD COLUMN     "rented" INTEGER NOT NULL DEFAULT 0;
