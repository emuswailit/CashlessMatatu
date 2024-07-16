import React from "react";
import AppButton from "../AppButton";
import { useFormikContext } from "formik";

function SubmitButton({ title, color, backgroundColor }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      width={320}
      backgroundColor={backgroundColor}
      color={color}
      title={title}
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
