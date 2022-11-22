import { TextField } from "@mui/material";
import { Control, Controller, ControllerFieldState } from "react-hook-form";

export const Input = ({
  control,
  label,
  name,
  type,
  disabled = false,
}: {
  control: Control<any>;
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
}) => {
  const errorMessage = (fieldState: ControllerFieldState) => {
    if (!fieldState.error) {
      return "";
    }
    switch (fieldState.error.type) {
      case "required":
        return "Field required";
      case "pattern":
        return "Must be a valid pattern";
      default:
        return fieldState.error.message || "Error";
    }
  };
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant="standard"
          error={fieldState.invalid}
          helperText={errorMessage(fieldState)}
          disabled={disabled}
        />
      )}
    />
  );
};
