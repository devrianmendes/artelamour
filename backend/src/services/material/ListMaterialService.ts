import { prismaClient } from "../../prisma";

interface ListMaterial {
  user: string
}

class ListMaterialService {
  async execute({user}: ListMaterial) {
    // const listMaterial = await prismaClient.material.findMany({});
    // return listMaterial;

    const listMaterial = await prismaClient.material.findMany({
      where: {
        user: user
      }
    });
    return listMaterial;
  }
}

export {ListMaterialService}