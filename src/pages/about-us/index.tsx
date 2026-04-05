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
  // TODO: Replace this mock array with backend-provided data.
  const processItems = [
    {
      id: 'crafted',
      imageUrl: PLACEHOLDER_IMAGES.processCrafted,
      imageAlt: 'Վիտամինների որակի վերահսկում',
      title: 'Մասնագետների ձևակերպում',
      description:
        'Սննդաբաններ և գործընկերներ մշակում են համակցություններ, որոնք համապատասխանում են իրական կյանքին։',
    },
    {
      id: 'delivered',
      imageUrl: PLACEHOLDER_IMAGES.processDelivered,
      imageAlt: 'Առողջության փաթեթ առաքման համար',
      title: 'Փաթեթավորում և առաքում',
      description: 'Ճիշտ փաթեթավորում և ավտոմատացված առաքում՝ հավելումները պաշտպանելու համար։',
    },
    {
      id: 'enjoy',
      imageUrl: PLACEHOLDER_IMAGES.processEnjoy,
      imageAlt: 'Անձը տանը ընդունում է վիտամիններ',
      title: 'Կառուցեք ռեժիմը',
      description: 'Կարգավորեք կրկնվող առաքումներ կամ պատվիրեք ըստ անհրաժեշտության։',
    },
  ];

  return (
    <main className="w-full bg-primary-bg">
      <AboutHero
        title="Մեր մասին"
        subtitle="Ավելի ուժեղ ամեն օր"
        imageUrl={PLACEHOLDER_IMAGES.heroVegetables}
        imageAlt="Վիտամինների և հավելումների շիշեր"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16 lg:px-10">
        <section className="flex flex-col  gap-10 lg:flex-row  lg:gap-10 xl:gap-12">
          <div className="flex flex-col justify-between gap-8 lg:w-[61%] lg:flex-none">
            <div>
              <h2 className="mb-4 text-h4-small text-primary md:text-h5-bold lg:text-h4-bold">
                Բարի գալուստ Vital
              </h2>
              <p className="m-0 text-body-large text-gray-80 md:text-h4">
                Vital-ը ստեղծվել է մեկ հարցից․ ինչպե՞ս դարձնել առողջ ապրելակերպը պարզ և վստահելի։ Մենք ընտրում ենք
                լաբորատոր ստուգված վիտամիններ, հանքային նյութեր և հավելումներ՝ զբաղված մարդկանց, ընտանիքների և
                աշխատավայրերի համար։
              </p>
            </div>
            <div>
              <h2 className="mb-6 font-sans text-h4-bold text-primary md:text-h5-bold">Մեր արժեքները</h2>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-start lg:flex-nowrap">
                <ValueCard
                  iconSrc={ABOUT_VALUE_ICONS.quality}
                  title="Մաքրություն և ուժգնություն"
                  description="Մենք համագործակցում ենք հավաստագրված արտադրողների և երրորդ կողմի փորձարկումների հետ։"
                />
                <ValueCard
                  iconSrc={ABOUT_VALUE_ICONS.customer}
                  title="Հաճախորդի խնամք"
                  description="Ձեր փորձառությունը կարևոր է։ Մեր թիմը օգնում է ընտրել ճիշտ արտադրանքը և փոփոխել պլանը։"
                />
                <ValueCard
                  iconSrc={ABOUT_VALUE_ICONS.health}
                  title="Հիմնված ապացույցների վրա"
                  description="Մենք կենտրոնանում ենք բաղադրիչների և դոզաների վրա, որոնք համապատասխանում են հետազոտություններին։"
                />
              </div>
            </div>
          </div>
          <div className="h-full w-full lg:w-[39%] lg:flex-none lg:max-w-140">
            <img
              src={PLACEHOLDER_IMAGES.chefKitchen}
              alt="Մասնագետ՝ հավելումների ձևակերպում"
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </section>
      </div>

      <section className="bg-primary-bg pb-14 pt-10 md:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10">
          <h3 className="mb-10 text-start font-sans text-h4-bold text-primary md:mb-12 md:text-h5-bold lg:text-h4-bold">
            Ձևակերպումից մինչև ձեր դարակը
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
