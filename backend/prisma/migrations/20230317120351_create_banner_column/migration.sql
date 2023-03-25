-- DropIndex
DROP INDEX `PecaMateriais_material_id_fkey` ON `pecamateriais`;

-- DropIndex
DROP INDEX `PecaMateriais_peca_id_fkey` ON `pecamateriais`;

-- AlterTable
ALTER TABLE `pecas` ADD COLUMN `banner` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `PecaMateriais` ADD CONSTRAINT `PecaMateriais_peca_id_fkey` FOREIGN KEY (`peca_id`) REFERENCES `pecas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PecaMateriais` ADD CONSTRAINT `PecaMateriais_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materiais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
