import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import { MOCK_VITAMINS } from '~/data/mockVitamins';
import { VITAMIN_PAGE_HERO_IMAGE } from './utils/constants';

function VitaminsHero({
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
      <div className="absolute inset-0 bg-black/40" aria-hidden />
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-16">
        <div className="flex max-w-3xl flex-col items-center gap-3 text-center text-white">
          <h1 className="text-3xl md:text-h1">{title}</h1>
          <p className="text-body-small md:text-h5 text-white/90">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

function VitaminPlanCard({
  imageUrl,
  imageAlt,
  title,
  description,
  price,
  ctaLabel,
  onCta,
}: {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  price: string;
  ctaLabel: string;
  onCta: () => void;
}) {
  return (
    <article className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl bg-white">
      <div className="aspect-4/3 w-full overflow-hidden rounded-t-2xl bg-primary">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="relative z-0 flex flex-1 flex-col items-center gap-2 px-4 py-5 text-center md:px-6 md:py-6">
        <h3 className="m-0 text-primary font-sans font-extrabold text-h5-bold md:text-lg lg:text-xl uppercase">
          {title}
        </h3>
        <p className="m-0 max-w-sm flex-1 text-h6 text-gray-80">{description}</p>
        <p className="m-0 mt-1 text-primary font-semibold text-body-small md:text-body-medium">{price}</p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus-within:opacity-60"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <Button
          type="button"
          variant="secondary"
          size="large"
          tone="light"
          title={ctaLabel}
          className="pointer-events-auto text-sm md:text-base"
          onClick={e => {
            e.stopPropagation();
            onCta();
          }}
        />
      </div>
    </article>
  );
}

function VitaminsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sortedItems = useMemo(() => [...MOCK_VITAMINS].sort((a, b) => a.id - b.id), []);

  const goToDetail = (id: number) => {
    navigate(`/vitamins/${id}`);
  };

  return (
    <main className="w-full bg-primary-bg">
      <VitaminsHero
        title={t('vitaminPage.heroTitle')}
        subtitle={t('vitaminPage.heroSubtitle')}
        imageUrl={VITAMIN_PAGE_HERO_IMAGE}
        imageAlt={t('vitaminPage.imgHeroAlt')}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-10">
        <p className="mx-auto mb-12 max-w-4xl text-center text-body-large text-gray-80 md:mb-14 md:text-h4">
          {t('vitaminPage.intro')}
        </p>

        <section>
          <h2 className="mb-8 text-left text-h6-small text-primary md:mb-10 md:text-h5-bold lg:text-h4-bold">
            {t('vitaminPage.sectionHeading')}
          </h2>

          {sortedItems.length === 0 ? (
            <p className="text-center text-body-medium text-gray-80">{t('vitaminPage.empty')}</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
              {sortedItems.map(item => (
                <VitaminPlanCard
                  key={item.id}
                  imageUrl={item.image}
                  imageAlt={item.title}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  ctaLabel={t('vitamins.seeMore')}
                  onCta={() => goToDetail(item.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default VitaminsPage;
