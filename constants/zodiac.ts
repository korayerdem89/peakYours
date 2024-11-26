export interface ZodiacSign {
  id: string;
  name: string;
  date: string;
  icon: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'zodiac.aries', date: 'March 21 - April 19', icon: '♈' },
  { id: 'taurus', name: 'zodiac.taurus', date: 'April 20 - May 20', icon: '♉' },
  { id: 'gemini', name: 'zodiac.gemini', date: 'May 21 - June 20', icon: '♊' },
  { id: 'cancer', name: 'zodiac.cancer', date: 'June 21 - July 22', icon: '♋' },
  { id: 'leo', name: 'zodiac.leo', date: 'July 23 - August 22', icon: '♌' },
  { id: 'virgo', name: 'zodiac.virgo', date: 'August 23 - September 22', icon: '♍' },
  { id: 'libra', name: 'zodiac.libra', date: 'September 23 - October 22', icon: '♎' },
  { id: 'scorpio', name: 'zodiac.scorpio', date: 'October 23 - November 21', icon: '♏' },
  { id: 'sagittarius', name: 'zodiac.sagittarius', date: 'November 22 - December 21', icon: '♐' },
  { id: 'capricorn', name: 'zodiac.capricorn', date: 'December 22 - January 19', icon: '♑' },
  { id: 'aquarius', name: 'zodiac.aquarius', date: 'January 20 - February 18', icon: '♒' },
  { id: 'pisces', name: 'zodiac.pisces', date: 'February 19 - March 20', icon: '♓' },
];
