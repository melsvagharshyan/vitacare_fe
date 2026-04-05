import charlesKeith from './images/charles-&-keith.png';
import loccitane from './images/loccitane.png';
import mango from './images/mango.png';
import oysho from './images/oysho.png';
import pullBear from './images/pull-&_bear.png';

export type PartnerImage = {
  id: number;
  src: string;
};

export const PARTNER_IMAGES: PartnerImage[] = [
  { id: 1, src: loccitane },
  { id: 2, src: pullBear },
  { id: 3, src: oysho },
  { id: 4, src: charlesKeith },
  { id: 5, src: mango },
];
