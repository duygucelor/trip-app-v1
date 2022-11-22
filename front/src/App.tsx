import React from "react"
import {Auth} from "aws-amplify"
import awsconfig from "./aws-exports"
import "./App.css"
import {AppRoutes} from "./ui/routes/AppRoutes"
Auth.configure(awsconfig)

const App = () => {
  return <AppRoutes />
}

export default App
