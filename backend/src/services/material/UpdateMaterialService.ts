import { prismaClient } from "../../prisma";

interface UpdateMaterial {
  material_id: string;
  nome: string;
  desc: string;
  qtdCusto: string;
  tipoMedida: string;
  unMedCusto: string;
  custo: string;
}

class UpdateMaterialService {
  async execute({
    nome,
    desc,
    qtdCusto,
    unMedCusto,
    tipoMedida,
    custo,
    material_id,
  }: UpdateMaterial) {
    try {
      const updateMaterial = await prismaClient.material.update({
        where: {
          id: material_id,
        },
        data: {
          nome: nome,
          desc: desc,
          quantidadeCusto: qtdCusto,
          unidadeMedidaCusto: unMedCusto,
          custo: custo,
          tipoMedida: tipoMedida,
        },
      });
      return updateMaterial;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
    // const updateMaterial = await prismaClient.material.update({
    //   where: {
    //     id: material_id,
    //   },
    //   data: {
    //     nome: nome,
    //     desc: desc,
    //     quantidadeCusto: qtdCusto,
    //     unidadeMedidaCusto: unMedCusto,
    //     custo: custo,
    //     tipoMedida: tipoMedida,
    //   },
    // });
    // return updateMaterial;
  }
}

export { UpdateMaterialService };
