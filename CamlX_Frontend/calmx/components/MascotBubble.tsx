import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MascotBubbleProps {
  customText?: string;
  onPress?: () => void;
}

export function MascotBubble({ customText, onPress }: MascotBubbleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bubbleWrapper}>
        <View style={styles.bubbleShadow} />

        {/* Main bubble */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.bubble}
          onPress={onPress}
        >
          {customText ? (
            <Text style={styles.bubbleText}>{customText}</Text>
          ) : (
            <Text style={styles.bubbleText}>
              {
                "Hôm nay của bạn thế nào?\nDù vui hay buồn, mình luôn lắng nghe. "
              }
              <Text style={styles.bubbleLink}>
                {"Chạm vào mình để viết vài dòng nhật ký nhé"}
              </Text>
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.tail} />
      </View>

      <Image
        source={require("../assets/images/mascot.png")}
        style={styles.mascot}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 16,
    position: "relative",
    minHeight: 170,
    justifyContent: "center",
  },
  bubbleWrapper: {
    width: "62%",
    position: "relative",
  },
  bubbleShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    bottom: -4,
    backgroundColor: "#EAD1FA",
    borderRadius: 18,
  },
  bubble: {
    backgroundColor: "#FCEFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F1D5F7",
  },
  bubbleText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#333",
    lineHeight: 18,
  },
  bubbleLink: {
    fontFamily: "Inter-Bold",
    color: "#90EE90",
  },
  tail: {
    position: "absolute",
    right: -8,
    bottom: 30,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderTopColor: "transparent",
    borderBottomWidth: 6,
    borderBottomColor: "transparent",
    borderLeftWidth: 10,
    borderLeftColor: "#FCEFFF",
  },
  mascot: {
    position: "absolute",
    right: -25,
    bottom: -10,
    width: 175,
    height: 175,
  },
});
