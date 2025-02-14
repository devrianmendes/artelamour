import { prismaClient } from "../../prisma";

interface ListPecasMateriais {
  peca_id: string;
}

class ListPecaMateriaisService {
  async execute({ peca_id }: ListPecasMateriais) {
    try {
      const listPecaMateriais = await prismaClient.pecaMateriais.findMany({
        where: {
          peca_id: peca_id,
        },
        select: {
          id: true,
          qtdMatUsado: true,
          unMedidaUsado: true,
          material: {
            select: {
              nome: true,
              desc: true,
              quantidadeCusto: true,
              unidadeMedidaCusto: true,
              custo: true,
              tipoMedida: true,
            },
          },
        },
      });
      return listPecaMateriais;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Erro na conexão com o banco de dados. " + err.message);
      } else {
        throw new Error("Erro genérico.");
      }
    }
    // const listPecaMateriais = await prismaClient.pecaMateriais.findMany({
    //   where: {
    //     peca_id: peca_id,
    //   },
    //   select: {
    //     id: true,
    //     qtdMatUsado: true,
    //     unMedidaUsado: true,
    //     material: {
    //       select: {
    //         nome: true,
    //         desc: true,
    //         quantidadeCusto: true,
    //         unidadeMedidaCusto: true,
    //         custo: true,
    //         tipoMedida: true,
    //       },
    //     },
    //   },
    // });
    // return listPecaMateriais;
  }
}

export { ListPecaMateriaisService };
