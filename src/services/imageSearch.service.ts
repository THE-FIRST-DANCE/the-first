import { ImageListType } from '@/types/StoryType';
import axios from 'axios';

export default async function getImages(
  query: string
): Promise<ImageListType[]> {
  try {
    const res = await axios.get(
      `/naver/v1/search/image?query=${query}&display=20&start=1&sort=sim`,
      {
        headers: {
          'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_SECRET,
        },
      }
    );
    return res.data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
}
