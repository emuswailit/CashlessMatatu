import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";
import React from "react";
import { useFormikContext } from "formik";
import AppText from "../AppText";
import { COLORS, FONTS } from "../../constants";

function FormImagePicker({ name, label }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const imageUris = values[name];
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };
  return (
    <>
      <AppText style={{ ...FONTS.body4, color: COLORS.primary60 }}>
        {label}
      </AppText>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
