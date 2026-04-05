import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';
import vectorIcon from '~/assets/icons/vector.svg';
import { LANGUAGES } from './utils/constants';

interface LanguageSelectorProps {
  mobileVisible?: boolean;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  mobileVisible = false,
  className = '',
}) => {
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // subscribe component to i18n changes
  useTranslation();

  // Load language from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language') || 'en';
      setSelectedLang(storedLang);
      if (i18n?.changeLanguage && storedLang !== i18n.language) {
        i18n.changeLanguage(storedLang);
      }
    }
  }, []);

  // Update i18n when selected language changes
  useEffect(() => {
    if (!mounted || !i18n?.changeLanguage) return;
    i18n.changeLanguage(selectedLang);
  }, [selectedLang, mounted]);

  const changeLanguage = (lng: string) => {
    setSelectedLang(lng);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lng);
    }
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLang = mounted ? selectedLang : 'en';
  const currentLangLabel =
    LANGUAGES.find(language => language.code === currentLang)?.label ?? 'Eng';
  const visibilityClass = mobileVisible ? 'inline-flex' : 'hidden md:inline-flex';
  const dropdownPositionClass =
    'absolute right-0 top-full z-20 mt-1 w-24 rounded-md bg-white py-1 text-body-medium shadow-lg';

  const listItemClass =
    'cursor-pointer px-3 py-1 text-left text-slate-800 hover:bg-gray-50';

  return (
    <div ref={dropdownRef} className={`relative ${visibilityClass} ${className}`.trim()}>
      <button
        type="button"
        className="focus:outline-none focus:ring-0 flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-body-medium text-slate-800 transition-colors hover:bg-gray-50"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{currentLangLabel}</span>
        <img src={vectorIcon} alt="" className="h-3 w-3" />
      </button>

      {isOpen && (
        <ul className={dropdownPositionClass} role="listbox">
          {LANGUAGES.map(language => (
            <li
              key={language.code}
              role="option"
              aria-selected={language.code === currentLang}
              className={listItemClass}
              onClick={() => changeLanguage(language.code)}
            >
              {language.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
