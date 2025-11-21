import { z } from 'zod';
import { validatePassword } from '@/models/passwordPolicy';
import { normalizeEmail, normalizeName } from '@/models/normalizers';

export const registerSchema = z
  .object({
    email: z
      .string()
      .transform(normalizeEmail)
      .pipe(z.string().email('Formato de correo inválido')),
    password: z.string().superRefine((val, ctx) => {
      const messages = validatePassword(val);
      for (const message of messages) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message });
      }
    }),
    name: z
      .string()
      .transform(normalizeName)
      .pipe(z.string().min(1, 'El nombre es obligatorio')),
    termsAccepted: z.literal(true, {
      errorMap: () => ({
        message: 'Debes aceptar los términos y condiciones',
      }),
    }),
  })
  .strict({ message: 'Se enviaron campos no permitidos' });

export type RegisterDTO = z.infer<typeof registerSchema>;
