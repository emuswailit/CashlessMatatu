import React, { useRef } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import ImageOutput from "./ImageOutput";

function ImageOutputList({ imageUris = [], onPressImage }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageOutput
                imageUri={uri}
                key={uri}
                source={{ uri: uri }}
                style={styles.image}
                onChangeImage={() => onPressImage(uri)}
              />
            </View>
          ))}

          {/* <ImageOutput onChangeImage={(uri) => onAddImage(uri)} /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 50,
  },
  image: {
    marginRight: 10,
  },
});

export default ImageOutputList;
