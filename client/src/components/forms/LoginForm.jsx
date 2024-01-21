import { useContext, useEffect, useState } from "react"
import SubmitButton from "../buttons/SubmitButton"
import toast, { Toaster } from 'react-hot-toast';
import ToastSuccess from "../customToasted/toastSuccess";
import ToastFailed from "../customToasted/ToastFailed";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import useMedia from "../hooks/useMedia";

const LoginForm = () => {
  const [email, setEmail]= useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const {userLogin, login} = useContext(UserContext);
  const inputStyles = "border-b w-full focus:outline-none focus:border-b-gray-400";
  const mobile = useMedia('(max-width: 50rem)');

  useEffect(() => {
    if(login) {
      navigate('/list')
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    const dados = await userLogin(email, senha);
    const toastOptions = {position: "bottom-right", duration: 2000}

    !dados.message ? 
    toast.custom(
      <ToastSuccess
        title='Login successfully' 
      />, toastOptions) &&
      setTimeout(() => navigate('/list'), 1000) :
    toast.custom(
      <ToastFailed 
        title='Failed to login' 
        subtitle='An error occured, check if the password and/or email are correct' 
      />, toastOptions)
  }

  return (
    <main className='w-screen flex gap-32 bg-slate-100/50'>
      {!mobile && <div
          className="w-1/2 h-screen"
          style={{backgroundColor:'#5AC7AA'}}
        >
          <div className="ml-5 hidden">relogio</div>
          <div className="w-32 text-white ml-5">
            <p>Everything you need to do in one place</p>
          </div>
          <div className="hidden">imagem</div>
        </div>
      }
      <div className={mobile ? "w-screen h-screen flex justify-center items-center" : "w-full h-full"}>
      {!mobile && 
        <div className="relative w-full"> 
          <div className="flex item gap-1 absolute right-0 mr-4 mt-4 text-gray-500">
            <span>English <br /> (US)</span>
            <svg xmlns="http://www.w3.org/2000/svg"       viewBox="0 0 16 16" fill="currentColor"   className="w-7 h-7">
              <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1. 06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      }
          <form className={mobile ? "max-w-sm" : "max-w-xs flex flex-col mt-48 gap-4"} onSubmit={handleLogin}>
            <h2 className="font-bold text-center text-xl">Login</h2>
            <label htmlFor="">
              <input 
                type="text"
                placeholder='Email Address'
                className={mobile ? inputStyles + " pt-2" : inputStyles }
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </label>
            <label htmlFor="">
              <input 
                type="password" 
                className={mobile ? inputStyles + " pt-2" : inputStyles }
                value={senha}
                onChange={({ target }) => setSenha(target.value)}
                placeholder='Password'
              />
            </label>
            <div className={mobile ? "mt-8 mb-2" : "mt-2"}>
              <SubmitButton title="Login"/>
            </div>
            <div className="flex relative">
                <div className="w-full h-12 flex flex-col text-gray-400 pt-1">
                <span>Do not have an account yet?</span>
                <Link className="border-b w-14 hover:text-gray-300 cursor-pointer underline" to={'/signUp'}>Sign Up</Link>
                </div>
            </div>
          </form>
          <Toaster/>
      </div>
    </main>
  )
}

export default LoginForm