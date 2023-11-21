import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [x, setX] = useState(1);
  let [data, setData] = useState(null);

  function onChange() {
    setX(124);
  }

  useEffect(() => {
    if (x !== 3) return;

    fetch(`/${x}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [x]);

  return (
    <h1 onMouseMove={onChange}>
      Я люблю пиццу {data} {x}
    </h1>
  );
}

export default App;
