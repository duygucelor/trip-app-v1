import React from "react";
import { MenuItem, TextField } from "@mui/material";
import {
  Controller,
  Control,
  ControllerFieldState,
  Path,
} from "react-hook-form";

export interface Option {
  value: string;
  label: string;
}

interface Props<T extends Record<string, any>> {
  options: any[];
  control: Control<T>;
  name: string;
  placeholder: string;
  required: boolean;
  label: string;
}

const CustomSelect = <T extends Record<string, any>>(props: Props<T>) => {
  const { name, control, options, required, label } = props;

  const errorMessage = (fieldState: ControllerFieldState) => {
    if (!fieldState.error) {
      return "";
    }
    switch (fieldState.error.type) {
      case "required":
        return "Champs requis";
      case "pattern":
        return "Champs invalide";
      default:
        return fieldState.error.message || "Error";
    }
  };

  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field, fieldState }) => (
          <TextField
          {...field}
            select
            value={field.value || ''}
            label={label}
            helperText={errorMessage(fieldState)}
            variant="standard"
            onChange={field.onChange}
            sx={{width:"70%"}}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
      )}
      rules={{ required }}
    />
  );
};

export default CustomSelect;
