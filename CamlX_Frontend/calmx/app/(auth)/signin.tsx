import { useRouter } from "expo-router";
import { HatGlasses, Phone } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type Provider = "Facebook" | "Google" | "Apple" | "Phone" | "Anonymous";

// --- ICONS COMPONENTS ---

function StarBadge() {
  return (
    <View style={styles.starBadge}>
      <Text style={styles.starBadgeText}>★</Text>
    </View>
  );
}

function FacebookIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.49-1.46H16.8V3.95c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.91 1.42-3.91 4.02V10H8v3h2.55v8h3.15Z"
        fill="#3f51b5"
      />
    </Svg>
  );
}

function GoogleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        fill="#1976D2"
        d="M21.6 12.23c0-.71-.06-1.23-.2-1.77H12v3.48h5.52c-.11.87-.72 2.18-2.08 3.06l-.02.12 3.02 2.29.21.02c1.92-1.73 2.95-4.28 2.95-7.2Z"
      />
      <Path
        fill="#4CAF50"
        d="M12 21.75c2.7 0 4.97-.88 6.63-2.39l-3.16-2.43c-.85.58-1.99.99-3.47.99a6.02 6.02 0 0 1-5.69-4.08l-.12.01-3.14 2.38-.04.11A10 10 0 0 0 12 21.75Z"
      />
      <Path
        fill="#FFC107"
        d="M6.31 13.84A5.94 5.94 0 0 1 6 12c0-.64.12-1.26.3-1.84l-.01-.12-3.18-2.42-.1.05A9.73 9.73 0 0 0 2 12c0 1.56.38 3.03 1.01 4.33l3.3-2.49Z"
      />
      <Path
        fill="#FF3D00"
        d="M12 6.08c1.87 0 3.14.79 3.86 1.45l2.82-2.68C16.96 3.29 14.7 2.25 12 2.25a10 10 0 0 0-8.99 5.42l3.3 2.49A6.02 6.02 0 0 1 12 6.08Z"
      />
    </Svg>
  );
}

function AppleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M16.71 12.35c-.02-2.08 1.7-3.1 1.78-3.16-.97-1.42-2.48-1.61-3.01-1.63-1.28-.13-2.5.75-3.15.75-.65 0-1.66-.73-2.73-.71-1.4.02-2.69.81-3.41 2.07-1.46 2.53-.37 6.27 1.05 8.32.7 1 1.53 2.11 2.62 2.07 1.05-.04 1.45-.68 2.72-.68 1.27 0 1.63.68 2.74.66 1.13-.02 1.85-1.03 2.54-2.03.8-1.17 1.13-2.31 1.15-2.37-.03-.01-2.23-.85-2.3-3.23ZM14.61 6.19c.58-.7.97-1.68.86-2.65-.83.03-1.83.55-2.42 1.25-.53.61-.99 1.61-.87 2.56.92.07 1.85-.47 2.43-1.16Z"
        fill="black"
      />
    </Svg>
  );
}

// --- BUTTON COMPONENT ---

function LoginButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

// --- MAIN SCREEN ---

export default function LoginScreen() {
  const [language, setLanguage] = useState("Tiếng Việt");
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();
  const signIn = (provider: Provider) => {
    console.log(`Đang chuẩn bị đăng nhập với ${provider}.`);
    if (provider === "Phone") {
      router.navigate("/(auth)/register-phone");
    } else {
      router.navigate("/(tabs)/home");
    }
  };

  return (
    <View style={styles.loginGround}>
      <View style={styles.phoneScreen}>
        {/* Language Button */}
        <Pressable
          style={styles.languageButton}
          onPress={() =>
            setLanguage(language === "Tiếng Việt" ? "English" : "Tiếng Việt")
          }
        >
          <Text style={styles.languageText}>{language}</Text>
          <StarBadge />
        </Pressable>

        {/* Brand Section */}
        <View style={styles.brand}>
          <Text style={styles.brandTitle}>CalmX</Text>
          <Text style={styles.brandSubtitle}>Xin chào</Text>
        </View>

        {/* Welcome Copy */}
        <View style={styles.welcomeCopy}>
          <Text style={styles.welcomeTextTop}>Vào thôi</Text>
          <Text style={styles.welcomeTextBottom}>
            Và kể mình nghe ngày hôm nay của bạn nhé!
          </Text>
        </View>

        {/* Login Actions */}
        <View style={styles.loginActions}>
          <LoginButton
            label="Tiếp tục với Facebook"
            icon={<FacebookIcon />}
            onPress={() => signIn("Facebook")}
          />
          <LoginButton
            label="Tiếp tục với Google"
            icon={<GoogleIcon />}
            onPress={() => signIn("Google")}
          />
          <LoginButton
            label="Tiếp tục với Apple"
            icon={<AppleIcon />}
            onPress={() => signIn("Apple")}
          />

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
            <View style={styles.dividerLine} />
          </View>

          <LoginButton
            label="Tiếp tục với số điện thoại"
            icon={<Phone size={16} fill="#000" />}
            onPress={() => signIn("Phone")}
          />
          <LoginButton
            label="Đăng nhập ẩn danh"
            icon={<HatGlasses size={18} />}
            onPress={() => signIn("Anonymous")}
          />
        </View>

        {message && (
          <Text style={styles.statusMessage} accessibilityLiveRegion="polite">
            {message}
          </Text>
        )}
      </View>
    </View>
  );
}

// --- StyleSheet ---

const styles = StyleSheet.create({
  loginGround: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  phoneScreen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#D8B4F8",
  },
  // Status Bar Mock
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    marginBottom: 10,
  },
  statusBarTime: {
    fontWeight: "900",
    letterSpacing: -0.5,
    fontSize: 15,
  },
  statusBarIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  signalBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  bar: {
    width: 3,
    backgroundColor: "black",
    borderRadius: 1,
  },
  batteryIcon: {
    width: 22,
    height: 11,
    borderRadius: 3,
    backgroundColor: "black",
  },
  // Badge & Language Button
  starBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
  },
  starBadgeText: {
    fontSize: 12,
    lineHeight: 12,
    color: "#ffd700",
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    marginTop: 10,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "500",
  },
  // Brand
  brand: {
    marginTop: 60,
    marginBottom: 15,
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 40,
    fontFamily: "Inter-Black",
    color: "#000",
  },
  brandSubtitle: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginTop: 5,
    marginBottom: 60,
  },
  // Welcome Copy
  welcomeCopy: {
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeTextTop: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#fff",
    // fontWeight: "600",
  },
  welcomeTextBottom: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#fff",
    marginTop: 4,
  },
  // Login Actions & Buttons
  loginActions: {
    gap: 14,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  buttonPressed: {
    backgroundColor: "#f5f5f5",
    opacity: 0.9,
  },
  iconContainer: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
  },
  // Divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 15,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#000000",
  },
  dividerText: {
    fontSize: 14,
    color: "#000000",
  },
  statusMessage: {
    textAlign: "center",
    marginTop: 20,
    color: "#4CAF50",
    fontSize: 14,
  },
});
