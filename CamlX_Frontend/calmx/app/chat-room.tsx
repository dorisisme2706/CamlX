import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  CirclePlus,
  Ellipsis,
  Send,
  Smile,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../constants/theme";

const THEME_COLOR = Colors.theme.primary;

const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight || 0 : 44;

interface Message {
  id: string;
  sender: string;
  text: string;
  mine: boolean;
  time: string;
  type?: "message" | "system";
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "Người ẩn danh 182",
    text: "Xin chào mọi người 👋",
    mine: false,
    time: "21:05",
  },
  {
    id: "2",
    sender: "Người ẩn danh 724",
    text: "Hôm nay deadline dí quá nên stress thật sự.",
    mine: false,
    time: "21:06",
  },
  {
    id: "3",
    sender: "Người ẩn danh 311",
    text: "Mình cũng đang thức làm bài đây.",
    mine: false,
    time: "21:07",
  },
  {
    id: "4",
    sender: "Bạn",
    text: "Cố lên mọi người nhé ❤️",
    mine: true,
    time: "21:08",
  },
];

const RANDOM_USERS = [
  "Người ẩn danh 182",
  "Người ẩn danh 724",
  "Người ẩn danh 311",
  "Người ẩn danh 592",
  "Người ẩn danh 486",
  "Người ẩn danh 853",
  "Người ẩn danh 902",
  "Người ẩn danh 177",
];

const RANDOM_MESSAGES = [
  "Mình hiểu cảm giác đó.",
  "Cố lên nhé ❤️",
  "Bạn không hề cô đơn đâu.",
  "Mình cũng từng trải qua rồi.",
  "Mai sẽ ổn hơn thôi.",
  "Hôm nay mình cũng stress lắm.",
  "Deadline đúng là đáng sợ 😭",
  "Đi ngủ sớm một hôm thử xem.",
  "Có ai còn thức không?",
  "Mọi người học trường nào vậy?",
  "Chúc mọi người cuối tuần vui vẻ.",
  "Đừng bỏ cuộc nhé 💪",
  "Mình tin bạn làm được.",
  "Có ai muốn tâm sự không?",
  "Mình đang nghe đây.",
];

function CalyAvatar() {
  return (
    <Image
      source={require("../assets/images/red-cloud.png")}
      style={styles.avatar}
      resizeMode="contain"
    />
  );
}

export default function ChatRoomScreen() {
  const { hashtag } = useLocalSearchParams<{ hashtag: string }>();

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const user =
        RANDOM_USERS[Math.floor(Math.random() * RANDOM_USERS.length)];

      setTypingUser(user);

      setTimeout(() => {
        const text =
          RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: user,
            text,
            mine: false,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);

        requestAnimationFrame(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        });

        setTypingUser(null);
      }, 1800);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessages((prev) => [
      {
        id: "system",
        sender: "",
        mine: false,
        time: "",
        type: "system",
        text: `Bạn đã tham gia phòng ${hashtag || ""}`,
      },
      ...prev,
    ]);
  }, [hashtag]);

  const sendMessage = (userText: string) => {
    const text = userText.trim();
    if (!text) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Bạn",
      text,
      mine: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setDraft("");

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={THEME_COLOR}
        translucent
      />

      <KeyboardAvoidingView
        style={styles.canvas}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            style={styles.circleButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color={THEME_COLOR} size={22} />
          </Pressable>

          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{hashtag || "Phòng Chat"}</Text>
            <Text style={styles.autoReply}>128 người đang trò chuyện</Text>
          </View>

          <Pressable accessibilityRole="button" style={styles.circleButton}>
            <Ellipsis color={THEME_COLOR} size={22} />
          </Pressable>
        </View>

        {typingUser && (
          <View style={styles.typingBar}>
            <Text style={styles.typingText}>{typingUser} đang gõ...</Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          style={styles.conversation}
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.type === "system") {
              return (
                <View style={styles.systemContainer}>
                  <Text style={styles.systemText}>{item.text}</Text>
                </View>
              );
            }

            if (item.mine) {
              return (
                <View style={styles.userRow}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userMessageText}>{item.text}</Text>
                  </View>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              );
            }

            return (
              <View style={styles.incomingRow}>
                <CalyAvatar />

                <View style={{ maxWidth: "72%" }}>
                  <Text style={styles.senderName}>{item.sender}</Text>
                  <View style={styles.incomingBubble}>
                    <Text style={styles.messageText}>{item.text}</Text>
                  </View>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.composerArea}>
          <Pressable accessibilityRole="button" style={styles.addButton}>
            <CirclePlus color={THEME_COLOR} />
          </Pressable>

          <View style={styles.composer}>
            <TextInput
              style={styles.input}
              placeholder="Nhập tin nhắn..."
              placeholderTextColor="#8A8A8E"
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => sendMessage(draft)}
              returnKeyType="send"
              multiline={false}
            />
            {draft.trim().length > 0 ? (
              <Pressable onPress={() => sendMessage(draft)}>
                <Send color={THEME_COLOR} size={20} />
              </Pressable>
            ) : (
              <Smile color={THEME_COLOR} size={20} />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  canvas: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  header: {
    alignItems: "center",
    backgroundColor: THEME_COLOR,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: STATUSBAR_HEIGHT + 10,
  },
  circleButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  headerTitleWrap: {
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.4,
    lineHeight: 24,
  },
  autoReply: {
    fontFamily: "Inter-Regular",
    color: "#90EE90",
    fontSize: 11,
    lineHeight: 18,
  },

  conversation: {
    flex: 1,
    paddingTop: 11,
  },
  incomingRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 8,
  },
  avatar: {
    height: 32,
    marginRight: 10,
    width: 32,
    marginBottom: 16,
  },
  senderName: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#636E72",
    marginBottom: 4,
    fontWeight: "500",
  },
  incomingBubble: {
    backgroundColor: "rgba(216, 180, 248, 0.30)",
    borderColor: THEME_COLOR,
    borderRadius: 15,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageText: {
    fontFamily: "Inter-Regular",
    color: "#2D3436",
    fontSize: 15,
    lineHeight: 22,
  },
  userRow: {
    alignItems: "flex-end",
    marginTop: 12,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  userBubble: {
    backgroundColor: THEME_COLOR,
    borderRadius: 15,
    borderBottomRightRadius: 4,
    maxWidth: "80%",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userMessageText: {
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
  },
  timeText: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 4,
  },

  typingBar: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: "#F5EEFE",
  },
  typingText: {
    fontFamily: "Inter-Regular",
    color: THEME_COLOR,
    fontSize: 13,
    fontStyle: "italic",
  },

  systemContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  systemText: {
    fontFamily: "Inter-Bold",
    backgroundColor: "rgba(216, 180, 248, 0.30)",
    color: THEME_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "500",
  },

  composerArea: {
    alignItems: "center",
    borderTopColor: "#F3E8FF",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: 12,
    minHeight: 72,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  addButton: {
    alignItems: "center",
    height: 26,
    justifyContent: "center",
    width: 26,
  },
  composer: {
    alignItems: "center",
    borderColor: "#D8B4F8",
    borderRadius: 22,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 44,
    paddingHorizontal: 14,
  },
  input: {
    fontFamily: "Inter-Regular",
    flex: 1,
    fontSize: 15,
    color: "#2D3436",
    paddingRight: 10,
  },
});
