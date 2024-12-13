import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";

const Categories = ({
  onCategoryChanged,
}: {
  onCategoryChanged: (category: string) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
    });
    onCategoryChanged(newsCategoryList[index].slug);
  };

  return (
    <View>
      <Text style={styles.TrendingHeader}>Trending Right Now</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsWrapper}
      >
        {newsCategoryList.map((newsCategory, i) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelectCategory(i)}
              style={[styles.item, activeIndex === i && styles.itemActive]}
              key={i}
              ref={(el) => (itemRef.current[i] = el)}
            >
              <Text
                style={[
                  styles.itemText,
                  activeIndex === i && styles.itemTextActive,
                ]}
              >
                {newsCategory.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  TrendingHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  itemsWrapper: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  itemTextActive: {
    color: Colors.white,

    fontWeight: "600",
  },
});
