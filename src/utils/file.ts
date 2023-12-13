import { corsProxyAxios } from '@axios';

export async function convertURLtoFile(url: string) {
  const res = await corsProxyAxios.get(`/${url}`, {
    responseType: 'blob',
  });
  const data = res.data;
  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
}
