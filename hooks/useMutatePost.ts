import { supabase } from "@/lib/supabase";
import { postSchema } from "@/lib/validators";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

type Post = {
  id: string;
  content: string;
  created_at: string;
  author: { username: string };
  likes: any[];
};

export const useCreatePost = (): UseMutationResult<
  Post,
  Error,
  string,
  { prev: Post[] | undefined }
> => {
  const qc = useQueryClient();
  
  return useMutation<Post, Error, string, { prev: Post[] | undefined }>({
    mutationFn: async (content: string) => {
      postSchema.parse(content); // validate
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("posts")
        .insert([{ content, author_id: user?.id }])
        .select()
        .single();
      if (error) throw error;
      return data as Post;
    },
    onMutate: async (content) => {
      await qc.cancelQueries(["posts", "all"]);
      const prev = qc.getQueryData<Post[]>(["posts", "all"]);
      const optimistic: Post = {
        id: Math.random().toString(),
        content,
        created_at: new Date().toISOString(),
        author: { username: "You" },
        likes: [],
      };
      qc.setQueryData(["posts", "all"], old => [optimistic, ...(old ?? [])]);
      return { prev };
    },
    onError: (_err, _content, ctx) => {
      qc.setQueryData(["posts", "all"], ctx?.prev);
    },
    onSettled: () => {
      qc.invalidateQueries(["posts"]);
    },
  });
};
