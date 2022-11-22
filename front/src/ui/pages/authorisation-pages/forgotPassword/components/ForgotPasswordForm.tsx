import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import {
  errorSelector,
  forgotPassword,
  reset,
  statusSelector,
} from "../../../../../core/authorization/useCases/forgotPassword";
import { ErrorMessage } from "../../../../globalComponents/common/ErrorMessage";
import { Form } from "../../../../globalComponents/common/Form";
import { InputEmail } from "../../../../globalComponents/form/InputEmail";
import { PublicRoutesPaths } from "../../../../routes/publicRoutes";

export const ForgotPasswordForm = () => {
  const { control, handleSubmit, getValues } = useForm<{
    email: string;
  }>();
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit((data) => {
    dispatch(forgotPassword(data.email));
  });
  const status = useAppSelector(statusSelector);
  const error = useAppSelector(errorSelector) as string;
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    if (status === "SUCCESS") {
      navigate(PublicRoutesPaths.forgotPasswordSubmit, {state: {email: getValues("email")}});
    }
  }, [getValues, navigate, status]);

  return (
    <Form onSubmit={onSubmit}>
      <h1>Reset your password</h1>
      <InputEmail control={control} />
      <Button type="submit" variant="contained" color="secondary">
        Reset
      </Button>
      {status === "ERROR" && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

