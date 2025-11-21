// =========================================
// P7 - Email normalizado antes de llamar al servicio (case-insensitive)
// Archivo: src/__tests__/api/auth/register.case-insensitive.spec.ts
// =========================================
jest.mock('@/services/auth.service', () => ({
  AuthService: {
    register: jest.fn().mockResolvedValue({
      id: '11111111-1111-1111-1111-111111111111',
      email: 'ana.case@example.com',
    }),
  },
}));

import { POST as PostCaseInsensitive } from '@/app/api/auth/register/route';
import { AuthService as AuthServiceCase } from '@/services/auth.service';

describe('POST /api/auth/register — email case-insensitive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('normaliza el email a minúsculas antes de registrar', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: '  Ana.CASE@Example.COM  ',
        password: 'S3gura!23',
        name: 'Ana',
        termsAccepted: true,
      }),
    });

    const res = await PostCaseInsensitive(req);
    expect(res.status).toBe(201);

    expect(AuthServiceCase.register).toHaveBeenCalledTimes(1);
    const callArg = (AuthServiceCase.register as jest.Mock).mock.calls[0][0];
    expect(callArg.email).toBe('ana.case@example.com');
  });
});