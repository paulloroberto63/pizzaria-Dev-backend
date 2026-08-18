import { z } from "zod"

export const CreateCategorySchema = z.object({
    body: z.object({
        name: z.string({ message: "Categoria precisa ser um texto"})
        .min(2, { message: "Nome da caregoria precisa ter 2 caracteres"})
    })
})