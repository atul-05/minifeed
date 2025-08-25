import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useCreatePost } from "@/hooks/useMutatePost";
import { postSchema } from "@/lib/validators";
import { router } from "expo-router";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";

export default function Compose() {
  const { width } = useWindowDimensions();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isLoading, error } = useCreatePost();

  const submit = () => {
    const isValidMessage = postSchema.safeParse(message);
    if (isValidMessage.success) {
      mutate(message, {
        onSuccess: () => {
          setMessage("");
          router.navigate("/(tabs)/feed");
        }, // clear input after success
      });
    } else {
      setErrorMessage(isValidMessage.error.issues[0].message);
    }
  };

  const onChangeText = (text: string) => {
    setMessage(text);

    if (errorMessage.length) {
      setErrorMessage("");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Input
        message={errorMessage}
        inputProps={{ multiline: true, onChangeText, value: message }}
        style={{ width: width - 20, height: 200 }}
      />
      <Button loading={isLoading} label="Post" onPress={submit} />
    </View>
  );
}
