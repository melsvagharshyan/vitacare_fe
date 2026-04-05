import { useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Button from '../../components/button';
import { filterOptions, type CategoryFilter } from './utils/constants';

const PLACEHOLDER_IMAGES = {
  hero: 'https://res.cloudinary.com/djkggpmjy/image/upload/v1772610956/learn-more-background_poxcjj.png',
  article:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ZJMkpJoYOJPyV728KwCNcxw3x6MNR3qg2w&s',
} as const;

type ArticleItem = {
  id: number;
  category: Exclude<CategoryFilter, 'all'>;
  title: string;
  excerpt: string;
  publishDate: string;
  imageUrl: string;
  imageAlt: string;
};

function BlogHero({
  title,
  subtitle,
  imageUrl,
  searchPlaceholder,
  searchValue,
  onSearchChange,
}: {
  title: string;
  subtitle: string;
  imageUrl: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <section className="relative md:h-101.5 w-full overflow-hidden">
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-16">
        <div className="flex w-full max-w-3xl flex-col items-center gap-3 text-center text-white">
          <h1 className="text-3xl md:text-h1">{title}</h1>
          <p className="text-body-small md:text-h5 text-white/85">{subtitle}</p>
          <div className="relative mt-2 w-full max-w-md">
            <input
              type="text"
              value={searchValue}
              onChange={event => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-11 w-full rounded-full bg-white/18 px-4 pr-11 text-white placeholder:text-white/70 outline-none focus:border-white/70"
              aria-label={searchPlaceholder}
            />
            <FiSearch className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border border-[#B3B3B3] px-6 py-3 text-body-medium cursor-pointer transition-colors ${
        active
          ? 'border-primary bg-primary text-white'
          : 'border-gray-20 hover:border-primary hover:text-primary'
      }`}
    >
      {label}
    </button>
  );
}

function BlogCard({ article }: { article: ArticleItem }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white">
      <div className="aspect-16/10 w-full overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="space-y-2 px-3 py-5">
        <p className="text-body-small text-[#808080]">{article.category}</p>
        <h3 className="m-0 text-h6-bold text-gray-80">{article.title}</h3>
        <p className="m-0 line-clamp-2 text-body-medium text-text-muted">{article.excerpt}</p>
        <p className="mt-3 text-body-small text-text-muted">{article.publishDate}</p>
      </div>
    </article>
  );
}

function BlogNewsPage() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  // TODO: Replace this mock data with backend response.
  const articleItems = useMemo<ArticleItem[]>(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        id: index + 1,
        category: (['healthTips', 'recipes', 'nutrition'] as const)[index % 3],
        title: t('blogPage.cardTitle'),
        excerpt: t('blogPage.cardExcerpt'),
        publishDate: t('blogPage.publishDate'),
        imageUrl: PLACEHOLDER_IMAGES.article,
        imageAlt: t('blogPage.cardImageAlt'),
      })),
    [t]
  );

  const displayedArticles = articleItems
    .filter(item => (activeFilter === 'all' ? true : item.category === activeFilter))
    .filter(item => {
      if (!searchQuery.trim()) {
        return true;
      }

      const query = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(query) || item.excerpt.toLowerCase().includes(query);
    });

  const visibleArticles = displayedArticles.slice(0, visibleCount);
  const hasMore = visibleCount < displayedArticles.length;

  return (
    <main className="w-full bg-primary-bg">
      <BlogHero
        title={t('blogPage.heroTitle')}
        subtitle={t('blogPage.heroSubtitle')}
        imageUrl={PLACEHOLDER_IMAGES.hero}
        searchPlaceholder={t('blogPage.searchPlaceholder')}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="mx-auto w-full pt-10 max-w-7xl px-4 py-6 md:px-8 md:py-10 md:pt-17 lg:px-10">
        <div className="mb-6 -mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {filterOptions.map(option => (
            <CategoryChip
              key={option.id}
              active={activeFilter === option.id}
              label={t(option.label)}
              onClick={() => {
                setActiveFilter(option.id);
                setVisibleCount(6);
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map(article => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

        {visibleArticles.length === 0 ? (
          <p className="py-12 text-center text-body-large text-text-muted">
            {t('blogPage.noResults')}
          </p>
        ) : null}

        {hasMore ? (
          <div className="flex justify-center pt-8">
            <Button
              type="button"
              variant="secondary"
              tone="green"
              title={t('blogPage.loadMore')}
              onClick={() => setVisibleCount(prev => prev + 3)}
            />
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default BlogNewsPage;
