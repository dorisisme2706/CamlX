import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Heart,
  Lock,
  LogOut,
  ShieldCheck,
  SquarePen,
  UserRound,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Screen = "profile" | "bio";
const ICONSIZE = 18;

const Icon = ({
  name,
  color = "#2D3436",
}: {
  name: "user" | "lock" | "shield" | "logout" | "bell" | "heart";
  color?: string;
}) => {
  const icons = {
    user: <UserRound color={color} size={ICONSIZE} />,
    lock: <Lock color={color} size={ICONSIZE} />,
    shield: <ShieldCheck color={color} size={ICONSIZE} />,
    logout: <LogOut color={color} size={ICONSIZE} />,
    bell: <Bell color={color} size={ICONSIZE} />,
    heart: <Heart color={color} size={ICONSIZE} />,
  };
  return icons[name] || null;
};

const Avatar = () => (
  <View style={styles.avatarRing}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>M</Text>
    </View>
  </View>
);

function ProfileScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [secured, setSecured] = useState(false);
  const accountRows = [
    ["user", "Tài khoản của tôi", "Thay đổi thông tin tài khoản"],
    ["user", "Tài khoản đã lưu", "Quản lý tài khoản đã lưu"],
    ["lock", "Face ID / Touch ID", "Quản lý bảo mật thiết bị"],
    ["shield", "Xác thực hai lớp", "Tăng cường bảo mật tài khoản"],
    ["logout", "Đăng xuất", "Đăng xuất khỏi tài khoản hiện tại"],
  ] as const;

  const router = useRouter();

  return (
    <View style={styles.appStage}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.calmHeader}>
          <Text style={styles.headerTitle}>Hồ sơ</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.accountCard}
            onPress={() => setScreen("bio")}
            activeOpacity={0.8}
          >
            <Avatar />
            <View style={styles.accountNameContainer}>
              <Text style={styles.accountName}>Mạnh</Text>
              <Text style={styles.accountUsername}>@Mạnh</Text>
            </View>
            <SquarePen color="#2D3436" size={ICONSIZE} />
          </TouchableOpacity>

          <View style={styles.menuCard}>
            {accountRows.map(([icon, title, caption], index) => (
              <TouchableOpacity
                key={title}
                style={[
                  styles.row,
                  index === accountRows.length - 1 && { borderBottomWidth: 0 },
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  if (index === 0) setScreen("bio");
                  else if (index === 4) router.navigate("/signin");
                }}
              >
                <View style={styles.rowIcon}>
                  <Icon name={icon} color="#2D3436" />
                </View>
                <View style={styles.rowCopy}>
                  <Text style={styles.rowTitle}>{title}</Text>
                  <Text style={styles.rowCaption}>{caption}</Text>
                </View>

                {index === 2 ? (
                  <Switch
                    value={secured}
                    onValueChange={(value) => setSecured(value)}
                    trackColor={{ false: "#E9D5FF", true: "#D8B4F8" }}
                    thumbColor="#FFFFFF"
                  />
                ) : (
                  <ChevronRight color="#8E8E93" size={18} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Tùy chọn khác</Text>

          <View style={styles.menuCard}>
            {[
              ["bell", "Trợ giúp & Hỗ trợ"],
              ["heart", "Giới thiệu App"],
            ].map(([icon, label], index) => (
              <TouchableOpacity
                key={label}
                activeOpacity={0.7}
                style={[styles.row, index === 1 && { borderBottomWidth: 0 }]}
              >
                <View style={styles.rowIcon}>
                  <Icon name={icon as "bell" | "heart"} color="#2D3436" />
                </View>
                <View style={styles.rowCopy}>
                  <Text style={styles.rowTitle}>{label}</Text>
                </View>
                <ChevronRight color="#8E8E93" size={18} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function BioScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.appStage}>
      <View style={styles.container}>
        <View style={styles.calmHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setScreen("profile")}
            activeOpacity={0.7}
          >
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.bioPerson}
          showsVerticalScrollIndicator={false}
        >
          <Avatar />
          <Text style={styles.bioName}>Mạnh</Text>
          <Text style={styles.bioEmail}>manh@example.com</Text>

          <View style={styles.bioForm}>
            <TextInput
              style={styles.input}
              placeholder="Tên"
              placeholderTextColor="#8A8A8E"
            />
            <TextInput
              style={styles.input}
              placeholder="Họ"
              placeholderTextColor="#8A8A8E"
            />

            <View style={styles.phoneInputContainer}>
              <Text style={styles.flagIcon}>🇻🇳</Text>
              <TextInput
                style={[
                  styles.input,
                  { flex: 1, borderWidth: 0, marginBottom: 0 },
                ]}
                placeholder="Số điện thoại"
                placeholderTextColor="#8A8A8E"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity style={styles.selectWrap} activeOpacity={0.8}>
              <Text style={styles.selectText}>Chọn giới tính</Text>
            </TouchableOpacity>

            <View style={styles.dateWrap}>
              <TextInput
                style={[
                  styles.input,
                  { flex: 1, borderWidth: 0, marginBottom: 0 },
                ]}
                placeholder="Ngày sinh"
                placeholderTextColor="#8A8A8E"
              />
              <Text style={styles.dateIcon}>📅</Text>
            </View>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => setSaved(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.updateButtonText}>
                {saved ? "Đã cập nhật hồ sơ" : "Cập nhật hồ sơ"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("profile");

  return screen === "profile" ? (
    <ProfileScreen setScreen={setScreen} />
  ) : (
    <BioScreen setScreen={setScreen} />
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
    fontFamily: "Inter-Bold",
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },

  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: "#D8B4F8",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E9D5FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: "Inter-Bold",
    fontSize: 22,
    fontWeight: "700",
    color: "#2D3436",
  },

  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  accountNameContainer: {
    flex: 1,
    marginLeft: 14,
  },
  accountName: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
  },
  accountUsername: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: "#636E72",
    marginTop: 2,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3E8FF",
  },
  rowIcon: {
    marginRight: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5EEFE",
    justifyContent: "center",
    alignItems: "center",
  },
  rowCopy: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
  },
  rowCaption: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#636E72",
    marginTop: 2,
  },
  sectionLabel: {
    fontFamily: "Inter-Bold",
    fontSize: 13,
    fontWeight: "600",
    color: "#636E72",
    textTransform: "uppercase",
    marginLeft: 6,
    marginBottom: 10,
    marginTop: 4,
  },

  // Bio Screen
  bioPerson: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 40,
  },
  bioName: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
    marginTop: 12,
  },
  bioEmail: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#636E72",
    marginTop: 4,
    marginBottom: 24,
  },
  bioForm: {
    width: "100%",
  },
  input: {
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 18,
    fontFamily: "Inter-Regular",
    fontSize: 15,
    marginBottom: 14,
    color: "#2D3436",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  flagIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  selectWrap: {
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 18,
    justifyContent: "center",
    marginBottom: 14,
  },
  selectText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#8A8A8E",
  },
  dateWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 28,
  },
  dateIcon: {
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#D8B4F8",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  updateButtonText: {
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
