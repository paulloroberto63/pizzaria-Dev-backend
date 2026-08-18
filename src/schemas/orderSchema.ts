import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        table: z.number({ message: "A mesa é obrigatória" }).int({ message: "A mesa deve ser um número inteiro" }).positive({ message: "A mesa deve ser um número positivo" }),
        name: z.string().min(1, { message: "O nome do cliente é obrigatório" }).optional()
    })
});

export const addItemSchema = z.object({
    body: z.object({
        order_id: z.string().min(1, { message: "O id do pedido é obrigatório" }),
        product_id: z.string().min(1, { message: "O id do produto é obrigatório" }),
        amount: z.number({ message: "A quantidade é obrigatória" }).int({ message: "A quantidade deve ser um número inteiro" }).positive({ message: "A quantidade deve ser um número positivo" })
    })
});

export const sendOrderSchema = z.object({
    body: z.object({
        order_id: z.string().min(1, { message: "O id do pedido precisa ser uma string" }),
        name: z.string().min(1, { message: "O nome precisa ser um texto" })
    })
});

export const finishOrderSchema = z.object({
    body: z.object({
        order_id: z.string().min(1, { message: "O id do pedido é obrigatório" })
    })
});

export const DeleteOrderSchema = z.object({
    query: z.object({
        order_id: z.string().min(1, { message: "O id do pedido é obrigatório" })
    })
});