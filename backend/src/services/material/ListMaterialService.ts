import { prismaClient } from "../../prisma";

interface ListMaterial {
  user: string;
}

class ListMaterialService {
  async execute({ user }: ListMaterial) {
    try {
      const listMaterial = await prismaClient.material.findMany({
        where: {
          user: user,
        },
      });
      return listMaterial;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }

    // const listMaterial = await prismaClient.material.findMany({
    //   where: {
    //     user: user,
    //   },
    // });
    // return listMaterial;
  }
}

export { ListMaterialService };
