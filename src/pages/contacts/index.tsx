import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
import TextareaInput from '../../components/textarea-input';
import ContactMap from './components/contact-map';
import { CONTACT_ICONS } from './utils/images';
import { contactFormSchema, type ContactFormValues } from './utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';

const PLACEHOLDER_IMAGES = {
  hero: 'https://res.cloudinary.com/djkggpmjy/image/upload/v1772610956/learn-more-background_poxcjj.png',
} as const;

function ContactHero({
  title,
  subtitle,
  imageUrl,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaLabel: string;
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
        <div className="flex max-w-3xl flex-col items-center gap-3 text-center text-white">
          <h1 className="text-3xl md:text-h1">{title}</h1>
          <p className="text-body-small md:text-h5 text-white/85">{subtitle}</p>
          <a href="tel:+1234567890">
            <Button
              type="button"
              title={ctaLabel}
              tone="light"
              icon={<img src={CONTACT_ICONS.phoneBtn} alt="" className="h-4 w-4 object-contain" />}
              iconPosition="start"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactInfoCard({
  title,
  lineOne,
  lineTwo,
  iconSrc,
}: {
  title: string;
  lineOne: string;
  lineTwo: string;
  iconSrc: string;
}) {
  return (
    <article className="rounded-2xl bg-white p-6 text-center">
      <img src={iconSrc} alt="" className="mx-auto mb-4 h-12 w-12 object-contain" />
      <h3 className="mb-2 text-h6-bold text-gray-80">{title}</h3>
      <p className="m-0 text-body-large text-gray-80">{lineOne}</p>
      <p className="m-0 mt-1 text-body-medium text-text-muted">{lineTwo}</p>
    </article>
  );
}

function ContactsPage() {
  const { t } = useTranslation();
  const methods = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contact form submitted:', data);
    methods.reset();
  };
  // TODO: Replace this mock array with backend response data.
  const contactItems = [
    {
      id: 'phone',
      title: t('contactPage.callTitle'),
      lineOne: t('contactPage.callLineOne'),
      lineTwo: t('contactPage.callLineTwo'),
      iconSrc: CONTACT_ICONS.phone,
    },
    {
      id: 'email',
      title: t('contactPage.emailTitle'),
      lineOne: t('contactPage.emailLineOne'),
      lineTwo: t('contactPage.emailLineTwo'),
      iconSrc: CONTACT_ICONS.email,
    },
    {
      id: 'location',
      title: t('contactPage.visitTitle'),
      lineOne: t('contactPage.visitLineOne'),
      lineTwo: t('contactPage.visitLineTwo'),
      iconSrc: CONTACT_ICONS.location,
    },
  ];

  return (
    <main className="w-full bg-primary-bg">
      <ContactHero
        title={t('contactPage.heroTitle')}
        subtitle={t('contactPage.heroSubtitle')}
        imageUrl={PLACEHOLDER_IMAGES.hero}
        ctaLabel={t('contactPage.heroCta')}
      />

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-3 md:px-8 md:py-8 lg:px-10">
        {contactItems.map(item => (
          <ContactInfoCard
            key={item.id}
            title={item.title}
            lineOne={item.lineOne}
            lineTwo={item.lineTwo}
            iconSrc={item.iconSrc}
          />
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8 md:pb-16 lg:px-10">
        <h2 className="mb-5 text-h4-bold text-primary md:text-h5-bold">
          {t('contactPage.formTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <form className="space-y-3" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <TextInput
              name="name"
              control={methods.control}
              type="text"
              placeholder={t('contactPage.formName')}
            />
            <TextInput
              name="email"
              control={methods.control}
              type="email"
              placeholder={t('contactPage.formEmail')}
            />
            <TextInput
              name="subject"
              control={methods.control}
              type="text"
              placeholder={t('contactPage.formSubject')}
            />
            <TextareaInput
              name="message"
              control={methods.control}
              rows={6}
              placeholder={t('contactPage.formMessage')}
            />

            <Button
              type="submit"
              variant="primary"
              title={t('contactPage.formButton')}
              size="large"
              tone="green"
              className="w-full"
            />
          </form>
          <ContactMap title={t('contactPage.mapAlt')} lat={40.186077} lng={44.515075} zoom={18} />
        </div>
      </section>
    </main>
  );
}

export default ContactsPage;
