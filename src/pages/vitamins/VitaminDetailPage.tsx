import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getVitaminById } from '~/data/mockVitamins';

function VitaminDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const item = getVitaminById(id);

  if (!item) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-16 md:py-24">
        <p className="text-center text-body-large text-gray-80">{t('vitamins.detailNotFound')}</p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/vitamins"
            className="text-primary font-semibold underline underline-offset-4 hover:text-primary-dark"
          >
            {t('vitamins.detailBack')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-primary-bg">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 md:py-12 lg:py-16">
        <Link
          to="/vitamins"
          className="inline-flex text-body-medium text-primary font-semibold hover:text-primary-dark mb-6 md:mb-8"
        >
          ← {t('vitamins.detailBack')}
        </Link>

        <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img src={item.image} alt={item.title} className="h-full object-cover w-80" />
          <div className="flex flex-col gap-3 px-5 py-6 md:px-8 md:py-8">
            <h1 className="m-0 text-primary font-sans font-extrabold text-2xl md:text-h3 uppercase tracking-tight">
              {item.title}
            </h1>
            <p className="m-0 text-body-large text-gray-80 md:text-h5">{item.description}</p>
            <p className="m-0 text-primary font-semibold text-h5-bold md:text-h4">{item.price}</p>
          </div>
        </article>
      </div>
    </main>
  );
}

export default VitaminDetailPage;
