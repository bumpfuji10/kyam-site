import { Article, ArticlesResponse } from '@/types/blog';

const API_BASE_URL = 'https://lbt0630zfb.microcms.io/api/v1';
const API_KEY = process.env.MICROCMS_API_KEY;

if (!API_KEY) {
  throw new Error('MICROCMS_API_KEY is not defined');
}

const headers = {
  'X-MICROCMS-API-KEY': API_KEY,
  'Content-Type': 'application/json',
};

export async function getArticles(options?: {
  limit?: number;
  offset?: number;
  orders?: string;
  q?: string;
}): Promise<ArticlesResponse> {
  const params = new URLSearchParams();
  
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.offset) params.append('offset', options.offset.toString());
  if (options?.orders) params.append('orders', options.orders);
  if (options?.q) params.append('q', options.q);

  const url = `${API_BASE_URL}/articles${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export async function getArticle(id: string): Promise<Article> {
  const url = `${API_BASE_URL}/articles/${id}`;
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const textLength = content.replace(/<[^>]*>/g, '').length;
  const words = textLength / 4;
  return Math.ceil(words / wordsPerMinute);
}

export function extractExcerpt(content: string, maxLength: number = 120): string {
  const plainText = content.replace(/<[^>]*>/g, '');
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
}