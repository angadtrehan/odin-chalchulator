const blinker = document.querySelector(".result > span");

function toggleBlinker() {
    blinker.classList.toggle("blinker");
    setTimeout(toggleBlinker, 500);
}

function selectOperator(button) {
    const operators = document.querySelectorAll(".operator");
    for (const op of operators) {
        if (op.id === button.id && button.id !== "equals") {
            op.classList.add("pressed-button");
        } else {
            op.classList.remove("pressed-button");
        }
    }
}

const buttons = document.querySelector(".buttons");
for (const button of buttons.children) {
    if (button.classList.contains("operator") && button.id !== "equals") {
        button.addEventListener('click', () => {
            selectOperator(button);
        });
    } else if (button.id === "equals") {
        button.addEventListener('click', () => {
            selectOperator(button);
        })
        button.addEventListener('mousedown', () => {
            button.classList.add("pressed-button");
        });
        button.addEventListener('mouseup', () => {
            button.classList.remove("pressed-button");
        });
    } else {
        button.addEventListener('mousedown', () => {
            button.classList.add("pressed-button");
        });
        button.addEventListener('mouseup', () => {
            button.classList.remove("pressed-button");
        });
    }
}
// toggleBlinker();

