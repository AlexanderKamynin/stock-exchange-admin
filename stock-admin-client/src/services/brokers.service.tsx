import {useState, useEffect} from 'react'
import { IBroker } from "../interfaces/broker.ts"
import axios from 'axios'


export function BrokersService()
{
  const [brokers, setBrokers] = useState<IBroker[]>([]);

  async function addBroker(broker: IBroker)
  {
    setBrokers(prev => [...prev, broker]);
  }

  function deleteBroker(id: number)
  {
    setBrokers(brokers.filter(
      broker => broker.id !== id
    ));
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

  return { brokers, addBroker, deleteBroker }
}