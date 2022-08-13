export function isInternalURL(to: string) {
  try {
    const url = new URL(to, window.location.origin);
    return url.hostname === window.location.hostname;
  } catch {
    return false;
  }
}

export function isSamePageURL(to: string) {
  try {
    const url = new URL(to, window.location.href);
    return (
      url.hostname === window.location.hostname &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search
    );
  } catch {
    return false;
  }
}

export function add(data: Record<string, unknown>, field: string, value: any) {
  if (data[field]) (data[field] as any[]).push(value);
  else data[field] = [value];
}

export function shallowEqual<T>(a: T | undefined, b: T | undefined) {
  if (!a && !b) return true;
  if (!a || !b) return false;

  for (const prop in a) {
    if (a[prop] !== b[prop]) return false;
  }
  return true;
}
