import axios from 'axios';

export default class Search {
  constructor() {
    this.results = [];
  }

  userInput(numQ, cat, diff) {
    this.numQ = numQ;
    this.category = cat;
    this.difficulty = diff;
  }

  async getCatCodes() {
      const categoryCodes = await axios('https://opentdb.com/api_category.php')
      this.catCodes = categoryCodes.data.trivia_categories;
      console.log(this.catCodes);
  }

  async getResults() {
    const results = await axios(`https://opentdb.com/api.php?amount=${this.numQ}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`);
    this.results = results.data.results;
    console.log(this.results);
  }

  combineAns() {
    this.results.forEach(e => {
      const index = Math.floor(Math.random() * 4);
      console.log(state.search.results);
      console.log(index);
      e.allAns = e.incorrect_answers;
      console.log(e.allAns);
      e.allAns.splice(index, 0, e.correct_answer);
      console.log(e.allAns);
    })
  }
}
