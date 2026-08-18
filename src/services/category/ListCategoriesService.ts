import prismaClient from "../../prisma";

class ListCategoriesService {
    async execute() {
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return categories;
    }
}

export { ListCategoriesService };
