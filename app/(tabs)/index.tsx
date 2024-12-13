import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import axios from "axios";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import LoadingComponent from "@/components/LoadingComponent";
import { BASE_URL } from "@/constants/Url";
type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsDataType[]>([]);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    setLoading(true);
    try {
      const URL = `${BASE_URL}&language=en&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      setBreakingNews(response.data?.results);
    } catch (error) {
      console.log(process.env.EXPO_NEWS_API_KEY);
      console.log(error, " I Got this Error");
    } finally {
      setLoading(false);
    }
  };

  const getNews = async (category: string = "") => {
    setLoading(true);
    try {
      let categoryString = "";
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      const URL = `${BASE_URL}&language=en&image=1&removeduplicate=1&size=10${categoryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        const validNews = response.data.results.filter(
          (item: NewsDataType) => item.article_id
        );
        setNews(validNews);
      }
    } catch (error) {
      console.log(error, " I Got this Error");
    } finally {
      setLoading(false);
    }
  };
  const onCatChanged = (category: string) => {
    console.log(category);
    setNews([]);
    getNews(category);
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Navbar />
      <Searchbar withHorizontalPadding={true} />
      {loading  ? (
        <LoadingComponent size={"large"} />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
      <Categories onCategoryChanged={onCatChanged} />
      {news.length !== 0 && <NewsList newsList={news} />}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
