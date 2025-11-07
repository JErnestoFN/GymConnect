// Simulamos (mock) que el servicio detecta duplicado y lanza un error de dominio
jest.mock('@/services/auth.service', () => ({
  AuthService: {
    register: jest.fn().mockRejectedValue({ code: 'EMAIL_TAKEN' }),
  },
}));

import { POST } from '@/app/api/auth/register/route';

describe('POST /api/auth/register — email duplicado', () => {
  it('devuelve 409 con code EMAIL_TAKEN', async () => {
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
    expect(res.status).toBe(409);

    const body = await res.json();
    expect(body.code).toBe('EMAIL_TAKEN');
  });
});

