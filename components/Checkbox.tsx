import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Checkbox = ({
  label,
  checked,
  onPress,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
}) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? "rgba(239,142,82,0.1)" : "transparent",
        { duration: 150 }
      ),
      borderColor: withTiming(checked ? Colors.tint : Colors.black, {
        duration: 150,
      }),
      paddingLeft: 16,
      paddingRight: checked ? 10 : 16,
    };
  }, [checked]);

  const rnTextStle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? Colors.tint : Colors.black, {
        duration: 150,
      }),
    };
  }, [checked]);
  return (
    <Animated.View
      style={[styles.container, rnAnimatedStyle]}
      onTouchEnd={onPress}
      layout={LinearTransition.springify().mass(0.8)}
    >
      <Animated.Text style={[styles.label, rnTextStle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
          style={styles.iconWrapper}
        >
          <AntDesign name="checkcircle" size={14} color={Colors.tint} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: Colors.black,
    borderRadius: 32,
  },
  label: {
    fontSize: 14,
    color: Colors.tint,
  },
  iconWrapper: {
    marginLeft: 8,
    height: 14,
    width: 14,
  },
});
