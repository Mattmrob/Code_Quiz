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

// ----------- VARIABLES ----------- 

const quizArea = document.querySelector("#quizarea");
const quizStatement = document.querySelector("#quizstatement");
const quizAnswers = document.querySelector("#quizanswers");
let answerResult = document.querySelector("#answer-result");

const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");

const quizQuestion = "Test";
const currentQuestion = [[quizQuestion], [option1, option2, option3, option4]];

let bool = "";

// ----------- FUNCTIONS AND EVENTS ----------- 

// This event listener function targets the button clicked and fetches the data-selected property of the button. If it is "true" (string) then you get a positive message, if "false" (also string) you get a negative message
// first checks for click within quizAnsers ID, then assigns selectedButton to the event target of your click (the specific button you click) ->
// then checks to make sure you clicked on a button, and if so, assigns data-selected value of that button to variable bool
// bool is then checked to see if the data-selected is "false" or "true"
// From here a new question would be assigned, timer would be influenced, and the quiz would go on

quizAnswers.addEventListener("click", function(event) {

let selectedButton = event.target;

if (selectedButton.matches("button") === true) {
bool = selectedButton.getAttribute("data-selected");
console.log(bool);
}

if (bool === "true") {
    answerResult.textContent = "Nice Job!";
    console.log('it worked true');
} else if (bool === "false") {
    answerResult.textContent = "WRONG! MINUS 15 POINT!";
    console.log('it worked false');
} else {
    alert("An error has occured, please contact your local pigeon dealer");
    return;
}


})


