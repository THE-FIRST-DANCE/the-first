export interface StoryContentType {
  id: number;
  content: string;
  img: string;
}

export interface StoryType {
  id: number;
  name: string;
  img: string;
  userId: number;
  content: StoryContentType[];
}

export interface ImageListType {
  thumbnail: string;
  link: string;
}
