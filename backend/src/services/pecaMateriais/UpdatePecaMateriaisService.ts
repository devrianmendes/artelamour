import {prismaClient} from '../../prisma';

interface UpdatePecaMateriais {
  id: string,
  qtdMatUsado: string,
  unMedidaUsado: string
}

class UpdatePecaMateriaisService {
  async execute ({id, qtdMatUsado, unMedidaUsado}: UpdatePecaMateriais) {
    const updatePecaMateriais = await prismaClient.pecaMateriais.update({
      where: {
        id: id
      },
      data: {
        qtdMatUsado: qtdMatUsado,
        unMedidaUsado: unMedidaUsado 
      }
    })
    return updatePecaMateriais;
  }
}

export {UpdatePecaMateriaisService}