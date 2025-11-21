// =========================================
// P1 - Registro válido
// Archivo: src/__tests__/api/auth/register.spec.ts
// =========================================
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

import { POST } from '@/app/api/auth/register/route';

describe('POST /api/auth/register', () => {
  it('registra usuario válido y devuelve 201 + userId + Location', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana@example.com',
        password: 'S3gura!23',
        name: 'Ana',
        termsAccepted: true,
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);

    const body = await res.json();
    expect(body.userId).toMatch(UUID_REGEX);
    expect(body.email).toBe('ana@example.com');
    expect(res.headers.get('Location')).toBe(`/api/users/${body.userId}`);
  });
});
