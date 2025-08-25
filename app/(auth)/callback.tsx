import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function CallbackScreen() {
  const { access_token, refresh_token } = useLocalSearchParams();
  const router = useRouter();
   const { refetch } = useProfile(); 
  console.log("access_token", access_token, refresh_token);
  const checkSession = async () => {
    try {
      const { error } = await supabase.auth.setSession({
            access_token: access_token as string,
            refresh_token: refresh_token as string,
          });

    console.log("datacheckSession", error);
    if (error) {
          // Something went wrong, navigate to login page
      router.replace("/(auth)/login");
  
    } else {
      // User is logged in, navigate to the main app screen
      refetch()
      router.replace("/(tabs)/feed");
    }
    } catch (error) {
       console.log("datacheckSession error", error);
      router.replace("/(auth)/login");
    }
  };
  useEffect(() => {
    if (access_token) {
      checkSession();
    } else {
      // No tokens in URL, likely an invalid or expired link
      router.replace("/(auth)/login");
    }
  }, [access_token, refresh_token]);

  // Return a loading indicator while the logic runs
  return  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>;
}
