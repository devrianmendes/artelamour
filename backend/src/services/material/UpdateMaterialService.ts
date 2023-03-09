import { prismaClient } from "../../prisma";

interface UpdateMaterial{
  material_id: string,
  nome: string,
  desc: string,
  qtdCusto: string,
  unMedCusto: string,
  custo: string
}

class UpdateMaterialService{
  async execute({nome, desc, qtdCusto, unMedCusto, custo, material_id}: UpdateMaterial) {
    const updateMaterial = await prismaClient.material.update({
      where: {
        id: material_id
      },
      data: {
        nome: nome,
        desc: desc,
        quantidadeCusto: qtdCusto,
        unidadeMedidaCusto: unMedCusto,
        custo: custo
      }
    })
    return updateMaterial;
  }
}

export {UpdateMaterialService}