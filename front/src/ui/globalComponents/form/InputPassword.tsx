import { TextField } from "@mui/material";
import { Control, Controller, ControllerFieldState } from "react-hook-form";

export function InputPassword({ control }: { control: Control<any> }) {
  const minLength = 6;
  const errorMessage = (fieldState: ControllerFieldState) => {
    if (!fieldState.error) {
      return "";
    }
    switch (fieldState.error.type) {
      case "required":
        return "Field required";
      case "minLength":
        return `At least ${minLength} characters`;
      default:
        return fieldState.error.message || "Error";
    }
  };

  return (
    <Controller
      name="password"
      control={control}
      defaultValue=""
      rules={{ required: true, minLength }}
      render={({ field, fieldState }) => (
        <TextField
          label="Password"
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
