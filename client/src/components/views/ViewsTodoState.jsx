import TodoViews from "./TodoViews"

const ViewsTodoState = () => {
  return (
    <main className="container  pl-2 pt-4">
      <div className="w-full flex justify-around">
        <div className="w-80 max-h-max overflow-hidden h-max border-b-[6px] border-b-stone-200/60 rounded-md border border-gray-100">
          <h3 className="bg-gray-100/80 h-10 pl-2 pt-2">To do</h3>
          <div className="min-h-32 h-max overflow-hidden flex flex-col items-center gap-2 p-4">
            <TodoViews state='Todo'/>
          </div>
        </div>
        <div className="w-80 max-h-max overflow-hidden h-max border-b-[6px] border-b-yellow-200/60 rounded-md border border-gray-100">
          <h3 className="bg-gray-100/80 h-10 pl-2 pt-2">Doing</h3>
          <div className="min-h-32 h-max overflow-hidden flex flex-col items-center gap-2 p-4">
            <TodoViews state='Doing'/>
          </div>
        </div>
        <div className="w-80 max-h-max overflow-hidden h-max border-b-[6px] border-b-green-200/60 rounded-md border border-gray-100">
          <h3 className="bg-gray-100/80 h-10 pl-2 pt-2">Done</h3>
          <div className="min-h-32 h-max overflow-hidden flex flex-col items-center gap-2 p-4">
            <TodoViews state='Done' />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ViewsTodoState