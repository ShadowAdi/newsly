import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const LoadingComponent = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<ActivityIndicator> &
    Readonly<ActivityIndicatorProps>
) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
