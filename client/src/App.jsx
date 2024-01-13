import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginForm from "./components/forms/LoginForm"
import { UserStorage } from "./context/UserContext";
import ListView from "./components/lists/ListView";
import CreateAccountForm from "./components/forms/CreateAccountForm";



function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={ <ListView /> } />
            <Route path="/login" element={ <LoginForm /> } />
            <Route path="/signUp" element={ <CreateAccountForm /> } />
            <Route path="/list" element={ <ListView /> } />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
