import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail } from "@/lib/validators";
import { Typography } from "@/Theme";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Login() {
  const { loading, signInWithEmail } = useAuth();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    const isEmailValid = validateEmail(email);
    console.log("isEmailValid.success",isEmailValid.success,email);
    if (isEmailValid.success) {
      signInWithEmail(email);
    } else {
      setMessage(isEmailValid.error.issues[0].message);
    }
  };

  const onChange = (text: string) => {
    setEmail(text);
    if (message.length) {
      setMessage("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
        <Text style={[Typography.h2]}>Welcome Back</Text>
      </View>
      <View style={{ flex: 0.6, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Input
            message={message}
            inputProps={{ placeholder: "Email",onChangeText(text) {
              onChange(text)
            }, }}
          />
        </View>
        <Button loading={loading} label="Sigin" onPress={onSubmit} />
      </View>
    </View>
  );
}
