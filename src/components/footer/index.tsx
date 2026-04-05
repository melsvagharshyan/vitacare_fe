import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import logoGreen from '~/assets/images/logo-green.webp';
import { MAIN_LINKS, REPORTS_LINKS } from './utils/constants';
import { MOCK_HOME_DATA } from '~/data/mockHomeData';
import { socialIconByKey } from '~/data/socialIcons';

import {
  formatEmailHref,
  formatPhoneDisplay,
  formatPhoneHref,
  getWeekRangeLabel,
} from '../../utils/helpers';

const footerContact = {
  phoneHref: formatPhoneHref(MOCK_HOME_DATA.phone),
  phoneDisplay: formatPhoneDisplay(MOCK_HOME_DATA.phone),
  emailHref: formatEmailHref(MOCK_HOME_DATA.email),
  email: MOCK_HOME_DATA.email,
};

const Footer = () => {
  const { t } = useTranslation();

  const workingHours = useMemo(() => {
    const { weekStart, weekEnd, workStartTime, workEndTime } = MOCK_HOME_DATA;
    if (!weekStart || !weekEnd || !workStartTime || !workEndTime) {
      return null;
    }

    return {
      label: getWeekRangeLabel(weekStart, weekEnd, t),
      timeRange: `${workStartTime} - ${workEndTime}`,
    };
  }, [t]);

  const socialLinks = MOCK_HOME_DATA.links;

  return (
    <footer className="w-full">
      <div className="flex flex-col gap-8 bg-primary px-4 sm:px-[clamp(16px,12.5vw,240px)] pt-[clamp(32px,3.65vw,56px)] pb-[clamp(32px,3.65vw,56px)] text-body-large tracking-[0] text-white sm:flex-row sm:flex-nowrap sm:justify-between sm:gap-6 md:gap-8">
        {/* Logo (last on mobile, first on tablet+) */}
        <div className="flex shrink-0 flex-col order-last sm:order-first">
          <img src={logoGreen} alt="Vital" className="h-20 brightness-0 invert" />
        </div>

        {/* Main Navigation */}
        <nav className="flex shrink-0 flex-col gap-3" aria-label="Main navigation">
          <span className="text-sm leading-5 text-white/90 sm:text-base sm:leading-6 lg:text-xl lg:leading-7">
            {t('footer.main')}
          </span>

          <ul className="flex flex-col gap-2">
            {MAIN_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm leading-5 transition-opacity hover:opacity-90 sm:text-base sm:leading-6 lg:text-xl lg:leading-7"
                >
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Reports / Legal */}
        <nav className="flex shrink-0 flex-col gap-3" aria-label="Reports and legal">
          <span className="text-sm leading-5 text-white/90 sm:text-base sm:leading-6 lg:text-xl lg:leading-7">
            {t('footer.reports')}
          </span>

          <ul className="flex flex-col gap-2">
            {REPORTS_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm leading-5 transition-opacity hover:opacity-90 sm:text-base sm:leading-6 lg:text-xl lg:leading-7"
                >
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + Social */}
        <div className="flex shrink-0 flex-col gap-3">
          <div className="flex flex-col gap-2 text-sm leading-5 sm:text-base sm:leading-6 lg:text-xl lg:leading-7">
            {footerContact.phoneHref && (
              <a href={footerContact.phoneHref} className="transition-opacity hover:opacity-90">
                {footerContact.phoneDisplay}
              </a>
            )}

            {footerContact.emailHref && (
              <a href={footerContact.emailHref} className="transition-opacity hover:opacity-90">
                {footerContact.email}
              </a>
            )}

            {workingHours && (
              <span>
                {workingHours.label} {workingHours.timeRange}
              </span>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3" aria-label="Social links">
              {socialLinks.map(({ key, label, url }, index) => {
                const Icon = socialIconByKey[key];
                if (!Icon) return null;
                return (
                  <a
                    key={`${label}-${index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex text-white transition-opacity hover:opacity-90"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
