
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
        if((screenText[0] === 0 && screenText.length === 1)) {
            if(numberButton.textContent !== "0" && numberButton.textContent !== "00") {
                screenText.pop();
                screenText.push(numberButton.textContent);
                updateDisplay();
            }
        } else {
            screenText.push(numberButton.textContent);
            updateDisplay();
        }
    });
})

const clearEntry = document.getElementById("CE");
clearEntry.addEventListener("click", (e) => {
    if(screenText.length === 1){
        screenText = [0];
    } else {
        screenText.pop();
    }
    updateDisplay();
});

const allClear = document.getElementById("AC");
allClear.addEventListener("click", (e) => {
    screenText = [0];
    firstOperand = 0;
    secondOperand = 0;
    currentOperation = "";
    updateDisplay();
})

const dotButton = document.getElementById("dot");
dotButton.addEventListener("click", (e) => {
    if(screenText[0] === 0 || screenText.length === 0) {
        screenText = [0, "."];
        updateDisplay();
    } else {
        if(!screenText.includes(".")) {
            screenText.push(".");
            updateDisplay();    
        }
    }
})

const operate = () => {
    let result = secondOperand;
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
    // if(result % 1 != 0) {
    //     result = result.toFixed(2);
    // }
    screenText.push(result);
}

const operationButtons = document.querySelectorAll(".operationButton");
operationButtons.forEach((operationButton) => {
    operationButton.addEventListener("click", (e) => {
        if(firstOperand !== 0) {
            if(screenText.length !== 0) {
                secondOperand = +screenText.join("");
                screenText = [];
                operate();
                updateDisplay();
                firstOperand = +screenText.join("");
                screenText = [];
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
        } else {
            firstOperand = +screenText.join("");
            screenText = [];
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
    firstOperand = 0;
    currentOperation = "addition";
})

document.addEventListener("keyup", (e) => {
    if (e.key >= 0 && e.key <= 9) {
        document.getElementById(`number-${e.key}`).click();
    } else {
        switch(e.key) {
            case "+":
                document.getElementById("addition").click();
                break;
            case "-":
                document.getElementById("subtraction").click();
                break;
            case "*":
                document.getElementById("multiplication").click();
                break;
            case "/":
                document.getElementById("division").click();
                break;
            case "Enter":
                equalButton.click();
                break;
            case ".":
                dotButton.click();
                break;
            case "Backspace":
                clearEntry.click();
                break;
        }
    }
})