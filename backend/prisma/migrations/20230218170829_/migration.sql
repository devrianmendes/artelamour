/*
  Warnings:

  - You are about to alter the column `custo` on the `materiais` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.

*/
-- DropIndex
DROP INDEX `PecaMateriais_material_id_fkey` ON `pecamateriais`;

-- DropIndex
DROP INDEX `PecaMateriais_peca_id_fkey` ON `pecamateriais`;

-- AlterTable
ALTER TABLE `materiais` MODIFY `custo` DECIMAL(65, 30) NOT NULL;

-- AddForeignKey
ALTER TABLE `PecaMateriais` ADD CONSTRAINT `PecaMateriais_peca_id_fkey` FOREIGN KEY (`peca_id`) REFERENCES `pecas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PecaMateriais` ADD CONSTRAINT `PecaMateriais_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `materiais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
