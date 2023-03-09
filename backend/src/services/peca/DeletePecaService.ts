import { prismaClient } from "../../prisma";

interface DeletePeca{
  peca_id: string
}

class DeletePecaService{
  async execute({peca_id}: DeletePeca) {
    const deletePeca = await prismaClient.peca.delete({
      where: {
        id: peca_id
      },
      select: {
        nome: true,
        desc: true  
      }
    })
    return deletePeca;
  }
}

export {DeletePecaService}