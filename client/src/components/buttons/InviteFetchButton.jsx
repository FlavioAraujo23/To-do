/* eslint-disable react/prop-types */
import toast, { Toaster } from "react-hot-toast";
import validateFormInputs from "../../actions/validateInputs"
import { fetchData } from "../../actions/fetch";

const InviteFetchButton = ({email, name}) => {
  async function handleInvitePeople() {
    const toastOptions = {position: "bottom-right", duration: 2000};
    const validate = validateFormInputs(email, name);
    const listId = window.localStorage.getItem('activeList');
    const ownerId = window.localStorage.getItem('id');

    if(validate) {
      if(listId) {
        const url = 'http://localhost:3000/list/invite';
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

        result ?
        toast.success('Success, the invite is send!', toastOptions) :
        toast.error('Error, user not find!');
        
      } else {
        toast.error('Error, select a list for send invite', toastOptions);
      }
    } else {
      toast.error('Error, the invite values is empty!', toastOptions);
    }
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