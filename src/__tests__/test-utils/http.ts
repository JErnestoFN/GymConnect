// GymConnect/src/__tests__/test-utils/http.ts

export function jsonRequest(url: string, method: string, body: any) {
  return new Request(url, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function readJson(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`No se pudo parsear JSON: ${text}`);
  }
}

export function expectStatus(res: Response, status: number) {
  expect(res.status).toBe(status);
}

export async function expectJsonField(res: Response, fieldPath: string) {
  const json = await readJson(res);
  const parts = fieldPath.split('.');
  let current: any = json;

  for (const part of parts) {
    if (!(part in current)) {
      throw new Error(
        `El campo '${fieldPath}' no existe en la respuesta: ${JSON.stringify(json, null, 2)}`
      );
    }
    current = current[part];
  }
  return current;
}
