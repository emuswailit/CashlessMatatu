import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, Text } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";

import { COLORS, FONTS } from "../constants";
import useApi from "../hooks/useApi";
import usersApi from "../api/usersApi";

const menuItems = [
  {
    title: "My Profile",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "Profile",
  },
  {
    title: "KYC Documents",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },

    targetScreen: "UserKYCDocumentsScreen",
  },
  {
    title: "Profile Pictures",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "UserProfilePicturesScreen",
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
            <ListItem
              onPress={() => navigation.navigate(item.targetScreen, profile)}
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        onPress={() => logOut()}
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
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
