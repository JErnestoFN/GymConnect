// =========================================
// P9 - Campos no permitidos
// Archivo: src/__tests__/api/auth/register.campos-no-permitidos.spec.ts
// =========================================
import { POST as PostCamposNoPermitidos } from '@/app/api/auth/register/route';

describe('POST /api/auth/register — campos no permitidos', () => {
  it('devuelve 400 si se envían campos fuera del contrato (p. ej. role)', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana9@example.com',
        password: 'S3gura!23',
        name: 'Ana',
        termsAccepted: true,
        role: 'admin', // campo no permitido
      }),
    });

    const res = await PostCamposNoPermitidos(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    const jsonString = JSON.stringify(body);
    expect(jsonString).toContain('role');
  });
});