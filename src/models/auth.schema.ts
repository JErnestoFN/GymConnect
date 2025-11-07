import { z } from 'zod';
import { validatePassword } from '@/models/passwordPolicy';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().superRefine((val, ctx) => {
    const errs = validatePassword(val);
    if (errs.length) {
      // Adjuntamos todos los mensajes al campo 'password'
      errs.forEach((m) => ctx.addIssue({ code: z.ZodIssueCode.custom, message: m }));
    }
  }),
  name: z.string().min(1, 'El nombre es obligatorio'),
  termsAccepted: z.literal(true),
});
export type RegisterDTO = z.infer<typeof registerSchema>;

