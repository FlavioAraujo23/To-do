import { useState } from "react"
import AddTodoButton from "../buttons/AddTodoButton"
import DeleteTodoButton from "../buttons/DeleteTodoButton"
import InviteTodoButton from "../buttons/InviteTodoButton"
import InviteModalForm from "../forms/InviteModalForm"

const ListHomework = () => {
  const [modalInvite, setModalinvite] = useState();

  function handleOpenModal() {
    setModalinvite(true);
  }

  function handleCloseModal() {
    setModalinvite(false);
  }

  return (
    <main className="container">
      <header className="flex justify-between items-center pt-4 pl-4">
        <h2 className="font-bold text-xl">Homework</h2>
        <div className="flex items-center gap-2 pr-4">
          <div className="pr-4">
            <DeleteTodoButton />
          </div>
          <AddTodoButton />
          <InviteTodoButton onClick={handleOpenModal} />
        </div>
       
      </header>
       {modalInvite && <InviteModalForm estadoModal={modalInvite} fecharModal={handleCloseModal}/>}
    </main>
  )
}

export default ListHomework