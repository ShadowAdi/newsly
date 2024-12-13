import {  StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { SharedValue } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import Animated from "react-native-reanimated"; // Ensure this is from `react-native-reanimated`

const Pagination = ({
  items,
  paginationIndex,
  scrollX,
}: {
  items: NewsDataType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
}) => {
  return (
    <Animated.View style={styles.container}>
      {items.map((_, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  paginationIndex === index ? Colors.tint : Colors.darkGrey,
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#333",
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});