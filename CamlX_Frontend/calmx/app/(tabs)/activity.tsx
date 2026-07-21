import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CharacterAvatar = ({ type }: { type: "sun" | "mochi" | "caly" }) => {
  const charAvatar = {
    sun: require("@/assets/images/yellow-cloud.png"),
    mochi: require("@/assets/images/green-cloud.png"),
    caly: require("@/assets/images/red-cloud.png"),
  };
  return (
    <Image
      source={charAvatar[type]}
      style={{ width: 65, height: 65 }}
      resizeMode="contain"
    />
  );
};

export default function ActivitiesScreen() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const cards = [
    {
      type: "mochi" as const,
      title: "Minigame",
      copy: (
        <Text style={styles.cardText}>
          Các minigame giải trí giúp bạn thư giãn và giảm căng thẳng.
        </Text>
      ),
      route: "",
      action: "Chơi ngay",
    },
    {
      type: "caly" as const,
      title: "Trợ lí ảo Caly",
      copy: (
        <Text style={styles.cardText}>
          Bạn có những thắc mắc cần được giải đáp, hãy nhắn cho Caly nhé, tụi
          mình luôn lắng nghe
        </Text>
      ),
      route: "/(chat)/caly",
      action: "Nhắn tin ngay",
    },
    {
      type: "sun" as const,
      title: "Tư vấn cùng chuyên gia",
      copy: (
        <Text style={styles.cardText}>
          Đặt lịch để tâm sự và được tư vấn cùng đội ngũ chuyên gia tâm lí đến
          từ <Text style={styles.boldText}>CalmX</Text>
        </Text>
      ),
      route: "/care",
      action: "Đặt lịch hẹn",
    },
  ];

  return (
    <View style={styles.appStage}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.calmHeader}>
          <Text style={styles.headerTitle}>Hoạt động</Text>
        </View>

        {/* Danh sách thẻ */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={styles.calmList}>
            {cards.map((card) => (
              <View style={styles.calmCard} key={card.title}>
                <CharacterAvatar type={card.type} />

                <View style={styles.calmCopy}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  {card.copy}
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      if (card.route) {
                        router.navigate(card.route as any);
                      } else {
                        setMessage(
                          "Tính năng này đang được phát triển, vui lòng quay lại sau nhé!",
                        );
                      }
                    }}
                  >
                    <Text style={styles.actionButtonText}>{card.action}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {message ? (
          <View style={styles.toast} accessibilityRole="summary">
            <Text style={styles.toastText}>{message}</Text>
            <TouchableOpacity
              style={styles.closeToast}
              onPress={() => setMessage("")}
            >
              <X color="#FFF" size={20} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appStage: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  calmHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 96,
    paddingTop: 40,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    backgroundColor: "#E9D5FF",
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  calmList: {
    marginTop: 16,
  },
  calmCard: {
    flexDirection: "row",
    backgroundColor: "#E9D5FF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "flex-start",
  },
  characterBase: {
    width: 65,
    height: 65,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  characterSun: { backgroundColor: "#FFEAA7" },
  characterMochi: { backgroundColor: "#FFD2E8" },
  characterCaly: { backgroundColor: "#D6DEFF" },
  faceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 24,
    marginBottom: 2,
  },
  eye: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#2D3436",
  },
  mouthText: {
    fontSize: 16,
    color: "#2D3436",
    lineHeight: 16,
    marginTop: -4,
  },
  blushRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 38,
    position: "absolute",
    bottom: 22,
  },
  blush: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF7675",
    opacity: 0.4,
  },
  calmCopy: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    color: "#636E72",
    lineHeight: 18,
    marginBottom: 12,
  },
  boldText: {
    fontWeight: "700",
    color: "#2D3436",
  },
  actionButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  actionButtonText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "600",
  },
  toast: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: "#2D3436",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  toastText: {
    color: "#FFF",
    fontSize: 14,
    flex: 1,
    paddingRight: 8,
  },
  closeToast: {
    padding: 4,
  },
  closeToastText: {
    color: "#FFF",
    fontSize: 20,
    lineHeight: 20,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingBottom: 15,
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navLabel: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 4,
  },
  navActiveLabel: {
    color: "#6C5CE7",
  },
});
