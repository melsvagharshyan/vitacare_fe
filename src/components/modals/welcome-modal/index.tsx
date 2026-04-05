import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import closeIcon from '~/assets/icons/close-icon.svg';
import Button from '../../button';
import { emailSchema } from './utils/validation';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  onContinueWithEmail?: (email: string) => void;
  isSubmitting?: boolean;
}

const WelcomeModal = ({ open, onClose, onContinueWithEmail, isSubmitting }: WelcomeModalProps) => {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const result = emailSchema.safeParse(email.trim());
  const isValid = result.success;
  const errorMessage = !result.success ? t('modal.welcome.emailInvalid') : null;
  const showError = touched && !isValid && email.trim().length > 0;
  const isContinueDisabled = isSubmitting || !email.trim() || !isValid;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const prevOverflow = document.body.style.overflow;
      const prevPaddingRight = document.body.style.paddingRight;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPaddingRight;
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setEmail('');
      setTouched(false);
    }
  }, [open]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      className="fixed inset-0 z-100 flex items-center justify-center bg-overlay p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-100.75 rounded-2xl bg-white shadow-xl overflow-hidden pt-10 pr-6 pb-6 pl-6">
        <button
          type="button"
          onClick={onClose}
          aria-label={t('modal.close')}
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-gray-100 hover:text-slate-700"
        >
          <img src={closeIcon} alt="" className="h-5 w-5" aria-hidden />
        </button>

        <h2 id="welcome-modal-title" className="text-h5-bold text-primary mb-1">
          {t('modal.welcome.title')}
        </h2>
        <p className="text-body-medium text-slate-600 mb-6">{t('modal.welcome.subtitle')}</p>

        <label className="mb-6 block">
          <span className="mb-1.5 block text-body-small text-slate-700">
            {t('modal.welcome.emailLabel')}
          </span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={t('modal.welcome.emailPlaceholder')}
            className={`w-full border-b bg-transparent py-2 text-body-medium text-slate-800 placeholder:text-body-medium placeholder-slate-400 outline-none transition-colors ${
              showError
                ? 'border-error focus:border-error'
                : 'border-slate-200 focus:border-primary'
            }`}
            autoComplete="email"
            aria-invalid={showError}
            aria-describedby={showError ? 'email-error' : undefined}
          />
          {showError && (
            <p id="email-error" className="mt-1.5 text-body-small text-error">
              {errorMessage}
            </p>
          )}
        </label>

        <Button
          variant="primary"
          size="small"
          tone="green"
          type="button"
          isLoading={isSubmitting}
          disabled={isContinueDisabled}
          onClick={() => !isContinueDisabled && onContinueWithEmail?.(email.trim())}
          className={`w-full text-sm uppercase transition-opacity ${isContinueDisabled ? 'opacity-30 cursor-default' : ''}`}
        >
          <span>{t('modal.welcome.continue')}</span>
        </Button>

        <p className="mt-6 text-center">
          <a
            href="#"
            className="text-body-small text-slate-500 no-underline transition-colors hover:underline hover:text-slate-700"
          >
            {t('footer.privacyPolicy')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default WelcomeModal;
