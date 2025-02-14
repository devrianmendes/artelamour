import { prismaClient } from "../../prisma";

interface UpdatePecaMateriais {
  id: string;
  qtdMatUsado: string;
  unMedidaUsado: string;
}

class UpdatePecaMateriaisService {
  async execute({ id, qtdMatUsado, unMedidaUsado }: UpdatePecaMateriais) {
    try {
      const updatePecaMateriais = await prismaClient.pecaMateriais.update({
        where: {
          id: id,
        },
        data: {
          qtdMatUsado: qtdMatUsado,
          unMedidaUsado: unMedidaUsado,
        },
      });
      return updatePecaMateriais;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
    // const updatePecaMateriais = await prismaClient.pecaMateriais.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     qtdMatUsado: qtdMatUsado,
    //     unMedidaUsado: unMedidaUsado,
    //   },
    // });
    // return updatePecaMateriais;
  }
}

export { UpdatePecaMateriaisService };
