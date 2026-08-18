import prismaClient from "../../prisma";

interface DeleteProductServiceProps {
    product_Id: string;
}

class DeleteProductService {
    async execute({product_Id}: DeleteProductServiceProps) {
        try {
          await prismaClient.product.update({
            where: {
                id: product_Id
            },
            data: {
                disabled: true
            }
          })

          return { message: "Produto deletado/ desativado com sucesso!" };
        } catch (error) {
            throw new Error("Erro ao deletar produto: " + error);
    }
}
}

export { DeleteProductService }