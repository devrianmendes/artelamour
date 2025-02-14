import { prismaClient } from "../../prisma";

interface CreatePeca {
  nome: string;
  desc: string;
  hrProd: number;
  minProd: number;
  lucroDesejado: number;
  user: string;
}

class CreatePecaService {
  async execute({
    nome,
    desc,
    hrProd,
    minProd,
    lucroDesejado,
    user,
  }: CreatePeca) {
    try {
      const createPeca = await prismaClient.peca.create({
        data: {
          nome: nome,
          desc: desc,
          hrProd: hrProd,
          minProd: minProd,
          lucroDesejado: lucroDesejado,
          user: user,
        },
        select: {
          nome: true,
          desc: true,
        },
      });
      return createPeca;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
    // const createPeca = await prismaClient.peca.create({
    //   data: {
    //     nome: nome,
    //     desc: desc,
    //     hrProd: hrProd,
    //     minProd: minProd,
    //     lucroDesejado: lucroDesejado,
    //     user: user,
    //   },
    //   select: {
    //     nome: true,
    //     desc: true,
    //   },
    // });
    // return createPeca;
  }
}

export { CreatePecaService };
