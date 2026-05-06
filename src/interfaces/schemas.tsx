import { z } from "zod";

export const schemaProduct = z.object({
    title: z.string().min(3, "Nombre inexistente").max(50),
    price: z.number().positive("No haz colocado un numero")
})

export type ProductFormData = z.infer<typeof schemaProduct>;