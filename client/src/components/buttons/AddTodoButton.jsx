/* eslint-disable react/prop-types */

const AddTodoButton = ({ onClick, mobile }) => {
  return (
    <button 
      className={mobile ? "w-20 h-9 rounded-md flex items-center justify-center" : "rounded-md w-40 h-10 flex items-center justify-center"}
      style={{backgroundColor:'#5AC7AA'}}
      onClick={onClick} 
    >
      <span className={mobile ? "text-white text-xs font-bold" : "text-white font-bold"}>+ Add To do</span>  
    </button>
  )
}

export default AddTodoButton