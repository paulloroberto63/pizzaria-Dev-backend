import { z } from "zod";

export const productSchema = z.object({
    body: z.object({
        name: z.string().min(1, {message: "O nome do produto é obrigatório"}),
        price: z.number().min(1, {message: "O preço do produto é obrigatório"}),
        description: z.string().min(1, {message: "A descrição do produto é obrigatória"}),
        category_id: z.string().min(1, {message: "O id da categoria é obrigatório"})
    })
});

export const listProductsSchema = z.object({
    query: z.object({
        disabled: z.enum(["true", "false"]).optional().default("false").transform((value) => value === "true")
    })
});

export const listProductsByCategorySchema = z.object({
    query: z.object({
        category_id: z.string().min(1, { message: "O id da categoria é obrigatório" })
    })
});