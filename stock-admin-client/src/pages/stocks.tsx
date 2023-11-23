import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StocksService } from "../services/stocks.service.tsx";
import { ViewHistoricalData } from "../components/viewHistoricalData.tsx";
import { StockInformation } from "../components/stockInformation.tsx";


export function StocksPage()
{
  const { stocks } = StocksService();


  return (
    <>
    <Link to="http://localhost:3000/settings"><button>Auction</button></Link>
    <div className='stocks'>
      <ul>
        {
          stocks.map((stock) => (
            <li key={stock.id}>
              <StockInformation stock={stock} />
            </li>
          ))
        }
      </ul>
    </div>
    </>
  )
}