const dictionaries = {
  ar: () => import('../../dictionaries/ar.json').then((module) => module.default),
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  tr: () => import('../../dictionaries/tr.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'ar' | 'en' | 'tr') => {
  return dictionaries[locale]();
};