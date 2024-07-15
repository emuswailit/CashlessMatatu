import React from "react";
import {
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import Icon from "../Icon";

function Card({
  onPress,
  item = "",
  verified,
  iconRight,
  iconCenter,
  iconLeft,
  iconRightColor,
  iconLeftColor,
  iconCenterColor,
  iconLeftAction,
  iconCenterAction,
  iconRightAction,
}) {
  return (
    <View>
      <View style={styles.card}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{item.title}</AppText>
          <AppText style={styles.subTitle}>{item.order_terms}</AppText>
          <AppText style={styles.description}>{item.description}</AppText>
          {!verified && (
            <View style={styles.buttonContainer}>
              {iconLeft && (
                <TouchableOpacity
                  onPress={iconLeftAction}
                  style={{ alignSelf: "flex-start" }}
                >
                  <Icon
                    name={iconLeft}
                    backgroundColor={iconLeftColor}
                    onPress={iconLeftAction}
                  />
                </TouchableOpacity>
              )}
              {iconCenter && (
                <TouchableOpacity onPress={iconCenterAction}>
                  <Icon name={iconCenter} backgroundColor="green" />
                </TouchableOpacity>
              )}
              {iconRight && (
                <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                  <Icon
                    name={iconRight}
                    backgroundColor={iconRightColor}
                    onPress={() => iconRightAction(item)}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
  description: {
    color: colors.dark,
    fontWeight: "300",
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Card;
