-- CreateTable
CREATE TABLE "public"."boxes" (
    "id" SERIAL NOT NULL,
    "box_id" INTEGER NOT NULL,
    "x1" INTEGER NOT NULL,
    "y1" INTEGER NOT NULL,
    "x2" INTEGER NOT NULL,
    "y2" INTEGER NOT NULL,
    "is_calibration" BOOLEAN NOT NULL DEFAULT true,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "boxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."box_snapshots" (
    "id" SERIAL NOT NULL,
    "box_id" INTEGER NOT NULL,
    "x1" INTEGER NOT NULL,
    "y1" INTEGER NOT NULL,
    "x2" INTEGER NOT NULL,
    "y2" INTEGER NOT NULL,
    "is_calibration" BOOLEAN NOT NULL DEFAULT true,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "observed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "box_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boxes_box_id_key" ON "public"."boxes"("box_id");

-- CreateIndex
CREATE INDEX "boxes_box_id_idx" ON "public"."boxes"("box_id");

-- CreateIndex
CREATE INDEX "boxes_is_calibration_is_locked_idx" ON "public"."boxes"("is_calibration", "is_locked");

-- CreateIndex
CREATE INDEX "box_snapshots_box_id_observed_at_idx" ON "public"."box_snapshots"("box_id", "observed_at");

-- AddForeignKey
ALTER TABLE "public"."box_snapshots" ADD CONSTRAINT "box_snapshots_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("box_id") ON DELETE RESTRICT ON UPDATE CASCADE;
