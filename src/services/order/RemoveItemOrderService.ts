import prismaClient from "../../prisma";

interface RemoveItemOrderServiceProps {
    item_id: string;
}

class RemoveItemOrderService {
    async execute({ item_id }: RemoveItemOrderServiceProps) {
        const itemExists = await prismaClient.item.findFirst({
            where: {
                id: item_id,
            },
        });

        if (!itemExists) {
            throw new Error("Item não encontrado");
        }

        const deletedItem = await prismaClient.item.delete({
            where: {
                id: item_id,
            },
            select: {
                id: true,
                amount: true,
                order_id: true,
                product_id: true,
            },
        });

        return deletedItem;
    }
}

export { RemoveItemOrderService };
