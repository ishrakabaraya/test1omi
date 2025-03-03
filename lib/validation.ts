import { z } from "zod";

const visibilitySchema = z.enum(['public', 'private']);

export const formSchema = z.object({
    type: z.enum(['public', 'private']),
    payment: z.string().min(2).max(5),
    rounds: z.string().min(1).max(1),
});
