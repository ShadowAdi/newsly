import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Searchbar = ({
  withHorizontalPadding,
  setSearchQuery,
}: {
  withHorizontalPadding: boolean;
  setSearchQuery?: Function;
}) => {
  return (
    <View
      style={[
        styles.container,
        withHorizontalPadding && { paddingHorizontal: 20 },
      ]}
    >
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search something..."
          placeholderTextColor={Colors.lightGrey}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(query) =>{
            if (setSearchQuery) {
              setSearchQuery(query)
            }
          }}
        />
      </View>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#e4e4e4",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  textInput: {
    flex: 1,
    color: Colors.darkGrey,
    fontSize: 14,
  },
});
