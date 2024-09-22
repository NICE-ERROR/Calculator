let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false
let isSquareRoot = false; 

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')
  //const openParenthesisButton = document.getElementById('openParenthesis');
  //const closeParenthesisButton = document.getElementById('closeParenthesis');

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (currentOperationScreen.textContent === '0' || shouldResetScreen)
    resetScreen()
  currentOperationScreen.textContent += number
}

function resetScreen() {
  currentOperationScreen.textContent = ''
  shouldResetScreen = false
}

function clear() {
  currentOperationScreen.textContent = ''
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendPoint() {
  if (shouldResetScreen) resetScreen()
  if (currentOperationScreen.textContent === '')
    currentOperationScreen.textContent = '0'
  if (currentOperationScreen.textContent.includes('.')) return
  currentOperationScreen.textContent += '.'
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperationScreen.textContent
  currentOperation = operator
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentOperationScreen.textContent
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function setOperation(operator) {
    if (operator === '√') {
      isSquareRoot = true;  // ตั้งค่าว่ากำลังจะคำนวณรากที่สอง
      currentOperation = operator;
      lastOperationScreen.textContent = `√`;  // แสดงเครื่องหมายรากที่สอง
      return;
    }
  
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}
  
function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
        alert("You can't divide by 0!")
        return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null

}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key))
    if (e.key === '^') setOperation('^')  // Handle exponentiation key
    if (e.key === '√') setOperation('√')  // Handle square root key
    if (e,key === '(') setOperation('(')
    if (e.key === ')') setOperation('(')
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '^') return '^'  // Exponentiation operator
    if (keyboardOperator === '√') return '√'  // Square root operator
    if (keyboardOperator === '(') return '('
    if (keyboardOperator === '(') return ')'
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function setOperation(operator) {
    if (operator === '√') {
      isSquareRoot = true;  // ตั้งค่าว่ากำลังจะคำนวณรากที่สอง
      currentOperation = operator;
      lastOperationScreen.textContent = `√`;  // แสดงเครื่องหมายรากที่สอง
      return;
    }
  
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
  }
  
  // ฟังก์ชันสำหรับการคำนวณ
function evaluate() {
    if (currentOperation === null && !isSquareRoot) return;
    
    if (isSquareRoot) {
      // ถ้าเป็นการคำนวณรากที่สอง
      firstOperand = currentOperationScreen.textContent || '0';  // ถ้าไม่มีตัวเลขใช้ค่า 0
      const result = Math.sqrt(Number(firstOperand));  // คำนวณรากที่สอง
      currentOperationScreen.textContent = roundResult(result);  // แสดงผลลัพธ์
      lastOperationScreen.textContent = `√${firstOperand} =`;  // แสดงผลการคำนวณ
      isSquareRoot = false;  // รีเซ็ตตัวแปร
      return;
    }

    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
    );
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}
  
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
      case '+':
        return add(a, b);
      case '−':
        return substract(a, b);
      case '×':
        return multiply(a, b);
      case '÷':
        if (b === 0) return null;
        else return divide(a, b);
      case '^':
        return Math.pow(a, b);  // Exponentiation logic
      default:
        return null;
    }
}

