import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, Text } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants";
import useApi from "../hooks/useApi";
import usersApi from "../api/usersApi";
import CardFullWidthWithChevron from "../components/cards/CardFullWidthWithChevron";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Vehicles",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.white,
    },
    targetScreen: "Vehicles",
  },
  {
    title: "My Wallet",
    icon: {
      name: "home",
      backgroundColor: colors.white,
    },

    targetScreen: "Wallet",
  },
  {
    title: "My Sacco",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Sacco",
  },
];

function AccountScreen({ navigation }) {
  const { logOut } = useAuth();
  const [profile, setprofile] = useState();

  const loadUserApi = useApi(usersApi.usersAction);

  const loadUser = async () => {
    const result = await loadUserApi.request({
      action: "GetUserDetails",
    });
  };

  useEffect(() => {
    if (loadUserApi.data) {
      if (loadUserApi.data.user) {
        setprofile(loadUserApi.data.user);
      } else if (loadUserApi.data.errors) {
        seterr;
      }
    }
    console.log("loadUserApi.data", loadUserApi.data);
  }, [loadUserApi.data]);

  useEffect(() => {
    loadUser();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#ffffff",

      headerTitle: (props) => (
        <Text {...props} style={{ color: "white", ...FONTS.body3 }}>
          Your Account
        </Text>
      ),
      headerStyle: {
        backgroundColor: COLORS.primary, //Set Header color
      },
      headerLeftStyle: {
        tintColor: COLORS.light,
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.grey08,
      }}
    >
      {profile && (
        <View style={styles.container}>
          <ListItem
            title={`${profile.first_name} ${profile.last_name} - ${profile.phone} `}
            subTitle={`${profile.entity_title}`}
            image={
              profile && profile.images && profile.images[0]
                ? profile.images[0].image
                : ""
            }
            description={profile.email}
          />
        </View>
      )}
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <CardFullWidthWithChevron
              onPress={() => navigation.navigate(item.targetScreen, profile)}
              item={item}
            />
          )}
        />
      </View>

      <CardFullWidthWithChevron
        onPress={logOut}
        item={{
          title: "Sign out",
          icon: {
            name: "logout",
            backgroundColor: colors.white,
          },
          targetScreen: "Login",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
