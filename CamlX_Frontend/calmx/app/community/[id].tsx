import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  MessageSquare,
  Pencil,
  Share2,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Popover from "react-native-popover-view";
import { usePostStore } from "../../store/postStore";
import CommentsScreen from "../comment";
// ————————————————————————————————————————————————
// Types
// ————————————————————————————————————————————————

export interface GroupInfo {
  id: string;
  hashtag: string;
  description: string;
  memberCount: number;
  onlineCount: number;
  accent: string;
}

export interface Post {
  id: string;
  alias: string;
  emoji: string;
  time: string;
  content: string;
  hugs: number;
  empathy: number;
  listening: number;
  comments: number;
  images?: string[];
}

// ————————————————————————————————————————————————
// Mock data
// ————————————————————————————————————————————————
const GROUPS: GroupInfo[] = [
  {
    id: "1",
    hashtag: "#KhủngHoảngDeadline",
    description: "Nơi trút bầu tâm sự khi deadline dồn dập, không ai phán xét.",
    memberCount: 1284,
    onlineCount: 37,
    accent: "#D8B4F8",
  },
  {
    id: "2",
    hashtag: "#ÁpLựcĐồngTrangLứa",
    description: "Chia sẻ áp lực khi so sánh bản thân với bạn bè cùng lứa.",
    memberCount: 962,
    onlineCount: 21,
    accent: "#D8B4F8",
  },
  {
    id: "3",
    hashtag: "#ChênhVênhTuổi20",
    description:
      "Những băn khoăn, hoang mang tuổi đôi mươi, cùng nhau tìm hướng đi.",
    memberCount: 1530,
    onlineCount: 44,
    accent: "#D8B4F8",
  },
  {
    id: "4",
    hashtag: "#StressCôngSở",
    description:
      "Giải tỏa áp lực công việc, đồng nghiệp, sếp - ẩn danh hoàn toàn.",
    memberCount: 2107,
    onlineCount: 58,
    accent: "#D8B4F8",
  },
];

const POSTS_BY_HASHTAG: Record<string, Post[]> = {
  "#KhủngHoảngDeadline": [
    {
      id: "1",
      alias: "Người dùng ẩn danh 6528",
      emoji: "N",
      time: "2 giờ trước",
      content:
        "Deadline dí sát nút mà đầu óc trống rỗng, không biết bắt đầu từ đâu nữa. Có ai đang giống mình không...",
      hugs: 86,
      empathy: 54,
      listening: 21,
      comments: 32,
      images: [],
    },
    {
      id: "2",
      alias: "Nô lệ tư bản",
      emoji: "N",
      time: "5 giờ trước",
      content:
        "Thức tới 3 giờ sáng để hoàn thành báo cáo, nộp xong chỉ muốn khóc vì kiệt sức. Nhưng thôi, xong rồi thì cũng nhẹ lòng hơn một chút.",
      hugs: 132,
      empathy: 77,
      listening: 40,
      comments: 58,
      images: [],
    },
  ],
  "#ÁpLựcĐồngTrangLứa": [
    {
      id: "1",
      alias: "Kẻ mộng mơ chậm chân",
      emoji: "🌸",
      time: "1 giờ trước",
      content:
        "Bạn bè ai cũng đã có nhà, có xe, có sự nghiệp ổn định. Còn mình vẫn loay hoay chưa biết mình muốn gì. Đôi lúc thấy mình thật kém cỏi.",
      hugs: 64,
      empathy: 91,
      listening: 18,
      comments: 27,
      images: [],
    },
    {
      id: "2",
      alias: "Ánh sao lặng lẽ",
      emoji: "⭐",
      time: "4 giờ trước",
      content:
        "Mình biết so sánh là không nên, nhưng cứ lướt mạng xã hội là lại thấy chạnh lòng. Có ai có cách nào để bớt để tâm đến điều đó không?",
      hugs: 45,
      empathy: 68,
      listening: 33,
      comments: 19,
      images: [],
    },
  ],
  "#ChênhVênhTuổi20": [
    {
      id: "1",
      alias: "Người lạ giữa ngã ba",
      emoji: "☁️",
      time: "3 giờ trước",
      content:
        "Sắp ra trường mà vẫn chưa biết mình thực sự muốn làm gì. Mọi người xung quanh có vẻ đều chắc chắn về hướng đi, chỉ mình là mông lung.",
      hugs: 102,
      empathy: 88,
      listening: 46,
      comments: 41,
      images: [],
    },
    {
      id: "2",
      alias: "Cơn gió thoáng qua",
      emoji: "🕊️",
      time: "8 giờ trước",
      content:
        "Tuổi 20 sao lại nhiều nỗi sợ đến vậy. Sợ chọn sai ngành, sợ làm bố mẹ thất vọng, sợ tụt lại phía sau. Viết ra đây thấy nhẹ lòng hơn một chút.",
      hugs: 77,
      empathy: 59,
      listening: 25,
      comments: 22,
      images: [],
    },
  ],
  "#StressCôngSở": [
    {
      id: "1",
      alias: "Chiếc ghế văn phòng mỏi",
      emoji: "🍵",
      time: "30 phút trước",
      content:
        "Họp liên tục từ sáng tới chiều, việc thì vẫn dồn ứ chưa làm được gì. Mình chỉ ước có một ngày được thở thật sâu mà không lo deadline.",
      hugs: 58,
      empathy: 42,
      listening: 15,
      comments: 24,
      images: [],
    },
    {
      id: "2",
      alias: "Ánh đèn neon khuya",
      emoji: "🌃",
      time: "6 giờ trước",
      content:
        "Sếp nhắn tin lúc 11 giờ đêm hỏi tiến độ, mình thức dậy trả lời xong không ngủ lại được nữa. Không biết đến bao giờ mới hết cảm giác lo âu này.",
      hugs: 95,
      empathy: 71,
      listening: 38,
      comments: 35,
      images: [],
    },
  ],
};

