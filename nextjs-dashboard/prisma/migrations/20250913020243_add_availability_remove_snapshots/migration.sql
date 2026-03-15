/*
  Warnings:

  - You are about to drop the column `created_at` on the `boxes` table. All the data in the column will be lost.
  - You are about to drop the column `is_calibration` on the `boxes` table. All the data in the column will be lost.
  - You are about to drop the column `is_locked` on the `boxes` table. All the data in the column will be lost.
  - You are about to drop the column `last_seen_at` on the `boxes` table. All the data in the column will be lost.
  - You are about to drop the `box_snapshots` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."box_snapshots" DROP CONSTRAINT "box_snapshots_box_id_fkey";

-- DropIndex
DROP INDEX "public"."boxes_is_calibration_is_locked_idx";

-- AlterTable
ALTER TABLE "public"."boxes" DROP COLUMN "created_at",
DROP COLUMN "is_calibration",
DROP COLUMN "is_locked",
DROP COLUMN "last_seen_at",
ADD COLUMN     "availability" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."box_snapshots";
