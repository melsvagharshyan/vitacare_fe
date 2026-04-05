import { CODE_LENGTH } from './constants';

// Represents the in-memory state of the OTP digits.
export type DigitArray = string[];

export const createEmptyCode = (length: number = CODE_LENGTH): DigitArray => Array(length).fill('');

export const normalizeDigitInput = (raw: string): string | null => {
  if (!raw) return '';

  const value = raw.slice(-1);
  const isDigit = /^\d$/.test(value);

  if (!isDigit) return null;
  return value;
};

/**
 * Updates a specific digit position in the OTP array immutably.
 */
export const updateDigitAtIndex = (
  digits: DigitArray,
  index: number,
  value: string
): DigitArray => {
  const next = [...digits];
  next[index] = value;
  return next;
};

/**
 * Returns true when all digits are non-empty and length matches the code length.
 * This is deliberately strict to avoid accidental partial submissions.
 */
export const isCodeComplete = (digits: DigitArray, length: number = CODE_LENGTH): boolean => {
  if (digits.length !== length) return false;
  return digits.every(d => d !== '');
};

/**
 * Sanitizes arbitrary pasted text into a numeric-only OTP substring.
 * - Strips non-digits.
 * - Truncates to configured code length.
 */
export const sanitizePastedCode = (raw: string, length: number = CODE_LENGTH): string =>
  raw.replace(/\D/g, '').slice(0, length);

/**
 * Applies a pasted numeric string onto an existing digit array immutably.
 * Existing digits beyond the pasted length are preserved.
 */
export const applyPastedCodeToDigits = (digits: DigitArray, pasted: string): DigitArray => {
  const next = [...digits];
  pasted.split('').forEach((char, i) => {
    if (i < next.length) {
      next[i] = char;
    }
  });
  return next;
};

/**
 * Calculates which index we should focus after a paste event finishes.
 * We cap at the last field to avoid focusing out of range.
 */
export const getNextFocusIndexAfterPaste = (
  pastedLength: number,
  length: number = CODE_LENGTH
): number => Math.min(pastedLength, length - 1);
