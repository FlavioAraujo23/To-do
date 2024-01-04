import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginForm from "./components/forms/LoginForm"
import CreateAccountForm from "./components/forms/CreateAccountForm"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateAccountForm />}/>
          <Route path="/login/*" element={<LoginForm />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
