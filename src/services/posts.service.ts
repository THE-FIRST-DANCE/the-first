import { baseAxios, thumbsnapAxios } from '@axios';
import { Post, PostPayload, PostWithUser } from '@interfaces/post.interface';
import { createTags } from './tags.service';
// eslint-disable-next-line import/order
import { ThumbsnapData } from '@interfaces/thumbsnap.interface';

export async function createPost(payload: PostPayload) {
  if (payload.tags) createTags(payload.tags);

  const photos = await registerPhotos(payload.photos);

  await baseAxios.post('/posts', {
    ...payload,
    photos,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
}

export async function getPosts(): Promise<Post[]> {
  const res = await baseAxios.get('/posts');
  return res.data;
}

/* 🟡 post 수정 🟡 */
export async function patchPost(post: {
  id: number;
  content: string;
}): Promise<PostWithUser[]> {
  // eslint-disable-next-line prefer-template
  // const res = await axios.patch('/posts/1', '바뀐 게시글 내용');
  const res = await baseAxios.patch(`/posts/${post.id}`, post);
  return res.data;
}

/* 🔴 post 삭제 🔴 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deletePosts(postId: any): Promise<Post[]> {
  const res = await baseAxios.delete(`/posts/${postId}`);
  return res.data;
}

// 🟡 posts와 users를 관계 쿼리 : posts와 users 같이 나옴 🟡
// src / components / Main / index.tsx 에서 사용 중
export async function getPostsUsers(): Promise<PostWithUser[]> {
  // 반환하는 형은 Promise이고, 그 형태를 PostAndUser인터페이스 형식으로 맞추겠다
  const res = await baseAxios.get('/posts?_expand=user&_sort=id&_order=desc');
  return res.data;
}

// 🟡 하트 patch 🟡
// src / components / Main / MainCard.tsx 에서 사용 중
export async function patchHeart(post: {
  id: number;
  heart: boolean;
}): Promise<PostWithUser[]> {
  // eslint-disable-next-line prefer-template
  // const res = await axios.patch('/posts/1', heart);
  const res = await baseAxios.patch(`/posts/${post.id}`, post);
  return res.data;
}

export async function registerPhotos(photos: File[]) {
  const res = await Promise.all(
    photos.map((photo) =>
      thumbsnapAxios.post<ThumbsnapData>('/upload', { media: photo })
    )
  );

  return res.map((r) => r.data.data.media);
}

export async function registerPhoto(photo: File) {
  const res = await thumbsnapAxios.post<ThumbsnapData>('/upload', {
    media: photo,
  });
  return res.data.data.media;
}

// eslint-disable-next-line default-param-last
export async function getPostPaginate(page = 1, limit = 10) {
  const res = await baseAxios.get(
    `/posts?_page=${page}&_limit=${limit}&_expand=user`
  );
  return res.data;
}

export async function getPostsWithUserByUserId(userId: number) {
  const res = await baseAxios.get<PostWithUser[]>(
    `/posts?_expand=user&userId=${userId}&_sort=id&_order=desc`
  );
  return res.data;
}

/* 🟡 하트 🟡 */
// 하트 정보 get
export async function getHeartsInfo() {
  const res = await baseAxios.get('/hearts');
  return res.data;
}

// 하트 추가
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postHeartsInfo(heartInfo: any) {
  const res = await baseAxios.post('/hearts', heartInfo);
  return res.data;
}

// 하트 삭제
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteHeartsInfo(heartId: number) {
  const res = await baseAxios.delete(`/hearts/${heartId}`);
  return res.data;
}

export async function getPostUser(postId: number) {
  const res = await baseAxios.get<PostWithUser[]>(
    `/posts?id=${postId}&_expand=user`
  );
  return res.data[0];
}
