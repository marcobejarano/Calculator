let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const lastOperationScreen = document.getElementById("screen-last");
const currentOperationScreen = document.getElementById("screen-current");
const clear = document.getElementById("clear");
const delet = document.getElementById("delet");
const point = document.querySelector(".point");
const equal = document.querySelector(".equal");
const numbers = document.querySelectorAll(".numeric");
const operators = document.querySelectorAll(".operator");

window.addEventListener("keydown", handleKeyElement);
clear.addEventListener("click", clearScreen);
delet.addEventListener("click", deleteElement);
point.addEventListener("click", appendPoint);
equal.addEventListener("click", evaluate);

numbers.forEach((button) => {
    button.addEventListener("click", () =>
      appendNumber(button.textContent));
});

operators.forEach((operator) => {
    operator.addEventListener("click", () =>
      setOperation(operator.textContent));
});

function clearScreen() {
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
    lastOperationScreen.textContent = "";
    currentOperationScreen.textContent = "0";
}

function deleteElement() {
    currentOperationScreen.textContent =
      currentOperationScreen.textContent
                            .toString()
                            .slice(0, -1);
}

function resetScreen() {
    currentOperationScreen.textContent = "";
    shouldResetScreen = false;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (currentOperationScreen.textContent === "") {
        currentOperationScreen.textContent = "0";
    }
    if (currentOperationScreen.textContent.includes(".")) {
        return currentOperationScreen.textContent;
    } else {
        return currentOperationScreen.textContent += ".";
    }
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
    );
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function appendNumber(number) {
    if (currentOperationScreen.textContent === "0" || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function handleKeyElement(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendPoint();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") deleteElement();
    if (e.key === "Escape") clearScreen();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        setOperation(convertOperator(e.key));
    }
}

function convertOperator(keyBoardOperator) {
    if (keyBoardOperator === "+") return "+";
    if (keyBoardOperator === "-") return "−";
    if (keyBoardOperator === "*") return "×";
    if (keyBoardOperator === "/") return "÷";
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+":
            return add(a, b);
        case "−":
            return substract(a, b)
        case "×":
            return multiply(a, b);
        case "÷":
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}