// ————————————————————————————————————————————————
// Screen
// ————————————————————————————————————————————————

interface Props {
  group?: GroupInfo;
  onJoinPress?: () => void;
  onOpenChat?: () => void;
}

export default function CommunityScreen({ onJoinPress, onOpenChat }: Props) {
  const { id } = useLocalSearchParams<{ id: string }>();

  const group = GROUPS.find((g) => g.id === id) ?? GROUPS[0];

  const { postsByHashtag, setInitialPosts } = usePostStore();

  useEffect(() => {
    if (Object.keys(postsByHashtag).length === 0) {
      setInitialPosts(POSTS_BY_HASHTAG);
    }
  }, []);

  const posts = postsByHashtag[group.hashtag] ?? [];

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("Mới nhất");

  const bottomSheetRef =
    useRef<React.ComponentRef<typeof BottomSheetModal>>(null);

  const openComments = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#E9D5FF" />

        {/* Top Header Navigation */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#2D3436" size={24} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {group.hashtag}
            </Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.joinBtn, { backgroundColor: group.accent }]}
              onPress={onJoinPress}
            >
              <Text style={styles.joinBtnText}>Tham gia</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {/* Members & Online Info Row */}
              <View style={styles.memberInfoRow}>
                <Text style={styles.memberInfoText}>
                  <Text style={styles.boldText}>
                    {group.memberCount.toLocaleString("vi-VN")}
                  </Text>{" "}
                  thành viên <Text style={styles.greenDot}>•</Text>{" "}
                  <Text style={styles.boldText}>{group.onlineCount}</Text> đang
                  trực tuyến
                </Text>
              </View>

              {/* Live Chat Card Section */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chatCardsContainer}
              >
                <View style={styles.chatCard}>
                  <View style={styles.chatCardHeader}>
                    <View style={styles.chatCardMeta}>
                      <Text style={styles.chatTitle}>Trò chuyện trực tiếp</Text>
                      <Text style={styles.chatHost}>
                        Cộng đồng ẩn danh · An toàn & thấu hiểu
                      </Text>
                      <Text style={styles.chatSubInfo}>
                        {group.hashtag} · 128 đã tham gia
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.openChatBtn,
                      { backgroundColor: group.accent },
                    ]}
                    onPress={() =>
                      router.push({
                        pathname: "/chat-room",
                        params: {
                          hashtag: group.hashtag,
                        },
                      })
                    }
                  >
                    <Text style={styles.openChatText}>
                      Vào phòng trò chuyện
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Post Composer Input Row */}
              <TouchableOpacity
                style={styles.composerRow}
                activeOpacity={0.8}
                onPress={() => {
                  router.push({
                    pathname: "/post",
                    params: {
                      hashtag: group.hashtag,
                    },
                  });
                }}
              >
                <View
                  style={[
                    styles.composerAvatar,
                    { backgroundColor: group.accent },
                  ]}
                >
                  <Pencil color="#fff" size={16} />
                </View>

                <View style={styles.composerInputContainer}>
                  <Text style={styles.composerPlaceholder}>
                    Hãy chia sẻ cảm nghĩ của bạn
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Divider line */}
              <View style={styles.divider} />

              {/* Filter */}
              <Popover
                isVisible={visible}
                onRequestClose={() => setVisible(false)}
                from={
                  <TouchableOpacity
                    style={styles.filterRow}
                    onPress={() => setVisible(true)}
                  >
                    <Text style={styles.filterText}>{selected} ▼</Text>
                  </TouchableOpacity>
                }
                popoverStyle={styles.popover}
                arrowShift={-0.6}
              >
                {["Mới nhất", "Nhiều phản hồi nhất", "Nổi bật nhất"].map(
                  (item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.option}
                      onPress={() => {
                        setSelected(item);
                        setVisible(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          item === selected && styles.selectedOption,
                        ]}
                      >
                        {item === selected ? "✓  " : ""}
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </Popover>
            </>
          }
          renderItem={({ item }) => (
            <PostCard
              post={item}
              accent={group.accent}
              onOpenComments={openComments}
            />
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
        />

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["80%"]}
          enablePanDownToClose
          enableDynamicSizing={false}
          animateOnMount
          handleComponent={null}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
            />
          )}
          keyboardBehavior="fillParent"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          onChange={(index) => {
            if (index === -1) {
              Keyboard.dismiss();
            }
          }}
          onDismiss={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <CommentsScreen
              embedded
              ListComponent={BottomSheetFlatList}
              InputComponent={BottomSheetTextInput}
              onClose={() => bottomSheetRef.current?.dismiss()}
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

// ————————————————————————————————————————————————
// Post card + reactions
// ————————————————————————————————————————————————

type ReactionType = "hug" | "empathy" | "listening";

function PostCard({
  post,
  accent,
  onOpenComments,
}: {
  post: Post;
  accent: string;
  onOpenComments: () => void;
}) {
  const [hugs, setHugs] = useState(post.hugs);
  const [empathy, setEmpathy] = useState(post.empathy);
  const [listening, setListening] = useState(post.listening);
  const [pressed, setPressed] = useState<Record<ReactionType, boolean>>({
    hug: false,
    empathy: false,
    listening: false,
  });
  const [burstKeys, setBurstKeys] = useState<Record<ReactionType, number>>({
    hug: 0,
    empathy: 0,
    listening: 0,
  });

  const handleReact = (type: ReactionType) => {
    const isPressed = pressed[type];

    setPressed((prev) => ({
      ...prev,
      [type]: !isPressed,
    }));

    if (type === "hug") {
      setHugs((v) => (isPressed ? v - 1 : v + 1));
    }

    if (type === "empathy") {
      setEmpathy((v) => (isPressed ? v - 1 : v + 1));
    }

    if (type === "listening") {
      setListening((v) => (isPressed ? v - 1 : v + 1));
    }

    // Chỉ hiện hiệu ứng khi thả reaction
    if (!isPressed) {
      setBurstKeys((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    }
  };

  return (
    <View style={cardStyles.card}>
      {/* Left side: Avatar ẩn danh */}
      <View style={cardStyles.leftColumn}>
        <View
          style={[
            cardStyles.avatarContainer,
            { backgroundColor: accent + "33" },
          ]}
        >
          <Text style={cardStyles.avatarEmoji}>{post.emoji}</Text>
        </View>
      </View>

      {/* Right side */}
      <View style={cardStyles.rightColumn}>
        <View style={cardStyles.authorRow}>
          <Text style={cardStyles.authorName}>{post.alias}</Text>
          <Text style={cardStyles.time}>· {post.time}</Text>
        </View>

        <Text style={cardStyles.content}>{post.content}</Text>

        {post.images?.length > 0 && (
          <FlatList
            horizontal
            data={post.images}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.postImage} />
            )}
          />
        )}

        {/* Bộ ba phản hồi thấu cảm */}
        <View style={cardStyles.reactionsWrap}>
          <ReactionPill
            icon={require("../../assets/images/optimistic.png")}
            label="Ôm nhẹ"
            count={hugs}
            active={pressed.hug}
            accent={accent}
            burstKey={burstKeys.hug}
            onPress={() => handleReact("hug")}
          />

          <ReactionPill
            icon={require("../../assets/images/sad.png")}
            label="Đồng cảm"
            count={empathy}
            active={pressed.empathy}
            accent={accent}
            burstKey={burstKeys.empathy}
            onPress={() => handleReact("empathy")}
          />

          <ReactionPill
            icon={require("../../assets/images/anxious.png")}
            label="Thấu hiểu"
            count={listening}
            active={pressed.listening}
            accent={accent}
            burstKey={burstKeys.listening}
            onPress={() => handleReact("listening")}
          />
        </View>

        {/* Bình luận / chia sẻ */}
        <View style={cardStyles.metaRow}>
          <TouchableOpacity style={cardStyles.metaBtn} onPress={onOpenComments}>
            <MessageSquare color={accent} size={14} />
            <Text style={cardStyles.metaText}>{post.comments} phản hồi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={cardStyles.metaBtn}>
            <Share2 color={accent} size={14} />
            <Text style={cardStyles.metaText}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function ReactionPill({
  icon,
  label,
  count,
  active,
  accent,
  burstKey,
  onPress,
}: {
  icon: any;
  label: string;
  count: number;
  active: boolean;
  accent: string;
  burstKey: number;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        cardStyles.pill,
        active && { backgroundColor: accent + "26", borderColor: accent },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ParticleBurst triggerKey={burstKey} accent={accent} />
      <Image
        source={icon}
        style={[cardStyles.pillIcon, active && { tintColor: accent }]}
        resizeMode="contain"
      />
      <Text style={cardStyles.pillLabel} numberOfLines={2}>
        {label}
      </Text>
      <Text style={[cardStyles.pillCount, active && { color: accent }]}>
        {count}
      </Text>
    </TouchableOpacity>
  );
}
// ————————————————————————————————————————————————
// Hiệu ứng Vòng sóng lan tỏa & Hạt chấm tròn tỏa ra
// ————————————————————————————————————————————————

const DOT_COUNT = 8;

function ParticleBurst({
  triggerKey,
  accent,
}: {
  triggerKey: number;
  accent: string;
}) {
  const ringProgress = useRef(new Animated.Value(0)).current;

  const dotProgresses = useRef(
    Array.from({ length: DOT_COUNT }, () => new Animated.Value(0)),
  ).current;

  const dotsConfig = useRef(
    Array.from({ length: DOT_COUNT }, (_, i) => {
      const angle = (i * (360 / DOT_COUNT) * Math.PI) / 180;
      const distance = 35 + Math.random() * 25;
      return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 10,
        size: 5 + Math.random() * 5,
        delay: Math.random() * 60,
      };
    }),
  );

  React.useEffect(() => {
    if (triggerKey === 0) return;

    ringProgress.setValue(0);
    dotProgresses.forEach((p) => p.setValue(0));

    dotsConfig.current = Array.from({ length: DOT_COUNT }, (_, i) => {
      const angle = (i * (360 / DOT_COUNT) * Math.PI) / 180;
      const distance = 40 + Math.random() * 25;
      return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 15,
        size: 5 + Math.random() * 5,
        delay: Math.random() * 50,
      };
    });

    const dotAnimations = dotProgresses.map((p, i) =>
      Animated.timing(p, {
        toValue: 1,
        duration: 550,
        delay: dotsConfig.current[i].delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    );

    const ringAnimation = Animated.timing(ringProgress, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    Animated.parallel([ringAnimation, ...dotAnimations]).start();
  }, [triggerKey]);

  if (triggerKey === 0) return null;

  const ringScale = ringProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 2.2],
  });
  const ringOpacity = ringProgress.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0.8, 0.5, 0],
  });

  return (
    <View pointerEvents="none" style={cardStyles.particleLayer}>
      <Animated.View
        style={[
          cardStyles.pulseRing,
          {
            borderColor: accent,
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
      />

      {dotProgresses.map((p, i) => {
        const config = dotsConfig.current[i];

        const translateX = p.interpolate({
          inputRange: [0, 1],
          outputRange: [0, config.dx],
        });
        const translateY = p.interpolate({
          inputRange: [0, 1],
          outputRange: [0, config.dy],
        });
        const opacity = p.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, 1, 0.8, 0],
        });
        const scale = p.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.2, 1.2, 0.4],
        });

        return (
          <Animated.View
            key={i}
            style={[
              cardStyles.dotParticle,
              {
                width: config.size,
                height: config.size,
                borderRadius: config.size / 2,
                backgroundColor: "#FBBF24",
                opacity,
                transform: [{ translateX }, { translateY }, { scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

// ————————————————————————————————————————————————
// Styles
// ————————————————————————————————————————————————

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 54,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: "#E9D5FF",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backIcon: { color: "#2D3436", fontSize: 22, fontWeight: "300" },
  headerTitleContainer: { flex: 1, paddingHorizontal: 8 },
  headerTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 19,
    fontWeight: "700",
    color: "#fff",
  },
  headerSubtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#636E72",
    marginTop: 2,
  },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  joinBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  joinBtnText: {
    fontFamily: "Inter-Bold",
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  memberInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 12,
  },
  memberInfoText: {
    fontFamily: "Inter-Regular",
    color: "#636E72",
    fontSize: 13,
    flexShrink: 1,
  },
  boldText: { fontFamily: "Inter-Bold", color: "#2D3436", fontWeight: "700" },
  greenDot: { color: "#4ADE80" },

  chatCardsContainer: { paddingHorizontal: 16, marginTop: 16, gap: 12 },
  chatCard: {
    backgroundColor: "#F5EEFE",
    borderRadius: 20,
    width: 300,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3E8FF",
  },
  chatCardHeader: { flexDirection: "row", justifyContent: "space-between" },
  chatCardMeta: { flex: 1, gap: 4 },
  chatTitle: {
    fontFamily: "Inter-Bold",
    color: "#2D3436",
    fontSize: 15,
    fontWeight: "700",
  },
  chatTime: { fontFamily: "Inter-Regular", color: "#636E72", fontSize: 12 },
  chatHost: {
    fontFamily: "Inter-Regular",
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 4,
  },
  chatSubInfo: { fontFamily: "Inter-Regular", color: "#8E8E93", fontSize: 11 },
  chatAvatars: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chatAvatarEmoji: { fontSize: 18 },
  openChatBtn: {
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 14,
  },
  openChatText: {
    fontFamily: "Inter-Bold",
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  composerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 22,
    gap: 12,
  },
  composerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  composerEmoji: { fontSize: 16 },
  composerInputContainer: {
    flex: 1,
    backgroundColor: "#F5EEFE",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  composerPlaceholder: {
    fontFamily: "Inter-Regular",
    color: "#8A8A8E",
    fontSize: 13,
  },
  divider: { height: 0.5, backgroundColor: "#F3E8FF", marginTop: 20 },
  filterRow: { paddingHorizontal: 16, marginTop: 14 },
  filterText: {
    color: "#D8B4F8",
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    fontSize: 14,
  },

  popover: {
    borderRadius: 16,
    width: 200,
    marginLeft: -40,
  },

  option: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  optionText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#2D3436",
  },

  selectedOption: {
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: "#D8B4F8",
  },

  postImage: {
    width: 220,
    height: 220,
    borderRadius: 12,
    marginTop: 10,
    marginRight: 10,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  leftColumn: { alignItems: "center" },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: { fontSize: 20 },
  rightColumn: { flex: 1 },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  authorName: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    fontWeight: "700",
    color: "#2D3436",
  },
  time: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#8E8E93",
  },
  content: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#2D3436",
    lineHeight: 21,
    marginTop: 5,
  },

  reactionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
    position: "relative",
    overflow: "visible",
  },

  pulseRing: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
  },

  dotParticle: {
    position: "absolute",
  },
  pill: {
    flexBasis: "31%",
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#F3E8FF",
    backgroundColor: "#F5EEFE",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
    gap: 2,
    position: "relative",
    overflow: "visible",
  },
  pillIcon: {
    width: 22,
    height: 22,
    marginBottom: 4,
  },
  pillLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: "#636E72",
    textAlign: "center",
    lineHeight: 12,
  },
  pillCount: {
    fontFamily: "Inter-Bold",
    fontSize: 11,
    fontWeight: "700",
    color: "#8E8E93",
    marginTop: 1,
  },

  particleLayer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 1,
    height: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    overflow: "visible",
  },
  particle: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "700",
  },

  metaRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 20,
  },
  metaBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaIcon: { fontSize: 14 },
  metaText: { fontFamily: "Inter-Regular", fontSize: 12, color: "#636E72" },
});
