import prismaClient from "../../prisma";

interface CreateOrderServiceProps {
    table: number;
    name?: string;
}

class CreateOrderService {
    async execute({ table, name }: CreateOrderServiceProps) {
        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name ?? null,
            },
            select: {
                id: true,
                table: true,
                status: true,
                draft: true,
                name: true,
                createdAt: true,
            }
        });

        return order;
    }
}

export { CreateOrderService };