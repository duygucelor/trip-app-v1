import {Box, Button, CircularProgress} from "@mui/material"
import {useEffect} from "react"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router"
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../../../../store"
import {
  signUp,
  errorSelector,
  reset,
  statusSelector,
} from "../../../../../core/authorization/useCases/signUp"
import {ErrorMessage} from "../../../../globalComponents/common/ErrorMessage"
import {Form} from "../../../../globalComponents/common/Form"
import {Input} from "../../../../globalComponents/form/Input"
import {InputEmail} from "../../../../globalComponents/form/InputEmail"
import {InputPassword} from "../../../../globalComponents/form/InputPassword"
import {InputPasswordConfirmation} from "../../../../globalComponents/form/InputPasswordConfirmation"
import { PublicRoutesPaths } from "../../../../routes/publicRoutes"

const SignUpForm = () => {
  const {control, handleSubmit, getValues} = useForm<{
    email: string
    password: string
    passwordConfirmation: string
    firstName: string
    lastName: string
  }>()
  const dispatch = useAppDispatch()
  const onSubmit = handleSubmit(data => {
    dispatch(
      signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })
    )
  })
  const navigate = useNavigate()
  const status = useAppSelector(statusSelector)
  const error = useAppSelector(errorSelector) as string
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  useEffect(() => {
    if (status === "SUCCESS") {
      navigate(PublicRoutesPaths.confirmSignUp, {state: {email: getValues("email")}})
    }
  }, [navigate, status, getValues])
  return (
    <Form onSubmit={onSubmit}>
      <h1>Sign Up</h1>

      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Input control={control} label="First Name" name="firstName"></Input>
        <Input control={control} label="Last Name" name="lastName"></Input>
      </Box>
      <InputEmail control={control} />
      <InputPassword control={control} />
      <InputPasswordConfirmation control={control} getValues={getValues} />
      <Button type="submit" variant="contained" color="primary">
        Sign-up
        {status === "PENDING" && (
          <CircularProgress color="inherit" size="1rem" />
        )}
      </Button>
      <span>
        Already have an account?&nbsp;
        <Link to={PublicRoutesPaths.signIn}>Sign in</Link>
      </span>
      {status === "ERROR" && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  )
}
export default SignUpForm
