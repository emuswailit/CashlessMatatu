import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppPicker from "../components/Picker";
import PickerItemUser from "../components/PickerItemUser";

import CardHorizontal from "../components/cards/CardHorizontal";
import CardVertical from "../components/cards/CardVertical";
import CardFullWidthWithAction from "../components/cards/CardFullWidthWithAction";
import CardFullWidthWithChevron from "../components/cards/CardFullWidthWithChevron";

const item = {
  icon: "home",
  title: "Home sweet home",
  action: "Buy",
};

const TestingScreen = () => {
  return (
    <SafeAreaView className="flex-1 pt-4 mt-6 mx-2  bg-gray-100">
      <View className="flex flex-row justify-between">
        <CardHorizontal item={item} />
        <CardHorizontal item={item} />
      </View>
      <View className="flex flex-row">
        <CardVertical item={item} />
        <CardVertical item={item} />
        <CardVertical item={item} />
      </View>

      <View className="flex flex-row">
        <CardFullWidthWithAction item={item} />
      </View>

      <View className="flex flex-row">
        <CardFullWidthWithChevron item={item} />
      </View>
    </SafeAreaView>
  );
};

export default TestingScreen;

const styles = StyleSheet.create({});
