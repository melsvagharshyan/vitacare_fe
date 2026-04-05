import { NavLink } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { NAV_LINKS } from '../header/utils/constants';
import { MOCK_HOME_DATA } from '~/data/mockHomeData';
import { socialIconByKey } from '~/data/socialIcons';
import {
  formatEmailHref,
  formatPhoneDisplay,
  formatPhoneHref,
  getWeekRangeLabel,
} from '../../utils/helpers';

const burgerContact = {
  phoneHref: formatPhoneHref(MOCK_HOME_DATA.phone),
  phoneDisplay: formatPhoneDisplay(MOCK_HOME_DATA.phone),
  emailHref: formatEmailHref(MOCK_HOME_DATA.email),
  email: MOCK_HOME_DATA.email,
};

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function BurgerMenu({ isOpen, onClose }: BurgerMenuProps) {
  const workingHours = useMemo(() => {
    const { weekStart, weekEnd, workStartTime, workEndTime } = MOCK_HOME_DATA;
    if (!weekStart || !weekEnd || !workStartTime || !workEndTime) {
      return null;
    }

    return {
      label: getWeekRangeLabel(weekStart, weekEnd),
      timeRange: `${workStartTime} - ${workEndTime}`,
    };
  }, []);

  const socialLinks = MOCK_HOME_DATA.links;

  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 top-18 z-60 lg:hidden">
      <div className="h-full bg-primary-bg">
        <div className="flex h-full flex-col justify-between px-4 pt-5">
          <div className=" h-full flex flex-col justify-between">
            <nav className="flex flex-col  gap-4 text-[46px] leading-[1.05] text-text-main/80">
              <NavLink
                to="/"
                className="transition-colors text-[#999999] text-body-large-small"
                onClick={onClose}
              >
                Գլխավոր
              </NavLink>
              {NAV_LINKS.map(({ label, href }) => (
                <NavLink
                  key={href}
                  to={href}
                  className="transition-colors text-body-large-small"
                  onClick={onClose}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="-mx-6 mt-auto bg-primary px-6 py-4 text-white">
            <div className="flex flex-col gap-2 text-body-large">
              {burgerContact.phoneHref && (
                <a href={burgerContact.phoneHref} className="transition-opacity hover:opacity-90">
                  {burgerContact.phoneDisplay}
                </a>
              )}

              {burgerContact.emailHref && (
                <a href={burgerContact.emailHref} className="transition-opacity hover:opacity-90">
                  {burgerContact.email}
                </a>
              )}

              {workingHours && (
                <span>
                  {workingHours.label} {workingHours.timeRange}
                </span>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-4" aria-label="Social links">
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
                      <Icon className="h-5.75 w-5.75" aria-hidden />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
