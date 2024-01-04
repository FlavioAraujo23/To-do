import { faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import toast from "react-hot-toast"

const ToastFailed = () => {

  return (
    <div className="flex gap-4 max-w-max items-center max-h-max pl-4 py-1 pr-8 bg-orange-200/60 rounded">
      <FontAwesomeIcon className="text-orange-400" icon={faWarning} />
      <div className="w-64">
        <h2 className="text-orange-950">Failed to login</h2>
        <p className="text-orange-950/70">An error occured, check if the password and/or email are correct</p>
      </div>
      <button 
        className="border border-orange-400 py-1 px-2 rounded text-orange-950 hover:bg-orange-100"
        onClick={() => toast.remove()}  
      >
        Close
      </button>
    </div>
  )
}

export default ToastFailed