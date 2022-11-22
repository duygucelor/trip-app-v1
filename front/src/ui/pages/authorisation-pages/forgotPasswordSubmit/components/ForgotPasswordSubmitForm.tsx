import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import {
  errorSelector,
  forgotPasswordSubmit,
  statusSelector,
  reset,
} from "../../../../../core/authorization/useCases/forgotPasswordSubmit";
import { ErrorMessage } from "../../../../globalComponents/common/ErrorMessage";
import { Form } from "../../../../globalComponents/common/Form";
import { Input } from "../../../../globalComponents/form/Input";
import { InputEmail } from "../../../../globalComponents/form/InputEmail";
import { InputPassword } from "../../../../globalComponents/form/InputPassword";
import { InputPasswordConfirmation } from "../../../../globalComponents/form/InputPasswordConfirmation";
import { PublicRoutesPaths } from "../../../../routes/publicRoutes";

export const ForgotPasswordSubmitForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(statusSelector);
  const error = useAppSelector(errorSelector) as string;
  const {state} = useLocation()
  const {email} = state
  const { control, handleSubmit, getValues } = useForm<{
    email: string;
    code: string;
    password: string;
  }>();
  const onSubmit = handleSubmit((data) => {
    dispatch(
      forgotPasswordSubmit({
        email: data.email,
        code: data.code,
        password: data.password,
      })
    );
  });
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  useEffect(() => {
    if (status === "SUCCESS") {
      navigate(PublicRoutesPaths.signIn);
    }
  }, [getValues, navigate, status]);
  return (
    <Form onSubmit={onSubmit}>
      <h1>Reset your password</h1>
      <InputEmail control={control} defaultValue={email} disabled={true}/>
      <Input control={control} label="Confirmation code" name="code" />
      <InputPassword control={control} />
      <InputPasswordConfirmation control={control} getValues={getValues} />
      <Button type="submit" variant="contained" color="secondary">
        Confirm
      </Button>
      {status === "ERROR" && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};
