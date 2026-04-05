import { useCallback, useState, useEffect } from 'react';

import logoGreen from '~/assets/logos/logo-green.svg';
import burgerMenuIcon from '~/assets/icons/burger-menu.svg';
import closeBurgerIcon from '~/assets/icons/close-burger.svg';
import { NAV_LINKS } from './utils/constants';
import { useHeaderState } from './utils/use-header-scroll';
import BurgerMenu from '../burger-menu';

import { formatEmailHref, formatPhoneDisplay, formatPhoneHref } from '~/utils/helpers';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_HOME_DATA } from '~/data/mockHomeData';
import { socialIconByKey } from '~/data/socialIcons';

const headerContact = {
  phoneHref: formatPhoneHref(MOCK_HOME_DATA.phone),
  phoneDisplay: formatPhoneDisplay(MOCK_HOME_DATA.phone),
  emailHref: formatEmailHref(MOCK_HOME_DATA.email),
  email: MOCK_HOME_DATA.email,
};

const headerSocialLinks = MOCK_HOME_DATA.links;

function Header() {
  const { showTopBar, headerHeight, fixedHeaderContentRef } = useHeaderState();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu when the user navigates (in-page route change).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset drawer on pathname change
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [navigate]);

  return (
    <>
      <div style={{ height: `${headerHeight}px` }} aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-50 w-full bg-white">
        <div ref={fixedHeaderContentRef} className="flex w-full flex-col">
          <div
            className={`hidden overflow-hidden transition-all duration-300 ease-in-out lg:block ${
              showTopBar ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex w-full items-center justify-between bg-primary px-4 py-4 text-body-medium text-white lg:px-30">
              <div className="flex items-center gap-4 sm:gap-6">
                {headerContact.phoneHref && (
                  <a href={headerContact.phoneHref} className="transition-opacity hover:opacity-90">
                    {headerContact.phoneDisplay}
                  </a>
                )}

                {headerContact.emailHref && (
                  <a href={headerContact.emailHref} className="transition-opacity hover:opacity-90">
                    {headerContact.email}
                  </a>
                )}
              </div>

              {headerSocialLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  {headerSocialLinks.map(({ key, label, url }, index) => {
                    const Icon = socialIconByKey[key];
                    if (!Icon) return null;
                    return (
                      <a
                        key={`${label}-${index}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white transition-opacity hover:opacity-80"
                      >
                        <Icon className="h-6 w-6" aria-hidden />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Main Header */}
          <div className="flex w-full items-center justify-between bg-white px-4 py-4 lg:px-30">
            <div className="flex min-w-0 flex-1 items-center gap-8 lg:gap-16">
              <button
                aria-label="Vital home"
                className="shrink-0 cursor-pointer"
                onClick={handleLogoClick}
                type="button"
              >
                <img src={logoGreen} alt="Vital" className="h-14 w-auto" />
              </button>

              <nav className="hidden items-center gap-14 font-medium text-slate-800 lg:flex">
                {NAV_LINKS.map(({ label, href }) => (
                  <NavLink
                    key={href}
                    to={href}
                    className="text-body-medium transition-colors hover:text-primary"
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* ✅ Burger visible for mobile + tablet */}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md lg:hidden"
              onClick={() => setMobileMenuOpen(open => !open)}
              aria-label={mobileMenuOpen ? 'Փակել մենյուն' : 'Բացել մենյուն'}
            >
              <img
                src={mobileMenuOpen ? closeBurgerIcon : burgerMenuIcon}
                alt=""
                className="h-6 w-6"
              />
            </button>
          </div>

          {/* Mobile / Tablet Fullscreen Menu */}
          <BurgerMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </div>
      </header>
    </>
  );
}

export default Header;
