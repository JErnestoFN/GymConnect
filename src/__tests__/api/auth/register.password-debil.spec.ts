// =========================================
// P3 - Contraseña débil
// Archivo: src/__tests__/api/auth/register.password-debil.spec.ts
// =========================================
import { POST as PostPasswordDebil } from '@/app/api/auth/register/route';

describe('POST /api/auth/register — contraseña débil', () => {
  it('devuelve 400 si no cumple la política (falta mayúscula o símbolo)', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana3@example.com',
        password: 'password1', // sin mayúscula ni símbolo
        name: 'Ana',
        termsAccepted: true,
      }),
    });

    const res = await PostPasswordDebil(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.errors?.fieldErrors?.password).toBeDefined();
  });
});
