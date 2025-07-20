import { LinkCardData } from '@/types/blog';

export async function fetchOGPData(url: string): Promise<LinkCardData | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkCardBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    const ogpData: LinkCardData = {
      url,
      title: extractMetaContent(html, 'og:title') || extractTitleFromHTML(html) || 'タイトルなし',
      description: extractMetaContent(html, 'og:description') || extractMetaContent(html, 'description') || '',
      image: extractMetaContent(html, 'og:image'),
      siteName: extractMetaContent(html, 'og:site_name'),
    };

    return ogpData;
  } catch (error) {
    console.error('Failed to fetch OGP data:', error);
    return {
      url,
      title: 'リンク先を確認できませんでした',
      description: 'リンク先の情報を取得できませんでした。',
    };
  }
}

function extractMetaContent(html: string, property: string): string | undefined {
  const regex = new RegExp(`<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i');
  const match = html.match(regex);
  return match ? match[1] : undefined;
}

function extractTitleFromHTML(html: string): string | undefined {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : undefined;
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

export function extractLinksFromContent(content: string): string[] {
  const urlRegex = /(https?:\/\/[^\s<>"]+)/gi;
  const matches = content.match(urlRegex);
  return matches ? [...new Set(matches)] : [];
}