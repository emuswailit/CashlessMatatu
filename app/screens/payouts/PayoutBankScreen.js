import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, FONTS, SIZES } from "../../constants";
import { FloatingLabelInput } from "react-native-floating-label-input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ErrorMessage } from "../../components/forms";
import AppButton from "../../components/AppButton";
import useApi from "../../hooks/useApi";
import transportApi from "../../api/transportApi";
import TextButton from "../../components/TextButton";
import Modal from "react-native-modal";
import OTPTextInput from "react-native-otp-textinput";
import { SelectList } from "react-native-dropdown-select-list";

const PayoutsBankScreen = ({ route, navigation }) => {
  const vehicle = route.params;
  console.log("veh at till", vehicle);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#ffffff",

      headerTitle: (props) => (
        <Text {...props} style={{ color: "white", ...FONTS.body3 }}>
          Payouts to Bank - {vehicle.title}
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
  const processPayoutsApi = useApi(transportApi.transportActions);
  const processPayout = async (data) => {
    await processPayoutsApi.request(data);
  };
  useEffect(() => {
    if (processPayoutsApi.data && processPayoutsApi.data.collection_to_bank) {
      setref(processPayoutsApi.data.collection_to_bank["ref"]);
      console.log("data at bank pyt", processPayoutsApi.data);
      setisOTPModalVisible(true);
    }
    console.log("data at bank pyt1", processPayoutsApi.data);
  }, [processPayoutsApi.data]);

  //Get all banks

  const [allBanks, setallBanks] = useState([]);
  const getAllBanksApi = useApi(transportApi.transportActions);
  const getAllBanks = async () => {
    await getAllBanksApi.request({
      action: "GetAllBanks",
    });
  };

  useEffect(() => {
    if (getAllBanksApi.data && getAllBanksApi.data.length) {
      setallBanks(
        getAllBanksApi.data.map((i) => ({
          key: i.id,
          value: i.psp_title,
          bank_code: i.psp_code,
        }))
      );
    }
    console.log("getAllBanksApi 1", getAllBanksApi.data);
  }, [getAllBanksApi.data]);

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
      account_number: "",
      bank_code: "",
      amount: 0,
      narrative: 0,
    },

    validationSchema: Yup.object({
      account_number: Yup.string()
        .min(10, "Too short")
        .required("Till number is required"),
      bank_code: Yup.string()
        .min(2, "Too short")
        .required("Bank code is required"),
      amount: Yup.number().min(1, "Enter 1 or more").required("Amount"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("VALZ", values);
      const data = {
        action: "VehicleCollectionToBank",
        vehicle_registration: vehicle.title,
        amount: formik.values.amount,
        account_number: formik.values.account_number,
        bank_code: formik.values.bank_code,
      };
      processPayout(data);
      resetForm();
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

  const handleSelectBank = (item) => {
    const dest = allBanks.find((x) => x.key === selectedBank);
    formik.setFieldValue("bank_code", dest.bank_code);
  };

  useEffect(() => {
    getVehicleWalletBalance();
    getAllBanks();
  }, []);

  const [selectedBank, setselectedBank] = useState();

  return processAuthorizeTransactionApi.loading ||
    processPayoutsApi.loading ||
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
        <View>
          <SelectList
            id="bank_code"
            name="bank_code"
            className="my-2"
            setSelected={setselectedBank}
            data={allBanks}
            placeholder="Select bank_code"
            onSelect={(value) => handleSelectBank(value)}
          />
          <ErrorMessage
            error={formik.errors.bank_code}
            visible={formik.touched.bank_code}
          />
        </View>

        <View className="mt-2">
          <FloatingLabelInput
            id="account_number"
            name="account_number"
            label="Enter bank account number"
            onChangeText={(value) =>
              formik.setFieldValue("account_number", value)
            }
            value={formik.values.account_number}
            inputMode="text"
          />
          <ErrorMessage
            error={formik.errors.account_number}
            visible={formik.touched.account_number}
          />
        </View>
        <View className="mt-2">
          <FloatingLabelInput
            className="text-black"
            id="amount"
            name="amount"
            label="Amount to pay out"
            onChangeText={(value) => formik.setFieldValue("amount", value)}
            value={formik.values.amount}
            inputMode="text"
          />
          <ErrorMessage
            error={formik.errors.amount}
            visible={formik.touched.amount}
          />
        </View>

        <View className="mt-2">
          <FloatingLabelInput
            id="narrative"
            name="narrative"
            numberOfLines={2}
            label="Enter short narrative"
            onChangeText={(value) => formik.setFieldValue("narrative", value)}
            value={formik.values.narrative}
            inputMode="text"
          />
          <ErrorMessage
            error={formik.errors.narrative}
            visible={formik.touched.narrative}
          />
        </View>
        <View className="text-center">
          <AppButton
            title="Send"
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

export default PayoutsBankScreen;
