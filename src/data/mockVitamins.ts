import type { VitaminItem } from '../app/vitamins/vitaminsApi';

export const MOCK_VITAMINS: VitaminItem[] = [
  {
    id: 1,
    image:
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now00474/v/27.jpg',
    title: 'BIOTIN',
    description:
      'Բիոտինը կարևոր է մազերի, մաշկի և եղունգների առողջության համար: Օգնում է էներգիայի արտադրության գործընթացները և աջակցում նյութափոխանակությանը:',
    price: '9 900 ֏',
  },
  {
    id: 2,
    image:
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/sol/sol03317/v/84.jpg',
    title: 'D3',
    description:
      'Վիտամին D3-ն անհրաժեշտ է ոսկրերի և ատամների առողջության համար, ամրացնում է իմունիտետը և նպաստում սրտանոթային համակարգի գործունեությանը:',
    price: '9 900 ֏',
  },
  {
    id: 3,
    image:
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ntl/ntl06672/v/76.jpg',
    title: 'B12',
    description:
      'Վիտամին B12-ն աջակցում է նյարդային համակարգի առողջությանը, կարմիր արյան բջիջների արտադրությանը և էներգիայի մակարդակի բարձրացմանը:',
    price: '7 500 ֏',
  },
];

export function getVitaminById(id: string | undefined): VitaminItem | undefined {
  if (id === undefined || id === '') return undefined;
  const n = Number(id);
  if (!Number.isFinite(n)) return undefined;
  return MOCK_VITAMINS.find(item => item.id === n);
}
