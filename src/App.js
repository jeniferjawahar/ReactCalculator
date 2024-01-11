import { useState } from "react";
import "./App.css";

let previousDisplay = "";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [fullDisplay, setFullDisplay] = useState("");
  const keypadArr = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  let newFullDisplay = "";

  function handleResult() {
    let result = eval(fullDisplay);
    setDisplay(result);
    setFullDisplay(fullDisplay + "=" + result);
  }

  function handleOperator(e) {
    newFullDisplay = previousDisplay + display + e.target.innerText;
    setDisplay(e.target.innerText);
    setFullDisplay(newFullDisplay);
    previousDisplay = newFullDisplay;
  }

  function handleClick(e) {
    console.log(display + e.target.innerText);
    let number = display + e.target.innerText;

    if (e.target.innerText === ".") {
      if (display.endsWith(".")) number = display;
    } else {
      if (display === "*") {
        number = e.target.innerText;
      } else if (display === "/") {
        number = e.target.innerText;
      } else {
        number = Math.abs(Number.parseFloat(number));
        // number = Number.parseFloat("5.0").toFixed(1);
        console.log("to fixed", Number.parseFloat("5.0").toFixed(1));
      }
    }

    setDisplay(String(number));
    setFullDisplay(previousDisplay + String(number));
  }

  function handleReset() {
    previousDisplay = "";
    newFullDisplay = "";
    setDisplay("0");
    setFullDisplay("");
  }

  return (
    <div class="container">
      <div class="calculator">
        <div class="display">
          <div class="content">
            <div class="input">{fullDisplay}</div>
            <div class="ouput" id="display">
              {display}
            </div>
          </div>
        </div>
        <div class="keys">
          {keypadArr.map((val, index) => {
            return (
              <button
                class="key"
                key={index}
                id={val}
                onClick={(e) => handleClick(e)}
              >
                <span> {index}</span>
              </button>
            );
          })}

          <button id="clear" class="key action" onClick={handleReset}>
            <span>AC</span>
          </button>

          <button id="decimal" class="key" onClick={(e) => handleClick(e)}>
            <span>.</span>
          </button>

          <button
            id="add"
            class="key operator"
            onClick={(e) => handleOperator(e)}
          >
            <span>+</span>
          </button>
          <button
            id="subtract"
            class="key operator"
            onClick={(e) => handleOperator(e)}
          >
            <span>-</span>
          </button>

          <button
            id="multiply"
            class="key operator"
            onClick={(e) => handleOperator(e)}
          >
            <span>*</span>
          </button>
          <button
            id="divide"
            class="key operator"
            onClick={(e) => handleOperator(e)}
          >
            <span>/</span>
          </button>
          <button class="key action equal" id="equals" onClick={handleResult}>
            <span class="equal">=</span>
          </button>
        </div>
      </div>
    </div>
  );
}
