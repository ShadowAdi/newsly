import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { NewsDataType } from "@/types";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import LoadingComponent from "@/components/LoadingComponent";
import { NewsItem } from "@/components/NewsList";
import { BASE_URL } from "@/constants/Url";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsDataType[]>([]);

  const { category, query, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();
  useEffect(() => {
    getNews();
  }, [category, country, query]);

  const getNews = async () => {
    setLoading(true);
    try {
      let categoryString = "";
      let countryString = "";
      let queryString = "";

      if (category) {
        categoryString = `&category=${category}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }
      if (query) {
        queryString = `&q=${query}`;
      }
      const URL = `${BASE_URL}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
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
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          title: "Search",
        }}
      />

      <View style={styles.container}>
        {loading ? (
          <LoadingComponent size={"large"} />
        ) : (
          <FlatList
            data={news}
            renderItem={({ item, index }) => (
              <Link href={`/news/${item.article_id}`} key={index} asChild>
                <TouchableOpacity>
                  <NewsItem news={item} />
                </TouchableOpacity>
              </Link>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `list_item${index}`}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
