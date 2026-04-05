import { useTranslation } from 'react-i18next';
import { ABOUT_VALUE_ICONS } from './utils/images';
import { PLACEHOLDER_IMAGES } from './utils/constants';

function AboutHero({
  title,
  subtitle,
  imageUrl,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <section className="relative md:h-101.5 w-full overflow-hidden">
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-16">
        <div className="flex max-w-3xl flex-col items-center gap-3 text-center text-white">
          <h1 className="text-3xl md:text-h1">{title}</h1>
          <p className="text-body-small md:text-h5 text-white/85">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  iconSrc,
  title,
  description,
}: {
  iconSrc: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-start rounded-2xl bg-white px-4 py-5 text-left md:px-5 md:py-6">
      <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-start" aria-hidden>
        <img src={iconSrc} alt="" className="h-12 w-12 object-contain object-left" />
      </div>
      <h3 className="mb-2 w-full text-left text-body-large-bold text-gray-80">{title}</h3>
      <p className="m-0 w-full text-left text-text-muted text-body-medium">{description}</p>
    </div>
  );
}

function ProcessCard({
  imageUrl,
  imageAlt,
  title,
  description,
}: {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
}) {
  return (
    <article className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white">
      <div className="aspect-4/3 w-full overflow-hidden">
        <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-col items-center gap-2 px-4 py-3 text-center md:px-6">
        <h3 className="m-0 text-h6-bold">{title}</h3>
        <p className="m-0 max-w-sm text-body-large">{description}</p>
      </div>
    </article>
  );
}

function AboutUsPage() {
  const { t } = useTranslation();

  // TODO: Replace this mock array with backend-provided data.
  // The only requirement for `ProcessCard` is: `imageUrl`, `imageAlt`, `title`, `description`.
  const processItems = [
    {
      id: 'crafted',
      imageUrl: PLACEHOLDER_IMAGES.processCrafted,
      imageAlt: t('aboutPage.imgProcessCraftedAlt'),
      title: t('aboutPage.processCraftedTitle'),
      description: t('aboutPage.processCraftedDescription'),
    },
    {
      id: 'delivered',
      imageUrl: PLACEHOLDER_IMAGES.processDelivered,
      imageAlt: t('aboutPage.imgProcessDeliveredAlt'),
      title: t('aboutPage.processDeliveredTitle'),
      description: t('aboutPage.processDeliveredDescription'),
    },
    {
      id: 'enjoy',
      imageUrl: PLACEHOLDER_IMAGES.processEnjoy,
      imageAlt: t('aboutPage.imgProcessEnjoyAlt'),
      title: t('aboutPage.processEnjoyTitle'),
      description: t('aboutPage.processEnjoyDescription'),
    },
  ];

  return (
    <main className="w-full bg-primary-bg">
      <AboutHero
        title={t('aboutPage.heroTitle')}
        subtitle={t('aboutPage.heroSubtitle')}
        imageUrl={PLACEHOLDER_IMAGES.heroVegetables}
        imageAlt={t('aboutPage.imgHeroAlt')}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-10">
        <section className="flex flex-col  gap-10 lg:flex-row  lg:gap-10 xl:gap-12">
          <div className="flex flex-col justify-between gap-8 lg:w-[61%] lg:flex-none">
            <div>
              <h2 className="mb-4 text-h4-small text-primary md:text-h5-bold lg:text-h4-bold">
                {t('aboutPage.welcomeTitle')}
              </h2>
              <p className="m-0 text-body-large text-gray-80 md:text-h4">
                {t('aboutPage.welcomeBody')}
              </p>
            </div>
            <div>
              <h2 className="mb-6 font-sans text-h4-bold text-primary md:text-h5-bold">
                {t('aboutPage.valuesHeading')}
              </h2>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-start lg:flex-nowrap">
                <ValueCard
                  iconSrc={ABOUT_VALUE_ICONS.quality}
                  title={t('aboutPage.valueQualityTitle')}
                  description={t('aboutPage.valueQualityDescription')}
                />
                <ValueCard
                  iconSrc={ABOUT_VALUE_ICONS.customer}
                  title={t('aboutPage.valueSatisfactionTitle')}
                  description={t('aboutPage.valueSatisfactionDescription')}
                />
                <ValueCard
                  iconSrc={ABOUT_VALUE_ICONS.health}
                  title={t('aboutPage.valueHealthTitle')}
                  description={t('aboutPage.valueHealthDescription')}
                />
              </div>
            </div>
          </div>
          <div className="h-full w-full lg:w-[39%] lg:flex-none lg:max-w-140">
            <img
              src={PLACEHOLDER_IMAGES.chefKitchen}
              alt={t('aboutPage.imgChefAlt')}
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </section>
      </div>

      <section className="bg-primary-bg pb-14 pt-10 md:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10">
          <h3 className="mb-10 text-start font-sans text-h4-bold text-primary md:mb-12 md:text-h5-bold lg:text-h4-bold">
            {t('aboutPage.processHeading')}
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
            {processItems.map(item => (
              <ProcessCard
                key={item.id}
                imageUrl={item.imageUrl}
                imageAlt={item.imageAlt}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutUsPage;
