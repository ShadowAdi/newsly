import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Searchbar from "@/components/Searchbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";
import Checkbox from "@/components/Checkbox";
import { useNewsCategories } from "@/hooks/useNewsCategories";
import { useNewsCountry } from "@/hooks/useNewsCountry";
import { Link } from "expo-router";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  const { newsCategories, toggleNews } = useNewsCategories();
  const { countries, toggleNewsCountry } = useNewsCountry();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={[styles.container, { paddingTop: safeTop + 20 }]}>
        <Searchbar
          withHorizontalPadding={false}
          setSearchQuery={setSearchQuery}
        />
        <Text style={styles.title}>Categories</Text>
        <View style={styles.listContainer}>
          {newsCategories.map((newsCategory, i) => {
            return (
              <Checkbox
                key={i}
                label={newsCategory.title}
                checked={newsCategory.selected}
                onPress={() => {
                  toggleNews(newsCategory.id);
                  setCategory(newsCategory.slug);
                }}
              />
            );
          })}
        </View>

        <Text style={styles.title}>Country</Text>
        <View style={styles.listContainer}>
          {countries.map((country, i) => {
            return (
              <Checkbox
                key={i}
                label={country.name}
                checked={country.selected}
                onPress={() => {
                  toggleNewsCountry(i);
                  setCountry(country.code);
                }}
              />
            );
          })}
        </View>
        <Link
          href={{
            pathname: "/news/search",
            params: { query: searchQuery, category, country },
          }}
          asChild
        >
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures it fills the parent flex container
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows wrapping to avoid content being cut off
    gap: 16,
    justifyContent: "space-between", // Ensures spacing is managed
    marginBottom: 20,
  },
searchBtn: {
  backgroundColor: Colors.tint,
  alignItems: "center",
  padding: 14,
  borderRadius: 10,
  marginVertical: 20, // Add margin to prevent overlap
},
  searchText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
