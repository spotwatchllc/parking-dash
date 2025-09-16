/*
  Warnings:

  - Added the required column `x3` to the `boxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x4` to the `boxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y3` to the `boxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y4` to the `boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."boxes" ADD COLUMN     "x3" INTEGER NOT NULL,
ADD COLUMN     "x4" INTEGER NOT NULL,
ADD COLUMN     "y3" INTEGER NOT NULL,
ADD COLUMN     "y4" INTEGER NOT NULL;
