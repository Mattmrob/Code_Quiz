// Things that need to happen:
// User pushes button to start quiz, questions begin loading in and timer starts
// Questions are randomly selected from a pool, randomize button locations as well for bonus points :>
// User selects a button, if right, next question, if wrong, -15 seconds and next question
// When quiz is over, user can submit their information to the scoreboard
// score = time remaining, user info = user's initials (3 chars)

// ORDER TO WORK ON:
// First step is quiz initialization and question generation
// Second step is timer functionality
// Third step is quiz closer / score submission
// Final step is scoreboard viewing

// Step 1 can be broken down into further pieces:
// The user is presented with a screen that has a 'start quiz' button
// When the user clicks the start button, hidden elements become visible and are filled in with a quiz question and corresponding answer buttons
// Each question needs to have an associated data set for the answer button options
// Each question needs at least 1 of the buttons to be true and the remainder to return false values when clicked
// A message is displayed on the bottom if their choice was right or wrong
// A new question is selected

const quizArea = document.querySelector("#quizarea");
const quizStatement = document.querySelector("#quizstatement");
const quizAnswers = document.querySelector("#quizanswers");
const answerResult = document.querySelector("#answer-result");

const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");

const quizQuestion = "Test";
const currentQuestion = [[quizQuestion], [option1, option2, option3, option4]]




quizAnswers.addEventListener("click", function(event) {

let selectedButton = event.target;

if (selectedButton.matches("button") === true) {
let bool = selectedButton.getAttribute("data-selected")
console.log(bool);
}

})









function test1() {
    option1.textContent = "test";
}
