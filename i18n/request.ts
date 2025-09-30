// next-intl request config
// This function is called at runtime and must return an object containing a `locale` string.
// We infer the locale from the request pathname (e.g. /de/..., /en/...), and fall back to 'de'.
const SUPPORTED_LOCALES = ['de', 'en'];

export default function getRequestConfig(request: Request) {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(Boolean);
    const candidate = segments[0];
    const locale = SUPPORTED_LOCALES.includes(candidate as string) ? candidate : 'de';
    return { locale };
  } catch (err) {
    // On any error, fall back to default locale
    return { locale: 'de' };
  }
}
