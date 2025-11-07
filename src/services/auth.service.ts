import { randomUUID } from 'crypto';
import type { RegisterDTO } from '@/models/auth.schema';

export class AuthService {
  static async register(data: RegisterDTO) {
    // Aquí luego integraremos Prisma/bcrypt.
    const id = randomUUID();
    return { id, email: data.email };
  }
}

