import VI_TRANS from '../lang/vi';
import EN_TRANS from '../lang/en';

export const locales = {
  vi: 'Vietnamese',
  en: 'English',
};
export const useTrans = (locale: keyof typeof locales) => {
  switch (locale) {
    case 'vi':
      return VI_TRANS;
    case 'en':
      return EN_TRANS;
    default:
  }
};
