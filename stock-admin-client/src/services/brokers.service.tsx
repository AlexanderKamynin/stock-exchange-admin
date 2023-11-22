import {useState, useEffect} from 'react'
import { IBroker } from "../interfaces/broker.ts"
import axios from 'axios'


export function BrokersService()
{
  const [brokers, setBrokers] = useState<IBroker[]>([]);

  function addBroker(broker: IBroker)
  {
    //
  }

  function deleteBroker(id: number)
  {
    //
  }

  async function getBrokers()
  {
    const response = await axios.get<IBroker[]>('http://localhost:3001/brokers');
    console.log(response.data);
    setBrokers(response.data);
  }

  useEffect(() => {
    getBrokers()
  }, [])

  return { brokers }
}