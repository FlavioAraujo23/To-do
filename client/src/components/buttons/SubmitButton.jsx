/* eslint-disable react/prop-types */

const SubmitButton = ({ title }) => {
  return (
    <button 
      className="w-full h-8 rounded text-lg text-center text-white font-bold"
      style={{backgroundColor:'#5AC7AA'}}
    >
      {title}
    </button>
  )
}

export default SubmitButton