import { prismaClient } from "../../prisma";

interface ListPecasMateriais {
  peca_id: string
}

class ListPecaMateriaisService{
  async execute({peca_id}: ListPecasMateriais) {
    const listPecaMateriais = await prismaClient.pecaMateriais.findMany({
      where: {
        peca_id: peca_id
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
            custo: true
          }
        }
      },
    });
    return listPecaMateriais;
  }
}

export {ListPecaMateriaisService}