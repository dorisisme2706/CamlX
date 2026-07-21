import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GreenCloud, RedCloud, YellowCloud } from "./Clouds";

const { width, height } = Dimensions.get("window");

export interface ImageSlideProps {
  slide: {
    id: string;
    type: "image";
    cloudType?: "yellow" | "red" | "green";
    title: string;
    body: string;
  };
  isLast: boolean;
  onNext: () => void;
  onSkip: () => void;
  activeIndex: number;
  totalImageSlides: number;
}

export function ImageSlide({ slide, isLast, onNext, onSkip }: ImageSlideProps) {
  const renderCloud = () => {
    switch (slide.cloudType) {
      case "yellow":
        return <YellowCloud style={styles.cloudStyle} />;
      case "red":
        return <RedCloud style={styles.cloudStyle} />;
      case "green":
        return <GreenCloud style={styles.cloudStyle} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Cụm Đám mây được đưa lên vị trí tuyệt đối và tắt chặn Touch */}
      <View style={styles.cloudWrapper} pointerEvents="none">
        {renderCloud()}
      </View>

      {/* Nội dung chữ & nút bấm nằm ở tầng riêng phía trên */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={onSkip}
            activeOpacity={0.6}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Text style={styles.skipText}>Bỏ qua</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={onNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextText}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "flex-end",
    paddingBottom: 60,
  },
  cloudWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cloudStyle: {
    alignSelf: "center",
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: 28,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
  },
  body: {
    fontSize: 15,
    color: "#333333",
    textAlign: "center",
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    color: "#4A4A4A",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
