import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { View, Text, SafeAreaView } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SampleComponent, Counter } from "@/components/utitlity";
import { FormProvider, LoginComponent } from "@/components/provider";
import auth from "@react-native-firebase/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  const onAuthStateChanged = (user) => {
    console.log(user, "user----");
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        {user ? <FormProvider /> : <LoginComponent />}
      </SafeAreaView>
    </ThemeProvider>
  );
}
