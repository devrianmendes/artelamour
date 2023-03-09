import { prismaClient } from "../../prisma";

interface DeletePecaMateriais {
  id: string
}

class DeletePecaMateriaisService {
  async execute ({id}: DeletePecaMateriais) {
    const deletePecaMateriais = await prismaClient.pecaMateriais.delete({
      where: {
        id: id
      }
    })
    return deletePecaMateriais;
  }
}

export {DeletePecaMateriaisService};