export const userInput = () => {
  const userInput = {
    numQ: document.querySelector('.input__num-q').value,
    category: document.querySelector('.input__category').value, // TODO
    difficulty: document.querySelector('.input__difficulty').value
  }
  return userInput
}
