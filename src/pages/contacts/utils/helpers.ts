export const getYandexMapUrl = (lat: number, lng: number, zoom: number) =>
  `https://yandex.com/map-widget/v1/?ll=${lng}%2C${lat}&z=${zoom}&pt=${lng},${lat}`;
