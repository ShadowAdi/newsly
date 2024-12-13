import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { NewsDataType } from "@/types";
import axios from "axios";
import LoadingComponent from "@/components/LoadingComponent";
import { Colors } from "@/constants/Colors";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants/Url";

const NewsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useState(false);

  const getNewsById = async (id: string) => {
    setLoading(true);
    try {
      const URL = `${BASE_URL}&id=${id}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (error) {
      console.log(error, " I Got this Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewsById(id);
  }, []);

  useEffect(() => {
    if (!loading && news.length > 0) {
      checkBookmarkStatus(news[0].article_id);
    }
  }, [loading, news]);

  const saveBookmark = async (newsId: string) => {
    try {
      // Retrieve existing bookmarks, defaulting to an empty array if null
      const existingBookmarks = await AsyncStorage.getItem("bookmark");
      let bookmarks = existingBookmarks ? JSON.parse(existingBookmarks) : [];

      // Check if the news is already bookmarked
      if (!bookmarks.includes(newsId)) {
        bookmarks.push(newsId);
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
        setBookmark(true);
        Alert.alert("Success", "News saved to bookmarks");
      } else {
        Alert.alert("Info", "News is already bookmarked");
      }
    } catch (error) {
      console.error("Error saving bookmark:", error);
      Alert.alert("Error", "Failed to save bookmark");
    }
  };

  const removeBookmark = async (newsId: string) => {
    try {
      const existingBookmarks = await AsyncStorage.getItem("bookmark");
      if (existingBookmarks) {
        let bookmarks = JSON.parse(existingBookmarks);
        bookmarks = bookmarks.filter((id: string) => id !== newsId);
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
        setBookmark(false);
        Alert.alert("Success", "News removed from bookmarks");
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      Alert.alert("Error", "Failed to remove bookmark");
    }
  };

  const checkBookmarkStatus = async (newsId: string) => {
    try {
      const existingBookmarks = await AsyncStorage.getItem("bookmark");
      if (existingBookmarks) {
        const bookmarks = JSON.parse(existingBookmarks);
        setBookmark(bookmarks.includes(newsId));
      } else {
        setBookmark(false);
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
      setBookmark(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() =>
                  bookmark
                    ? removeBookmark(news[0].article_id)
                    : saveBookmark(news[0].article_id)
                }
              >
                <Ionicons
                  name={bookmark ? "heart" : "heart-outline"}
                  size={22}
                  color={bookmark ? "red" : Colors.black}
                />
              </TouchableOpacity>
            );
          },
          title: "",
        }}
      />
      {loading ? (
        <LoadingComponent size={"large"} />
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>{news?.[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfoText}>
              {moment(news[0].pubDate).format("MMMM DD, hh:mm a")}
            </Text>
            <Text style={styles.newsInfoText}>{news[0].source_name}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.imgStyle} />
          {news[0].content ? (
            <Text style={styles.newsContent}>{news[0].content}</Text>
          ) : (
            <Text style={styles.newsContent}>{news[0].description}</Text>
          )}
        </ScrollView>
      )}
    </>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  imgStyle: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  newsInfoText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  title: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "600",
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newsContent: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});
