import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PARTNER_IMAGES } from './utils/images';

import arrowLeft from './utils/images/arrow-left.svg';
import arrowRight from './utils/images/arrow-right.svg';

function PartnersPrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      absolute left-2 md:-left-12 lg:-left-16
      top-1/2 -translate-y-1/2 z-10
      p-3
      rounded-full
      bg-primary-bg hover:bg-primary-bg-hover
      transition-colors
      flex items-center justify-center cursor-pointer
    "
      aria-label="Նախորդ"
    >
      <img src={arrowLeft} alt="" className="w-6 h-6" />
    </button>
  );
}

function PartnersNextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      absolute right-2 md:-right-12 lg:-right-16
      top-1/2 -translate-y-1/2 z-10
      p-3
      rounded-full
      bg-primary-bg hover:bg-primary-bg-hover
      transition-colors
      flex items-center justify-center cursor-pointer
    "
      aria-label="Հաջորդ"
    >
      <img src={arrowRight} alt="" className="w-6 h-6" />
    </button>
  );
}

function Partners() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // ✅ mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="flex w-full items-center justify-center bg-white pt-16 pb-16 px-4 md:px-16 lg:px-60 overflow-x-hidden">
      <div className="flex w-full flex-col items-center justify-center gap-8 md:gap-12 max-w-7xl">
        <div className="w-full max-w-6xl relative md:-ml-28">
          <h2 className="relative z-10 text-primary font-extrabold text-2xl md:text-4xl lg:text-h2 leading-tight md:leading-15 tracking-normal wrap-break-word">
            Գործընկերներ
          </h2>
        </div>

        {PARTNER_IMAGES.length > 0 ? (
          <div className="relative w-full max-w-6xl flex items-center">
            <Slider
              {...settings}
              prevArrow={<PartnersPrevArrow />}
              nextArrow={<PartnersNextArrow />}
              className="w-full"
            >
              {PARTNER_IMAGES.map(({ id, src }) => (
                <div key={id} className="px-2 md:px-4">
                  <div className="flex items-center justify-center h-24 md:h-32">
                    <img
                      src={src}
                      alt={`Գործընկեր ${id}`}
                      className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="w-full max-w-6xl px-12 md:px-16">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <div className="flex-1 text-center text-gray-400 text-sm md:text-base">
                Գործընկերների պատկերները կավելացվեն այստեղ
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Partners;
