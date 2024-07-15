import React, { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
function ImageInput({ imageUri, onChangeImage }) {
  const requestPermissions = async () => {
    const { granted } = ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      //   alert("You need to enable permissions");
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);
  const selectImage = async () => {
    try {
      const options = {
        title: "Select Picture",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
        maxWidth: 300,
        maxHeight: 500,
        quality: 0.5,
      };
      const result = await ImagePicker.launchImageLibraryAsync(options, {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) {
        onChangeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error reading image", error);
    }
  };

  const handlePress = () => {
    console.log("mage", imageUri);
    if (!imageUri) {
      selectImage();
    } else {
      selectImage;
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => onChangeImage(imageUri)}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="camera"
            size={40}
          />
        )}

        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  image: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
});

export default ImageInput;
