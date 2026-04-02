export interface SupabaseBookmark {
  id: string;
  user_id: string;
  article_slug: string;
  created_at: string;
}

export interface SupabaseComment {
  id: string;
  article_slug: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  created_at: string;
}

export interface SupabaseArticleView {
  article_slug: string;
  views: number;
}

export interface SupabaseNewsletterSub {
  id: string;
  email: string;
  created_at: string;
}
