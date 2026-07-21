import { useRouter } from "expo-router"; // Tích hợp Expo Router
import { ChevronLeft, ChevronRight, Zap } from "lucide-react-native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Circle as SvgCircle } from "react-native-svg";

const EMOTIONS = [
  {
    key: "angry",
    label: "Giận dữ",
    image: require("../assets/images/angry.png"),
  },
  { key: "sad", label: "Buồn", image: require("../assets/images/sad.png") },
  {
    key: "anxious",
    label: "Lo âu",
    image: require("../assets/images/anxious.png"),
  },
  {
    key: "happy",
    label: "Vui vẻ",
    image: require("../assets/images/happy.png"),
  },
  {
    key: "optimistic",
    label: "Lạc quan",
    image: require("../assets/images/optimistic.png"),
  },
];

// Component Đồ thị dạng sóng
function EmotionChart() {
  return (
    <View style={styles.chartContainer}>
      <Svg height="160" width="100%" viewBox="0 0 300 160">
        <Path
          d="M 30 100 Q 60 40, 90 70 T 150 40 T 210 110 T 270 30"
          fill="none"
          stroke="#D8B4F8"
          strokeWidth="2.5"
        />
        <SvgCircle cx="270" cy="30" r="6" fill="#D8B4F8" />
        <SvgCircle cx="270" cy="30" r="10" fill="#D8B4F8" opacity="0.2" />
      </Svg>
    </View>
  );
}

export default function EmotionTrackerScreen() {
  const router = useRouter();
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const offsetCells = Array.from({ length: 2 }, (_, i) => i);

  const getEmotionsForDate = (date: number) => {
    if (date >= 22) return [];

    const count = (date % 3) + 1;
    const result = [];
    for (let i = 0; i < count; i++) {
      const emotionIndex = (date * 3 + i) % EMOTIONS.length;
      result.push(EMOTIONS[emotionIndex]);
    }
    return result;
  };

  const renderTriangleEmotions = (emotions: typeof EMOTIONS) => {
    if (!emotions || emotions.length === 0) {
      return <View style={styles.emptyEmotionSlot} />;
    }

    if (emotions.length === 1) {
      return (
        <View style={styles.singleEmotionWrap}>
          <Image
            source={emotions[0].image}
            style={styles.gridEmoji}
            resizeMode="contain"
          />
        </View>
      );
    }

    if (emotions.length === 2) {
      return (
        <View style={styles.triangleContainer}>
          <Image
            source={emotions[0].image}
            style={styles.gridEmoji}
            resizeMode="contain"
          />
          <View style={[styles.bottomRow, { marginTop: -3 }]}>
            <Image
              source={emotions[1].image}
              style={[styles.gridEmoji, { marginLeft: 6 }]}
              resizeMode="contain"
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.triangleContainer}>
        <Image
          source={emotions[0].image}
          style={[styles.gridEmoji, { zIndex: 2 }]}
          resizeMode="contain"
        />
        <View style={styles.bottomRow}>
          <Image
            source={emotions[1].image}
            style={[styles.gridEmoji, styles.overlapLeft]}
            resizeMode="contain"
          />
          <Image
            source={emotions[2].image}
            style={[styles.gridEmoji, styles.overlapRight]}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.appStage}>
      <View style={styles.container}>
        <View style={styles.calmHeader}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Theo dõi cảm xúc</Text>

          <TouchableOpacity style={styles.streakPill}>
            <Zap color="#EAB308" fill="#EAB308" size={16} />
            <Text style={styles.streakText}>100</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Tổng quan tuần này</Text>
              <View style={styles.dropdownBadge}>
                <Text style={styles.dropdownText}>7 ngày qua</Text>
                <Text style={{ fontSize: 10, color: "#636E72" }}> ▼</Text>
              </View>
            </View>

            <View style={styles.chartWrapper}>
              <View style={styles.emojiAxis}>
                {[...EMOTIONS].reverse().map((item) => (
                  <Image
                    key={item.key}
                    source={item.image}
                    style={styles.axisEmoji}
                    resizeMode="contain"
                  />
                ))}
              </View>

              <View style={{ flex: 1 }}>
                <EmotionChart />
                <View style={styles.daysAxis}>
                  {days.map((day, idx) => (
                    <Text key={idx} style={styles.dayText}>
                      {day}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity>
                <ChevronLeft color="#2D3436" size={20} />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>Tháng 7, 2026</Text>
              <TouchableOpacity>
                <ChevronRight color="#2D3436" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.weekGrid}>
              {days.map((d, i) => (
                <Text key={i} style={styles.weekHeadText}>
                  {d}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {offsetCells.map((_, i) => (
                <View key={`offset-${i}`} style={styles.dateCell} />
              ))}

              {calendarDays.map((date) => {
                const isSelected = date === 21;
                const dayEmotions = getEmotionsForDate(date);

                return (
                  <View key={date} style={styles.dateCell}>
                    <View
                      style={[
                        styles.dateNumWrap,
                        isSelected && styles.selectedDateWrap,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dateNumText,
                          isSelected && styles.selectedDateText,
                        ]}
                      >
                        {date}
                      </Text>
                    </View>

                    <View style={styles.emotionContainer}>
                      {renderTriangleEmotions(dayEmotions)}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={[styles.card, { marginBottom: 10 }]}>
            <Text style={styles.cardTitle}>Thống kê cảm xúc</Text>
            <View style={styles.statsRow}>
              {[
                { ...EMOTIONS[0], percent: "18%" },
                { ...EMOTIONS[1], percent: "22%" },
                { ...EMOTIONS[2], percent: "28%" },
                { ...EMOTIONS[3], percent: "22%" },
                { ...EMOTIONS[4], percent: "10%" },
              ].map((item) => (
                <View key={item.key} style={styles.statItem}>
                  <Image
                    source={item.image}
                    style={styles.statEmoji}
                    resizeMode="contain"
                  />
                  <Text style={styles.statPercent}>{item.percent}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  calmHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 96,
    paddingTop: 40,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    backgroundColor: "#E9D5FF",
  },
  iconBtn: {
    padding: 6,
    width: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  streakText: {
    fontFamily: "Inter-Bold",
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
  },
  dropdownBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5EEFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dropdownText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#636E72",
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  emojiAxis: {
    justifyContent: "space-between",
    height: 160,
    marginRight: 8,
  },
  axisEmoji: {
    width: 20,
    height: 20,
  },
  chartContainer: {
    height: 160,
    justifyContent: "center",
  },
  daysAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 10,
  },
  dayText: {
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: "#8E8E93",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  calendarTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    fontWeight: "700",
    color: "#2D3436",
  },
  weekGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekHeadText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#8E8E93",
    width: 32,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateCell: {
    width: "14.28%",
    alignItems: "center",
    marginBottom: 10,
  },
  dateNumWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDateWrap: {
    backgroundColor: "#D8B4F8",
  },
  dateNumText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#2D3436",
  },
  selectedDateText: {
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    fontWeight: "700",
  },
  emotionContainer: {
    marginTop: 2,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  singleEmotionWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  triangleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: -4,
  },
  gridEmoji: {
    width: 11,
    height: 11,
  },
  overlapLeft: {
    marginRight: -2,
    zIndex: 1,
  },
  overlapRight: {
    marginLeft: -2,
    zIndex: 1,
  },
  emptyEmotionSlot: {
    height: 22,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statEmoji: {
    width: 30,
    height: 30,
  },
  statPercent: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
    fontWeight: "600",
    color: "#2D3436",
    marginTop: 6,
  },
});
