import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrokersPage } from "./pages/brokers.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/brokers" element={<BrokersPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
