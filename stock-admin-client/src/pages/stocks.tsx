import React from "react";
import { StocksService } from "../services/stocks.service.tsx";
import { HistoricalDataService } from "../services/historicalData.service.tsx"; 

export function StocksPage()
{
  const { stocks } = StocksService();
  //const { historicalData } = HistoricalDataService();

  return (
    <>
    <div className='stocks'>
      <ul>
        {
          stocks.map((stock) => (
            <li key={stock.id}>
              <div>
                <p>ID: {stock.id}</p>
                <p>label: {stock.label}</p>
                <p>Company: {stock.name}</p>
                <p>Price: {stock.price}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
    </>
  )
}