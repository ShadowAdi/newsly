import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "./SliderItem";
import Reanimated, {
  useSharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  scrollTo,
} from "react-native-reanimated";
import Pagination from "./Pagination";
import Animated from "react-native-reanimated";

type Props = {
  newsList: NewsDataType[];
};

const BreakingNews = ({ newsList }: Props) => {
  const [data, setData] = useState(newsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Reanimated.FlatList<NewsDataType>>();
  const [autoPlay, setAutoPlay] = useState(true);
  const { width } = useWindowDimensions();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (autoPlay && data.length > 1) {
      intervalId = setInterval(() => {
        const nextOffset = ((paginationIndex + 1) % data.length) * width;
        scrollTo(ref, nextOffset, 0, true);
        setPaginationIndex((prev) => (prev + 1) % data.length);
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoPlay, paginationIndex, data.length, width]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item, index) => `Id${item.article_id}_${index}`}
          onScroll={scrollHandler}
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...newsList])}
          renderItem={({ item, index }) => (
            <SliderItem scrollX={scrollX} sliderItem={item} index={index} />
          )}
          onScrollBeginDrag={() => setAutoPlay(false)}
          onScrollEndDrag={() => setAutoPlay(true)}
        />
        <Pagination
          items={data}
          scrollX={scrollX}
          paginationIndex={paginationIndex}
        />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "red",
    fontWeight: "500",
  },
});
