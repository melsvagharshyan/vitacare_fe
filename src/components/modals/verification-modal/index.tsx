import { useTranslation } from 'react-i18next';
import { Fragment, useEffect, useRef, useState, useCallback } from 'react';
import closeIcon from '~/assets/icons/close-icon.svg';
import arrowBackIcon from '~/assets/icons/arrow-back.svg';
import { useVerifyOtpMutation } from '../../../app/auth/authApi';
import { CODE_LENGTH, VERIFICATION_DASH_INDEX } from './utils/constants';
import type { DigitArray } from './utils/helpers';
import {
  applyPastedCodeToDigits,
  createEmptyCode,
  getNextFocusIndexAfterPaste,
  isCodeComplete,
  normalizeDigitInput,
  sanitizePastedCode,
  updateDigitAtIndex,
} from './utils/helpers';

interface VerificationModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
  onGoBack: () => void;
}

const VerificationModal = ({ open, email, onClose, onGoBack }: VerificationModalProps) => {
  const { t } = useTranslation();

  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Local OTP state; kept as an array so each digit is independently focusable/editable.
  const [digits, setDigits] = useState<DigitArray>(() => createEmptyCode());

  // Prevents re-submitting the same code when effects re-run.
  const lastSubmittedCodeRef = useRef<string | null>(null);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  /**
   * Triggers the verification call for a completed OTP code.
   * This is separated for readability and easy testing.
   */
  const handleVerify = useCallback(
    async (code: string) => {
      try {
        await verifyOtp({ identifier: email, code }).unwrap();
        onClose();
      } catch (error) {
        // In production, surface this to the user (toast, inline error, etc.).
        console.error('Failed to verify OTP:', error);
      }
    },
    [email, onClose, verifyOtp]
  );

  /**
   * Handles user input for a single OTP field.
   * - Normalizes raw input.
   * - Updates state immutably.
   * - Optionally advances focus when a valid digit is entered.
   */
  const setDigit = useCallback((index: number, rawValue: string) => {
    const normalized = normalizeDigitInput(rawValue);

    // Ignore non-numeric input without mutating state.
    if (normalized === null) return;

    setDigits(prev => updateDigitAtIndex(prev, index, normalized));

    const shouldAdvance = normalized !== '' && index < CODE_LENGTH - 1;
    if (shouldAdvance) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  /**
   * When the OTP changes while the modal is open and we're not already verifying,
   * automatically submit once all digits are filled.
   */
  useEffect(() => {
    if (!open || isVerifying) return;

    const code = digits.join('');
    const complete = isCodeComplete(digits);

    if (!complete) return;

    // Avoid duplicate submissions for the same code.
    if (lastSubmittedCodeRef.current === code) return;

    lastSubmittedCodeRef.current = code;
    void handleVerify(code);
  }, [digits, handleVerify, isVerifying, open]);

  /**
   * Modal lifecycle:
   * - Lock body scroll while open.
   * - Reset OTP input.
   * - Focus the first field.
   * - Handle global Escape key to close.
   */
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    window.addEventListener('keydown', handleEscape);

    // Reset OTP each time the modal is opened to avoid stale codes.
    setDigits(createEmptyCode());

    // Defer focus to ensure the input is rendered.
    setTimeout(() => inputRefs.current[0]?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  /**
   * Close the modal when clicking outside the content (on the overlay).
   */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  /**
   * UX for backspace:
   * - If current field is empty, move focus to previous field and clear it.
   */
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && digits[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setDigit(index - 1, '');
    }
  };

  /**
   * Allows users to paste an entire OTP at once.
   * - Sanitizes pasted text to digits only.
   * - Applies onto the current digit array.
   * - Moves focus to the last filled field.
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const raw = e.clipboardData.getData('text');
    const sanitized = sanitizePastedCode(raw);

    if (!sanitized) return;

    setDigits(prev => applyPastedCodeToDigits(prev, sanitized));

    const nextFocusIndex = getNextFocusIndexAfterPaste(sanitized.length);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="verification-modal-title"
      className="fixed inset-0 z-100 flex items-center justify-center bg-overlay p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-100.75 rounded-2xl bg-white shadow-xl overflow-auto p-6">
        {/* Back navigation */}
        <button
          type="button"
          onClick={onGoBack}
          className="absolute left-6 top-6 flex cursor-pointer items-center gap-1.5 text-primary transition-colors hover:opacity-90"
        >
          <img src={arrowBackIcon} alt="" className="h-6 w-6" aria-hidden />
          <span className="text-body-medium">{t('modal.verification.goBack')}</span>
        </button>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t('modal.close')}
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-gray-100 hover:text-slate-700"
        >
          <img src={closeIcon} alt="" className="h-5 w-5" aria-hidden />
        </button>

        <h2
          id="verification-modal-title"
          className="text-h5-bold text-primary text-left mt-10 mb-2"
        >
          {t('modal.verification.title')}
        </h2>

        <p className="text-body-medium text-slate-600 text-left mb-8">
          {t('modal.verification.instruction', { email })}
        </p>

        <div className="flex w-full justify-between items-center" onPaste={handlePaste}>
          {Array.from({ length: CODE_LENGTH }, (_, i) => (
            <Fragment key={i}>
              {i === VERIFICATION_DASH_INDEX && (
                <span className="text-body-large text-slate-600 shrink-0" aria-hidden>
                  –
                </span>
              )}
              <input
                ref={el => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digits[i]}
                onChange={e => setDigit(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-[41.83px] h-12 pt-1.5 pb-2 text-center text-body-large rounded-lg outline-none transition-colors focus:border-primary border border-border-default shrink-0"
                aria-label={t('modal.verification.digitLabel', { index: i + 1 })}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
