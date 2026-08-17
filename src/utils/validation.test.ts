import { describe, expect, it } from 'vitest';
import { formatName, validatePhone } from './validation';

describe('validatePhone', () => {
  it('accepts +7XXXXXXXXXX format', () => {
    expect(validatePhone('+79261234567')).toBeNull();
  });

  it('accepts 8XXXXXXXXXX format', () => {
    expect(validatePhone('89261234567')).toBeNull();
  });

  it('accepts formatted numbers with spaces, dashes and parentheses', () => {
    expect(validatePhone('+7 (926) 123-45-67')).toBeNull();
  });

  it('rejects numbers with wrong length', () => {
    expect(validatePhone('+7926123456')).not.toBeNull();
  });

  it('rejects numbers not starting with 7 or 8', () => {
    expect(validatePhone('+19261234567')).not.toBeNull();
  });

  it('rejects empty input', () => {
    expect(validatePhone('')).not.toBeNull();
  });

  it('rejects letters mixed into the number', () => {
    expect(validatePhone('abc89261234567')).not.toBeNull();
  });

  it('rejects a plus sign that is not at the start', () => {
    expect(validatePhone('89+261234567')).not.toBeNull();
  });

  it('rejects a bare 7-number without the plus sign', () => {
    expect(validatePhone('79227515352')).not.toBeNull();
  });

  it('rejects +8 (plus sign is only valid with 7)', () => {
    expect(validatePhone('+89261234567')).not.toBeNull();
  });
});

describe('formatName', () => {
  it('capitalizes each word', () => {
    expect(formatName('иван иванов')).toBe('Иван Иванов');
  });

  it('lowercases the rest of the letters', () => {
    expect(formatName('ИВАН ИВАНОВ')).toBe('Иван Иванов');
  });

  it('collapses extra spaces', () => {
    expect(formatName('  иван   иванов  ')).toBe('Иван Иванов');
  });
});
