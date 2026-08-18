import prismaClient from "../../prisma";

interface ListProductsServiceProps {
    disabled?: string;
}

class ListProductsService {
    async execute({ disabled }: ListProductsServiceProps) {
        try {
          const products = await prismaClient.product.findMany({
            where: {
                disabled: disabled === "true" ? true : false
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_Id: true,
                createdAt: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
          })
          return products;
        } catch (error) {
            throw new Error("Erro ao listar produtos: " + error);
    }       
}

}

export { ListProductsService }