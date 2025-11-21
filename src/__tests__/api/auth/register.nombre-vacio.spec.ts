// =========================================
// P6 - Nombre faltante o vacío
// Archivo: src/__tests__/api/auth/register.nombre-vacio.spec.ts
// =========================================
import { POST as PostNombreVacio } from '@/app/api/auth/register/route';

describe('POST /api/auth/register — nombre faltante o vacío', () => {
  it('devuelve 400 si name está vacío', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana5@example.com',
        password: 'S3gura!23',
        name: '',
        termsAccepted: true,
      }),
    });

    const res = await PostNombreVacio(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.errors?.fieldErrors?.name).toBeDefined();
  });

  it('devuelve 400 si name falta', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana6@example.com',
        password: 'S3gura!23',
        // name omitido
        termsAccepted: true,
      }),
    });

    const res = await PostNombreVacio(req);
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.errors?.fieldErrors?.name).toBeDefined();
  });
});