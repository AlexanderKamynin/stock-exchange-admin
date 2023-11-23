import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import axios from "axios";
import { ISettings } from "../interfaces/settings.ts";
import { IStock } from "../interfaces/stock.ts";


export function SettingsPage()
{
  function checkSessionStorage() {
    return sessionStorage.getItem('stocks') !== null &&
      sessionStorage.getItem('stocks') !== '' && 
      sessionStorage.getItem('stocks') !== '[]'
  }

  const [socket, setSocket] = useState<Socket>();
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [settings, setSettings] = useState<ISettings>({
    speed: 0,
    startDate: '',
    currentDate: '',
    chosenStocks: checkSessionStorage() ? JSON.parse(sessionStorage.getItem('stocks')) : [],
    isStarted: false
  });

  useEffect(() => {
    const newSocket = io("http://localhost:3002", { transports: ['websocket'] });
    setSocket(newSocket);
  }, [setSocket]);

  function onChangeSpeed(event) {
    let speed = event.target.value.replace(/\D/g, '');
    setSettings({
      speed: parseInt(speed),
      startDate: settings.startDate,
      currentDate: settings.currentDate,
      chosenStocks: settings.chosenStocks,
      isStarted: settings.isStarted
    })
  }

  function onChangeStartDate(event) {
    let startDate = event.target.value;
    setSettings({
      speed: settings.speed,
      startDate: startDate,
      currentDate: settings.currentDate,
      chosenStocks: settings.chosenStocks,
      isStarted: settings.isStarted
    })
  }

  function onChangeStock(stocks: IStock[]) {
    console.log(stocks);
    setStocks(stocks);
  }

  async function onSubmit(event) {
    event.preventDefault();

    setSettings({
      speed: settings.speed,
      startDate: settings.startDate,
      currentDate: settings.currentDate,
      chosenStocks: settings.chosenStocks,
      isStarted: !settings.isStarted
    });

    if(!settings.isStarted) // торги начинаются
    {
      //console.log(settings);
      axios.post('http://localhost:3001/settings', {
        speed: settings.speed,
        startDate: settings.startDate,
        currentDate: settings.currentDate,
        chosenStocks: settings.chosenStocks,
        isStarted: true
      }).then(res => {
        socket?.open();
        socket?.emit('updatePrices');
      })
    }
    else { // торги заканчиваются
      socket?.emit('stopAuction');
      socket?.close();
      axios.post('http://localhost:3001/settings', {
        speed: settings.speed,
        startDate: settings.startDate,
        currentDate: settings.currentDate,
        chosenStocks: [],
        isStarted: false
      });
    }
  }

  useEffect(() => {
    socket?.on('updatePrices', onChangeStock);
    return () => {
      socket?.off('updatePrices', onChangeStock);
    };
  }, [onChangeStock]);

  return (
    <>
    <Link to="http://localhost:3000/stocks"><button>Back</button></Link>

    <form onSubmit={onSubmit}>
      <div>
        <p>Auction settings</p>
        <div>
          <div>
            <p>Current date</p>
            <input type="date" disabled={true} value={settings.currentDate}/>
          </div>

          <div>
            <p>Start date</p>
            <input type="date" disabled={settings.isStarted} value={settings.startDate} onChange={onChangeStartDate}/>
          </div>

          <input type="number" disabled={settings.isStarted} value={settings.speed} onChange={onChangeSpeed} />

        </div>
      </div>

      {
        !settings.isStarted &&
          <button type="submit">Start auction</button>
      }

      {
        settings.isStarted &&
          <button type="submit">End auction</button>
      }
    </form>

    <ul>
          { stocks.length > 0 && settings.isStarted &&
            stocks.map((stock) => (
              <li key={stock.id}>
                <div>
                  <p>ID: {stock.id}</p>
                  <p>Label: {stock.label}</p>
                  <p>Name: {stock.name}</p>
                  <p>Price: {stock.price}</p>
                </div>
              </li>
            ))
          }
    </ul>

    </>
  )
}