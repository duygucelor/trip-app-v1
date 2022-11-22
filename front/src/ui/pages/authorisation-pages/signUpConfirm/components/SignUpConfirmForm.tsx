import {Button} from "@mui/material"
import {useEffect} from "react"
import {useForm} from "react-hook-form"
import {useLocation, useNavigate} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../../../../store"
import {
  confirmErrorSelector,
  confirmSignUp,
  confirmStatusSelector,
  reset,
} from "../../../../../core/authorization/useCases/confirmSignUp"
import {ErrorMessage} from "../../../../globalComponents/common/ErrorMessage"
import {Form} from "../../../../globalComponents/common/Form"
import {Input} from "../../../../globalComponents/form/Input"
import { PublicRoutesPaths } from "../../../../routes/publicRoutes"

export const SignUpConfirmForm = () => {
  const {state} = useLocation()
  const {email} = state
  const {control, handleSubmit} = useForm<{
    code: string
  }>()
  const dispatch = useAppDispatch()
  const onSubmit = handleSubmit(data => {
    dispatch(
      confirmSignUp({
        email,
        code: data.code,
      })
    )
  })
  const status = useAppSelector(confirmStatusSelector)
  const error = useAppSelector(confirmErrorSelector) as string
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  const navigate = useNavigate()
  useEffect(() => {
    if (status === "SUCCESS") {
      navigate(PublicRoutesPaths.signIn)
    }
  }, [navigate, status])
  return (
    <Form onSubmit={onSubmit}>
      <h1>Confirm sign up with {email}</h1>
      <Input control={control} label="Confirmation code" name="code" />
        <Button type="submit" variant="contained" color="secondary">
          Confirm
        </Button>
      {status === "ERROR" && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  )
}
