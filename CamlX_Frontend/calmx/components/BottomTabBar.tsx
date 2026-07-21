import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Flame, House, UserRoundPen, Users } from "lucide-react-native";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabConfigs: Record<
    string,
    { label: string; getIcon: (isActive: boolean) => React.ReactNode }
  > = {
    home: {
      label: "Trang chủ",
      getIcon: (isActive) => <House color={isActive ? "#D8B4F8" : undefined} />,
    },
    activity: {
      label: "Hoạt động",
      getIcon: (isActive) => <Flame color={isActive ? "#D8B4F8" : undefined} />,
    },
    community: {
      label: "Cộng đồng",
      getIcon: (isActive) => <Users color={isActive ? "#D8B4F8" : undefined} />,
    },
    profile: {
      label: "Tài khoản",
      getIcon: (isActive) => (
        <UserRoundPen color={isActive ? "#D8B4F8" : undefined} />
      ),
    },
  };

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const flattenedStyle = StyleSheet.flatten(focusedOptions.tabBarStyle) as any;

  if (flattenedStyle?.display === "none") {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const config = tabConfigs[route.name];

        if (!config) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              {config.getIcon(isActive)}
            </Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.1)",
    height: 60,
    paddingBottom: Platform.OS === "ios" ? 16 : 0,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    gap: 3,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.4,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: "#999",
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontFamily: "Inter-Bold",
    color: "#D8B4F8",
  },
});
