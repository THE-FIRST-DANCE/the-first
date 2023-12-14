import { getAccessToken } from '@utils/auth';
import OriginAxios from 'axios';

export const baseAxios = OriginAxios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

// cors: 웹 페이지가 다른 도메인의 리소스에 접근할 수 있도록하는 메커니즘
export const corsProxyAxios = OriginAxios.create({
  baseURL: import.meta.env.VITE_API_CORS_ANYWHERE,
});

export const thumbsnapAxios = OriginAxios.create({
  baseURL: `${
    import.meta.env.VITE_API_CORS_ANYWHERE
  }/https://thumbsnap.com/api`,
  transformRequest: [
    (data) => {
      const newData = new FormData();

      Object.keys(data).forEach((key) => {
        newData.append(key, data[key]);
      });

      newData.append('key', import.meta.env.VITE_APP_THUMBSNAP_KEY);

      return newData;
    },
  ],
});
