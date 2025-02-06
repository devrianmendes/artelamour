-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materiais" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "quantidadeCusto" TEXT NOT NULL,
    "unidadeMedidaCusto" TEXT NOT NULL,
    "custo" DECIMAL(65,30) NOT NULL,
    "user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "materiais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pecas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "hrProd" INTEGER NOT NULL,
    "minProd" INTEGER NOT NULL,
    "lucroDesejado" INTEGER NOT NULL,
    "banner" TEXT,
    "user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pecas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PecaMateriais" (
    "id" TEXT NOT NULL,
    "qtdMatUsado" TEXT NOT NULL,
    "unMedidaUsado" TEXT NOT NULL,
    "peca_id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,

    CONSTRAINT "PecaMateriais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PecaMateriais" ADD CONSTRAINT "PecaMateriais_peca_id_fkey" FOREIGN KEY ("peca_id") REFERENCES "pecas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PecaMateriais" ADD CONSTRAINT "PecaMateriais_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materiais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
