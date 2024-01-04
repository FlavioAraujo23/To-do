import { useState } from "react"
import SubmitButton from "../buttons/SubmitButton"
import { fetchData } from "../../actions/fetch";
import toast, { Toaster } from 'react-hot-toast';
import ToastSuccess from "../customToasted/toastSuccess";

const LoginForm = () => {
  const [email, setEmail]= useState('');
  const [senha, setSenha] = useState('');
  async function handleLogin(e) {
    e.preventDefault();
    const url = 'http://localhost:3000/auth/login'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, senha}),
      }
    const dados = await fetchData(url, options);
    console.log(dados)

  }

  return (
    <main className='w-screen flex gap-32'>
      <div
        className="w-1/2 h-screen"
        style={{backgroundColor:'#5AC7AA'}}
      >
        <div className="ml-5">relogio</div>
        <div className="w-32 text-white ml-5">
          <p>Everything you need to do in one place</p>
        </div>
        <div>imagem</div>
      </div>
      <div className="w-full h-full">
        <div className="relative w-full"> 
          <div className="flex item gap-1 absolute right-0 mr-4 mt-4 text-gray-500">
            <span>English <br /> (US)</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
              <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1. 06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
          <form className="max-w-xs flex flex-col mt-48 gap-4" onSubmit={handleLogin}>
            <h2 className="font-bold text-center text-xl">Login</h2>
            <label htmlFor="">
              <input 
                type="text"
                placeholder='Email Address'
                className="border-b w-full"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </label>
            <label htmlFor="">
              <input 
                type="password" 
                className="border-b w-full"
                value={senha}
                onChange={({ target }) => setSenha(target.value)}
                placeholder='Password'
              />
            </label>
            <div className="mt-2">
              <SubmitButton title="Login"/>
            </div>
            <div className="flex relative">
                <div className="w-full h-12 flex flex-col text-gray-300/90 pt-1">
                <span>Do not have an account yet?</span>
                <a className="border-b w-14 hover:text-gray-300/50 cursor-pointer">Sign Up</a>
                </div>
            </div>
          </form>
          <Toaster/>
      </div>
    </main>
  )
}

export default LoginForm