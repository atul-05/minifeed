import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

useEffect(() => {
  console.log('useAuth: Initializing...');
  // check current user
  supabase.auth.getUser().then(({ data }) => {
    console.log('useAuth: getUser result:', data.user ? 'User found' : 'No user found');
    setUser(data.user);
    setInitialLoading(false); // Make sure loading is set to false here
  });

  // listen to auth state changes
  const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
    console.log('useAuth: Auth state changed. Event:', _event, 'Session:', session ? 'Found' : 'Null');
    setUser(session?.user ?? null);
    setInitialLoading(false); // Make sure loading is set to false here
  });

  return () => {
    sub.subscription.unsubscribe();
  };
}, []);
  const signInWithEmail = async (email: string) => {
    try {
      setLoading(true);
      const responese = await supabase.auth.signInWithOtp({
        email,
        options: {emailRedirectTo: "minifeed://callback",},
      });
      if (responese.error) {
        Toast.show({
          type: "error",
          text1: "Error sending magic link",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Check your email. We sent you a magic link!",
        });
      }
     
      return responese;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => supabase.auth.signOut();

  return { user, signInWithEmail, signOut,loading,initialLoading };
}
