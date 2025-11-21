// =========================================
// P10 - Evento de verificación solicitado
// Archivo: src/__tests__/api/auth/register.evento-verificacion.spec.ts
// =========================================
jest.mock('@/services/verification.service', () => ({
  VerificationService: {
    requestVerification: jest.fn().mockResolvedValue(true),
  },
}));

import { POST as PostEventoVerificacion } from '@/app/api/auth/register/route';
import { VerificationService } from '@/services/verification.service';

describe('POST /api/auth/register — evento de verificación', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('emite USER_VERIFICATION_REQUESTED exactamente una vez con el userId correcto', async () => {
    const req = new Request('http://test/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: 'ana10@example.com',
        password: 'S3gura!23',
        name: 'Ana',
        termsAccepted: true,
      }),
    });

    const res = await PostEventoVerificacion(req);
    expect(res.status).toBe(201);

    const body = await res.json();

    expect(VerificationService.requestVerification).toHaveBeenCalledTimes(1);
    expect(VerificationService.requestVerification).toHaveBeenCalledWith({
      userId: body.userId,
      email: body.email,
    });
  });
});