import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import CustomSplash from "../components/SplashScreen";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const checkStatus = async () => {
      try {
        const seen = await AsyncStorage.getItem("hasSeenOnboarding");
        const signedIn = await AsyncStorage.getItem("isSignedIn");

        // if (signedIn) {
        //   router.navigate("/(tabs)/home");
        // } else if (seen) {
        //   router.navigate("/(auth)/signin");
        // } else {
        //   router.navigate("/onboarding");
        // }
        router.navigate("/onboarding");
      } catch (error) {
        console.error("Lỗi khi đọc AsyncStorage:", error);
      } finally {
        setLoading(false);
        SplashScreen.hideAsync();
      }
    };

    checkStatus();
  }, [rootNavigationState?.key]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View style={styles.container}>
          <Stack>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(chat)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="community/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="comment" options={{ headerShown: false }} />
            <Stack.Screen name="post" options={{ headerShown: false }} />
            <Stack.Screen name="care" options={{ headerShown: false }} />
            <Stack.Screen name="chat-room" options={{ headerShown: false }} />
            <Stack.Screen name="statistics" options={{ headerShown: false }} />
          </Stack>

          <StatusBar style="auto" />

          {loading && (
            <View style={styles.splashOverlay}>
              <CustomSplash />
            </View>
          )}
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
});
