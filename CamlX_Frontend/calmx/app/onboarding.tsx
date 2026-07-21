import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, StatusBar, StyleSheet, View, ViewToken } from "react-native";
import { ImageSlide } from "../components/ImageSlide";
import { PurpleSlide } from "../components/PurpleSlide";

export type SlideData =
  | {
      id: string;
      type: "image";
      cloudType?: "yellow" | "red" | "green";
      title: string;
      body: string;
    }
  | {
      id: string;
      type: "purple";
      quote: string;
      quoteText: string;
      attribution: string;
    };

const slides: SlideData[] = [
  {
    id: "1",
    type: "image",
    cloudType: "yellow",
    title: "Lắng nghe cảm xúc mỗi ngày",
    body: "Chỉ cần vài giây mỗi ngày để bạn ghi lại tâm trạng, cảm xúc hay những điều đã xảy ra. Bằng việc lắng nghe chính mình, bạn đang học cách chấp nhận và thấu hiểu bản thân hơn mỗi ngày. Bắt đầu hành trình hiểu mình từ hôm nay.",
  },
  {
    id: "2",
    type: "image",
    cloudType: "red",
    title: "Hiểu rõ tâm trạng của bạn",
    body: "Nhìn lại hành trình cảm xúc của mình qua tuần, tháng hoặc khi cần tĩnh lặng. Từ đó, bạn sẽ thấy mình đã mạnh mẽ, trưởng thành và biết cách chăm sóc bản thân hơn. Mọi cảm xúc đều xứng đáng được lắng nghe.",
  },
  {
    id: "3",
    type: "image",
    cloudType: "green",
    title: "Cảm xúc của bạn luôn có giá trị",
    body: "Ứng dụng sẽ nhắc bạn dừng lại một chút, lắng nghe cảm xúc và gợi ý cách giúp bạn cân bằng. Vì bạn xứng đáng được lắng nghe mỗi ngày. Chăm sóc cảm xúc cũng là một cách yêu thương chính mình.",
  },
  {
    id: "4",
    type: "purple",
    quote: "“",
    quoteText:
      "Hiểu cảm xúc, là bước đầu tiên để hiểu chính mình.\nBắt đầu hành trình ấy ngay từ hôm nay.",
    attribution: "- CalmX -",
  },
];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<SlideData>>(null);
  const router = useRouter();

  const onFinish = () => {
    router.navigate("/signin");
    AsyncStorage.setItem("hasSeenOnboarding", "true");
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const goNext = () => {
    if (activeIndex < slides.length - 1) {
      listRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      onFinish();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        style={styles.flatList}
        renderItem={({ item }) =>
          item.type === "image" ? (
            <ImageSlide
              slide={item}
              isLast={item.id === "3"}
              onNext={goNext}
              onSkip={onFinish}
              activeIndex={activeIndex}
              totalImageSlides={3}
            />
          ) : (
            <PurpleSlide slide={item} onFinish={onFinish} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8B4F8",
  },
  flatList: {
    flex: 1,
  },
});
