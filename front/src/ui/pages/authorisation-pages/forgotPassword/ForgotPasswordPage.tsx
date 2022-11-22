import {CenterOnScreen} from "../../../globalComponents/common/CenterOnScreen"
import {AuthFrame} from "../../../globalComponents/templates/AuthFrame"
import {ForgotPasswordForm} from "./components/ForgotPasswordForm"

const ForgotPasswordSubmitPage = () => {
  return (
    <CenterOnScreen>
      <AuthFrame>
        <ForgotPasswordForm />
      </AuthFrame>
    </CenterOnScreen>
  )
}

export default ForgotPasswordSubmitPage
