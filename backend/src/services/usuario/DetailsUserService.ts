import { prismaClient } from "../../prisma";

class DetailsUserService {
  async execute({user_id}) {
    const detailUser = prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        apelido: true,
        email: true,
      }
    })
    return detailUser;
  }
}

export { DetailsUserService }