/*
  Warnings:

  - You are about to drop the column `total_price` on the `bills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bills" DROP COLUMN "total_price",
ADD COLUMN     "total_amount" TEXT,
ALTER COLUMN "id" SET DEFAULT (concat('bil_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT;
