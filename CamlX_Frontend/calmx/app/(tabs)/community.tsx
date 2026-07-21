import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const GROUPS = [
  {
    id: "1",
    hashtag: "#KhủngHoảngDeadline",
    description: "Nơi trút bầu tâm sự khi deadline dồn dập, không ai phán xét.",
    memberCount: 1284,
    onlineCount: 37,
    avatar: require("../../assets/images/angry.png"),
    accent: "#FCA5A5",
  },
  {
    id: "2",
    hashtag: "#ÁpLựcĐồngTrangLứa",
    description: "Chia sẻ áp lực khi so sánh bản thân với bạn bè cùng lứa.",
    memberCount: 962,
    onlineCount: 21,
    avatar: require("../../assets/images/optimistic.png"),
    accent: "#FDE68A",
  },
  {
    id: "3",
    hashtag: "#ChênhVênhTuổi20",
    description:
      "Những băn khoăn, hoang mang tuổi đôi mươi, cùng nhau tìm hướng đi.",
    memberCount: 1530,
    onlineCount: 44,
    avatar: require("../../assets/images/sad.png"),
    accent: "#A7F3D0",
  },
  {
    id: "4",
    hashtag: "#StressCôngSở",
    description:
      "Giải tỏa áp lực công việc, đồng nghiệp, sếp - ẩn danh hoàn toàn.",
    memberCount: 2107,
    onlineCount: 58,
    avatar: require("../../assets/images/happy.png"),
    accent: "#BFDBFE",
  },
];

export default function MessagesScreen() {
  const [search, setSearch] = useState("");

  const filtered = GROUPS.filter((g) =>
    g.hashtag.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vòng Tròn Đồng Điệu</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm nhóm theo hashtag"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
          <View style={iconStyles.icon}>
            <Search color={iconStyles.placeholder.color} />
          </View>
        </View>
      </View>

      {/* Group list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupRow}
            activeOpacity={0.7}
            onPress={() =>
              router.navigate({
                pathname: "/community/[id]",
                params: {
                  id: item.id,
                },
              })
            }
          >
            <View style={styles.avatarWrapper}>
              <View style={[styles.avatarRing, { borderColor: item.accent }]}>
                <Image source={item.avatar} style={styles.groupAvatar} />
              </View>
            </View>
            <View style={styles.groupMeta}>
              <Text style={styles.groupName}>{item.hashtag}</Text>
              <Text style={styles.groupDesc} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.groupStats}>
                {item.memberCount.toLocaleString("vi-VN")} thành viên ·{" "}
                {item.onlineCount} đang hoạt động
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 54,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: "#E9D5FF",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  headerSide: {
    width: 40,
  },

  searchWrapper: { paddingHorizontal: 16, paddingVertical: 12 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#333",
  },
  searchIcon: { fontSize: 16 },

  list: { flex: 1 },
  listContent: { paddingBottom: 24 },
  groupRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  avatarWrapper: { position: "relative" },
  avatarRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  groupAvatar: { width: 48, height: 48, borderRadius: 24 },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D8B4F8",
    borderWidth: 2,
    borderColor: "#fff",
  },
  groupMeta: { flex: 1, gap: 2 },
  groupName: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    color: "#111",
  },
  groupDesc: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: "#888",
  },
  groupStats: {
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: "#B18AF0",
    marginTop: 2,
  },
});
