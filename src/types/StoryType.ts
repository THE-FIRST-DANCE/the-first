export interface StoryContentType {
  id: number;
  name: string;
  img: string;
  text: string;
}

export interface StoryType {
  id: number;
  name: string;
  img: string;
  content: StoryContentType[];
}

export interface ImageListType {
  thumbnail: string;
  link: string;
}
