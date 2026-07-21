import { useRouter } from "expo-router";
import {
  ChevronLeft,
  CirclePlus,
  Ellipsis,
  Send,
  Smile,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/theme";

const DEFAULT_THEME = Colors.theme.primary;

const WARM_THEME = {
  headerBg: "#FEF3C7",
  headerText: "#D97706",
  accent: "#FBBF24",
  bubbleBg: "#FFFBEB",
  bubbleBorder: "#FDE68A",
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTENT_WIDTH = Math.min(SCREEN_WIDTH, 430);

type MessageType = "text" | "reconfirm" | "help_options";
type Sender = "caly" | "user";

type Message = {
  id: number;
  sender: Sender;
  text: string;
  type: MessageType;
};

const warningKeywords = [
  "tự tử",
  "tự sát",
  "muốn chết",
  "kết liễu",
  "tuyệt vọng",
  "trầm cảm",
  "chán sống",
  "điên",
];

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "caly",
    text: "Hôm nay nhìn bạn có vẻ vui ghê! Có chuyện gì đặc biệt phải hông nè",
    type: "text",
  },
];

function CalyAvatar() {
  return (
    <Image
      source={require("../../assets/images/red-cloud.png")}
      style={styles.avatar}
      resizeMode="contain"
    />
  );
}

