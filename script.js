let frameText = document.querySelector('.frame-text');
let problemText = document.querySelector('.problem-text');

let operation = '';
let total = '0';
let frame = '0';
let max = 11;

//add event listeners to all numbers
const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (!frameText.innerHTML || operation === '=') {
            frameText.innerHTML = number.id;
            if (operation === '=') {
                operation = '';
            }
        } else {
            frameText.innerHTML += number.id;
            if (frameText.innerHTML.length > max) {
                frameText.innerHTML = 'Infinity';
            }
        }
        frame = frameText.innerHTML;
    });
});

//buttons (not number related)
let toggleNeg = document.getElementById('plus-minus');      // negates current value
toggleNeg.addEventListener('click', (e) => {
    frame *= -1;
    frameText.innerHTML = frame;
});

let decimal = document.getElementById('decimal');
decimal.addEventListener('click', (e) => {
    if (!frameText.innerHTML.includes('.')) {
        frameText.innerHTML += e.target.textContent;
    }
}) 

let clear = document.getElementById('clear');
clear.addEventListener("click", (e) => {
    frameText.innerHTML = '';
    problemText.innerHTML = '';
    total = '0';
    frame = '0';
    operation = '';
});

let backspace = document.getElementById('backspace');
backspace.addEventListener('click', (e) => {
    frameText.innerHTML = frameText.innerHTML.slice(0, frameText.innerHTML.length - 1);
    frame = frameText.innerHTML;
});

//operators
let operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if (frame) {
            contExpression();
            operation = operator.innerHTML;
            if (operation === '=') {
                problemText.innerHTML = ''
                frameText.innerHTML = total;
                frame = total;
            } else {
                problemText.innerHTML = `${total} ${operation}`;
                // reset values
                frameText.innerHTML = '';
                frame = '0';
            }
        }
    });
});

//functions
function calc(operator, a, b) {
    switch (operator) {
        case '+': return parseFloat(a) + parseFloat(b);
        case '-': return parseFloat(a) - parseFloat(b);
        case '×': return parseFloat(a) * parseFloat(b);
        case '÷': {
            if (b === '0') frameText.innerHTML = 'Infinity'

            return parseFloat(a) / parseFloat(b);
        }
    }
}

function contExpression() {
    if (operation && operation != '=') {
        total = calc(operation, total, frame);
    } else {
        total = frame;
    }
}
