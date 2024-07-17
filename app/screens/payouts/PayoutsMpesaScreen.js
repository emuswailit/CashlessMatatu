import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, FONTS, SIZES } from "../../constants";
import { FloatingLabelInput } from "react-native-floating-label-input";
import * as Yup from "yup";
import { useFormik, useFormikContext } from "formik";
import { ErrorMessage } from "../../components/forms";
import AppButton from "../../components/AppButton";
import useApi from "../../hooks/useApi";
import transportApi from "../../api/transportApi";
import TextButton from "../../components/TextButton";
import Modal from "react-native-modal";
import OTPTextInput from "react-native-otp-textinput";

const PayoutsMpesaScreen = ({ route, navigation }) => {
  const vehicle = route.params;
  console.log("veh at mpesa", vehicle);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#ffffff",

      headerTitle: (props) => (
        <Text {...props} style={{ color: "white", ...FONTS.body3 }}>
          Payouts to Mpesa - {vehicle.title}
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

  const [ref, setref] = useState();
  const [isOTPModalVisible, setisOTPModalVisible] = useState(false);

  //Get wallet balance
  const getVehicleWalletBalanceApi = useApi(transportApi.transportActions);

  const getVehicleWalletBalance = async () => {
    await getVehicleWalletBalanceApi.request({
      action: "GetVehicleWalletBalance",
      vehicle_registration: vehicle.title,
    });
  };

  useEffect(() => {
    if (getVehicleWalletBalanceApi.data) {
      console.log(
        "getVehicleWalletBalanceApi.data 2",
        getVehicleWalletBalanceApi
      );
    }
  }, [getVehicleWalletBalanceApi.data]);

  // Process payout
  const processPayoutsMpesaApi = useApi(transportApi.transportActions);
  const processMpesaPayout = async (data) => {
    await processPayoutsMpesaApi.request(data);
  };
  useEffect(() => {
    if (
      processPayoutsMpesaApi.data &&
      processPayoutsMpesaApi.data.collection_to_mpesa
    ) {
      setref(processPayoutsMpesaApi.data.collection_to_mpesa["ref"]);
      console.log("data at mpesa pyt", processPayoutsMpesaApi.data);
      setisOTPModalVisible(true);
    }
    console.log("data at mpesa pyt1", processPayoutsMpesaApi.data);
  }, [processPayoutsMpesaApi.data]);

  //Authorize payment
  const processAuthorizeTransactionApi = useApi(transportApi.transportActions);
  const processAuthorizeTransaction = async (data) => {
    await processAuthorizeTransactionApi.request(data);
  };

  useEffect(() => {
    if (processAuthorizeTransactionApi.data) {
      const data = {
        action: "CheckJambopayTransactionStatus",
        ref: ref,
      };
      console.log("REEEF", ref);
      checkTransactionStatus(data);
    }
    console.log(
      "processAuthorizeTransactionApi 1",
      processAuthorizeTransactionApi.data
    );
  }, [processAuthorizeTransactionApi.data]);

  //Check payment status

  const checkTransactionStatusApi = useApi(transportApi.transportActions);
  const checkTransactionStatus = async (data) => {
    await checkTransactionStatusApi.request(data);
  };

  const [transactionStatus, settransactionStatus] = useState();
  const [isStatusModalVisible, setisStatusModalVisible] = useState(false);
  useEffect(() => {
    if (
      checkTransactionStatusApi.data &&
      checkTransactionStatusApi.data.jambopay_transaction_status
    ) {
      console.log("check trx status ", checkTransactionStatusApi.data);
      settransactionStatus(
        checkTransactionStatusApi.data.jambopay_transaction_status
      );
      setref(null);
      setisOTPModalVisible(false);
      setisStatusModalVisible(true);
    } else {
      setisStatusModalVisible(false);
    }
    console.log("check trx status 1", checkTransactionStatusApi.data);
  }, [checkTransactionStatusApi.data]);

  const formik = useFormik({
    initialValues: {
      mpesa_account_reference: "",
      mpesa_account_number: "",
      amount: 0,
    },

    validationSchema: Yup.object({
      mpesa_account_number: Yup.string()
        .min(10, "Too short")
        .required("Mpesa phone number"),
      amount: Yup.number().min(1, "Enter 1 or more").required("Amount"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("VALZ", values);
      const data = {
        action: "VehicleCollectionToMpesa",
        vehicle_registration: vehicle.title,
        amount: formik.values.amount,
        mpesa_account_number: formik.values.mpesa_account_number,
        mpesa_account_reference: formik.values.mpesa_account_reference,
      };
      processMpesaPayout(data);
      // resetForm();
    },
  });

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue("1234");
  };

  const [otp, setotp] = useState();
  const handleShej = (e) => {
    console.log("ddd", e);
    setotp(e);
  };

  useEffect(() => {
    if (otp && otp.length === 6) {
      const data = {
        action: "JambopayAuthorizePayout",
        otp: otp,
        ref: ref,
      };

      processAuthorizeTransaction(data);
      setisOTPModalVisible(false);
    }
  }, [otp]);

  useEffect(() => {
    getVehicleWalletBalance();
  }, []);

  return processAuthorizeTransactionApi.loading ||
    processPayoutsMpesaApi.loading ||
    checkTransactionStatusApi.loading ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color={COLORS.primary} size="large" />
    </View>
  ) : (
    <SafeAreaView className="flex-1 p-2 bg-gray-100">
      {getVehicleWalletBalanceApi.data &&
      getVehicleWalletBalanceApi.data.balance ? (
        <View className="flex justify-center items-center">
          <View className="flex flex-row items-center w-full justify-between">
            <Text>WALLET</Text>
            <Text className="text-xl">
              {getVehicleWalletBalanceApi.data.balance["account_number"]}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between">
            <Text>BALANCE</Text>
            <Text className="text-xl">
              KES {getVehicleWalletBalanceApi.data.balance["balance"]}
            </Text>
          </View>
        </View>
      ) : (
        <View></View>
      )}

      <View>
        <View className="mt-2">
          <FloatingLabelInput
            className="text-black"
            id="amount"
            name="amount"
            label="Amount to pay out"
            onChangeText={(value) => formik.setFieldValue("amount", value)}
            value={formik.values.amount}
            inputMode="tel"
          />
          <ErrorMessage
            error={formik.errors.amount}
            visible={formik.touched.amount}
          />
        </View>
        <View className="mt-2">
          <FloatingLabelInput
            id="mpesa_account_number"
            name="mpesa_account_number"
            label="Mpesa number to pay to"
            onChangeText={(value) =>
              formik.setFieldValue("mpesa_account_number", value)
            }
            value={formik.values.mpesa_account_number}
            inputMode="tel"
          />
          <ErrorMessage
            error={formik.errors.mpesa_account_number}
            visible={formik.touched.mpesa_account_number}
          />
        </View>

        <View className="mt-2">
          <FloatingLabelInput
            id="mpesa_account_reference"
            name="mpesa_account_reference"
            label="Enter account reference"
            onChangeText={(value) =>
              formik.setFieldValue("mpesa_account_reference", value)
            }
            value={formik.values.mpesa_account_reference}
            inputMode="text"
          />
          <ErrorMessage
            error={formik.errors.mpesa_account_reference}
            visible={formik.touched.mpesa_account_reference}
          />
        </View>
        <View className="text-center">
          <AppButton
            title="Save"
            width={340}
            onPress={() => formik.handleSubmit()}
            backgroundColor={COLORS.primary}
          />
        </View>
      </View>
      {ref && (
        <View>
          <Modal
            isVisible={isOTPModalVisible}
            backdropOpacity={1.0}
            backdropColor="#fff"
          >
            <OTPTextInput
              handleTextChange={(e) => handleShej(e)}
              inputCount={6}
              ref={(e) => (otpInput = e)}
            ></OTPTextInput>
            <TextButton
              label="Submit"
              contentContainerStyle={{
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.support3,
                ...FONTS.h3,
              }}
              onPress={() => {
                console.log("Resend Code");
                console.log("otp", ref.current);
              }}
            />
          </Modal>
        </View>
      )}

      {transactionStatus && (
        <Modal
          isVisible={isStatusModalVisible}
          backdropOpacity={1.0}
          backdropColor="#fff"
        >
          <View className="flex items-center justify-center">
            {transactionStatus.status === "SUCCESS" ? (
              <Text className="text-2xl text-green-500">
                {transactionStatus.status}
              </Text>
            ) : (
              <Text className="text-2xl text-red-500">
                {transactionStatus.status}
              </Text>
            )}
            <Text className="text-xl">{transactionStatus.description}</Text>

            <TextButton
              label="Close"
              contentContainerStyle={{
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.support3,
                ...FONTS.h3,
              }}
              onPress={() => setisStatusModalVisible(false)}
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default PayoutsMpesaScreen;
