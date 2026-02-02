/*
  Warnings:

  - A unique constraint covering the columns `[image_id,box_id]` on the table `boxes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_id` to the `boxes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."boxes_box_id_idx";

-- DropIndex
DROP INDEX "public"."boxes_box_id_key";

-- AlterTable
ALTER TABLE "public"."boxes" ADD COLUMN     "image_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "boxes_image_id_idx" ON "public"."boxes"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "boxes_image_id_box_id_key" ON "public"."boxes"("image_id", "box_id");
