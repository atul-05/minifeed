import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


export default function Profile() {
  const { user, initialLoading } = useAuth();
  const { refetch, data } = useProfile();

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {initialLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.usernameText}>{data?.username ?? ""}</Text>
            <Text style={styles.emailText}>{user?.user_metadata?.email}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f5", // A light gray background
  },
  profileCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  usernameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: "#666",
  },
});
