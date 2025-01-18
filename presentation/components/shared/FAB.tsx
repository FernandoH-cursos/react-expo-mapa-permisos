import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FAB = ({iconName, onPress, style}: Props) => {
  return (
    <View style={[styles.btn, style]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={iconName} color="white" size={35} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: 50,
    height: 50,
    borderRadius: 30,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 4.5,
      height: 0.37,
    },
    elevation: 5,
  },
});
