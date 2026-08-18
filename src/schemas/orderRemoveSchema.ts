import { z } from "zod";

export const removeItemSchema = z.object({
    query: z.object({
        item_id: z.string({ message: "O id do item é obrigatório" }).min(1, { message: "O id do item não pode ser vazio" }),
    }),
});
