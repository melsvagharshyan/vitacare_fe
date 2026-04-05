import { getYandexMapUrl } from '../utils/helpers';

type ContactMapProps = {
  title: string;
  lat: number;
  lng: number;
  zoom?: number; // optional, default 17
};

function ContactMap({ title, lat, lng, zoom = 17 }: ContactMapProps) {
  return (
    <div className="overflow-hidden md:rounded-2xl">
      <iframe
        title={title}
        src={getYandexMapUrl(lat, lng, zoom)}
        className="h-full min-h-85 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default ContactMap;
