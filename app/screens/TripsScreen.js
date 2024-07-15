import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import transportApi from "../api/transportApi";
import { useInterval } from "../hooks/useInterval";
import { COLORS, FONTS, SIZES } from "../constants";
import colors from "../config/colors";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ListItem, ListItemSeparator } from "../components/lists";
import DateField from "../components/forms/DateField";
import TimeField from "../components/forms/TimeField";
import AppButton from "../components/AppButton";
import PickerItemWithImage from "../components/PickerItemWithImage";
import CustomPickerSingleAsyncItem from "../components/CustomPickerSingleAsyncItem";
const width = Dimensions.get("screen").width;
const width2 = (Dimensions.get("screen").width * 7) / 10;
import Modal from "react-native-modal";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import { useFormik, useFormikContext } from "formik";
import { SelectList } from "react-native-dropdown-select-list";
import { FloatingLabelInput } from "react-native-floating-label-input";
import Button from "react-native-button";

const TripsScreen = () => {
  const [conductedVehicle, setconductedVehicle] = useState();
  const [istripModalVisible, setistripModalVisible] = useState(false);
  const [isticketModalVisible, setisticketModalVisible] = useState(false);
  const [currentTrip, setcurrentTrip] = useState();
  const getSaccoProfileApi = useApi(transportApi.transportActions);
  const getPaymentMethodsApi = useApi(transportApi.transportActions);
  const [tickets, setTickets] = useState([]);
  const [destinations, setdestinations] = useState([]);
  const [selectedDestination, setselectedDestination] = useState();
  const [numberOfTickets, setnumberOfTickets] = useState(0);
  const [selectedDestinationFare, setselectedDestinationFare] = useState(0.0);
  const [mobileMoneyPhone, setmobileMoneyPhone] = useState("");
  const [totalToPay, settotalToPay] = useState(
    selectedDestinationFare * numberOfTickets
  );
  const [selectedDestinationDetails, setselectedDestinationDetails] =
    useState();

  const getPaymentMethods = async () => {
    await getPaymentMethodsApi.request({
      action: "GetPaymentMethods",
    });
  };

  const getSaccoProfile = async () => {
    await getSaccoProfileApi.request({
      action: "GetSaccoProfile",
    });
  };

  useEffect(() => {
    getSaccoProfile();
    getPaymentMethods();
  }, []);

  useEffect(() => {
    if (getSaccoProfileApi.data) {
      console.log("getSaccoProfileApi.data", getSaccoProfileApi.data);
      if (
        getSaccoProfileApi.data &&
        getSaccoProfileApi.data.sacco_personnel_profile &&
        getSaccoProfileApi.data.sacco_personnel_profile.conducted_vehicle
      ) {
        setconductedVehicle(
          getSaccoProfileApi.data.sacco_personnel_profile.conducted_vehicle
        );
      }
    }
  }, [getSaccoProfileApi.data]);

  const getCurrentTripApi = useApi(transportApi.transportActions);

  const getCurrentTrip = async (conductedVehicle) => {
    await getCurrentTripApi.request({
      action: "GetCurrentTrip",
      registration: conductedVehicle.registration,
    });
  };

  useEffect(() => {
    if (getCurrentTripApi.data && getCurrentTripApi.data.current_trip) {
      setcurrentTrip(getCurrentTripApi.data.current_trip);
      setTickets(getCurrentTripApi.data.current_trip.trip_tickets);
      console.log(
        "Am here",
        getCurrentTripApi.data.current_trip.route_details.destinations
      );
      setdestinations(
        getCurrentTripApi.data.current_trip.route_details.destinations.map(
          (i) => ({
            key: i.id,
            value: i.title,
            fare: i.fare,
          })
        )
      );
    }
    console.log("getCurrentTripApi.data", getCurrentTripApi.data);
  }, [getCurrentTripApi.data]);

  const [paymentMethods, setpaymentMethods] = useState();
  useEffect(() => {
    if (getPaymentMethodsApi.data) {
      setpaymentMethods(
        getPaymentMethodsApi.data.map((i) => ({
          key: i.id,
          value: i.title,
        }))
      );
    }
    console.log("getPaymentMethodsApi.data", getPaymentMethodsApi.data);
  }, [getPaymentMethodsApi.data]);

  useInterval(async () => {
    if (conductedVehicle !== null) {
      getCurrentTrip(conductedVehicle);
    }
  }, 20000);

  useEffect(() => {
    console.log("selected dest", selectedDestination);
  }, [selectedDestination]);

  useEffect(() => {
    console.log("selected dests", destinations);
  }, [destinations]);

  const handleFilter = (e) => {
    console.log("zxxcv", e);
    const search_param = e.toLowerCase();

    if (search_param && search_param !== "") {
      setTickets(
        currentTrip.trip_tickets.filter(
          (x) =>
            x.document_number.toLowerCase().includes(search_param) ||
            x.payment_reference.toLowerCase().includes(search_param)
        )
      );
    } else {
      setTickets(currentTrip.trip_tickets);
    }
  };

  const handleCreateNewTrip = () => {
    setistripModalVisible(true);
  };

  const handleShowTicketModal = () => {
    setisticketModalVisible(true);
  };
  const handleCreateNewTicket = () => {
    setisticketModalVisible(false);
  };

  const validationSchemaTrip = Yup.object().shape({
    // price: Yup.number().required().min(1).max(10000).label("Price"),
    departure_date: Yup.string().required().label("Product"),
  });

  const validationSchemaTicket = Yup.object().shape({
    // price: Yup.number().required().min(1).max(10000).label("Price"),
    departure_date: Yup.string().required().label("Product"),
  });

  const createTripApi = useApi(transportApi.transportActions);
  const createTrip = async (data) => {
    await createTripApi.request(data);
  };

  useEffect(() => {
    if (createTripApi.data && createTripApi.data.trip) {
      console.log("New trip created");
      //Pull new profile details
      getSaccoProfile();
    }
    console.log("createTripApi.data", createTripApi.data);
  }, [createTripApi.data]);
  const handleSubmitTicketForm = async (values) => {
    console.log("valz", values);
  };
  const handleSubmitTripForm = async (values) => {
    console.log("valz", values);

    if (conductedVehicle !== null) {
      payload = {
        action: "CreateTrip",
        trip_details: {
          vehicle: conductedVehicle.id,
          departure_date: values.departure_date,
          departure_time: values.departure_time,
          route: values.route.id,
        },
      };

      console.log("PL", payload);
      createTrip(payload);
    }

    setistripModalVisible(false);
  };

  const [selectedRoute, setselectedRoute] = useState();
  const handleSelectRoute = (item) => {
    setselectedRoute(item);
  };

  const createTicketsApi = useApi(transportApi.transportActions);
  const createBatchedTickets = async (data) => {
    await createTicketsApi.request(data);
  };

  useEffect(() => {
    if (createTicketsApi.data && createTicketsApi.data.response_code === 0) {
      getCurrentTrip(conductedVehicle);
      setisticketModalVisible(false);
    }

    if (createTicketsApi.data && createTicketsApi.data.response_code === 1) {
      toast.error(createTicketsApi.data.response_message);
    }

    if (createTicketsApi.data && createTicketsApi.data.errors) {
      setErrors(createTicketsApi.data.errors);
    }

    console.log("createTicketsApi.data", createTicketsApi.data);
  }, [createTicketsApi.data]);

  const formik = useFormik({
    initialValues: {
      mobile_money_phone: "",
      number_of_tickets: 0,
      total_to_pay: 0,
    },

    validationSchema: Yup.object({
      mobile_money_phone: Yup.string()
        .min(10, "Too short")
        .required("Mobile money phone is required"),
      number_of_tickets: Yup.number()
        .min(1, "One or more")
        .required("Number of tickets is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      //Dispatch action
      let tickets = [];

      console.log("VALZ", values);
      for (let i = 0; i < values.number_of_tickets; i++) {
        const stump = {
          trip: currentTrip.id,
          route: currentTrip.route,
          seat: "",
          fare: selectedDestinationFare,
          first_name: "",
          last_name: "",
          destination: values.destination,
          identifier_type: "",
          identifier_number: "",
          vehicle: currentTrip.vehicle,
          passenger_phone: "",
          origin: "WEB",
        };

        tickets.push(stump);
      }
      console.log("fdfdffffffffff", tickets);
      const data = {
        action: "CreateBatchedTickets",
        mobile_money_phone: values.mobile_money_phone,
        jambopay_wallet_phone: values.mobile_money_phone,
        payment_method: values.payment_method,
        tickets: tickets,
      };
      console.log("tickets", tickets);

      createBatchedTickets(data);
      resetForm();
    },
  });

  const onRouteSearchTextChanged = (text) => {
    // handleFilterProducts(text);
    // searchProduct(text);
  };

  const onDestinationSearchTextChanged = (text) => {
    // handleFilterProducts(text);
    // searchProduct(text);
  };

  const [selectedPaymentMethod, setselectedPaymentMethod] = useState();

  const handleSelectPaymentMethod = (item) => {
    const dest = paymentMethods.find((x) => x.key === selectedPaymentMethod);
    formik.setFieldValue("payment_method", selectedPaymentMethod);
  };

  const handleSelectDestination = (item) => {
    const dest = destinations.find((x) => x.key === selectedDestination);

    if (dest !== null) {
      setselectedDestinationFare(dest.fare);
      setselectedDestinationDetails(dest);
      formik.setFieldValue(
        "total_to_pay",
        selectedDestinationFare * formik.values.number_of_tickets
      );
    }
    formik.setFieldValue("destination", selectedDestination);

    console.log("ideeem", item);

    setselectedDestination(item);
  };

  useEffect(() => {
    settotalToPay(selectedDestinationFare * numberOfTickets);
  }, [selectedDestinationFare, numberOfTickets]);

  const calculateNewFare = (value) => {
    setselectedDestinationFare(Number(value) / Number(numberOfTickets));
  };

  const handleNumberOfSeatsChange = (value) => {
    formik.setFieldValue("number_of_tickets", value);
    formik.setFieldValue(
      "total_to_pay",
      selectedDestinationFare * formik.values.number_of_tickets
    );
  };
  const handleTotalToPayChange = (value) => {
    if (value > 0 && formik.values.number_of_tickets > 0) {
      setselectedDestinationFare(value / formik.values.number_of_tickets);
    }

    formik.setFieldValue(
      "total_to_pay",
      selectedDestinationFare * formik.values.number_of_tickets
    );

    if (formik.values.total_to_pay === null) {
      formik.setFieldValue(
        "total_to_pay",
        formik.values.number_of_tickets * selectedDestinationFare
      );
    }
  };

  return getSaccoProfileApi.loading ? (
    <ActivityIndicator
      size="large"
      color={COLORS.primary}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  ) : (
    <SafeAreaView className="flex-1 pt-4 mt-6 mx-2  bg-white">
      <Modal isVisible={istripModalVisible}>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Form
              initialValues={{
                departure_time: "",
              }}
              onSubmit={(values) => handleSubmitTripForm(values)}
              validationSchema={validationSchemaTrip}
            >
              <CustomPickerSingleAsyncItem
                PickerItemComponent={PickerItemWithImage}
                selectedItem={selectedRoute}
                name="route"
                onSelectItem={handleSelectRoute}
                data={conductedVehicle ? conductedVehicle.routes : []}
                placeholder={selectedRoute ? selectedRoute : "Select route"}
                onSearchTextChanged={onRouteSearchTextChanged}
              />
              <DateField
                color="black"
                backgroundColor="white"
                name="departure_date"
                label="Departure date"
                placeholder="Select departure date"
              />

              <TimeField
                name="departure_time"
                label="Departure time"
                placeholder="Select departure time"
              />

              <SubmitButton
                label="Save"
                contentContainerStyle={{
                  height: 55,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.primary,
                }}
                labelStyle={{
                  ...FONTS.body4,
                  color: COLORS.light,
                }}
              />
            </Form>
          </ScrollView>

          <Button
            style={{ fontSize: 20, color: "white" }}
            styleDisabled={{ color: "white" }}
            onPress={() => setistripModalVisible(false)}
          >
            Cancel
          </Button>
        </View>
      </Modal>

      <Modal
        isVisible={isticketModalVisible}
        backdropOpacity={1.0}
        backdropColor="#fff"
      >
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex justify-center items-center my-3">
              {selectedDestinationDetails ? (
                <Text className="text-xl font-bold">
                  {selectedDestinationDetails.value}
                </Text>
              ) : (
                <Text></Text>
              )}
              <Text className="text-xl font-bold">
                TICKETS: {formik.values.number_of_tickets.toString()}
              </Text>
              <Text className="text-xl font-bold">
                FARE: KES {parseFloat(selectedDestinationFare).toFixed(2)}
              </Text>
              <Text className="text-xl font-bold">
                TO PAY : KES{" "}
                {parseFloat(
                  formik.values.number_of_tickets * selectedDestinationFare
                ).toFixed(2)}
              </Text>
            </View>
            <View>
              <SelectList
                id="destination"
                name="destination"
                className="my-2"
                onSelect={(value) => handleSelectDestination(value)}
                setSelected={setselectedDestination}
                data={destinations}
                placeholder="Select origin/destination"
              />
              <ErrorMessage
                error={formik.errors.destination}
                visible={formik.touched.destination}
              />
            </View>
            <View>
              <SelectList
                id="payment_method"
                name="payment_method"
                className="my-2"
                onSelect={(value) => handleSelectPaymentMethod(value)}
                setSelected={setselectedPaymentMethod}
                data={paymentMethods}
                placeholder="Select payment method"
              />
              <ErrorMessage
                error={formik.errors.payment_method}
                visible={formik.touched.payment_method}
              />
            </View>
            <View className="mt-2">
              <FloatingLabelInput
                id="number_of_tickets"
                name="number_of_tickets"
                label="Number of tickets to pay"
                onChangeText={(value) => handleNumberOfSeatsChange(value)}
                value={formik.values.number_of_tickets}
                inputMode="numeric"
              />
              <ErrorMessage
                error={formik.errors.number_of_tickets}
                visible={formik.touched.number_of_tickets}
              />
            </View>

            <View className="mt-2">
              <FloatingLabelInput
                id="total_to_pay"
                name="total_to_pay"
                label="Enter different total amount (optional)"
                onChangeText={(value) => handleTotalToPayChange(value)}
                value={formik.values.total_to_pay}
              />
              <ErrorMessage
                error={formik.errors.total_to_pay}
                visible={formik.touched.total_to_pay}
              />
            </View>
            <View className="mt-2">
              <FloatingLabelInput
                id="mobile_money_phone"
                name="mobile_money_phone"
                label="Mobile money phone number"
                onChangeText={formik.handleChange("mobile_money_phone")}
                value={formik.values.mobile_money_phone}
              />
              <ErrorMessage
                error={formik.errors.mobile_money_phone}
                visible={formik.touched.mobile_money_phone}
              />
            </View>
            <View className="flex flex-row w-full justify-between">
              <View>
                <AppButton
                  title="Cancel"
                  width={120}
                  onPress={() => setisticketModalVisible(false)}
                />
              </View>
              <View>
                <AppButton
                  title="Save"
                  width={120}
                  onPress={() => formik.handleSubmit()}
                  backgroundColor="blue"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {conductedVehicle ? (
        <View>
          <Text className="text-xl text-center mt-1">
            {conductedVehicle.registration}
          </Text>
        </View>
      ) : (
        <Text>Vehicle details not retrieved</Text>
      )}

      {currentTrip ? (
        <View>
          <Text className="text-xl text-center mt-1">
            {conductedVehicle.registration}
          </Text>
          <Text className="text-xl text-center mt-1">
            {currentTrip.route_title}
          </Text>
          <View className="flex flex-row justify-around items-center">
            <Text className="text-lg text-center mt-1">
              DATE: {currentTrip.departure_date}
            </Text>
            <Text className="text-lg text-center mt-1">
              TIME: {currentTrip.departure_time}
            </Text>
          </View>
          <View className="flex flex-row w-full justify-between">
            <View>
              <AppButton
                title="Create New Trip"
                width="100%"
                onPress={() => handleCreateNewTrip()}
              />
            </View>
            <View>
              <AppButton
                title="Create New Ticket"
                width={320}
                onPress={() => handleShowTicketModal()}
              />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Button
            containerStyle={{
              backgroundColor: "grey",
              height: 45,
              borderRadius: 5,
              alignContent: "center",
              overflow: "hidden",
            }}
            style={{ fontSize: 15, color: "white", padding: 5, margin: 5 }}
            styleDisabled={{ color: "red" }}
            onPress={() => handleCreateNewTrip()}
          >
            Create new trip!
          </Button>
        </View>
      )}

      <FlatList
        ListHeaderComponent={
          <View>
            <View
              style={{
                justifyContent: "center",
                marginTop: 5,
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: SIZES.radius,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body3, color: COLORS.light }}>
                  Tickets:
                </Text>
                <Text style={{ ...FONTS.body3, color: COLORS.light }}>
                  {tickets && tickets.length ? tickets.length : 0}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body3, color: COLORS.light }}>
                  Amount:
                </Text>
                <Text style={{ ...FONTS.body3, color: COLORS.light }}>
                  KES{" "}
                  {tickets && tickets.length
                    ? tickets
                        .reduce((acc, item) => acc + parseFloat(item.fare), 0)
                        .toFixed(2)
                    : 0}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <View style={styles.searchContainer}>
                <Icon name="search" size={25} />
                <TextInput
                  placeholder="Search"
                  onChangeText={(e) => handleFilter(e)}
                  style={styles.input}
                />
              </View>
              <View style={styles.sortBtn}>
                <Icon name="sort" size={30} color={colors.white} />
              </View>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={tickets}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View>
            <Text></Text>
          </View>
        }
        renderItem={({ item }) => (
          <ListItem
            onPress={() =>
              navigation.navigate(routes.RETAILER_INVENTORY_DETAILS, item.id)
            }
            title={item.document_number}
            image={item.image}
            subTitle={`${item.payment_method_title}`}
            detail1={item.payment_reference}
            detail2={`KES  ${item.fare}`}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: SIZES.radius,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
    flex: 1,
    width: width2,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: "bold",
  },
  categoryTextSelected: {
    color: colors.primary,
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderColor: colors.primary,
  },
  card: {
    height: 100,
    backgroundColor: COLORS.lightGrey,
    width: width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});

export default TripsScreen;
