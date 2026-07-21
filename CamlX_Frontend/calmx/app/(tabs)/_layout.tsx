import { BottomTabBar } from "@/components/BottomTabBar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Tabs
        backBehavior="history"
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          animation: "none",

          sceneStyle: { backgroundColor: isDark ? "#121212" : "#ffffff" },
        }}
      >
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="activity" options={{ title: "Activity" }} />
        <Tabs.Screen name="community" options={{ title: "Community" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
