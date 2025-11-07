export const passwordMessages = {
  min: 'La contraseña debe tener al menos 8 caracteres',
  lower: 'Debe incluir al menos una minúscula',
  upper: 'Debe incluir al menos una mayúscula',
  digit: 'Debe incluir al menos un dígito',
  symbol: 'Debe incluir al menos un símbolo',
};

export function validatePassword(value: string) {
  const errors: string[] = [];
  if (value.length < 8) errors.push(passwordMessages.min);
  if (!/[a-z]/.test(value)) errors.push(passwordMessages.lower);
  if (!/[A-Z]/.test(value)) errors.push(passwordMessages.upper);
  if (!/\d/.test(value)) errors.push(passwordMessages.digit);
  if (!/[^A-Za-z0-9]/.test(value)) errors.push(passwordMessages.symbol);
  return errors;
}

