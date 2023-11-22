import React, { useContext } from "react"
import { AddBroker } from "../components/addBroker.tsx";
import { BrokersService } from "../services/brokers.service.tsx" 
import { ModalWindow, ModalWindowState } from "../components/modalWindow.tsx";
import { IBroker } from "../interfaces/broker.ts";


export function BrokersPage(){
  const { isOpen, open: openModal, close: closeModal } = ModalWindowState();
  const { brokers, addBroker, deleteBroker } = BrokersService();


  function onAddBroker(broker: IBroker)
  {
    closeModal();
    addBroker(broker);
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
                  <button onClick={() => deleteBroker(broker.id)}>Удалить</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>

      {
        isOpen && 
          <ModalWindow
            title={"Add broker"}
            content={<AddBroker onAdd={onAddBroker}/>}
            onClose={closeModal}
          />
      }
      
      {
        !isOpen &&
          <button onClick={openModal}>Add broker</button>
      }
    </>
  )
}