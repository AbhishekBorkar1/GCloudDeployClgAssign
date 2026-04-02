const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons");

const buttons = [
  "7","8","9","/",
  "4","5","6","*",
  "1","2","3","-",
  "0",".","=","+",
  "C"
];

buttons.forEach(btn => {
  const button = document.createElement("button");
  button.textContent = btn;

  if (btn === "=") button.classList.add("equal");
  if (btn === "C") button.classList.add("clear");

  button.onclick = () => handleInput(btn);
  buttonsContainer.appendChild(button);
});

function handleInput(value) {
  if (value === "C") {
    display.value = "";
  } else if (value === "=") {
    try {
      display.value = calculate(display.value);
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += value;
  }
}

// Safe evaluation
function calculate(expr) {
  return Function('"use strict"; return (' + expr + ')')();
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ("0123456789+-*/.".includes(e.key)) {
    display.value += e.key;
  } else if (e.key === "Enter") {
    display.value = calculate(display.value);
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (e.key.toLowerCase() === "c") {
    display.value = "";
  }
});