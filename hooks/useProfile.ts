// hooks/useProfile.ts
import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function generateRandomUsername() {
  const animals = ["Tiger", "Panda", "Eagle", "Shark", "Lion", "Wolf"];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNum = Math.floor(Math.random() * 10000);
  return `${randomAnimal}${randomNum}`;
}

// fetch or create profile
async function fetchOrCreateProfile() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
     console.log("fetchOrCreateProfile",user)
  if (!user) return null;

  // Fetch profile
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

     console.log("fetchOrCreateProfile data",data,error)
//   if (error && error.code !== "PGRST116") {
//     throw error;
//   }

  // If not exists → insert new
  if (!data) {
    const username = generateRandomUsername();
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert([{ id: user.id, username, }])
      .select()
      .single();
console.log("fetchOrCreateProfile insertError",newProfile,insertError)
    if (insertError) throw insertError;
    return newProfile;
  }

  return data;
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchOrCreateProfile,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}

// optional mutation to update profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: any) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", updates.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
    },
  });
}
