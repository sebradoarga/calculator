const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (op, a, b) => {
    switch(op) {
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "x":
            return multiply(a,b);
            break;
        case "/":
            return divide(a,b);
            break;
    }
}

const screen = document.querySelector("#screen");
const screenValue = document.createElement("p");
screenValue.setAttribute("id","screenValue");
screen.appendChild(screenValue);

let firstOperand;
let secondOperand;
let currentOperation;

const updateDisplay = () => {
    screenValue.textContent = screenText.join("");
}

let screenText = [0];
updateDisplay();
const numberButtons = document.querySelectorAll(".numberButton");
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", (e) => {
        if(screenText[0] === 0 || screenText.length === 0) {
            screenText.pop();
            if(numberButton.textContent !== "0" && numberButton.textContent !== "00") {
                screenText.push(numberButton.textContent);
                updateDisplay();;
            }
        } else {
            screenText.push(numberButton.textContent);
            updateDisplay();
        }
    });
})

const allClear = document.getElementById("AC");
allClear.addEventListener("click", (e) => {
    screenText = [0];
    updateDisplay();
})

const clearEntry = document.getElementById("CE");
clearEntry.addEventListener("click", (e) => {
    if(screenText.length === 1) {
        screenText = [0];
        updateDisplay();
    } else {
        screenText.pop();
        updateDisplay();    
    }
})

const operationButtons = document.querySelectorAll(".operationButton");
operationButtons.forEach((operationButton) => {
    operationButton.addEventListener("click", (e) => {
        firstOperand = +screenText.join("");
        screenText = [0];
        updateDisplay();
        switch(operationButton.textContent) {
            case "+":
                currentOperation = "addition";
                break;
            case "-":
                currentOperation = "substraction";
                break;
            case "x":
                currentOperation = "multiplication";
                break;
            case "/":
                currentOperation = "division";
                break;
        }
    })
})

const equalButton = document.getElementById("equalSign");
equalButton.addEventListener("click", (e) => {
    secondOperand = +screenText.join("");
    screenText = [];
    switch(currentOperation) {
        case "addition":
            screenText.push(firstOperand + secondOperand);
            console.log(screenText);
            break;
        case "substraction":
            screenText.push(firstOperand - secondOperand);
            break;
        case "multiplication":
            screenText.push(firstOperand * secondOperand);
            break;
        case "division":
            screenText.push(firstOperand / secondOperand);
            break;
    }
    updateDisplay();
})

/*
    when number button pressed
    update screen string
    when operation button pressed
    store number of final string in a variable
    display new string
    if operation button pressed again, repeat same thing
    if equal number button pressed, do operation and display result
*/