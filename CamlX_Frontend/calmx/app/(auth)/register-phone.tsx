import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

type Step = "phone" | "code" | "password";

const PIN_LENGTH = 6;

// --- COMPONENT: BACK BUTTON ---
function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={onPress}
      accessibilityLabel="Quay lại"
      activeOpacity={0.7}
    >
      <Svg viewBox="0 0 24 24" width={24} height={24}>
        <Path
          d="M14.5 5 7.5 12l7 7"
          fill="none"
          stroke="#fff"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

// --- COMPONENT: EYE ICON ---
function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <Svg viewBox="0 0 24 24" width={24} height={24}>
      <Path
        d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z"
        fill="none"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="12"
        cy="12"
        r="2.5"
        fill="none"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth={1.7}
      />
    </Svg>
  ) : (
    <Svg viewBox="0 0 24 24" width={24} height={24}>
      <Path
        d="M3 3l18 18M10.6 5.2A10.7 10.7 0 0 1 12 5c6 0 9.5 7 9.5 7a15.7 15.7 0 0 1-3.2 3.8M6.1 6.1A15.5 15.5 0 0 0 2.5 12S6 19 12 19c1.3 0 2.5-.3 3.5-.7M9.9 9.9a3 3 0 0 0 4.2 4.2"
        fill="none"
        stroke="rgba(0,0,0,0.45)"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// --- COMPONENT: PASSWORD INPUT ---
function PasswordInput({
  value,
  onChange,
  placeholder,
  invalid = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  invalid?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.passwordField,
        invalid && styles.isInvalid,
        isFocused && !invalid && styles.inputFocused,
      ]}
    >
      <TextInput
        style={styles.passwordInput}
        value={value}
        onChangeText={onChange}
        secureTextEntry={!visible}
        placeholder={placeholder}
        placeholderTextColor="rgba(0,0,0,0.45)"
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity
        style={styles.eyeButton}
        onPress={() => setVisible(!visible)}
        accessibilityLabel={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
      >
        <EyeIcon visible={visible} />
      </TouchableOpacity>
    </View>
  );
}

