import { useEffect, useState } from "react";
import "./App.css";

interface ArrElement {
  value: number;
  color: string;
}

enum SortType {
  BUBBLE_SORT = "BUBBLE_SORT",
  INSERTION_SORT = "INSERTION_SORT",
}

function App() {
  const [sortType, setSortType] = useState(SortType.BUBBLE_SORT);
  const [arr, setArr] = useState([] as ArrElement[]);
  const [snapshots, setSnapshots] = useState([] as ArrElement[][]);

  const getRandomColor = () => {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
  };

  const generateRandomArray = () => {
    const arrLength = 6;
    const res: ArrElement[] = [];
    for (let i = 0; i < arrLength; i++) {
      const randomNum = Math.floor(Math.random() * 10);
      const color = getRandomColor();

      res.push({
        value: randomNum,
        color,
      });
    }

    setSnapshots([]);
    setArr(res);
  };

  useEffect(generateRandomArray, []);

  const sort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    switch (sortType) {
      case SortType.BUBBLE_SORT:
        bubbleSort();
        break;
      case SortType.INSERTION_SORT:
        insertionSort();
        break;
      default:
        break;
    }
  };

  const bubbleSort = () => {
    const res = Array.from(arr);
    const progress: ArrElement[][] = [];
    let hadSwapped = false;

    do {
      hadSwapped = false;
      for (let i = 0; i < res.length - 1; i++) {
        if (res[i].value > res[i + 1].value) {
          const temp = res[i];
          res[i] = res[i + 1];
          res[i + 1] = temp;
          hadSwapped = true;

          const snapshot = Array.from(res);
          progress.push(snapshot);

          break;
        }
      }
    } while (hadSwapped);

    setSnapshots(progress);
  };

  const insertionSort = () => {
    const res = Array.from(arr);
    const progress: ArrElement[][] = [];

    for (let i = 1; i < res.length; i++) {
      for (let j = 0; j < i; j++) {
        const curI = res[i];
        const curJ = res[j];

        if (curI.value < curJ.value) {
          const temp = res.splice(i, 1);
          res.splice(j, 0, temp[0]);

          const snapshot = Array.from(res);
          progress.push(snapshot);
        }
      }
    }

    setSnapshots(progress);
  };

  return (
    <div className="wrapper">
      <header>
        <h1>Algo Visualizer by An</h1>
      </header>
      <section className="controller">
        <button onClick={generateRandomArray}>Generate Array</button>

        <form>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
          >
            <option value={SortType.BUBBLE_SORT}>Bubble Sort</option>
            <option value={SortType.INSERTION_SORT}>Insertion Sort</option>
          </select>
          <button onClick={sort}>Sort</button>
        </form>
      </section>

      <section className="visualizer-wrapper">
        <div className="row">
          {arr.map((e, i) => (
            <div
              key={i}
              className="element"
              style={{ backgroundColor: e.color }}
            >
              {e.value}
            </div>
          ))}
        </div>
        {snapshots.map((arr, i) => (
          <div key={i} className="row">
            {arr.map((e, j) => (
              <div
                key={j}
                className="element"
                style={{ backgroundColor: e.color }}
              >
                {e.value}
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
