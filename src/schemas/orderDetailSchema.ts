import { z } from "zod";

export const detailOrderSchema = z.object({
    query: z.object({
        order_id: z.string({ message: "O id do pedido é obrigatório" }).min(1, { message: "O id do pedido não pode ser vazio" }),
    }),
});
