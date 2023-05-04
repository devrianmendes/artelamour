/*
  Warnings:

  - Added the required column `user` to the `materiais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `pecas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PecaMateriais_material_id_fkey` ON `pecamateriais`;

-- DropIndex
DROP INDEX `PecaMateriais_peca_id_fkey` ON `pecamateriais`;

-- AlterTable
ALTER TABLE `materiais` ADD COLUMN `user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pecas` ADD COLUMN `user` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `PecaMateriais` ADD CONSTRAINT `PecaMateriais_peca_id_fkey` FOREIGN KEY (`peca_id`) REFERENCES `pecas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PecaMateriais` ADD CONSTRAINT `PecaMateriais_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materiais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
