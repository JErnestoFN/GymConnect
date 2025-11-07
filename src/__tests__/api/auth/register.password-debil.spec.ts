import { POST } from '@/app/api/auth/register/route';

describe('POST /api/auth/register — contraseña débil', () => {
  it('devuelve 400 si no cumple la política (falta mayúscula o símbolo)', async () => {
    // 'password1' tiene longitud >=8 y dígito, pero NO mayúscula y NO símbolo
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana3@example.com',
        password: 'password1',
        name: 'Ana',
        termsAccepted: true,
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    // Esperamos estructura de error de validación (ZodError flatten)
    // Puede variar según tu forma de serializar; asumimos errors.fieldErrors.password existe.
    expect(body.errors?.fieldErrors?.password).toBeDefined();
  });
});

