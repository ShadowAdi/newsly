import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import Animated from "react-native-reanimated"; // Ensure this is from `react-native-reanimated`

const { width, height } = Dimensions.get("screen");
const SliderItem = ({
  sliderItem,
  index,
  scrollX,
}: {
  sliderItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Link
    href={sliderItem.article_id ? `/news/${sliderItem.article_id}` : "/"}
    asChild
  >
      <TouchableOpacity>
        <Animated.View style={[styles.itemWrapper, rnStyle]}>
          <Image
            source={{
              uri: sliderItem.image_url,
            }}
            style={styles.image}
          />
          <LinearGradient
            style={styles.LinearG}
            colors={["transparent", "rgba(0,0,0,0.8)"]}
          >
            <View style={styles.sourceInfo}>
              {sliderItem.source_icon && (
                <Image
                  source={{ uri: sliderItem.source_icon }}
                  style={styles.ImgIcon}
                />
              )}
              <Text style={styles.sourceName}>{sliderItem.source_name}</Text>
            </View>
            <Text style={styles.styleTitle} numberOfLines={2}>
              {sliderItem.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  LinearG: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
    left:30
  },
  ImgIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  sourceInfo: {
    flexDirection: "row",
    position: "absolute",
    top: 85,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  styleTitle: {
    fontSize: 14,
    color: Colors.white,
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
    fontWeight: "600",
  },
});
