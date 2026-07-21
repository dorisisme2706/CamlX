import { useRouter } from "expo-router";
import { ChevronLeft, PhoneCall, Star } from "lucide-react-native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MascotBubble } from "../components/MascotBubble";

export default function CalmXCareScreen() {
  const router = useRouter();

  return (
    <View style={styles.appStage}>
      <View style={styles.calmHeader}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <ChevronLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CalmX Care</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <MascotBubble customText="Bạn không đơn độc, chúng mình ở đây để hỗ trợ bạn." />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Đội ngũ chuyên gia</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -16, paddingHorizontal: 16 }}
        >
          <View style={styles.doctorCard}>
            <Image
              source={require("../assets/images/caly.png")}
              style={styles.doctorImg}
            />
            <Text style={styles.doctorDegree}>ThS. Tâm lý</Text>
            <Text style={styles.doctorName}>Minh Anh</Text>
            <Text style={styles.doctorSpec}>Tâm lý học lâm sàng</Text>
            <View style={styles.ratingRow}>
              <Star color="#EAB308" fill="#EAB308" size={14} />
              <Text style={styles.ratingText}>4.9 (123)</Text>
            </View>
            <TouchableOpacity style={styles.bookBtn} activeOpacity={0.8}>
              <Text style={styles.bookBtnText}>Đặt lịch</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.doctorCard}>
            <Image
              source={require("../assets/images/caly.png")}
              style={styles.doctorImg}
            />
            <Text style={styles.doctorDegree}>ThS. Tâm lý</Text>
            <Text style={styles.doctorName}>Hoàng Nam</Text>
            <Text style={styles.doctorSpec}>Tham vấn tâm lý</Text>
            <View style={styles.ratingRow}>
              <Star color="#EAB308" fill="#EAB308" size={14} />
              <Text style={styles.ratingText}>4.9 (98)</Text>
            </View>
            <TouchableOpacity style={styles.bookBtn} activeOpacity={0.8}>
              <Text style={styles.bookBtnText}>Đặt lịch</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.emergencyTitle}>Bạn cần hỗ trợ ngay?</Text>
              <Text style={styles.emergencySub}>
                Nếu bạn đang gặp khủng hoảng hoặc cảm thấy không ổn, đừng ngần
                ngại liên hệ với đội ngũ của chúng mình.
              </Text>
            </View>
            <Image
              source={require("../assets/images/care.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity style={styles.callSupportBtn} activeOpacity={0.85}>
            <PhoneCall color="#FFF" size={18} style={{ marginRight: 8 }} />
            <Text style={styles.callSupportText}>Liên hệ hỗ trợ 24/7</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resourceCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.resourceTitle}>Tài nguyên hữu ích</Text>
            <Text style={styles.resourceSub}>
              Khám phá các bài viết, video và bài tập giúp bạn chăm sóc sức khỏe
              tinh thần.
            </Text>
          </View>
          <Image
            source={require("../assets/images/calm.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appStage: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    textAlign: "center",
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
  },
  seeAllText: {
    fontFamily: "Inter-Bold",
    fontSize: 13,
    color: "#B18AF0",
    fontWeight: "600",
  },
  doctorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    width: 150,
    marginRight: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  doctorDegree: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: "#888",
  },
  doctorName: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    fontWeight: "700",
    color: "#2D3436",
  },
  doctorSpec: {
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: "#636E72",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  ratingText: {
    fontFamily: "Inter-Bold",
    fontSize: 11,
    fontWeight: "700",
    color: "#2D3436",
  },
  bookBtn: {
    backgroundColor: "#D8B4F8",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  bookBtnText: {
    fontFamily: "Inter-Bold",
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  emergencyCard: {
    backgroundColor: "#FFF0F2",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFE4E6",
  },
  emergencyHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  emergencyTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    fontWeight: "700",
    color: "#991B1B",
    marginBottom: 4,
  },
  emergencySub: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#7F1D1D",
    lineHeight: 17,
  },
  callSupportBtn: {
    backgroundColor: "#FF5252",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  callSupportText: {
    fontFamily: "Inter-Bold",
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
  },
  resourceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resourceTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 4,
  },
  resourceSub: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#636E72",
    lineHeight: 17,
  },
  cardImage: {
    width: 48,
    height: 48,
    marginLeft: 8,
  },
});
