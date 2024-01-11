/* eslint-disable react/prop-types */

const AddTodoButton = ({ onClick }) => {
  return (
    <button 
      className="rounded-md w-40 h-10 flex items-center justify-center"
      style={{backgroundColor:'#5AC7AA'}}
      onClick={onClick} 
    >
      <span className="text-white font-bold">+ Add To do</span>  
    </button>
  )
}

export default AddTodoButton