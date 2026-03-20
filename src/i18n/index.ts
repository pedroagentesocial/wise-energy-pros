import en from './locales/en.json';
import es from './locales/es.json';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
const rawBase = import.meta.env.BASE_URL ?? '/';
const basePath = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

const dictionaries = {
	en,
	es,
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export const isLocale = (value: string): value is Locale => {
	return locales.includes(value as Locale);
};

export const getDictionary = (locale: Locale): Dictionary => {
	return dictionaries[locale];
};

export const normalizeRoute = (pathname: string): string => {
	const stripped = pathname.replace(/^\/(en|es)(?=\/|$)/, '');
	if (!stripped || stripped === '/') {
		return '/';
	}
	return stripped.startsWith('/') ? stripped : `/${stripped}`;
};

export const localizedPath = (locale: Locale, pathname: string): string => {
	const normalized = normalizeRoute(pathname);
	const localized = normalized === '/' ? `/${locale}/` : `/${locale}${normalized}`;
	if (basePath === '/') {
		return localized;
	}
	return `${basePath}${localized.replace(/^\//, '')}`;
};
