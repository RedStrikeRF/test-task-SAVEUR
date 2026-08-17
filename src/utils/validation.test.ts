import { describe, expect, it } from 'vitest';
import { validatePhone } from './validation';

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
});
