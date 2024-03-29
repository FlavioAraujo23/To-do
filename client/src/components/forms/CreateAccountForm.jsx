import { useContext, useState } from 'react';
import SubmitButton from '../buttons/SubmitButton'
import { fetchData } from '../../actions/fetch';
import toast, { Toaster } from 'react-hot-toast';
import ToastSuccess from '../customToasted/ToastSuccess';
import ToastFailed from '../customToasted/ToastFailed';
import { Link, useNavigate } from 'react-router-dom';
import useMedia from '../hooks/useMedia';
import { UserContext } from '../../context/UserContext';

const CreateAccountForm = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const inputStyles = "border-b w-full focus:outline-none focus:border-b-gray-400";
  const {urlBase} = useContext(UserContext);
  const mobile = useMedia('(max-width: 50rem)');

  async function createAccount(event) {
    event.preventDefault();
    const toastOptions = {position: "bottom-right", duration: 2000};
    const url = urlBase+'/auth/createAccount';
    const postData = {
      nome: nomeCompleto,
      email,
      senha,
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
      };

    const dados = await fetchData(url, options);

    if(dados.status === 401) {
      const data = await dados.json();
      if(data.error === 'invalid' || data.error === 'name') {
        toast.custom(
          <ToastFailed 
            title='Failed to register'
            subtitle='Fill the fields correctly!'
          />, toastOptions
        );
        return
      }

      data.error === 'email' ?
      toast.custom(
        <ToastFailed 
          title='Failed to register'
          subtitle='Enter a valid email'
        />, toastOptions
      ) :
      toast.custom(
        <ToastFailed
          title='Failed to register'
          subtitle='Your password must have at least 8 characters, letters and numbers'
        />, toastOptions
      )
      return;
    }

    if (dados.userId){
      toast.custom(<ToastSuccess title={'Registration completed'}/>, toastOptions)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }

    if (dados.message === "Email já cadastrado") {
      toast.custom(<ToastFailed title='Failed to register' subtitle='User already exists'/>, toastOptions)
    }
    setTimeout(() => toast.remove(), 2000);
  }
  
  return (
    <main className='w-screen flex gap-32'>
    {!mobile &&  
      <div className="w-1/2 h-screen" style={{backgroundColor:'#5AC7AA'}}>
        <div className="ml-5 hidden">relogio</div>
        <div className="w-32 text-white ml-5">
          <p>Everything you need to do in one place</p>
        </div>
        <div className='hidden'>imagem</div>
      </div>
    }
    <div className={mobile ? "w-screen h-screen flex justify-center items-center" : "w-full h-full"}>
      {!mobile && <div className="relative w-full"> 
        <div className="flex item gap-1 absolute right-0 mr-4 mt-4 text-gray-500">
          <span>English <br /> (US)</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7">
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1. 06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>}
        <form className={mobile ? "max-w-sm" : "max-w-xs flex flex-col mt-32 gap-4"} onSubmit={createAccount}>
          <h2 className="font-bold text-center text-xl">Create <br /> Account</h2>  
            <input
              type="text"
              className={mobile ? inputStyles + " pt-2" : inputStyles }
              placeholder='Full Name'
              value={nomeCompleto}
              onChange={({target}) => {setNomeCompleto(target.value)
                 }}
            /> 
            <input 
              type="text"
              placeholder='Email Address'
              className={mobile ? inputStyles + " pt-2" : inputStyles }
              value={email}
              onChange={({target}) => setEmail(target.value)}
            />
            <input 
              type="password"
              className={mobile ? inputStyles + " pt-2" : inputStyles }
              placeholder='Password'
              value={senha}
              onChange={({target}) => setSenha(target.value)}
            />
          <div className={mobile ? "mt-8 mb-2" : "mt-2"}>
            <SubmitButton title="Created Account"/>
          </div>
          <div className="flex relative">
            <div className="w-full h-12 flex flex-col pt-1 text-gray-400">
              <span>Already have an account?</span>
              <Link 
                to={'/login'}
                className="border-b w-14 hover:text-gray-400/50 cursor-pointer underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
        <Toaster />
    </div>
  </main>
  )
}

export default CreateAccountForm