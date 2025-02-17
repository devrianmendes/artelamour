import { prismaClient } from "../../prisma";

interface CreatePecaMateriais {
  qtdMatUsado: string;
  unMedidaUsado: string;
  peca_id: string;
  material_id: string;
}

class CreatePecaMateriaisService {
  async execute({
    peca_id,
    material_id,
    qtdMatUsado,
    unMedidaUsado,
  }: CreatePecaMateriais) {
    try {
      const create = prismaClient.pecaMateriais.create({
        data: {
          peca_id: peca_id,
          material_id: material_id,
          qtdMatUsado: qtdMatUsado,
          unMedidaUsado: unMedidaUsado,
        },
      });
      return create;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { CreatePecaMateriaisService };
