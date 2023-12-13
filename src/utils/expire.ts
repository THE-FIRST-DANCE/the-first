export function setWithExpiry(key: string, value: any, ttl = 3600) {
  const item = {
    value: value,
    expiry: Date.now() + ttl,
  };

  sessionStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key: string) {
  const itemStr = sessionStorage.getItem(key);

  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  if (Date.now() > item.expiry) {
    sessionStorage.removeItem(key);
    return null;
  }
  return item.value;
}
