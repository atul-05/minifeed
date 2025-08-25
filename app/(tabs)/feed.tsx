import { useToggleLike } from "@/hooks/useLike";
import { Post, usePost } from "@/hooks/usePosts";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Feed() {
  const [activeFilter, setActiveFilter] = useState<"all" | "mine">("all");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = usePost(activeFilter);

  const toggleLike = useToggleLike();

  // Flatten pages
  const posts = data?.pages.flat() ?? [];

  console.log("Feeddata", posts);

  // 4. Create a reusable component for each post item.
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postAuthor}>{item.author?.username}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.rowBtn}>
        <Pressable
          onPress={() =>
            toggleLike.mutate({ postId: item.id, hasLiked: item.likedByMe })
          }
        >
          {item.likedByMe ? (
            <AntDesign name="like1" color={"#0000FF"} size={20} />
          ) : (
            <AntDesign name="like2" size={20} />
          )}
        </Pressable>
        <Text style={styles.postContent}>
          Date: {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, []);

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <View style={styles.container}>
        {/* 5. The filter button section */}
        <View style={styles.filterContainer}>
          {/* 'All' posts button */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "all" && styles.activeFilterButton,
            ]}
            onPress={() => {
              setActiveFilter("all");
            }}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "all" && styles.activeFilterText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {/* 'Mine' posts button */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "mine" && styles.activeFilterButton,
            ]}
            onPress={() => {
              setActiveFilter("mine");
            }}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "mine" && styles.activeFilterText,
              ]}
            >
              Mine
            </Text>
          </TouchableOpacity>
        </View>

        {/* 6. The main feed list using FlatList */}
        <FlatList
          data={posts}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedList}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5} // Trigger when 50% of the list is visible
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No posts found.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

// 7. Styling for the components
const styles = StyleSheet.create({
  rowBtn: { flexDirection: "row", justifyContent: "space-between", padding: 5 },
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Light gray background
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e2e5",
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: "#007AFF", // A nice blue for the active button
  },
  filterText: {
    color: "#333",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "white",
  },
  feedList: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  postContent: {
    fontSize: 14,
    color: "#555",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
  loadingFooter: {
    paddingVertical: 20,
  },
});
