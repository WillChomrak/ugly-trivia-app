import axios from 'axios';
import Search from './models/search';
import { userInput } from './views/searchView';
import { renderQuestion, rendGuessResp, deleteStart, updateScore, renderBtn, removeSingleQuestion, renderSelect, renderScore, disableAnsButtons } from './views/qaView';
import { checkAnswer } from './models/QA';

let state = {
  q: 0,
  score: 0
};
window.state = state;

const loadController = async () => {

  // Create the search object
  state.search = new Search();
  // Get the question category codes for user query URL use with API query
  await state.search.getCatCodes();
  // Render the select dropdowns with their appropriate codes
  renderSelect(state.search.catCodes);
}

const searchController = async () => {

  // Get and store user input in window.state
  const input = userInput();
  state.search.userInput(input.numQ, input.category, input.difficulty);
  // Get questions from API
  await state.search.getResults();
  // creates array of all answers to render to screen
  state.search.combineAns();

  // Call next controller
  questionController();
}

//Don't think I will need this going forward
// const qaFirst = () => {
//   // 1. print first question to the screen
//   renderQuestion(state.search.results, state.q);
//   state.q += 1;
//   if (document.querySelector('.start__btn')) {deleteStart()};
// }

const questionController = () => {
  // removes previous question OR beginning input fields
  removeSingleQuestion();
  // Select and clear single question
  renderQuestion(state.search.results, state.q)
}


const answerController = (target) => {

  // Get data-attribute + parse to integer
  const index = parseInt(target.parentNode.parentNode.dataset.index);
  // Check if user answer is correct
  const ans = checkAnswer(state.search.results[index], target.innerHTML);
  // Track question index in state
  state.q += 1;
  // Generate and render response to answer
  rendGuessResp(ans, index);
  // Update user score in UI
  updateScore();
  // Disable the answer buttons
  disableAnsButtons();

  // Render Next button or (if finished) final score and Play Again button
  if (state.q < state.search.numQ) {
    renderBtn('next');
  } else {
    renderScore();
    renderBtn('play-again');
  }
}

window.addEventListener('load', loadController);
document.querySelector('.start__btn').addEventListener('click', searchController);


//Think this can be deleted - changed class of start button to same as next Q button
//document.querySelector('.start__btn').addEventListener('click', qaNext);

//This will need to be fixed when I remove the answer from INSIDE the button
// ^ MAYBE

document.querySelector('.qa__section').addEventListener('click', e => {
  if (e.target.className === 'answer__button' && e.target.dataset.disabled === 'false') {
    answerController(e.target)
  } else if (e.target.className === 'next__button') {
    questionController();
  } else if (e.target.className === 'play-again__button') {
    document.location.reload();
  }
})

