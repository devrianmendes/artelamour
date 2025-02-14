import { prismaClient } from "../../prisma";

class DetailsUserService {
  async execute({ user_id }) {
    try {
      const detailUser = prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
        select: {
          id: true,
          apelido: true,
          email: true,
        },
      });
      return detailUser;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
    // const detailUser = prismaClient.user.findFirst({
    //   where: {
    //     id: user_id,
    //   },
    //   select: {
    //     id: true,
    //     apelido: true,
    //     email: true,
    //   },
    // });
    // return detailUser;
  }
}

export { DetailsUserService };
