import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { FONTS, SIZES } from "../../constants";

function FormSwitch({
  name,
  title,
  width,
  statusYes,
  statusNo,
  setstatusNo,
  setstatusYes,
  ...otherProps
}) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();

  const handleChangeNo = () => {
    if (statusNo === "checked") {
      statusNo("unchecked");
    } else if (statusNo === "unchecked") {
      statusNo("checked");
    }
  };

  return (
    <>
      <View style={{ margin: SIZES.radius }}>
        <Text style={{ ...FONTS.body3 }}>{title}</Text>
        <RadioButton.Group
          onValueChange={handleChange(name)}
          value={values[name]}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <Text style={{ ...FONTS.body3 }}>Yes</Text>
              <RadioButton status={statusYes} value="true"></RadioButton>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text style={{ ...FONTS.body3 }}>No</Text>
              <RadioButton status={statusNo} value="false"></RadioButton>
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormSwitch;
