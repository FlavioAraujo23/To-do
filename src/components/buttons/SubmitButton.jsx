/* eslint-disable react/prop-types */

const SubmitButton = ({ title }) => {
  return (
    <button className="w-full h-8 rounded text-lg text-center bg-greenMy  hover:bg-greenMy/50 text-white font-bold">{title}</button>
  )
}

export default SubmitButton