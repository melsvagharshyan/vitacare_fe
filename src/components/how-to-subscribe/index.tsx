import { useMediaQuery } from 'react-responsive';
import Button from '../button';
import { HOW_TO_SUBSCRIBE_IMAGES } from './utils/images';

function HowToSubscribe() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const steps = [
    {
      id: 'choose-plan',
      image: HOW_TO_SUBSCRIBE_IMAGES.step1,
      title: 'Քայլ 1 – Ընտրեք պլանը',
      description:
        'Դիտեք ընտանեկան փաթեթները, գրասենյակային համակցությունները կամ կառուցեք անհատական stack։',
    },
    {
      id: 'customize-menu',
      image: HOW_TO_SUBSCRIBE_IMAGES.step2,
      title: 'Քայլ 2 – Կարգավորեք stack-ը',
      description:
        'Սահմանեք դոզաները, ավելացրեք կամ փոխարինեք արտադրանքը և ընտրեք առաքման հաճախականությունը։',
    },
    {
      id: 'receive-enjoy',
      image: HOW_TO_SUBSCRIBE_IMAGES.step3,
      title: 'Քայլ 3 – Ստացեք և պահպանեք կայունություն',
      description:
        'Մենք փաթեթավորում և առաքում ենք ձեր գրաֆիկով։ Հիշեցումները օգնում են չբաց թողնել օրը։',
    },
  ];

  return (
    <section className="flex w-full items-center justify-center bg-primary-bg py-16 px-4 md:px-8 lg:px-10 xl:px-10 2xl:px-60">
      <div className="flex w-full flex-col items-center justify-center gap-10 max-w-300">
        <div className="flex flex-col items-start text-start gap-4 self-start md:ml-4">
          <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-h2 leading-tight tracking-normal">
            Ինչպես է աշխատում
          </h2>
          <p className="text-gray-80 text-body-large max-w-170">
            Սկսեք ձեր վիտամինների ռեժիմը երեք պարզ քայլով․ ընտրեք պլանը, կարգավորեք արտադրանքը և ստացեք առաքում ձեր
            գրաֆիկով։
          </p>
        </div>

        <div className="w-full">
          <div className="md:hidden w-full flex flex-col gap-6">
            {steps.map(step => (
              <article key={step.id} className="flex items-start gap-4">
                <div className="w-34 h-29 rounded-lg overflow-hidden shrink-0">
                  <img src={step.image} alt={step.title} className="h-full w-full object-cover" />
                </div>

                <div className="w-full text-start">
                  <h3 className="text-gray-80 text-body-small-bold leading-tight">{step.title}</h3>
                  <p className="text-gray-80 text-body-small">{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden md:grid w-full gap-8 md:grid-cols-3">
            {steps.map(step => (
              <div key={step.id} className="px-3 md:px-4">
                <article className="flex flex-col items-start gap-4">
                  <div className="w-full aspect-4/3 overflow-hidden rounded-lg">
                    <img src={step.image} alt={step.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="w-full text-center">
                    <h3 className="text-gray-80 text-h6-bold">{step.title}</h3>
                    <p className="text-gray-80 text-body-large">{step.description}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end max-w-290 w-full">
          <Button
            variant="primary"
            size={isMobile ? 'small' : 'large'}
            tone="green"
            title="Դիտել վիտամինները"
          />
        </div>
      </div>
    </section>
  );
}

export default HowToSubscribe;
