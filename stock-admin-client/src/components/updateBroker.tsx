import React, {useState} from 'react';
import { IBroker } from '../interfaces/broker';
import axios from 'axios';

interface IOnUpdateBrokerFunction {
  onUpdate: (broker: IBroker) => void
}

interface IUpdateResult {
  isOk: boolean,
  broker: IBroker
}

export function UpdateBroker({onUpdate}: IOnUpdateBrokerFunction)
{
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  async function onSubmit(event)
  {
    event.preventDefault();

    if(balance !== '' && id !== '') {
      let newBrokerInfo: IBroker = {
        id: parseInt(id),
        name: name,
        balance: parseInt(balance)
      };

      const response = await axios.post<IUpdateResult>('http://localhost:3001/brokers/update', newBrokerInfo);
      console.log(response.data);
      if(response.data.isOk){
        await onUpdate(response.data.broker);
      }
      else {
        alert('Не существует пользователя с таким ID');
      }
    }
  }

  function onChangeId(event) {
    setId(event.target.value);
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
        <input type="number" placeholder='ID' value={id} onChange={onChangeId} />
        <input type="text" placeholder='new broker name' value={name} onChange={onChangeName} />
        <input type="number" placeholder='balance' value={balance} onChange={onChangeBalance} />
        <button type="submit">Update</button>
      </form>
    </>
  )
}