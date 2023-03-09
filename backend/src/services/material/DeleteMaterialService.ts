import { prismaClient } from "../../prisma";

interface DeleteMaterial{
  material_id: string
}

class DeleteMaterialService{
  async execute({material_id}: DeleteMaterial) {
    const deleteMaterial = await prismaClient.material.delete({
      where: {
        id: material_id
      },
      select: {
        nome: true
      }
    })
    
    return deleteMaterial;
  }
}

export { DeleteMaterialService }