function QuickActionButton({
  label,
  onPress,
  isWarmTheme,
}: {
  label: string;
  onPress: () => void;
  isWarmTheme: boolean;
}) {
  const textColor = isWarmTheme ? "#D97706" : DEFAULT_THEME;
  const borderColor = isWarmTheme ? WARM_THEME.bubbleBorder : DEFAULT_THEME;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.quickAction,
        { borderColor },
        pressed && { backgroundColor: isWarmTheme ? "#FEF3C7" : "#F5EEFE" },
      ]}
    >
      <Text style={[styles.quickActionText, { color: textColor }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function App() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const [isWarmTheme, setIsWarmTheme] = useState(false);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isReplying]);

  const handleSend = (userText: string) => {
    const text = userText.trim();
    if (!text || isReplying) return;

    const nextMsg: Message = {
      id: Date.now(),
      sender: "user",
      text,
      type: "text",
    };
    setMessages((prev) => [...prev, nextMsg]);
    setDraft("");
    setIsReplying(true);

    const containsWarning = warningKeywords.some((kw) =>
      text.toLowerCase().includes(kw),
    );

    setTimeout(() => {
      if (containsWarning) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "caly",
            text: "Caly nhận thấy bạn đang có những suy nghĩ tiêu cực. Bạn có cần Caly hỗ trợ kết nối với các chuyên gia tâm lý không?",
            type: "reconfirm",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "caly",
            text: "Mình luôn ở đây lắng nghe bạn chia sẻ nhé.",
            type: "text",
          },
        ]);
      }
      setIsReplying(false);
    }, 800);
  };

  const handleReconfirm = (needsHelp: boolean) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: needsHelp ? "Có, mình cần hỗ trợ" : "Không, mình ổn",
        type: "text",
      },
    ]);

    setIsReplying(true);

    if (needsHelp) {
      setIsWarmTheme(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "caly",
            text: "Caly biết là bạn đã phải cố gắng và mạnh mẽ rất nhiều rồi. Cảm ơn bạn vì đã dũng cảm chia sẻ với mình nhé.",
            type: "text",
          },
        ]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 2,
              sender: "caly",
              text: "Bạn không phải đối mặt với điều này một mình đâu. Đây là các kênh hỗ trợ chuyên nghiệp có thể đồng hành cùng bạn ngay lúc này:",
              type: "help_options",
            },
          ]);
          setIsReplying(false);
        }, 1200);
      }, 800);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "caly",
            text: "Caly hiểu rồi. Nếu lúc nào cảm thấy mệt mỏi quá, cứ nhắn cho mình nhé. Mình luôn ở đây.",
            type: "text",
          },
        ]);
        setIsReplying(false);
      }, 600);
    }
  };

  const renderMessage = (msg: Message, index: number) => {
    const isLast = index === messages.length - 1;

    if (msg.sender === "user") {
      return (
        <View key={msg.id} style={styles.userRow}>
          <View
            style={[
              styles.userBubble,
              {
                backgroundColor: isWarmTheme
                  ? WARM_THEME.accent
                  : DEFAULT_THEME,
              },
            ]}
          >
            <Text style={styles.userMessageText}>{msg.text}</Text>
          </View>
        </View>
      );
    }

    return (
      <View key={msg.id} style={styles.calyContainer}>
        <View style={styles.incomingRow}>
          <CalyAvatar />
          <View
            style={[
              styles.incomingBubble,
              {
                borderColor: isWarmTheme
                  ? WARM_THEME.bubbleBorder
                  : DEFAULT_THEME,
                backgroundColor: isWarmTheme
                  ? WARM_THEME.bubbleBg
                  : "rgba(216, 180, 248, 0.30)",
              },
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        </View>

        {msg.type === "reconfirm" && isLast && (
          <View style={styles.quickActions}>
            <QuickActionButton
              label="Có, mình cần hỗ trợ"
              isWarmTheme={isWarmTheme}
              onPress={() => handleReconfirm(true)}
            />
            <QuickActionButton
              label="Không, mình ổn"
              isWarmTheme={isWarmTheme}
              onPress={() => handleReconfirm(false)}
            />
          </View>
        )}

        {msg.type === "help_options" && (
          <View style={styles.helpOptionsContainer}>
            <Pressable
              style={[
                styles.primaryHelpButton,
                {
                  backgroundColor: isWarmTheme
                    ? WARM_THEME.accent
                    : DEFAULT_THEME,
                },
              ]}
              onPress={() => router.navigate("/care" as any)}
            >
              <Text style={styles.primaryHelpButtonText}>
                Trò chuyện với Chuyên gia
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.secondaryHelpButton,
                {
                  borderColor: isWarmTheme ? WARM_THEME.accent : DEFAULT_THEME,
                },
              ]}
              onPress={() => Linking.openURL("tel:111")}
            >
              <Text
                style={[
                  styles.secondaryHelpButtonText,
                  { color: isWarmTheme ? "#D97706" : DEFAULT_THEME },
                ]}
              >
                Gọi điện thoại Hotline 111
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  const currentThemeColor = isWarmTheme ? WARM_THEME.accent : DEFAULT_THEME;

  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.canvas}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* HEADER */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: isWarmTheme
                ? WARM_THEME.headerBg
                : DEFAULT_THEME,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            style={styles.circleButton}
            onPress={() => router.back()}
          >
            <ChevronLeft
              color={isWarmTheme ? WARM_THEME.headerText : DEFAULT_THEME}
            />
          </Pressable>
          <View style={styles.headerTitleWrap}>
            <Text
              style={[
                styles.headerTitle,
                isWarmTheme && { color: WARM_THEME.headerText },
              ]}
            >
              Chat cùng Caly
            </Text>
            <Text
              style={[styles.autoReply, isWarmTheme && { color: "#D97706" }]}
            >
              Trả lời tự động
            </Text>
          </View>
          <Pressable accessibilityRole="button" style={styles.circleButton}>
            <Ellipsis
              color={isWarmTheme ? WARM_THEME.headerText : DEFAULT_THEME}
            />
          </Pressable>
        </View>

        {/* BODY TIN NHẮN */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.conversation}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.timestamp}>20:32, 20 THG 11</Text>

          {messages.map(renderMessage)}

          {isReplying && (
            <View style={styles.incomingRow}>
              <CalyAvatar />
              <View
                style={[
                  styles.incomingBubble,
                  {
                    minHeight: 40,
                    justifyContent: "center",
                    borderColor: isWarmTheme
                      ? WARM_THEME.bubbleBorder
                      : DEFAULT_THEME,
                    backgroundColor: isWarmTheme
                      ? WARM_THEME.bubbleBg
                      : "rgba(216, 180, 248, 0.30)",
                  },
                ]}
              >
                <Text style={[styles.messageText, { color: "#8E8E93" }]}>
                  Caly đang gõ...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* COMPOSER NHẬP TIN NHẮN */}
        <View style={styles.composerArea}>
          <Pressable accessibilityRole="button" style={styles.addButton}>
            <CirclePlus color={currentThemeColor} />
          </Pressable>

          <View
            style={[
              styles.composer,
              {
                borderColor: isWarmTheme ? WARM_THEME.bubbleBorder : "#D8B4F8",
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Nhập tin nhắn..."
              placeholderTextColor="#8A8A8E"
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => handleSend(draft)}
              returnKeyType="send"
              multiline={false}
            />
            {draft.trim().length > 0 ? (
              <Pressable onPress={() => handleSend(draft)}>
                <Send color={currentThemeColor} size={20} />
              </Pressable>
            ) : (
              <Smile color={currentThemeColor} size={20} />
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
    alignSelf: "center",
    backgroundColor: "#F8F9FA",
    flex: 1,
    maxWidth: 430,
    width: CONTENT_WIDTH,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 110,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
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
  timestamp: {
    fontFamily: "Inter-Regular",
    alignSelf: "center",
    color: "#636E72",
    fontSize: 11,
    lineHeight: 18,
    marginBottom: 8,
  },
  calyContainer: {
    marginBottom: 4,
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
  },
  incomingBubble: {
    borderRadius: 15,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    maxWidth: SCREEN_WIDTH * 0.65,
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
    borderRadius: 15,
    borderBottomRightRadius: 4,
    maxWidth: SCREEN_WIDTH * 0.7,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userMessageText: {
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
  },
  quickActions: {
    alignItems: "flex-end",
    gap: 8,
    marginTop: 12,
    paddingRight: 20,
  },
  quickAction: {
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  quickActionText: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    fontWeight: "600",
  },
  helpOptionsContainer: {
    marginLeft: 62,
    marginRight: 20,
    marginTop: 10,
    gap: 10,
  },
  primaryHelpButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  primaryHelpButtonText: {
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  secondaryHelpButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryHelpButtonText: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    fontWeight: "bold",
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
