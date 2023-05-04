import { prismaClient } from "../../prisma";

interface CreateMaterial{
  nome: string,
  desc: string,
  qtdCusto: string,
  unMedCusto: string,
  custo: string
  user: string
}

class CreateMaterialService {
  async execute({nome, desc, qtdCusto, unMedCusto, custo, user}: CreateMaterial) {
    const createMaterial = await prismaClient.material.create({
      data: {
        nome: nome,
        desc: desc,
        quantidadeCusto: qtdCusto,
        unidadeMedidaCusto: unMedCusto,
        custo: custo,
        user: user
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