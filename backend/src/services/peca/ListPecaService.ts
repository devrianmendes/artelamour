import { prismaClient } from "../../prisma";

interface ListPecas {
  user: string;
}

class ListPecaService {
  async execute({ user }: ListPecas) {
    try {
      const listPeca = await prismaClient.peca.findMany({
        where: {
          user: user,
        },
      });
      return listPeca;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }

    // const listPeca = await prismaClient.peca.findMany({
    //   where: {
    //     user: user
    //   }
    // });
    // return listPeca;
  }
}

export { ListPecaService };
