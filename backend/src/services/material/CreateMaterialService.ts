import { prismaClient } from "../../prisma";

interface CreateMaterial{
  nome: string,
  desc: string,
  qtdCusto: string,
  unMedCusto: string,
  custo: string
}

class CreateMaterialService {
  async execute({nome, desc, qtdCusto, unMedCusto, custo}: CreateMaterial) {
    const createMaterial = await prismaClient.material.create({
      data: {
        nome: nome,
        desc: desc,
        quantidadeCusto: qtdCusto,
        unidadeMedidaCusto: unMedCusto,
        custo: custo
      },
      select: {
        nome: true,
        desc: true,
        quantidadeCusto: true,
        unidadeMedidaCusto: true,
        custo: true
      }
    })
    return createMaterial;
  }
}

export {CreateMaterialService}