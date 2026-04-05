import Button from '../button';
import { useNavigate } from 'react-router-dom';
import { splitMultiline } from './utils/helpers/splitMultiline';

const ABOUT_US_IMAGE =
  'https://solgar.co.uk/cdn/shop/products/Vegan-D3.jpg?v=1714401850&width=1500';

const ABOUT_DESCRIPTION =
  '2011 թվականից մենք օգնել ենք հազարավոր մարդկանց՝ վիտամիններով և հավելումներով ավելի լավ զգալու համար։ Մեր առաքելությունը՝ ազնիվ բանաձևեր, թափանցիկ աղբյուրներ և ձեր դուռը հասնող ռեժիմ։';

function AboutUs() {
  const navigate = useNavigate();

  const handleNavigateAboutPage = () => {
    navigate('/about-us');
  };

  return (
    <section
      className="w-full flex justify-center bg-primary-bg 
      py-8
      md:pt-12 md:pb-16   /* ✅ tablet spacing */
      lg:pt-16 lg:pb-20   /* ✅ larger tablet */
      px-4 md:px-8 lg:px-10 xl:px-10 2xl:px-60"
    >
      <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-16">
        {/* LEFT (image) */}
        <div className="order-2 xl:order-1 w-full flex justify-center md:justify-center max-md:justify-start">
          <div
            className="
            w-full 
            max-w-165 
            md:max-w-125   /* ✅ better tablet width */
            lg:max-w-120   /* ✅ larger tablet */
            overflow-hidden 
            rounded-2xl
            max-md:-translate-x-24 max-md:translate-y-8 
            md:translate-x-0 md:translate-y-0
            md:scale-95        /* ✅ slightly shrink for balance */
            lg:scale-100
            "
          >
            <img
              src={ABOUT_US_IMAGE}
              alt="Մեր մասին"
              className="w-full h-auto object-cover block"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* RIGHT (TEXT) */}
        <div className="order-1 xl:order-2 w-full flex justify-start md:justify-center xl:justify-start">
          <div
            className="
            relative flex flex-col items-start text-left 
            gap-5 md:gap-6 lg:gap-8 
            w-full 
            max-w-140 
            md:max-w-130   /* ✅ tablet readable width */
            lg:max-w-150
            "
          >
            <h2
              className="relative z-10 text-primary font-extrabold 
              text-[32px] 
              md:text-[36px]   /* ✅ smoother scaling */
              lg:text-h2 
              leading-tight md:leading-13 lg:leading-15 wrap-break-word"
            >
              Մեր մասին
            </h2>

            <h4 className="relative z-10 text-body-medium md:text-[18px] lg:text-h4 text-gray-80 m-0 wrap-break-word">
              {splitMultiline(ABOUT_DESCRIPTION).map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </h4>

            <Button
              variant="primary"
              size="small"
              tone="green"
              className="text-body-medium-bold uppercase mt-2 md:mt-3"
              title="ԻՄԱՑԵՔ ԱՎԵԼԻՆ"
              onClick={handleNavigateAboutPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
