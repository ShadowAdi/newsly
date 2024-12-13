import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import LoadingComponent from "./LoadingComponent";
import { Link } from "expo-router";

const NewsList = ({ newsList }: { newsList: NewsDataType[] }) => {
  return (
    <View style={styles.container}>
      {newsList.length === 0 ? (
        <LoadingComponent size={"large"} />
      ) : (
        newsList.map((news, i) => (
          <Link href={`/news/${news.article_id}`} key={i} asChild>
            <TouchableOpacity>
              <NewsItem news={news} />
            </TouchableOpacity>
          </Link>
        ))
      )}
    </View>
  );
};

export default NewsList;

export const NewsItem = ({ news }: { news: NewsDataType }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: news.image_url }} style={styles.imgStyle} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{news.category}</Text>
        <Text style={styles.itemTitle}>{news.title}</Text>
        <View style={styles.itemSourceInfo}>
          <Image
            source={{ uri: news.source_icon }}
            style={styles.itemSourceImg}
          />
          <Text style={styles.itemSourceName}>{news.source_name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  imgStyle: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.black,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemSourceImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceInfo: { flexDirection: "row", gap: 8, alignItems: "center" },
  itemSourceName: {
    fontSize: 10,
    fontWeight: "400",
    color: Colors.darkGrey,
  },
});
