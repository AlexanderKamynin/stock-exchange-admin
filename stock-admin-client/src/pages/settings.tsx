import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import axios from "axios";
import { ISettings } from "../interfaces/settings.ts";
import { IStock } from "../interfaces/stock.ts";


export function SettingsPage()
{

  const [socket, setSocket] = useState<Socket>();
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [settings, setSettings] = useState<ISettings>({
    speed: 0,
    startDate: '',
    currentDate: '',
    chosenStocks: [],
    isStarted: false
  });

  useEffect(() => {
    const newSocket = io("http://localhost:3002", { transports: ['websocket'] });
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    axios.get<ISettings>('http://localhost:3001/settings').then(
      res => {
        setSettings(res.data);
        console.log(res.data)
      }
    )
  }, []);

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
      let chosenStocks = [];

      axios.post('http://localhost:3001/settings', {
        speed: settings.speed,
        startDate: settings.startDate,
        currentDate: settings.currentDate,
        chosenStocks: chosenStocks,
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
    </>
  )
}