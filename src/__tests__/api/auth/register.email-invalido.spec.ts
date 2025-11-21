// =========================================
// P4 - Email inválido
// Archivo: src/__tests__/api/auth/register.email-invalido.spec.ts
// =========================================
import { POST as PostEmailInvalido } from '@/app/api/auth/register/route';

describe('POST /api/auth/register — email inválido', () => {
  it('devuelve 400 y detalle de validación en email', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana@@example..com', // formato incorrecto
        password: 'S3gura!23',
        name: 'Ana',
        termsAccepted: true,
      }),
    });

    const res = await PostEmailInvalido(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.errors?.fieldErrors?.email).toBeDefined();
  });
});