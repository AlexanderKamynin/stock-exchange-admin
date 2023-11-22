import React from "react"
import { BrokersService } from "../services/brokers.service.tsx" 

function BrokerInformation() {
  return (
    <>
      <div>
        <p>Broker name</p>
        <p>Broker balance</p>
      </div>
    </>
  )
}

export function BrokersPage(){
  const { brokers } = BrokersService();

  return (
    <>
      <p>Аыаыблыалыб</p>
    </>
  )
}