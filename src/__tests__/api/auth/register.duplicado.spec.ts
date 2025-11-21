// =========================================
// P2 - Correo duplicado
// Archivo: src/__tests__/api/auth/register.duplicado.spec.ts
// =========================================
jest.mock('@/services/auth.service', () => ({
  AuthService: {
    register: jest.fn().mockRejectedValue({ code: 'EMAIL_TAKEN' }),
  },
}));

import { POST as PostDuplicado } from '@/app/api/auth/register/route';
import { AuthService } from '@/services/auth.service';

describe('POST /api/auth/register — email duplicado', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    const res = await PostDuplicado(req);

    expect(AuthService.register).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(409);

    const body = await res.json();
    expect(body.code).toBe('EMAIL_TAKEN');
  });
});