import React from "react";
import { Link } from "react-router-dom";
import { StocksService } from "../services/stocks.service.tsx";
import { ViewHistoricalData } from "../components/viewHistoricalData.tsx";


export function StocksPage()
{
  const { stocks } = StocksService();

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
              <Link to={`/history/${stock.id}`}>History</Link>
            </li>
          ))
        }
      </ul>
    </div>
    </>
  )
}