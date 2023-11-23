import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrokersPage } from "./pages/brokers.tsx";
import { StocksPage } from "./pages/stocks.tsx";
import { ViewHistoricalData } from "./components/viewHistoricalData.tsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/brokers" element={<BrokersPage />}></Route>
        <Route path="/stocks" element={<StocksPage />}></Route>
        <Route path="history/:id" element={<ViewHistoricalData />}></Route>
      </Routes>
    </>
  );
}

export default App;
