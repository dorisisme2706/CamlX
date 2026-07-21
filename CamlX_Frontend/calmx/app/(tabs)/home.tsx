import { useRouter } from "expo-router";
import { Bell, MessageCircle, Search } from "lucide-react-native";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DiscussionCard } from "../../components/DiscussionCard";
import { MascotBubble } from "../../components/MascotBubble";
import { RadiantEmotionSlider } from "../../components/RadiantEmotionSlider";

const { width } = Dimensions.get("window");

const DISCUSSIONS = [
  {
    id: "1",
    color: "#90EE90",
    duration: "00:10:56",
    author: "Mr. Anh",
    title: "Đi qua những ngày mưa, mới biết những ngày nắng",
    body: "Cuộc sống không phải lúc nào cũng bằng phẳng, cũng như bầu trời không thể...",
    participants: "+200 người tham gia",
    authorAvatar: require("../../assets/images/caly.png"),
    participantAvatars: [
      require("../../assets/images/caly.png"),
      require("../../assets/images/caly.png"),
      require("../../assets/images/caly.png"),
      require("../../assets/images/caly.png"),
    ],
  },
  {
    id: "2",
    color: "#D8B4F8",
    duration: "01:23:00",
    author: "Mr. Anh",
    title: "Mỗi màu là một cảm xúc\ncảm xúc có màu gì?",
    body: "Bạn có bao giờ nhìn một màu và thấy lòng mình dịu lại? Hay có khi nào chỉ...",
    participants: "+12 người tham gia",
    authorAvatar: require("../../assets/images/caly.png"),
    participantAvatars: [
      require("../../assets/images/caly.png"),
      require("../../assets/images/caly.png"),
      require("../../assets/images/caly.png"),
      require("../../assets/images/caly.png"),
    ],
  },
];

interface Props {
  userName?: string;
  userAvatar?: ReturnType<typeof require>;
}

export default function HomeScreen({ userName = "Mạnh", userAvatar }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity>
              <Image
                source={userAvatar ?? require("../../assets/images/caly.png")}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={styles.greeting}>
              Chào, <Text style={styles.greetingName}>{userName}</Text>
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <SearchIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <ChatIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <NotificationIcon />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mascot + speech bubble */}
        <MascotBubble />

        {/* Emotion picker */}
        <View style={styles.emotionSection}>
          <View style={styles.emotionSectionHeader}>
            <Text style={styles.sectionTitle}>Bạn đang cảm thấy thế nào ?</Text>
            <TouchableOpacity onPress={() => router.push("/statistics")}>
              <Text style={styles.seeMore}>Xem tiến độ</Text>
            </TouchableOpacity>
          </View>
          <RadiantEmotionSlider />
        </View>

        {/* Discussion */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thảo luận</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>Hiển thị thêm</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={DISCUSSIONS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.discussionList}
            renderItem={({ item }) => <DiscussionCard item={item} />}
          />
        </View>

        {/* Tâm sự */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tâm sự</Text>
          {/* Card Tâm Sự */}
          <View style={styles.tamSuCard}>
            <View style={styles.decorCircleTop} />
            <View style={styles.decorCircleBottom} />

            <View style={styles.tamSuLeftContent}>
              <Text style={styles.tamSuMainTitle}>
                Bạn muốn được lắng nghe?
              </Text>
              <Text style={styles.tamSuSubTitle}>
                Tâm sự cùng <Text style={styles.tamSuHighlight}>CalmX</Text>{" "}
                nhé!
              </Text>

              <TouchableOpacity style={styles.tamSuBtn} activeOpacity={0.9}>
                <Text style={styles.tamSuBtnText}>Tham gia ngay</Text>
              </TouchableOpacity>
            </View>

            {/* Mochi */}
            <Image
              source={require("../../assets/images/mochi.png")}
              style={styles.tamSuMascot}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SearchIcon() {
  return (
    <View style={iconStyles.icon}>
      <Search color={iconStyles.placeholder.color} />
    </View>
  );
}

function ChatIcon() {
  return (
    <View style={iconStyles.icon}>
      <MessageCircle color={iconStyles.placeholder.color} />
    </View>
  );
}

function NotificationIcon() {
  return (
    <View style={iconStyles.icon}>
      <Bell color={iconStyles.placeholder.color} />
    </View>
  );
}

const iconStyles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: { fontSize: 18, color: "#D8B4F8" },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 55,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greeting: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "#D8B4F8",
    letterSpacing: 0.48,
  },
  greetingName: {
    fontFamily: "Inter-Bold",
    color: "#D8B4F8",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBtn: {
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#FF6B6B",
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  emotionSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  emotionSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: "#000",
    letterSpacing: 0.32,
  },
  seeMore: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#D8B4F8",
    letterSpacing: 0.24,
  },
  discussionList: {
    paddingRight: 20,
    gap: 12,
  },
  tamSuCard: {
    backgroundColor: "#D8B4F8",
    borderRadius: 24,
    padding: 24,
    position: "relative",
    overflow: "visible",
    marginTop: 8,
    minHeight: 180,
    marginBottom: 20,
    flexDirection: "row",
  },
  decorCircleTop: {
    position: "absolute",
    top: -40,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  decorCircleBottom: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  tamSuLeftContent: {
    width: "70%",
    justifyContent: "center",
    zIndex: 2,
  },
  tamSuMainTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "#FFFFFF",
    lineHeight: 32,
    marginBottom: 8,
  },
  tamSuSubTitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#FFFFFF",
    marginBottom: 30,
  },
  tamSuHighlight: {
    fontFamily: "Inter-Bold",
    color: "#90EE90",
  },
  tamSuBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  tamSuBtnText: {
    fontFamily: "Inter-Bold",
    fontSize: 13,
    color: "#D8B4F8",
  },
  tamSuMascot: {
    position: "absolute",
    right: 0,
    bottom: -25,
    width: 150,
    height: 150,
    zIndex: 1,
  },
});
