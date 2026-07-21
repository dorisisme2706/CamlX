import { Camera, Gift, Heart, Mic, Send, Smile } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface Comment {
  id: string;
  author: string;
  avatar: ReturnType<typeof require>;
  content: string;
  time: string;
  replyTo?: string;
  liked: boolean;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "Anhtai",
    avatar: require("../assets/images/caly.png"),
    content: "Nhìn mấy quả trứng dễ thương ghê",
    time: "5 giờ",
    liked: false,
  },
  {
    id: "2",
    author: "Anhdao",
    avatar: require("../assets/images/caly.png"),
    content: "nhìn thích thật haaaa",
    time: "5 giờ",
    replyTo: "@Anhtai",
    liked: false,
  },
  {
    id: "3",
    author: "Huumanh",
    avatar: require("../assets/images/caly.png"),
    content: "Bạn có thể chỉ mình vẽ được hemmm",
    time: "8 giờ",
    liked: false,
  },
  {
    id: "4",
    author: "Baongoc",
    avatar: require("../assets/images/caly.png"),
    content: "Mong là cuộc đời mình cũng dịu dàng",
    time: "10 giờ",
    liked: false,
  },
  {
    id: "5",
    author: "Tuvy",
    avatar: require("../assets/images/caly.png"),
    content: "Cố lên nhé!",
    time: "5 giờ",
    replyTo: "@Baongoc",
    liked: false,
  },
];

interface Props {
  onClose?: () => void;
  ListComponent?: React.ComponentType<any>;
  InputComponent?: React.ComponentType<any>;
  embedded?: boolean;
}

export default function CommentsScreen({
  onClose,
  ListComponent,
  InputComponent,
  embedded,
}: Props) {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [inputText, setInputText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);
  const List = ListComponent ?? FlatList;
  const Input = InputComponent ?? TextInput;

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSub = Keyboard.addListener(showEvent, () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c)),
    );
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newComment: Comment = {
      id: String(Date.now()),
      author: "Bạn",
      avatar: require("../assets/images/caly.png"),
      content: inputText.trim(),
      time: "Vừa xong",
      replyTo: replyingTo ?? undefined,
      liked: false,
    };
    setComments((prev) => [...prev, newComment]);
    setInputText("");
    setReplyingTo(null);
  };

  const handleReply = (author: string) => {
    setReplyingTo(`@${author}`);
    setInputText(`@${author} `);
    inputRef.current?.focus();
  };

  const Wrapper = embedded ? View : KeyboardAvoidingView;
  const wrapperProps = embedded
    ? {}
    : {
        behavior:
          Platform.OS === "ios" ? ("padding" as const) : ("height" as const),
      };

  return (
    <Wrapper style={styles.container} {...wrapperProps}>
      {/* Handle bar */}
      <View style={styles.handleBar} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Bình luận</Text>
      </View>

      {/* Comments list */}
      <List
        data={comments}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.commentRow, item.replyTo && styles.replyRow]}>
            <Image source={item.avatar as any} style={styles.avatar} />
            <View style={styles.commentBody}>
              <Text style={styles.authorName}>{item.author}</Text>
              <Text style={styles.commentText}>
                {item.replyTo && (
                  <Text style={styles.replyTag}>{item.replyTo} </Text>
                )}
                {item.content}
              </Text>
              <View style={styles.commentMeta}>
                <Text style={styles.timeText}>{item.time}</Text>
                <TouchableOpacity onPress={() => handleReply(item.author)}>
                  <Text style={styles.replyBtn}>Trả lời</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.likeBtn}
              onPress={() => handleLike(item.id)}
            >
              <Heart
                size={20}
                fill={item.liked ? "#D8B4F8" : "none"} // violet-300
                stroke={item.liked ? "#D8B4F8" : "black"} // violet-500 và gray-500
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Input toolbar */}
      <View
        style={[
          styles.toolbar,
          {
            paddingBottom: keyboardVisible ? 8 : Platform.OS === "ios" ? 28 : 8,
          },
        ]}
      >
        <TouchableOpacity style={styles.toolBtn}>
          <Smile size={20} color="#D8B4F8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn}>
          <Gift size={20} color="#D8B4F8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn}>
          <Mic size={20} color="#D8B4F8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn}>
          <Camera size={20} color="#D8B4F8" />
        </TouchableOpacity>

        <View style={styles.inputWrap}>
          <Input
            ref={inputRef}
            style={styles.input}
            placeholder="Nhập tin nhắn"
            placeholderTextColor="#aaa"
            value={inputText}
            onChangeText={setInputText}
            multiline
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity onPress={handleSend} style={styles.emojiBtn}>
            <Send size={20} color="#D8B4F8" />
          </TouchableOpacity>
        </View>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.08)",
    position: "relative",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "#D8B4F8",
  },
  sendIconBtn: { position: "absolute", right: 20 },
  sendIcon: { fontSize: 20, color: "#D8B4F8" },

  listContent: { padding: 16, gap: 20, paddingBottom: 20 },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, flexShrink: 0 },
  commentBody: { flex: 1 },
  authorName: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "#111",
    marginBottom: 2,
  },
  commentText: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  replyTag: {
    fontFamily: "Inter-Bold",
    color: "#D8B4F8",
  },
  commentMeta: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  timeText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#aaa",
  },
  replyBtn: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#999",
  },
  likeBtn: { paddingTop: 2 },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.08)",
    gap: 8,
    paddingBottom: 8,
  },
  toolBtn: { padding: 4 },
  toolIcon: { fontSize: 20 },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 100,
    paddingHorizontal: 14,
    minHeight: 36,
  },
  input: {
    flex: 1,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#333",
    maxHeight: 80,
  },
  emojiBtn: { marginLeft: 6 },
  emojiIcon: { fontSize: 20 },
  replyRow: {
    marginLeft: 52,
  },
});
