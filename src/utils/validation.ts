export function validateName(value: string): string | null {
  if (value.trim().length < 2) {
    return 'Введите имя (минимум 2 символа)';
  }
  return null;
}

export function validatePhone(value: string): string | null {
  // раньше был regex /^(\+7|8)\d{10}$/, но он не пропускал номера
  // с пробелами/скобками/дефисами — поэтому сначала чистим строку до цифр
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return null;
  }
  return 'Введите номер в формате +7XXXXXXXXXX';
}

export function validateDate(value: string): string | null {
  if (!value) {
    return 'Выберите дату';
  }
  return null;
}

export const TIME_SLOTS = [
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

export function validateTime(value: string): string | null {
  if (!TIME_SLOTS.includes(value)) {
    return 'Выберите время';
  }
  return null;
}

export function validateGuests(value: number): string | null {
  if (!Number.isInteger(value) || value < 1 || value > 12) {
    return 'Количество гостей от 1 до 12';
  }
  return null;
}