// --- MAIN CONTAINER COMPONENT ---
export default function PhoneRegister() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [code, setCode] = useState(Array(PIN_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);

  const inputs = useRef<TextInput[] | null[]>([]);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (step === "code") {
      setTimeout(() => inputs.current[0]?.focus(), 100);
    }
  }, [step]);

  const moveBack = () => {
    if (step === "phone") {
      router.back();
    } else if (step === "code") {
      setStep("phone");
    } else if (step === "password") {
      setStep("code");
    }
  };

  const submitPhone = () => {
    if (phone.replace(/\D/g, "").length >= 8 && agreed) {
      setStep("code");
    }
  };

  const setPin = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < PIN_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const submitPin = () => {
    if (code.every(Boolean)) setStep("password");
  };

  const submitPassword = () => {
    const secure =
      password.length >= 6 &&
      /[A-Za-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    setShowPasswordError(!secure || password !== confirmPassword);

    if (secure && password === confirmPassword) {
      router.navigate("/(tabs)/home");
    }
  };

  const title =
    step === "phone"
      ? "Chào mừng bạn đã đến và\nbắt đầu thôi nào!"
      : step === "code"
        ? "Nhập mã xác thực đã được gửi\nđến số điện thoại"
        : "Tạo mật khẩu";

  return (
    <View style={styles.appCanvas}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
        >
          <View style={styles.signupScreen}>
            <View style={styles.signupHeader}>
              <BackButton onPress={moveBack} />
            </View>

            <View style={styles.screenContent}>
              <Text style={styles.titleText}>{title}</Text>

              {/* STEP: PHONE */}
              {step === "phone" && (
                <View>
                  <View style={styles.phoneRow}>
                    <View style={styles.countryCode}>
                      <View style={styles.flagStar}>
                        <Text style={styles.flagStarText}>★</Text>
                      </View>
                      <Text style={styles.countryCodeText}>(+84)</Text>
                    </View>
                    <TextInput
                      style={[
                        styles.phoneInput,
                        phoneFocused && styles.inputFocused,
                      ]}
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="Nhập số điện thoại"
                      placeholderTextColor="rgba(0,0,0,0.45)"
                      onFocus={() => setPhoneFocused(true)}
                      onBlur={() => setPhoneFocused(false)}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.termsContainer}
                    onPress={() => setAgreed(!agreed)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.customCheck,
                        !agreed && styles.customCheckUnchecked,
                      ]}
                    >
                      {agreed && <Check size={16} color="white" />}
                    </View>
                    <Text style={styles.termsText}>
                      Bằng cách nhấn nút Tiếp tục, bạn đã đồng ý với các{" "}
                      <Text style={styles.linkText}>
                        Điều kiện và Điều khoản
                      </Text>{" "}
                      của CalmX
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* STEP: CODE (OTP PIN) */}
              {step === "code" && (
                <View style={styles.codeContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setCode(Array(PIN_LENGTH).fill(""));
                      inputs.current[0]?.focus();
                    }}
                  >
                    <Text style={styles.resendText}>Gửi lại</Text>
                  </TouchableOpacity>
                  <View style={styles.pinRow}>
                    {code.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(item) => {
                          inputs.current[index] = item;
                        }}
                        style={styles.pinInput}
                        value={digit}
                        onChangeText={(val) => setPin(index, val)}
                        onKeyPress={({ nativeEvent }) =>
                          handleKeyPress(index, nativeEvent.key)
                        }
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                      />
                    ))}
                  </View>
                </View>
              )}

              {/* STEP: PASSWORD */}
              {step === "password" && (
                <View style={styles.passwordContainer}>
                  <PasswordInput
                    value={password}
                    onChange={(value) => {
                      setPassword(value);
                      setShowPasswordError(false);
                    }}
                    placeholder="Nhập mật khẩu"
                    invalid={showPasswordError}
                  />
                  {showPasswordError && (
                    <Text style={styles.passwordError}>
                      Hãy chọn mật khẩu an toàn hơn mà bạn chưa dùng ở bất kỳ
                      nơi nào khác. Mật khẩu này nên gồm hơn 3 ký tự nữa và khó
                      đoán đối với người khác.
                    </Text>
                  )}
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(value) => {
                      setConfirmPassword(value);
                      setShowPasswordError(false);
                    }}
                    placeholder="Nhập lại mật khẩu"
                  />
                  <View style={styles.passwordTipRow}>
                    <View style={styles.tipIconBorder}>
                      <Text style={styles.tipIconText}>!</Text>
                    </View>
                    <Text style={styles.passwordTipText}>
                      Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao
                      gồm cả chữ số, chữ cái và ký tự đặt biệt
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={
              step === "phone"
                ? submitPhone
                : step === "code"
                  ? submitPin
                  : submitPassword
            }
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {step === "password" ? "Hoàn tất" : "Tiếp tục"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

// --- PURE REACT NATIVE STYLESHEET ---
const styles = StyleSheet.create({
  appCanvas: {
    flex: 1,
    backgroundColor: "#fff",
  },
  signupScreen: {
    flex: 1,
  },
  signupHeader: {
    height: 125,
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#d8b4f8",
  },
  screenContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.5,
    fontWeight: "700",
    color: "#080808",
  },
  phoneRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 20,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: 106,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#d8b4f8",
    paddingLeft: 23,
    paddingRight: 19,
  },
  flagStar: {
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 7,
    backgroundColor: "#ff6b6b",
  },
  flagStarText: {
    color: "#ffd700",
    fontSize: 14,
    fontWeight: "700",
  },
  countryCodeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#080808",
  },
  phoneInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#d8b4f8",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 23,
    color: "#101010",
    fontSize: 14,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#d8b4f8",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginTop: 15,
  },
  customCheck: {
    alignItems: "center",
    justifyContent: "center",
    width: 19,
    height: 19,
    marginTop: 1,
    borderRadius: 3,
    backgroundColor: "#d8b4f8",
  },
  customCheckUnchecked: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d8b4f8",
  },
  checkMark: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  termsText: {
    flex: 1,
    color: "#111",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  linkText: {
    color: "#d8b4f8",
    fontWeight: "700",
  },
  codeContainer: {
    paddingTop: 10,
  },
  resendText: {
    marginTop: 20,
    fontSize: 12,
    color: "#d8b4f8",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 55,
    paddingHorizontal: 10,
  },
  pinInput: {
    width: "13%",
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: "#d8b4f8",
    color: "#26202c",
    fontSize: 22,
    fontWeight: "700",
    padding: 0,
  },
  passwordContainer: {
    paddingTop: 10,
  },
  passwordField: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#d8b4f8",
    borderRadius: 15,
    backgroundColor: "#fff",
    marginTop: 18,
    overflow: "hidden",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingLeft: 23,
    paddingRight: 12,
    fontSize: 14,
    color: "#101010",
  },
  eyeButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
  },
  isInvalid: {
    borderColor: "#ff6b6b",
    borderWidth: 1.5,
  },
  passwordError: {
    marginTop: 15,
    color: "#ff5252",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.15,
  },
  passwordTipRow: {
    flexDirection: "row",
    gap: 7,
    marginTop: 15,
  },
  tipIconBorder: {
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    marginTop: 1,
    borderWidth: 2,
    borderColor: "#d8b4f8",
    borderRadius: 9,
  },
  tipIconText: {
    color: "#d8b4f8",
    fontSize: 12,
    fontWeight: "700",
  },
  passwordTipText: {
    flex: 1,
    color: "rgba(0,0,0,0.48)",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.15,
  },
  footerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 40 : 30,
  },
  primaryButton: {
    height: 50,
    borderRadius: 15,
    backgroundColor: "#d2a8f4",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
});
