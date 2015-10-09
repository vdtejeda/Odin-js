//Calculator operations
function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}

// Event listeners for mouse input
var buttons = document.getElementsByClassName("button");
for (var i = 0, len = buttons.length; i < len; i++) {
  buttons[i].addEventListener("click", function(event) {
    handleInput(event.target.innerHTML);
  }, false);
}

//screen display
function display(result) {
  document.getElementsByClassName("screen")[0].innerHTML = result;
}


var num1 = "", num2 = "";
var operator = "", justComputed = false;
function handleInput(input) {
  switch(type(input)) {
    case "digit":
      handleDigit(input);
      break;
    case "operator":
      handleOperator(input);
      break;
    case "CE":
      handleClear();
      break;
    case "=":
      display( handleEquals() );
      break;
    default:
      display("ERROR");
  }
}

function handleDigit(input) {
  if (justComputed) {
    num1 = "";
    num2 = "";
    operator = "";
    justComputed = false;
  }
  if (operator === "") {
    num1 += input;
    display(num1);
  } else {
    num2 += input;
    display(num2);
  }
}

function handleOperator(input) {
  if(num2 !== "") {
    display(handleEquals());
  }
  justComputed = false;
  operator = input;
}

function handleClear() {
  num1 = "";
  num2 = "";
  operator = "";
  display(0);
}

function handleEquals() {
  var result;
  justComputed = true;

  if(num2 === "") {
    num2 = num1;
  }
  switch(operator) {
    case "":
      return num1;
      break;
    case "+":
      result = add(parseFloat(num1), parseFloat(num2));
      break;
    case "-":
      result = subtract(parseFloat(num1), parseFloat(num2));
      break;
    case "×":
      result = multiply(parseFloat(num1), parseFloat(num2));
      break;
    case "÷":
      result = divide(parseFloat(num1), parseFloat(num2));
      break;
    default:
      display("OP ERROR");
  }
  num1 = result;
  num2 = "";
  return result;
}

function type(input) {
  if (input.search(/[0123456789.]/) !== -1){
    return "digit";
  } else if (input === "=" || input === "CE") {
    return input;
  } else {
    return "operator";
  }
}
