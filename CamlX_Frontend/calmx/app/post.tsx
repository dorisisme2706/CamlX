import { usePostStore } from "@/store/postStore";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreatePostScreen() {
  const [content, setContent] = useState("");
  const [mediaUris, setMediaUris] = useState<string[]>([]);

  const addPost = usePostStore((state) => state.addPost);

  const { hashtag } = useLocalSearchParams<{
    hashtag: string;
  }>();

  const handleSubmit = () => {
    addPost(hashtag, {
      id: Date.now().toString(),
      alias: "Người dùng ẩn danh 1103",
      emoji: "😊",
      time: "Vừa xong",
      content,
      hugs: 0,
      empathy: 0,
      listening: 0,
      comments: 0,
      images: mediaUris,
    });

    router.back();
  };

  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setMediaUris(result.assets.map((asset) => asset.uri));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#E9D5FF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerSide}
        >
          <Text style={styles.headerSideText}>Hủy</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo bài viết</Text>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Content field */}
        <Text style={styles.label}>Nội dung</Text>
        <View style={[styles.inputBox, styles.contentBox]}>
          <TextInput
            style={styles.contentInput}
            placeholder="Nội dung..."
            placeholderTextColor="#8A8A8E"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Media picker */}
        <Text style={styles.label}>Thêm ảnh/video</Text>
        <View style={styles.mediaRow}>
          <TouchableOpacity style={styles.addMediaBtn} onPress={pickImages}>
            <Text style={styles.addMediaIcon}>+</Text>
          </TouchableOpacity>
          {mediaUris.map((uri) => (
            <Image key={uri} source={{ uri }} style={styles.mediaThumbnail} />
          ))}
        </View>
      </ScrollView>

      {/* Submit */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitBtn,
            !content.trim() && styles.submitBtnDisabled,
          ]}
          onPress={handleSubmit}
          activeOpacity={0.85}
          disabled={!content.trim()}
        >
          <Text style={styles.submitText}>Hoàn tất</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#E9D5FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 54 : 28,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  headerSide: { width: 48 },
  headerSideText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#fff",
  },
  headerTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },

  scroll: { flex: 1 },
  scrollContent: { padding: 20, gap: 6 },

  label: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    color: "#2D3436",
    marginTop: 14,
    marginBottom: 8,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: "#F3E8FF",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  titleInput: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#2D3436",
    height: 40,
  },
  contentBox: { minHeight: 160 },
  contentInput: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#2D3436",
    minHeight: 140,
    lineHeight: 20,
  },

  mediaRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  addMediaBtn: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#D8B4F8",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  addMediaIcon: {
    fontSize: 28,
    color: "#D8B4F8",
    lineHeight: 32,
  },
  mediaThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F5EEFE",
  },

  visibilityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3E8FF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  visibilityLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#636E72",
  },

  submitBtn: {
    marginBottom: 10,
    backgroundColor: "#D8B4F8",
    borderRadius: 14,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitText: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: "#fff",
    letterSpacing: 0.2,
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3E8FF",
  },
});
