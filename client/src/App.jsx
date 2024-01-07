import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginForm from "./components/forms/LoginForm"
import CreateAccountForm from "./components/forms/CreateAccountForm"
import { UserStorage } from "./context/UserContext";
import ListView from "./components/lists/ListView";



function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<CreateAccountForm />}/>
            <Route path="/login/*" element={<LoginForm />}/>
            <Route path="/list" element={<ListView/>} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
