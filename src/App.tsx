import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [sortType, setSortType] = useState(SortType.BUBBLE_SORT);
  const [arr, setArr] = useState([] as number[]);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const arrLength = 6;
    const res = [];
    for (let i = 0; i < arrLength; i++) {
      const randomNum = Math.floor(Math.random() * 10);
      res.push(randomNum);
    }

    console.log(res);
    setArr(res);
  };

  return (
    <div>
      <header>
        <h1>Algo Visualizer by An</h1>
      </header>
      <section>
        <button onClick={generateRandomArray}>Generate Array</button>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value as SortType)}
        >
          <option value={SortType.BUBBLE_SORT}>Bubble Sort</option>
          <option value={SortType.INSERTION_SORT}>Insertion Sort</option>
        </select>
        <button>Sort</button>
      </section>

      <section>
        <div>
          {arr.map((i) => (
            <div>{i}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

enum SortType {
  BUBBLE_SORT = "BUBBLE_SORT",
  INSERTION_SORT = "INSERTION_SORT",
}

export default App;
