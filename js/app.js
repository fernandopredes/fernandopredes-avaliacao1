// Variáveis globais
var displayValue = "0";
var previousValue;
var operator = null;
var waitingForSecondOperand = false;
var decimalEntered = false;
// Elementos DOM
var display = document.getElementById("display");
var buttons = document.querySelectorAll(".tecla");
// Função para atualizar o display
function updateDisplay() {
    display.textContent = displayValue;
}
// Função para adicionar um dígito ao display
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    }
    else {
        displayValue === "0" ? displayValue = digit : displayValue += digit;
    }
    if (displayValue.length > 8) {
        displayValue = displayValue.slice(0, 8);
    }
    updateDisplay();
}
// Função para adicionar um ponto decimal
function inputDecimal() {
    if (waitingForSecondOperand) {
        displayValue = "0.";
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    if (displayValue.indexOf('.') === -1) {
        displayValue += '.';
        updateDisplay();
    }
}
// Função para executar operações
function executeOperation() {
    var inputValue = parseFloat(displayValue);
    if (previousValue !== undefined) {
        var previousValueFloat = parseFloat(previousValue);
        var result = void 0;
        switch (operator) {
            case "mas":
                result = previousValueFloat + inputValue;
                break;
            case "menos":
                result = previousValueFloat - inputValue;
                break;
            case "por":
                result = previousValueFloat * inputValue;
                break;
            case "dividido":
                if (inputValue !== 0) {
                    result = previousValueFloat / inputValue;
                }
                else {
                    displayValue = "Erro";
                    updateDisplay();
                    return;
                }
                break;
            default:
                return;
        }
        // Limitar resultado para 8 dígitos
        result = parseFloat(result.toFixed(6));
        displayValue = result.toString();
        updateDisplay();
        waitingForSecondOperand = false;
        operator = null;
        previousValue = undefined;
    }
}
function performOperation(nextOperator) {
    if (nextOperator === "igual") {
        executeOperation();
        return;
    }
    if (operator && waitingForSecondOperand) {
        executeOperation();
    }
    if (displayValue !== "Erro") {
        previousValue = displayValue;
    }
    operator = nextOperator;
    waitingForSecondOperand = true;
}
// Função para limpar o display
function clearDisplay() {
    displayValue = "0";
    updateDisplay();
}
// Adiciona os event listeners aos botões
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var buttonText = button.getAttribute("alt");
        if (!isNaN(Number(buttonText))) {
            inputDigit(buttonText);
        }
        else if (buttonText === "punto") {
            inputDecimal();
        }
        else if (buttonText === "On") {
            clearDisplay();
        }
        else if (["mas", "menos", "por", "dividido", "igual", "signo", "raiz"].indexOf(buttonText) !== -1) {
            switch (buttonText) {
                case "signo":
                    changeSign();
                    break;
                case "raiz":
                    squareRoot();
                    break;
                default:
                    performOperation(buttonText);
            }
        }
    });
});
//Funções extras:
function squareRoot() {
    var currentValue = parseFloat(displayValue);
    if (currentValue < 0) {
        displayValue = "Erro";
    }
    else {
        var result = Math.sqrt(currentValue);
        result = parseFloat(result.toFixed(6));
        displayValue = result.toString();
    }
    updateDisplay();
}
function changeSign() {
    var currentValue = parseFloat(displayValue);
    displayValue = (-currentValue).toString();
    updateDisplay();
}
