import { TextField } from "@mui/material";
import {
  Control,
  Controller,
  ControllerFieldState,
  UseFormGetValues,
} from "react-hook-form";

export function InputPasswordConfirmation({
  control,
  getValues,
}: {
  control: Control<any>;
  getValues: UseFormGetValues<any>;
}) {
  const errorMessage = (fieldState: ControllerFieldState) => {
    if (!fieldState.error) {
      return "";
    }
    switch (fieldState.error.type) {
      case "required":
        return "Field required";
      default:
        return fieldState.error.message || "Error";
    }
  };
  return (
    <Controller
      name="passwordConfirmation"
      control={control}
      defaultValue=""
      rules={{
        required: true,
        validate: (value) => {
          if (getValues("passwordConfirmation") !== value) {
            return "Password doesn't match";
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          label="Password confirmation"
          variant="filled"
          type="password"
          error={fieldState.invalid}
          helperText={errorMessage(fieldState)}
          {...field}
        />
      )}
    />
  );
}
