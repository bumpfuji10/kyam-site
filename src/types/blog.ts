export interface Article {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
}

export interface ArticlesResponse {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface LinkCardData {
  url: string;
  title: string;
  description: string;
  image?: string;
  siteName?: string;
}