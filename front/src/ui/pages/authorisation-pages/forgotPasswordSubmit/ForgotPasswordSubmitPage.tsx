import {CenterOnScreen} from "../../../globalComponents/common/CenterOnScreen"
import {AuthFrame} from "../../../globalComponents/templates/AuthFrame"
import {ForgotPasswordSubmitForm} from "./components/ForgotPasswordSubmitForm"

const ForgotPasswordPage = () => {
  return (
    <CenterOnScreen>
      <AuthFrame>
        <ForgotPasswordSubmitForm />
      </AuthFrame>
    </CenterOnScreen>
  )
}

export default ForgotPasswordPage
