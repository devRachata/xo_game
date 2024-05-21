import { useState, useEffect } from "react";
import "./App.css";

function Botton({ value, onClick }) {
  return (
    <button className="st" onClick={onClick}>
      {value}
    </button>
  );
}

function App() {
  const [isCheck, setIsCheck] = useState(true);
  const [value, setValue] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("Next player: ");

  function handleOnclick(i) {
    const nextTable = value.slice();

    if (nextTable[i]) {
      return;
    }

    if (isCheck) {
      nextTable[i] = "X";
    } else {
      nextTable[i] = "O";
    }
    setValue(nextTable);
    setIsCheck(!isCheck);
  }

  function calculate(value) {
    const table = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (let inx = 0; inx < table.length; inx++) {
      const [a, b, c] = table[inx];
      if (value[a] && value[a] === value[b] && value[a] === value[c]) {
        return value[a];
      }
    }
    return null;
  }

  useEffect(() => {
    const winner = calculate(value);
    if (winner) {
      const timer = setTimeout(() => {
        alert("Winner: " + winner);
        setWinner(winner);
        setStatus("Winner: " + winner);
      }, 100);
      // 500ms delay

      return () => clearTimeout(timer);
    } else if (!value.includes(null)) {
      const timer = setTimeout(() => {
        alert("Draw");
        setWinner(winner);
        setStatus("Winner: " + winner);
      }, 100);
      // 500ms delay

      return () => clearTimeout(timer);
    } else {
      setStatus("Next player: " + (isCheck ? "X" : "O"));
    }
  }, [value, isCheck]);

  function reset() {
    setValue(Array(9).fill(null));
    setIsCheck(true);
    setWinner(null);
    setStatus("Next player: ");
  }
  return (
    <div className="App">
      <p className="">X/O Game</p>
      <div>
        <Botton value={value[0]} onClick={() => handleOnclick(0)} />
        <Botton value={value[1]} onClick={() => handleOnclick(1)} />
        <Botton value={value[2]} onClick={() => handleOnclick(2)} />
      </div>
      <div>
        <Botton value={value[3]} onClick={() => handleOnclick(3)} />
        <Botton value={value[4]} onClick={() => handleOnclick(4)} />
        <Botton value={value[5]} onClick={() => handleOnclick(5)} />
      </div>
      <div>
        <Botton value={value[6]} onClick={() => handleOnclick(6)} />
        <Botton value={value[7]} onClick={() => handleOnclick(7)} />
        <Botton value={value[8]} onClick={() => handleOnclick(8)} />
      </div>
      <div className="space"></div>
      <div>
        <button className="button" onClick={() => reset()}>
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
