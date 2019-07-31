
export const checkAnswer = (qObj, ans) => {
  if (ans === qObj.correct_answer) {
    return true;
  } else {
    return false;
  };
}
