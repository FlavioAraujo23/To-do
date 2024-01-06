import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginForm from "./components/forms/LoginForm"
import CreateAccountForm from "./components/forms/CreateAccountForm"
import DivTest from "./components/forms/DivTest";
import { UserStorage } from "./context/UserContext";



function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<CreateAccountForm />}/>
            <Route path="/login/*" element={<LoginForm />}/>
            <Route path="/list" element={<DivTest/>} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
