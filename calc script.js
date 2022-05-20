const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // replace current display if first value entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // don't add decimal at end
    if (awaitingNextValue) return;
    // check for decimal
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;    
    } 
    // assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// reset display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Add Event Listeners
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));

    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));

    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});
clearBtn.addEventListener('click', resetAll);
