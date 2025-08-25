// hooks/useToggleLike.ts
import { supabase } from "@/lib/supabase";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

type Vars = { postId: string; hasLiked: boolean };
type Post = {
  id: string;
  content: string;
  created_at: string;
  likedByMe: boolean;
  likesCount: number; // ← ensure your usePost maps likes count to this field
};

export function useToggleLike() {
  const qc = useQueryClient();

  return useMutation<void, Error, Vars>({
    mutationFn: async ({ postId, hasLiked }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      if (hasLiked) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("likes")
          .insert([{ post_id: postId, user_id: user.id }]);
        if (error) throw error;
      }
    },

    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: ["posts"] });

      // snapshot all posts queries (both "all" and "mine")
      const snapshots = qc.getQueriesData<InfiniteData<Post[]>>({ queryKey: ["posts"] });

      // optimistic update for every posts query
      snapshots.forEach(([key]) => {
        qc.setQueryData<InfiniteData<Post[]> | undefined>(key, (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) =>
              page.map((p) =>
                p.id === vars.postId
                  ? {
                      ...p,
                      likedByMe: !vars.hasLiked,
                      likesCount: p.likesCount + (vars.hasLiked ? -1 : 1),
                    }
                  : p
              )
            ),
          };
        });
      });

      return { snapshots };
    },

    onError: (_err, _vars, ctx) => {
      // rollback
      ctx?.snapshots?.forEach(([key, data]) => qc.setQueryData(key, data));
    },

    onSettled: () => {
      // re-sync all posts queries
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
