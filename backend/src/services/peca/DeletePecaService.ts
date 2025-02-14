import { prismaClient } from "../../prisma";
import { unlink } from "node:fs";

interface DeletePeca {
  peca_id: string;
}

class DeletePecaService {
  async execute({ peca_id }: DeletePeca) {
    try {
      const bannerVerify = await prismaClient.peca.findFirst({
        where: {
          id: peca_id,
        },
        select: {
          banner: true,
        },
      });

      if (!!bannerVerify.banner) {
        unlink(`tmp/${bannerVerify.banner}`, (err) => {
          if (err) console.log(err);
        });
      }

      const deletePeca = await prismaClient.peca.delete({
        where: {
          id: peca_id,
        },
        select: {
          nome: true,
          desc: true,
        },
      });

      await prismaClient.pecaMateriais.deleteMany({
        where: {
          peca_id: peca_id,
        },
      });

      return deletePeca;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
    // const bannerVerify = await prismaClient.peca.findFirst({
    //   where: {
    //     id: peca_id,
    //   },
    //   select: {
    //     banner: true,
    //   },
    // });

    // if (!!bannerVerify.banner) {
    //   unlink(`tmp/${bannerVerify.banner}`, (err) => {
    //     if (err) console.log(err);
    //   });
    // }

    // const deletePeca = await prismaClient.peca.delete({
    //   where: {
    //     id: peca_id,
    //   },
    //   select: {
    //     nome: true,
    //     desc: true,
    //   },
    // });

    // await prismaClient.pecaMateriais.deleteMany({
    //   where: {
    //     peca_id: peca_id,
    //   },
    // });

    // return deletePeca;
  }
}

export { DeletePecaService };
