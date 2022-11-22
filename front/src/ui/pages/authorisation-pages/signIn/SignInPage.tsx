import {CenterOnScreen} from "../../../globalComponents/common/CenterOnScreen"
import {AuthFrame} from "../../../globalComponents/templates/AuthFrame"
import {SignInForm} from "./components/SignInForm"

const SignInPage = () => {
  return (
    <CenterOnScreen>
      <AuthFrame>
        <SignInForm />
      </AuthFrame>
    </CenterOnScreen>
  )
}
export default SignInPage
