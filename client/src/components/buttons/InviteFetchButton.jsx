/* eslint-disable react/prop-types */
import toast, { Toaster } from "react-hot-toast";
import { fetchData } from "../../actions/fetch";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const InviteFetchButton = ({email, name}) => {
  const {urlBase} = useContext(UserContext);

  async function handleInvitePeople() {
    const toastOptions = {position: "bottom-right", duration: 2000};
    const listId = window.localStorage.getItem('activeList');
    const ownerId = window.localStorage.getItem('id');

    const userData = window.localStorage.getItem('userData');
    if(userData.email === email) {
      toast.error('Send a email for different user', toastOptions);
      return;
    }

      if(listId) {
        const url = urlBase+'/list/invite';
        const data = {
          inviteEmail: email,
          listId,
          ownerId,
          name
        };
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        };

        const result = await fetchData(url, options);

        if(result.status === 449) {
          toast.error('Error, the invite values is empty!', toastOptions);
          return
        }

        if(result.error === 'email') {
          toast.error('Error, enter a valid email', toastOptions)
          return
        }
        
        result.ok ?
        toast.success('Success, the invite is send!', toastOptions) :
        toast.error('Error, user not find!');
        
      } else {
        toast.error('Error, select a list for send invite', toastOptions);
      }
      setTimeout(() => toast.remove(), 2000);
  }

  return (
    <>
      <button
        className="w-20 h-7 flex justify-center items-center rounded-md"
        style={{backgroundColor:'#5AC7AA'}}
        onClick={handleInvitePeople}
      >
        <span className="font-bold text-sm text-white pr-1">+ Invite</span>
      </button>
      <Toaster />
    </>
  )
}

export default InviteFetchButton