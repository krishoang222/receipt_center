/*
  Warnings:

  - You are about to drop the column `wifi_password` on the `bills` table. All the data in the column will be lost.
  - You are about to drop the column `wifi_ssid` on the `bills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bills" DROP COLUMN "wifi_password",
DROP COLUMN "wifi_ssid",
ALTER COLUMN "id" SET DEFAULT (concat('bil_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT;
