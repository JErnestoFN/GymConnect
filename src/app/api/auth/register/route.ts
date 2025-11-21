import { registerSchema } from '@/models/auth.schema';
import { ZodError } from 'zod';
import { AuthService } from '@/services/auth.service';

type HttpErrorBody =
  | { errors: unknown }
  | { code: 'EMAIL_TAKEN' }
  | { error: 'internal_error' };

function mapDomainErrorToHttp(err: unknown): { status: number; body: HttpErrorBody } {
  if (err instanceof ZodError) {
    const flattened = err.flatten();
    const extraFields = err.issues
      .filter((issue) => issue.code === 'unrecognized_keys')
      .flatMap((issue) => issue.keys ?? []);
    const errors =
      extraFields.length > 0 ? { ...flattened, extraFields } : flattened;
    return { status: 400, body: { errors } };
  }

  if (typeof err === 'object' && err !== null && 'code' in err) {
    const code = (err as { code?: unknown }).code;
    if (code === 'EMAIL_TAKEN' || code === 'P2002') {
      return { status: 409, body: { code: 'EMAIL_TAKEN' } };
    }
  }

  return { status: 500, body: { error: 'internal_error' } };
}

export async function POST(req: Request) {
  try {
    const raw: unknown = await req.json();
    const dto = registerSchema.parse(raw);
    const result: Awaited<ReturnType<typeof AuthService.register>> =
      await AuthService.register(dto);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const responseBody: { userId: string; email: string; name: string } = {
      userId: result.id,
      email: result.email,
      name: dto.name,
    };

    const init: ResponseInit = {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Location': `/api/users/${result.id}`,
      },
    };

    return new Response(JSON.stringify(responseBody), init);
  } catch (error: unknown) {
    const mapped = mapDomainErrorToHttp(error);
    return new Response(JSON.stringify(mapped.body), {
      status: mapped.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

