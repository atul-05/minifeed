import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export type Post = {
  id: string;
  content: string;
  created_at: string;
  author: { username: string };
  likes: { count: number }[];
  user_like: { user_id: string }[];
  likedByMe: boolean;
};

export const usePost = (filter: "all" | "mine") => {
  const LIMIT = 10;

  return useInfiniteQuery({
    queryKey: ["posts", filter],
    queryFn: async ({ pageParam }) => {
      let q = supabase
        .from("posts")
        .select(
          `
          id, content, created_at,
          author:profiles!posts_author_id_fkey(username),
          likes(count),
          user_like:likes(user_id)
        `
        )
        .order("created_at", { ascending: false })
        .limit(LIMIT);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (filter === "mine") {
        q = q.eq("author_id", user?.id);
      }

      // Cursor-based: fetch posts *before* last created_at
      if (pageParam) {
        q = q.lt("created_at", pageParam);
      }

      const { data, error }: any = await q;
      console.log("data",data,'error',error)
      if (error) throw error;
      return data.map((post: Post) => ({
        ...post,
        likedByMe:
          post.user_like?.some((like) => like.user_id === user?.id) ?? false,
      }));
    },
    // pageParam is last post's created_at
    getNextPageParam: (lastPage) =>
      lastPage.length > 0
        ? lastPage[lastPage.length - 1].created_at
        : undefined,
    initialPageParam: null,
  });
};
