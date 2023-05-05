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
    });
    
    await prismaClient.pecaMateriais.deleteMany({
      where: {
        peca_id: peca_id
      }
    });

    return deletePeca;
  }
}

export {DeletePecaService}