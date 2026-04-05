import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import arrowLeftIcon from './utils/icons/arrow-left.svg';
import arrowRightIcon from './utils/icons/arrow-right.svg';
import { MOCK_VITAMINS } from '~/data/mockVitamins';

function Vitamins() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sliderRef = useRef<Slider | null>(null);

  const items = [...MOCK_VITAMINS].sort((a, b) => a.id - b.id);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <section className="flex w-full items-center justify-center bg-primary py-4 md:py-16 px-4 md:px-8 lg:px-10 xl:px-10 2xl:px-60 overflow-x-hidden">
      <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-10 max-w-7xl">
        <h2 className="text-white relative z-10 self-start md:ml-4 font-extrabold text-2xl md:text-4xl lg:text-h2 leading-tight md:leading-15 tracking-normal wrap-break-word">
          {t('vitamins.title')}
        </h2>

        <div className="w-full">
          <Slider ref={sliderRef} {...settings} className="vitamins-slider">
            {items.map(item => (
              <div key={item.id} className="md:px-4 h-full">
                <div className="group relative flex items-center pt-5 h-full flex-col rounded-2xl overflow-hidden bg-white">
                  <div className="w-50 bg-primary">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full  transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col items-center text-center gap-2 p-6 md:p-4">
                    <h3 className="text-primary font-sans font-extrabold text-h5-bold  md:text-lg lg:text-xl uppercase">
                      {item.title}
                    </h3>
                    <p className="text-body-small">{item.description}</p>
                    <p className="text-primary font-semibold text-sm md:text-base text-end">
                      {item.price}
                    </p>
                  </div>

                  <div
                    className="pointer-events-none absolute inset-0 bg-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus-within:opacity-60"
                    aria-hidden
                  />

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    <Button
                      type="button"
                      variant="secondary"
                      size="large"
                      tone="light"
                      title={t('vitamins.seeMore')}
                      className="pointer-events-auto text-sm md:text-base"
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/vitamins/${item.id}`);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="md:mt-8 flex w-full items-center justify-center">
          <div className="flex w-full items-center justify-between px-3 md:px-4">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-primary  hover:bg-white/25 transition-colors cursor-pointer"
              aria-label={t('vitamins.prevAriaLabel')}
            >
              <img src={arrowLeftIcon} alt="" className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-primary  hover:bg-white/25 transition-colors cursor-pointer"
              aria-label={t('vitamins.nextAriaLabel')}
            >
              <img src={arrowRightIcon} alt="" className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vitamins;
