import {CenterOnScreen} from "../../../globalComponents/common/CenterOnScreen"
import {AuthFrame} from "../../../globalComponents/templates/AuthFrame"
import {SignUpConfirmForm} from "./components/SignUpConfirmForm"

const SignUpConfirmPage = () => {
  return (
    <CenterOnScreen>
      <AuthFrame>
        <SignUpConfirmForm />
      </AuthFrame>
    </CenterOnScreen>
  )
}

export default SignUpConfirmPage
