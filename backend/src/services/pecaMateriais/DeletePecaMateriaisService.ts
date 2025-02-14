import { prismaClient } from "../../prisma";

interface DeletePecaMateriais {
  id: string;
}

class DeletePecaMateriaisService {
  async execute({ id }: DeletePecaMateriais) {
    try {
      const deletePecaMateriais = await prismaClient.pecaMateriais.delete({
        where: {
          id: id,
        },
      });
      return deletePecaMateriais;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
    // const deletePecaMateriais = await prismaClient.pecaMateriais.delete({
    //   where: {
    //     id: id
    //   }
    // })
    // return deletePecaMateriais;
  }
}

export { DeletePecaMateriaisService };
