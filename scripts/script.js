import { handleButtonPress } from "./chalchulate.js";

const blinker = document.querySelector(".result span");

function toggleBlinker() {
    blinker.classList.toggle("blinker");
    setTimeout(toggleBlinker, 500);
}
function addPressed(button) {
    button.classList.add("pressed-button");
}

function removePressed(button) {
    button.classList.remove("pressed-button");
}

function selectOperator(button) {
    const operators = document.querySelectorAll(".operator");
    for (const op of operators) {
        if (op.id === button.id && button.id !== "equals") {
            removePressed(op);
            addPressed(op);
        } else {
            removePressed(op);
        }
    }
}

const buttons = document.querySelector(".buttons");
for (const button of buttons.children) {
    button.addEventListener('click', () => {
        handleButtonPress(button);
    });
    if (button.classList.contains("operator") && button.id !== "equals") {
        button.addEventListener('click', () => {
            selectOperator(button);
        });
    } else {
        if (button.id === "equals" || button.id === "reset") {
            button.addEventListener('click', () => {
                selectOperator(button);
            })
        }
        button.addEventListener('mousedown', () => {
            button.classList.add("pressed-button");
            setTimeout(() => {
                removePressed(button);
            }, 200);
        });
    }
}
toggleBlinker();

