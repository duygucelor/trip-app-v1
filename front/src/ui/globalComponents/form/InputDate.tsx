import { Control, Controller, ControllerFieldState } from "react-hook-form";
import { TextField } from "@mui/material";

export const InputDate = ({
  control,
  label,
  name,
  type,
}: {
  control: Control<any>;
  label: string;
  name: string;
  type?: string;
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
          id="date"
          label={label}
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          error={fieldState.invalid}
          helperText={errorMessage(fieldState)}
        />
      )}
    />
  );
};
