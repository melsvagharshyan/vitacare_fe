import Button from '../button';

function NewsPromo() {
  return (
    <section className="flex w-full items-center justify-center bg-primary-bg px-4 py-12 md:py-16 lg:py-20">
      <div
        className="
          relative flex w-full max-w-6xl flex-col items-center justify-between gap-8
          overflow-hidden rounded-4xl bg-primary-bg px-6 py-8 sm:px-10 sm:py-10
          lg:flex-row lg:px-14 lg:py-8
          h-76.75 md:h-auto 
          bg-cover bg-center bg-no-repeat
        "
        style={{
          backgroundImage: `url(https://solgar.co.uk/cdn/shop/collections/vegan_collection_banner.webp?v=1706790414)`,
        }}
      >
        <div className="relative z-10 flex-1 space-y-4 text-start lg:text-left md:text-left">
          <h2 className="text-h6-small md:text-h4-bold leading-snug text-white max-w-xl mx-auto lg:mx-0">
            Օգտագործեք ձեր ընկերության կոդը՝ 10% զեղչ առաջին պատվերի համար
          </h2>

          <div className="pt-4 flex justify-start md:justify-center lg:justify-start">
            <Button variant="primary" size="small" tone="green" title="ԻՄԱՑԵՔ ԱՎԵԼԻՆ" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsPromo;
