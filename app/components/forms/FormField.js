import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

function FormField({ name, label, width, height = 55, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();

  return (
    <View style={{ marginVertical: SIZES.base }}>
      <FloatingLabelInput
        label={label}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        containerStyles={{
          borderWidth: 1,
          paddingHorizontal: 10,
          backgroundColor: "#fff",
          borderColor: COLORS.grey,
          borderRadius: SIZES.radius,
          height: height,
        }}
        inputStyles={{
          color: COLORS.primary60,
          paddingHorizontal: SIZES.base,
          ...FONTS.body3,
        }}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

export default FormField;
