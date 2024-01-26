/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"
import { fetchData } from "../actions/fetch";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const urlBase = "http://localhost:3000";

  const [dados, setDados] = useState(() => {
    const storedData = window.localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null
  });
  const [login, setLogin] = useState(!!dados);

  async function userLogin(email, senha) {
    const url = urlBase+'/auth/login';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, senha}),
      }

    const user = await fetchData(url, options);

    if(user.userId){
      window.localStorage.setItem('userData', JSON.stringify(user));
      window.localStorage.setItem('id', user.userId);
      setLogin(true);
    }

    return user;
  }


  async function userLogout() {
    setDados(null);
    setLogin(false);
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem('activeList')
    window.localStorage.removeItem('channelName');
  }



  return (
    <UserContext.Provider value={{userLogin, userLogout, dados, login, urlBase}}>
      {children}
    </UserContext.Provider>
  )
}
