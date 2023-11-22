import React, {useState} from 'react';
import { IBroker, IBrokerAdd } from '../interfaces/broker';
import axios from 'axios';

interface IOnAddBrokerFunction {
  onAdd: (broker: IBroker) => void
}


export function AddBroker({onAdd}: IOnAddBrokerFunction)
{
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);

  async function onSubmit(event)
  {
    event.preventDefault();

    if(name !== '' && balance >= 0) {
      let newBroker: IBrokerAdd = {
        name: name,
        balance: balance
      };

      const response = await axios.post<IBroker>('http://localhost:3001/brokers/add', newBroker);
      console.log(response.data);
      onAdd(response.data);
    }
  }

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeBalance(event) {
    setBalance(event.target.value);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='new broker name' value={name} onChange={onChangeName} />
        <input type="number" placeholder='balance' value={balance} onChange={onChangeBalance} />
        <button type="submit">Add</button>
      </form>
    </>
  )
}