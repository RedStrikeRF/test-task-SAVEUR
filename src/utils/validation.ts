export function validateName(value: string): string | null {
  if (value.trim().length < 2) {
    return 'Введите имя (минимум 2 символа)';
  }
  return null;
}

export function validatePhone(value: string): string | null {
  const regex = /^(\+7|8)\d{10}$/;
  if (regex.test(value)) {
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

export function validateGuests(value: number): string | null {
  if (!Number.isInteger(value) || value < 1 || value > 12) {
    return 'Количество гостей от 1 до 12';
  }
  return null;
}
