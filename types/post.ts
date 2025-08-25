export type Author = {
  id: string;
  username: string;
  avatar_url?: string | null; // optional if you add later
};

export type Post = {
  id: string;
  content: string;
  created_at: string; // ISO string from Supabase
  author: Author;
  likeCount: number;
  hasLiked?: boolean; // for current user
};