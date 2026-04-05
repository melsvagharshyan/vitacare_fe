import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import { MOCK_SUBSCRIPTIONS } from '~/data/mockSubscriptions';
import { SUBSCRIPTION_PAGE_HERO_IMAGE } from './utils/constants';

function SubscriptionsHero({
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

function SubscriptionPlanCard({
  imageUrl,
  imageAlt,
  title,
  description,
  buttonBg,
  buttonText,
  buttonColor,
  onCta,
}: {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonBg: string;
  buttonText: string;
  buttonColor: string;
  onCta: () => void;
}) {
  return (
    <article className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white">
      <div className="aspect-4/3 w-full overflow-hidden rounded-t-2xl bg-primary">
        <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 px-4 py-5 text-center md:px-6 md:py-6">
        <h3 className="m-0 text-primary font-sans font-extrabold text-h5-bold md:text-lg lg:text-xl uppercase">
          {title}
        </h3>
        <p className="m-0 max-w-sm flex-1 text-h6 text-gray-80">{description}</p>
        <div className="mt-2 w-full">
          <Button
            type="button"
            variant="primary"
            size="small"
            tone="green"
            className="w-full"
            title={buttonText}
            buttonBg={buttonBg}
            buttonColor={buttonColor}
            onClick={onCta}
          />
        </div>
      </div>
    </article>
  );
}

function SubscriptionsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sortedSubscriptions = useMemo(
    () => [...MOCK_SUBSCRIPTIONS].filter(s => s.isActive).sort((a, b) => a.order - b.order),
    []
  );

  const goToContacts = () => {
    navigate('/contacts');
  };

  return (
    <main className="w-full bg-primary-bg">
      <SubscriptionsHero
        title={t('subscriptionPage.heroTitle')}
        subtitle={t('subscriptionPage.heroSubtitle')}
        imageUrl={SUBSCRIPTION_PAGE_HERO_IMAGE}
        imageAlt={t('subscriptionPage.imgHeroAlt')}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-10">
        <p className="mx-auto mb-12 max-w-4xl text-center text-body-large text-gray-80 md:mb-14 md:text-h4">
          {t('subscriptionPage.intro')}
        </p>

        <section>
          <h2 className="mb-8 text-left text-h6-small text-primary md:mb-10 md:text-h5-bold lg:text-h4-bold">
            {t('subscriptionPage.sectionHeading')}
          </h2>

          {sortedSubscriptions.length === 0 ? (
            <p className="text-center text-body-medium text-gray-80">
              {t('subscriptionPage.empty')}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
              {sortedSubscriptions.map(subscription => (
                <SubscriptionPlanCard
                  key={subscription.id}
                  imageUrl={subscription.image}
                  imageAlt={subscription.title}
                  title={subscription.title}
                  description={subscription.description}
                  buttonBg={subscription.buttonBg}
                  buttonText={subscription.buttonText}
                  buttonColor={subscription.buttonColor}
                  onCta={goToContacts}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default SubscriptionsPage;
