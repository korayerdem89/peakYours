export interface ZodiacSign {
  id: string;
  name: string;
  date: string;
  icon: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'zodiac.aries', date: 'March 21 - April 19', icon: '♈' },
  { id: 'taurus', name: 'zodiac.taurus', date: 'April 20 - May 20', icon: '♉' },
];
