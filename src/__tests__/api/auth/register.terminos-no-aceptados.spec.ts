// =========================================
// P5 - Términos no aceptados
// Archivo: src/__tests__/api/auth/register.terminos-no-aceptados.spec.ts
// =========================================
import { POST as PostTerminos } from '@/app/api/auth/register/route';

describe('POST /api/auth/register — términos no aceptados', () => {
  it('devuelve 400 si termsAccepted no es true', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana4@example.com',
        password: 'S3gura!23',
        name: 'Ana',
        termsAccepted: false, // no aceptados
      }),
    });

    const res = await PostTerminos(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.errors?.fieldErrors?.termsAccepted).toBeDefined();
  });
});