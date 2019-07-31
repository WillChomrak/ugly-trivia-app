const renderCat = (catCodes) => {
  const codesHTML = catCodes.map(code => {
    return `<option value="${code.id}">${code.name}</option>`
  })
  return codesHTML.join(' ');
}

export const renderSelect = (catCodes) => {
  const markup = `
  <select class="input__category">
    ${renderCat(catCodes)}
   </select>
  `
  document.querySelector('.category__input').insertAdjacentHTML('afterbegin', markup);
}

// When testing for correct answer below use: ${questions[i].correct_answer}
export const renderQuestion = (questions, i) => {
  // Renders html for question and answer buttons; includes q# in data attribute 
  const markup = `
    <div class="singleQuestion" data-index="${i}">
      <div class="question">
        ${questions[i].question}
      </div>
      <div class="answer__button-container">
        ${renderAnsBtn(questions[i].allAns)}
      </div>
    </div>
  `
  document.querySelector('.qa__section').insertAdjacentHTML('beforeend', markup);
};

const renderAnsBtn = (answers) => {
  const allBtn = answers.map(ans => {
    return `
    <button class="answer__button" data-disabled="false">${ans}</button></br>
    `
  })
  return allBtn.join(' ')
}

export const disableAnsButtons = () => {
  // Selects all ans buttons, spreads NodeList into Array, loops through Array, disables all buttons
  const answers = document.querySelectorAll('.answer__button');
  [...answers].forEach(ans => {
    ans.dataset.disabled = 'true';
  })
}

// Render button with appropriate class and text
export const renderBtn = (type) => {
  const innerHtml = type === 'next' ? 'Next Question' : 'Play Again?';
  const btn = `
  <div><button class="${type}__button">${innerHtml}</button></div>
  `
  document.querySelector('.singleQuestion').insertAdjacentHTML('beforeend', btn);
}

// Remove start button after game begins
export const deleteStart = () => {
  const del = document.querySelector('.start__btn');
  del.parentNode.removeChild(del);
}

// Update score in app after each answer
export const updateScore = () => {
  document.querySelector('.score').innerHTML = state.score;
}

// Render total score after final question
export const renderScore = () => {
  const score = `Final Score: ${state.score}/${state.search.numQ}`;
  document.querySelector('.singleQuestion').insertAdjacentHTML('beforeend', score);
}

export const rendGuessResp = (ans, i) => {
  const response = ans === true ? 'Correct.' : `Incorrect. The correct answer was: ${state.search.results[i].correct_answer}`;
  // Increase user score if answer is correct
  if (ans === true) {state.score += 1};
  // Generate and render response to answer
  const markup = `
  <p class="response">${response}</p>
  `
  document.querySelector('.singleQuestion').insertAdjacentHTML('beforeend', markup);
}

export const removeSingleQuestion = () => {
  // Select and delete single question section
  const del = document.querySelector('.singleQuestion');
  del.parentNode.removeChild(del);
}
