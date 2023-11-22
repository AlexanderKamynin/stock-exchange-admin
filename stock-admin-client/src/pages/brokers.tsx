import React, { useContext } from "react"
import { AddBroker } from "../components/addBroker.tsx";
import { BrokersService } from "../services/brokers.service.tsx" 
import { ModalWindow, ModalWindowState } from "../components/modalWindow.tsx";
import { IBroker } from "../interfaces/broker.ts";
import { UpdateBroker } from "../components/updateBroker.tsx";


export function BrokersPage(){
  const { isOpen: isOpenAdd, open: openModalAdd, close: closeModalAdd } = ModalWindowState();
  const { isOpen: isOpenUpdate, open: openModalUpdate, close: closeModalUpdate } = ModalWindowState();
  const { brokers, addBroker, deleteBroker, updateBroker } = BrokersService();


  function onAddBroker(broker: IBroker)
  {
    closeModalAdd();
    addBroker(broker);
  }

  function onUpdateBroker(broker: IBroker)
  {
    closeModalUpdate();
    updateBroker(broker);
  }

  return (
    <>
      <div className='brokers'>
        <ul>
          {
            brokers.map((broker) => (
              <li key={broker.id}>
                <div>
                  <p>ID: {broker.id}</p>
                  <p>Name: {broker.name}</p>
                  <p>Balance: {broker.balance}</p>
                  <button onClick={() => deleteBroker(broker.id)}>Delete</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>

      {
        isOpenAdd && 
          <ModalWindow
            title={"Add broker"}
            content={<AddBroker onAdd={onAddBroker}/>}
            onClose={closeModalAdd}
          />
      }
      
      {
        !isOpenAdd &&
          <button onClick={openModalAdd}>Add broker</button>
      }


      {
        !isOpenUpdate &&
        <button onClick={openModalUpdate}>Change</button>
      }

      {
        isOpenUpdate &&
        <ModalWindow
          title={"Change information"}
          content={<UpdateBroker onUpdate={onUpdateBroker}/>}
          onClose={closeModalUpdate}
        />
      }
    </>
  )
}