import { z } from "zod"

export const createUserSchema = z.object({
    body: z.object({
        name: z
        .string({ message: "O nome precisa ser um texto"})
        .min(3, { message: "o nome precisa ter no minimo 3 letras"}),
        email: z.email({ message: "Precisa ser um email valido"}),
        password: z.string({ message: "A senha é obrigatoria"}).min(6, { message: "A senha deve ter no minimo 6 caracteres"})
    }),
});

export const authUserSchema = z.object({
    query: z.object({
        disabled: z.enum(["true", "false"], {
            message: "O parametro disabled deve ser 'true' ou 'false'"
        })
        .optional()
        .default("false")
        .transform((value) => value === "true")
    })
})