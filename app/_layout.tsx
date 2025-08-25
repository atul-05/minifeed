import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";


export default function Layout() {

  const { user, initialLoading } = useAuth();

  
  console.log("user initialLoading",user,initialLoading)
    useEffect(()=>{
      if(user){
        router.replace('/(tabs)/feed')
      }
    
  },[user])
  // 1. Show a loading screen while the auth status is being determined
  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2. If a user exists, render the main tabs stack



    return (
       <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
       <Stack.Screen name="(auth)" />
      </Stack>
      <Toast/>
       </QueryClientProvider>
      
    );
  


}