import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrokersPage } from "./pages/brokers.tsx";
import { StocksPage } from "./pages/stocks.tsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/brokers" element={<BrokersPage />}></Route>
        <Route path="/stocks" element={<StocksPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
