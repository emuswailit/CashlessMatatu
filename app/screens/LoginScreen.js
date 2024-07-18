import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import authApi from "../api/authApi";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { COLORS } from "../constants";
import Modal from "react-native-modal";
const validationSchema = Yup.object().shape({
  phone_or_email: Yup.string().required().label("Phone or Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const auth = useAuth();
  const user = useSelector((state) => state.Auth.user);
  const errors = useSelector((state) => state.Auth.errors);
  const loginApi = useApi(authApi.login);

  const [loginfailed, setLoginFailed] = useState(false);
  const [userId, setUserId] = useState();
  const [errorsModalVisible, seterrorsModalVisible] = useState(false);
  const handleSubmit = async (values) => {
    console.log("VALZ", values);
    const result = await loginApi.request(
      values.phone_or_email,
      values.password
    );
    console.log("result1", result.data);
    if (!result.ok) {
      setErrors(result.data.data);

      return setLoginFailed(true);
    } else {
      // console.log("Am here now", result.data.tokens.access);
      // Set axios authorization globally
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.tokens.access}`;

      // AsyncStorage.setItem("user", JSON.stringify(result.data));
      setLoginFailed(false);
      setUserId(result.data.id);
      auth.logIn(result.data.tokens.access, result.data.id);
    }
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      console.log("Kuna errors");
      errors.map((error) => {
        return ToastAndroid.showWithGravity(
          error,
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      });
    }
  }, [errors]);

  return loginApi.loading ? (
    <View className="flex-1">
      <ActivityIndicator color={COLORS.primary} size="large" />
    </View>
  ) : (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <Modal isVisible={istripModalVisible}></Modal>
      <Form
        initialValues={{ phone_or_email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="phone_or_email"
          placeholder="Phone or Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
