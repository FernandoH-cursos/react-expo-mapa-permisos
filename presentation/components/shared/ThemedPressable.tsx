import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface ThemedPressableProps extends PressableProps{
  children: string;
}

export const ThemedPressable = ({children,...rest}: ThemedPressableProps) => {
  return (
    <Pressable style={styles.btnPrimary} {...rest}>
      <ThemedText style={{ color: "white" }}>{children}</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    margin: 10
  },
});
