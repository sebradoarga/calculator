
const screen = document.querySelector("#screen");
const screenValue = document.createElement("p");
screenValue.setAttribute("id","screenValue");
screen.appendChild(screenValue);

let firstOperand = 0;
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
        if(screenText[0] === 0 && screenText.length === 1) {
            if(numberButton.textContent !== "0" && numberButton.textContent !== "00") {
                screenText.pop();
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
    firstOperand = 0;
    secondOperand = 0;
    updateDisplay();
})

const dotButton = document.getElementById("dot");
dotButton.addEventListener("click", (e) => {
    if(screenText[0] === 0) {
        screenText = [0, "."];
        updateDisplay();
    } else {
        screenText.push(".");
        updateDisplay();
    }
})

const operate = () => {
    let result;
    switch(currentOperation) {
        case "addition":
            result = firstOperand + secondOperand;
            break;
        case "substraction":
            result = firstOperand - secondOperand;
            break;
        case "multiplication":
            result = firstOperand * secondOperand;
            break;
        case "division":
            result = firstOperand / secondOperand;
            break;
    }
    if(result % 1 != 0) {
        result = result.toFixed(2);
    }
    screenText.push(result);
}

const operationButtons = document.querySelectorAll(".operationButton");
operationButtons.forEach((operationButton) => {
    operationButton.addEventListener("click", (e) => {
        if(firstOperand !== 0) {
            secondOperand = +screenText.join("");
            screenText = [];
            operate();
            updateDisplay();
            firstOperand = +screenText.join("");
            screenText = [0];
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
        } else {
            firstOperand = +screenText.join("");
            screenText = [0];
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
        }
    })
})

const equalButton = document.getElementById("equalSign");
equalButton.addEventListener("click", (e) => {
    secondOperand = +screenText.join("");
    screenText = [];
    operate();
    updateDisplay();
})