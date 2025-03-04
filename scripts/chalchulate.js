const result = document.querySelector(".result p");
const buttons = document.querySelector(".buttons");
const body = document.querySelector("body");
const DEFAULT_NUM = 0;
const DEFAULT_OP = "plus"

let left = DEFAULT_NUM;
let right = DEFAULT_NUM;
let operator = DEFAULT_OP;
let newNum = true;
let idiotFlag = false;

function wrapInDisplay(num) {
    if (num.indexOf(".") !== -1 && num.length > 10) {
        let numArr = num.split('');
        if (numArr[10] === ".") {
            if (Number(numArr[11]) >= 5) {
                numArr[9] = Number(numArr[9]) + 1;
            }
            return numArr.slice(0, 10).join('');
        }
        if (numArr[9] === ".") {
            numArr[8] = Number(numArr[8]) + 1;
            return numArr.slice(0, 9).join('');
        }
        if (Number(numArr[10]) >= "5") {
            numArr[9] = Number(numArr[9]) + 1;
        }
        return numArr.slice(0, 10).join('');
    }
    return num;
}
function handleNumberInput(number) {
    result.textContent = (newNum) ? (number === ".") ? result.textContent + number : number : (result.textContent.length === 10) ? result.textContent : (result.textContent.includes(".") && number === ".") ? result.textContent : result.textContent + number;
    newNum = false;
    right = parseFloat(result.textContent);
    console.log(right);
}
function handleOperation(operation) {
    let res = `${left}`;
    switch(operator) {
        case "plus":
            res = `${left + right}`;
            break;
        case "minus":
            res = `${left - right}`;
            break;
        case "mult":
            res = `${left * right}`;
            break;
        case "divide":
            if (right === 0) {
                res = 'idiot.';
                idiotFlag = true;
            } else {
                res = `${left / right}`;
            }
            break;
        case "equals":
            break;

    }
    operator = operation;
    right = DEFAULT_NUM;
    result.textContent = wrapInDisplay(res);
    left = (idiotFlag) ? DEFAULT_NUM : parseFloat(result.textContent);
    console.log(`${left} is left`);
    newNum = true;
}
function handleFunction(func) {
    if (func === "reset") {
        left = DEFAULT_NUM;
        right = DEFAULT_NUM;
        operator = DEFAULT_OP;
        newNum = true;
        result.textContent = left;
        idiotFlag = false;
        removeHighlights();
        console.log("resettededd");
    } else  {
        alert("This doesn't do anything right now. The logic is clear but I really just want to move ahead pls");
    }
}
function isIdiot(button) {
    return idiotFlag && button.id !== "reset";
}
function highlightResetButton() {
    body.classList.add("highlight");
    for (const button of buttons.children) {
        if (button.id === "reset") {
            button.classList.add("highlight");
        } else {
            button.classList.add("grey-out");
        }
    }
}
function removeHighlights() {
    body.classList.remove("highlight");
    for (const button of buttons.children) {
        button.classList.remove("highlight");
        button.classList.remove("grey-out");
    }
}

export function handleButtonPress(button) {
    if (!isIdiot(button)) {
        if (button.classList.contains("inputs")) {
            handleNumberInput(button.textContent);
        } else if (button.classList.contains("operator")) {
            handleOperation(button.id);
        } else if (button.classList.contains("func")) {
            handleFunction(button.id);
        }
    } else {
        result.textContent = "reset now";
        highlightResetButton();
    }
}