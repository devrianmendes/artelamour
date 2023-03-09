import { prismaClient } from "../../prisma";

class ListPecaService {
  async execute() {
    const listPeca = await prismaClient.peca.findMany({});
    return listPeca;
  }
}

export { ListPecaService }