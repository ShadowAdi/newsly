export interface NewsDataType {
  article_id: string;
  title: string;
  link: string;
  keywords: string[]|null|string;
  creator: null|string|string[];
  video_url: null;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_priority: number;
  source_name: string;
  source_url: string;
  source_icon: string;
  language: string;
  country: string[]|null|string;
  category: string[]|null|string;
  ai_tag: string[]|string|null;
  ai_region: string[]|null|string;
  ai_org: null|string;
  sentiment: string;
  sentiment_stats: Sentimentstats|null;
  duplicate: boolean;
}

interface Sentimentstats {
  positive: number;
  neutral: number;
  negative: number;
}
