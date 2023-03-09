import { prismaClient } from "../../prisma";

class ListMaterialService {
  async execute() {
    const listMaterial = await prismaClient.material.findMany({});
    return listMaterial;
  }
}

export {ListMaterialService}