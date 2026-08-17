import { BookingFormData, BookingFormErrors } from '@/types/booking';

export const TIME_SLOTS: string[] = Array.from({ length: 11 }, (_, i) => {
  const hour = 12 + i;
  return `${String(hour).padStart(2, '0')}:00`;
});

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 12;

function todayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validateName(value: string): string | null {
  if (value.trim().length < 2) {
    return 'Введите имя (минимум 2 символа)';
  }
  return null;
}

// приводит имя к виду "Иван Иванов" — каждое слово с большой буквы,
// остальные буквы строчные, лишние пробелы убираются
export function formatName(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// разрешаем только цифры, пробелы, скобки и дефисы (+ в начале) —
// никаких букв и прочего мусора, чтобы не проходили строки вроде "abc89261234567"
const PHONE_ALLOWED_CHARS_REGEX = /^\+?[\d\s()-]+$/;

// строго "+7" (с плюсом) или "8" (без плюса) — бывший "+8" или голый "7"
// без плюса не подходят, хотя цифры после кода те же самые
const PHONE_FORMAT_REGEX = /^(\+7\d{10}|8\d{10})$/;

export function validatePhone(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed || !PHONE_ALLOWED_CHARS_REGEX.test(trimmed)) {
    return 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
  }

  // убираем только форматирующие символы, "+" в начале не трогаем
  const normalized = trimmed.replace(/[\s()-]/g, '');

  if (!PHONE_FORMAT_REGEX.test(normalized)) {
    return 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
  }

  return null;
}

export function validateDate(value: string): string | null {
  if (!value) {
    return 'Выберите дату';
  }
  if (value < todayISODate()) {
    return 'Дата не может быть раньше сегодняшней';
  }
  return null;
}

export function validateTime(value: string): string | null {
  if (!TIME_SLOTS.includes(value)) {
    return 'Выберите время';
  }
  return null;
}

export function validateGuests(value: number): string | null {
  if (!Number.isInteger(value) || value < MIN_GUESTS || value > MAX_GUESTS) {
    return `Количество гостей от ${MIN_GUESTS} до ${MAX_GUESTS}`;
  }
  return null;
}

export function validateBookingForm(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  const dateError = validateDate(data.date);
  if (dateError) errors.date = dateError;

  const timeError = validateTime(data.time);
  if (timeError) errors.time = timeError;

  const guestsError = validateGuests(data.guests);
  if (guestsError) errors.guests = guestsError;

  return errors;
}
