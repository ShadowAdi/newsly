import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack } from "expo-router";
import LoadingComponent from "@/components/LoadingComponent";
import { NewsItem } from "@/components/NewsList";
import { NewsDataType } from "@/types";
import { useIsFocused } from "@react-navigation/native";
import { BASE_URL } from "@/constants/Url";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchBookmark = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("bookmark");
      console.log("Token: ", token);

      if (token) {
        const res = JSON.parse(token);
        setIsLoading(true);

        if (res && res.length > 0) {
          const query_string = res.join(",");
          const response = await axios.get(`${BASE_URL}&id=${query_string}`);
          const news = response.data.results;
          setBookmarkNews(news);
        } else {
          setBookmarkNews([]);
        }
      } else {
        setBookmarkNews([]);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setBookmarkNews([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookmark();
  }, [isFocused, fetchBookmark]);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Bookmarks", // Add a title
        }}
      />
      {isLoading ? (
        <LoadingComponent size={"large"} />
      ) : bookmarkNews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarked news articles</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkNews}
          renderItem={({ item, index }) => (
            <Link href={`/news/${item.article_id}`} key={index} asChild>
              <TouchableOpacity>
                <NewsItem news={item} />
              </TouchableOpacity>
            </Link>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.article_id || `list_item${index}`}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
