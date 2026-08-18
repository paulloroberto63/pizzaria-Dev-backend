import prismaClient from "../../prisma";

interface ListProductsByCategoryServiceProps {
    category_id: string;
}

class ListProductsByCategoryService {
    async execute({ category_id }: ListProductsByCategoryServiceProps) {
        const products = await prismaClient.product.findMany({
            where: {
                category_Id: category_id,
                disabled: false,
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                disabled: true,
                category_Id: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return products;
    }
}

export { ListProductsByCategoryService };
