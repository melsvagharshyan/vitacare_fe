import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { clsx } from 'clsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../button';
import type { BannerItem } from '../../app/banner/bannerApi';

const MOCK_BANNERS: BannerItem[] = [
  {
    id: 1,
    image: 'https://solgar.co.uk/cdn/shop/files/Subscribe_and_save.jpg?v=1730724221&width=3200',
    isActive: true,
    order: 0,
    createdAt: '',
    updatedAt: '',
    title: 'ԱՌՈՂՋՈՒԹՅՈՒՆԸ՝ ՊԱՐԴԱԳԵՎ',
    buttonText: 'ՏԵՍՆԵԼ ՎԻՏԱՄԻՆՆԵՐԸ',
    buttonColor: '#1a1a1a',
    buttonBg: '#ffffff',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa36f1?w=1920&q=80',
    isActive: true,
    order: 1,
    createdAt: '',
    updatedAt: '',
    title: 'Գիտականորեն հիմնավորած առողջություն',
    buttonText: 'Դիտել պլանները',
    buttonColor: '#ffffff',
    buttonBg: '#c45c26',
  },
];

function Banner() {
  const sliderRef = useRef<Slider | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sortedBanners = [...MOCK_BANNERS].sort((a, b) => a.order - b.order);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    afterChange: (index: number) => setActiveIndex(index),
  };

  return (
    <section className="relative w-full min-h-[clamp(400px,39.17vw,752px)] overflow-hidden bg-primary-bg">
      <Slider ref={sliderRef} {...settings}>
        {sortedBanners.map(banner => (
          <div
            key={banner.id}
            className="relative flex w-full min-h-[clamp(400px,39.17vw,752px)] p-[clamp(40px,6.25vw,120px)]"
          >
            <img
              src={banner.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex w-full flex-col items-center text-center gap-[clamp(24px,2.71vw,52px)]">
                <h1 className="text-h1 uppercase text-white text-center text-[clamp(1.75rem,6vw,5rem)] sm:leading-[clamp(26px,3.33vw,64px)]">
                  {banner.title}
                </h1>
                <Button
                  buttonBg={banner.buttonBg}
                  buttonColor={banner.buttonColor}
                  variant="banner"
                  className={clsx()}
                  size="large"
                  title={banner.buttonText}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="pointer-events-auto absolute inset-x-0 bottom-[clamp(24px,3vw,40px)] z-10 flex items-center justify-center gap-2">
        {sortedBanners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={
              `h-3 w-3 rounded-full transition-all duration-200 cursor-pointer ` +
              (activeIndex === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/60')
            }
            aria-label={`Անցնել սլայդ ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;
