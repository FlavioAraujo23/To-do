/* eslint-disable react/prop-types */
import { createContext, useState } from "react"
import { fetchData } from "../actions/fetch";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [dados, setDados] = useState(null);
  const [login, setLogin] = useState(null);

  async function userLogin(email, senha) {
    const url = 'http://localhost:3000/auth/login'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, senha}),
      }

    const user = await fetchData(url, options);
    setDados(user);
    window.localStorage.setItem('id', user.userId);
    setLogin(true);
    return dados;
  }

  async function userLogout() {
    setDados(null);
    setLogin(false);
    window.localStorage.removeItem('id');
  }

  return (
    <UserContext.Provider value={{userLogin, userLogout, dados, login}}>
      {children}
    </UserContext.Provider>
  )
}
