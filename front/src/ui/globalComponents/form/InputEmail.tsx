import { TextField } from "@mui/material";
import { Control, Controller, ControllerFieldState } from "react-hook-form";

export function InputEmail({
  control,
  defaultValue,
  disabled,
}: {
  control: Control<any>;
  defaultValue?: string;
  disabled?: boolean;
}) {
  const errorMessage = (fieldState: ControllerFieldState) => {
    if (!fieldState.error) {
      return "";
    }
    switch (fieldState.error.type) {
      case "required":
        return "Field required";
      case "pattern":
        return "Must be a valid email";
      default:
        return fieldState.error.message || "Error";
    }
  };
  return (
    <Controller
      name="email"
      control={control}
      defaultValue={defaultValue ?? ""}
      rules={{ required: true, pattern: /^\S+@\S+$/i }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="Email"
          variant="filled"
          error={fieldState.invalid}
          helperText={errorMessage(fieldState)}
          disabled={disabled}
        />
      )}
    />
  );
}
