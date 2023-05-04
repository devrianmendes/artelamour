import { prismaClient } from "../../prisma";

interface ListPecas {
  user: string
}

class ListPecaService {
  async execute({user}: ListPecas) {

    // const listPeca = await prismaClient.peca.findMany({});
    // return listPeca;

    const listPeca = await prismaClient.peca.findMany({
      where: {
        user: user
      }
    });
    return listPeca;
  }
}

export { ListPecaService }