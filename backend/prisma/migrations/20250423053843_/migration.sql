/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "firstName",
ADD COLUMN     "first_name" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "bills" (
    "id" TEXT NOT NULL DEFAULT (concat('bil_', gen_random_uuid()))::TEXT,
    "merchant_name" TEXT,
    "address" TEXT,
    "wifi_ssid" TEXT,
    "wifi_password" TEXT,
    "tax_amount" TEXT,
    "currency" TEXT,
    "bill_date" TEXT,
    "total_price" TEXT,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_items" (
    "id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "quantity" TEXT,
    "unit_price" TEXT,
    "billId" TEXT NOT NULL,

    CONSTRAINT "bill_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bill_items" ADD CONSTRAINT "bill_items_billId_fkey" FOREIGN KEY ("billId") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
