import { prismaClient } from "../../prisma";

interface DeleteMaterial {
  material_id: string;
}

class DeleteMaterialService {
  async execute({ material_id }: DeleteMaterial) {
    // const deleteMaterial = await prismaClient.material.delete({
    //   where: {
    //     id: material_id
    //   },
    //   select: {
    //     nome: true
    //   }
    // })

    // return deleteMaterial;
    try {
      const deleteMaterial = await prismaClient.material.delete({
        where: {
          id: material_id,
        },
        select: {
          nome: true,
        },
      });

      return deleteMaterial;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
  }
}

export { DeleteMaterialService };
