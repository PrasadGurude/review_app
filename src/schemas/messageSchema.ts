import { z } from "zod"; 

export const messageSchema = z.object({
    content:z.string().min(10,{message:"content must be of at least of 10 characters"})
})