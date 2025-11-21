import { randomUUID } from 'crypto';
import type { RegisterDTO } from '@/models/auth.schema';
import { VerificationService } from '@/services/verification.service';

export class AuthService {
  static async register(
    data: RegisterDTO,
  ): Promise<{ id: string; email: string }> {
    // Aquí luego integraremos Prisma/bcrypt.
    const id = randomUUID();

    await VerificationService.requestVerification({
      userId: id,
      email: data.email,
    });

    return { id, email: data.email };
  }
}

