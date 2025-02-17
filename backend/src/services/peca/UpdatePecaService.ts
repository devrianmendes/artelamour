import { prismaClient } from "../../prisma";
import { unlink } from "node:fs";

interface UpdatePeca {
  peca_id: string;
  nome: string;
  desc: string;
  hrProd: number;
  minProd: number;
  lucroDesejado: number;
  banner: string;
}

class UpdatePecaService {
  async execute({
    nome,
    desc,
    hrProd,
    minProd,
    lucroDesejado,
    peca_id,
    banner,
  }: UpdatePeca) {
    try {
      if (banner === null) {
        const deleteFile = await prismaClient.peca.findFirst({
          where: {
            id: peca_id,
          },
          select: {
            banner: true,
          },
        });

        unlink(`tmp/${deleteFile.banner}`, (err) => {
          if (err) console.log(err);
          console.log(`${deleteFile.banner} foi apagada.`);
        });
      }

      const updatePeca = await prismaClient.peca.update({
        where: {
          id: peca_id,
        },
        data: {
          nome,
          desc,
          hrProd,
          banner,
          minProd,
          lucroDesejado,
        },
      });
      return updatePeca;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { UpdatePecaService };
