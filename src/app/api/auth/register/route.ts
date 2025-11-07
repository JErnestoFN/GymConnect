import { registerSchema } from '@/models/auth.schema';
import { AuthService } from '@/services/auth.service';

function mapDomainErrorToHttp(err: any) {
  if (err?.name === 'ZodError') {
    return { status: 400, body: { errors: err.flatten() } };
  }
  if (err?.code === 'EMAIL_TAKEN' || err?.code === 'P2002') {
    return { status: 409, body: { code: 'EMAIL_TAKEN' } };
  }
  return { status: 500, body: { error: 'internal_error' } };
}

export async function POST(req: Request) {
  try {
    const dto = registerSchema.parse(await req.json());
    const result = await AuthService.register(dto);

    return new Response(JSON.stringify({ userId: result.id, email: result.email }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Location': `/api/users/${result.id}`,
      },
    });
  } catch (err: any) {
    const { status, body } = mapDomainErrorToHttp(err);
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}