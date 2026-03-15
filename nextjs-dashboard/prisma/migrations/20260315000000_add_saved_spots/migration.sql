-- CreateTable
CREATE TABLE "saved_spots" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "image_id" INTEGER NOT NULL,
    "box_id" INTEGER NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_spots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "saved_spots_user_id_image_id_box_id_key" ON "saved_spots"("user_id", "image_id", "box_id");

-- CreateIndex
CREATE INDEX "saved_spots_user_id_idx" ON "saved_spots"("user_id");
