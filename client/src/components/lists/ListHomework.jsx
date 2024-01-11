import { useState } from "react"
import AddTodoButton from "../buttons/AddTodoButton"
import DeleteTodoButton from "../buttons/DeleteTodoButton"
import InviteTodoButton from "../buttons/InviteTodoButton"
import InviteModalForm from "../forms/InviteModalForm"
import CreateTodoForm from "../forms/CreateTodoForm"

const ListHomework = () => {
  const [modalInvite, setModalinvite] = useState();
  const [modalTodo, setModalTodo] = useState();
  function handleOpenModal() {
    setModalinvite(true);
  }

  function handleCloseModal() {
    setModalinvite(false);
  }

  function handleOpen() {
    setModalTodo(true);
  }

  function handleClose() {
    setModalTodo(false)
  }

  return (
    <main className="container">
      <header className="flex justify-between items-center pt-4 pl-4">
        <h2 className="font-bold text-xl">Homework</h2>
        <div className="flex items-center gap-2 pr-4">
          <div className="pr-4">
            <DeleteTodoButton />
          </div>
          <AddTodoButton onClick={handleOpen} />
          <InviteTodoButton onClick={handleOpenModal} />
        </div>
       
      </header>
       {modalInvite && <InviteModalForm estadoModal={modalInvite} fecharModal={handleCloseModal}/>}
       {modalTodo && <CreateTodoForm estadoModal={modalTodo} fecharModal={handleClose}/>}
    </main>
  )
}

export default ListHomework