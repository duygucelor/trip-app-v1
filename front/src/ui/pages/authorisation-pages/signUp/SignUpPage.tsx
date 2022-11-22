import {CenterOnScreen} from "../../../globalComponents/common/CenterOnScreen"
import {AuthFrame} from "../../../globalComponents/templates/AuthFrame"
import SignUpForm from "./components/SignUpForm"

const SignUpPage = () => {
  return (
    <CenterOnScreen>
      <AuthFrame>
        <SignUpForm />
      </AuthFrame>
    </CenterOnScreen>
  )
}
export default SignUpPage
