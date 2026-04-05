import { useTranslation } from 'react-i18next';
import Button from '../button';
import { WE_HANDLE_ICONS } from './utils/images';
import { useMediaQuery } from 'react-responsive';

function WeHandle() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const services = [
    {
      id: 'seasonal-menu',
      title: t('weHandle.services.seasonalMenu'),
      icon: WE_HANDLE_ICONS.seasonalMenu,
    },
    {
      id: 'cooking',
      title: t('weHandle.services.cooking'),
      icon: WE_HANDLE_ICONS.cooking,
    },
    {
      id: 'delivery',
      title: t('weHandle.services.delivery'),
      icon: WE_HANDLE_ICONS.delivery,
    },
  ];

  return (
    <section className="w-full bg-primary-bg overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-330 flex-col items-center justify-center gap-6 md:gap-12 pb-10 md:py-16 px-4 md:px-30">
        <h2 className="relative z-10 w-full text-left text-primary font-extrabold text-2xl md:text-4xl lg:text-h2 leading-tight md:leading-15 tracking-normal wrap-break-word">
          {t('weHandle.title')}
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full">
          {services.map(service => (
            <div key={service.id} className="flex flex-col items-center w-full md:w-auto gap-6">
              <div className="w-full md:w-auto h-50 md:h-auto rounded-3xl md:rounded-3xl overflow-hidden flex justify-center">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>

              <h3 className="text-base sm:text-lg text-h5-bold text-center">{service.title}</h3>
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center md:justify-end">
          <Button
            variant="primary"
            size={isMobile ? 'small' : 'large'}
            tone="green"
            title={t('weHandle.learnMore')}
          />
        </div>
      </div>
    </section>
  );
}

export default WeHandle;
