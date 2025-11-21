// =========================================
// P8 - Normalización de entradas en la respuesta
// Archivo: src/__tests__/api/auth/register.normalizacion.spec.ts
// =========================================
import { POST as PostNormalizacion } from '@/app/api/auth/register/route';

describe('POST /api/auth/register — normalización de entradas', () => {
  it('devuelve el email en minúsculas y el nombre sin espacios extra', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: '   Ana.Normalizada@Example.com  ',
        password: 'S3gura!23',
        name: '   Ana   López   ',
        termsAccepted: true,
      }),
    });

    const res = await PostNormalizacion(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.email).toBe('ana.normalizada@example.com');
    // aquí asumimos que el esquema o el servicio normaliza el nombre
    expect(body.name).toBe('Ana López');
  });
});