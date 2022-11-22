import {Button, CircularProgress} from "@mui/material"
import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom"
import {useEffect} from "react"
import {
  errorSelector,
  reset,
  signIn,
  statusSelector,
} from "../../../../../core/authorization/useCases/signIn"
import {useAppDispatch, useAppSelector} from "../../../../../store"
import {Form} from "../../../../globalComponents/common/Form"
import {InputEmail} from "../../../../globalComponents/form/InputEmail"
import {InputPassword} from "../../../../globalComponents/form/InputPassword"
import {ErrorMessage} from "../../../../globalComponents/common/ErrorMessage"
import { PublicRoutesPaths } from "../../../../routes/publicRoutes"
import { PrivateRoutesPaths } from "../../../../routes/privateRoutes"

export const SignInForm = () => {
  const {control, handleSubmit} = useForm<{
    email: string
    password: string
  }>()
  const dispatch = useAppDispatch()
  const onSubmit = handleSubmit(data => {
    dispatch(
      signIn({
        email: data.email,
        password: data.password,
      })
    )
  })
  const status = useAppSelector(statusSelector)
  const error = useAppSelector(errorSelector)
  const navigate = useNavigate()
  useEffect(() => {
    if (status === "SUCCESS") {
      navigate(PrivateRoutesPaths.home)
      dispatch(reset())
    }
  }, [dispatch, navigate, status])


  return (
    <Form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <InputEmail control={control} />
      <InputPassword control={control} />
        <Link to={PublicRoutesPaths.forgotPassword}>Forgot your password?</Link>
      <Button
        type="submit"
        disabled={status === "PENDING"}
        variant="contained"
        color="primary"
      >
        Sign-in
        {status === "PENDING" && (
          <CircularProgress color="inherit" size="1rem" />
        )}
      </Button>
      <span>
        Don't have an account?&nbsp;
        <a href={PublicRoutesPaths.signUp}>Sign up</a>
      </span>
      {status === "ERROR" && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  )
}
