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

let currentQuestion = [[quizStatement], [option1, option2, option3, option4]];

let bool = "";
let rand = "";
let questionAnswers = "";
let correctAnswer = "";

// ----------- QUESTION POOL ----------- 

const question1 = "In coding, a boolean is known as a(n):";
const answers1 = ["Object","Data-Type","Statement","Element"];

const question2 = "Which one of these values is considered a falsey value?";
const answers2 = ["1", "Not True", "0", "-1"];

const question3 = "It is considered good practice to link this kind of style sheet before any others in your html document:";
const answers3 = ["A Bling Sheet", "A Reset Sheet", "A Rap Sheet", "A Base Sheet"];

const question4 = "What does the <p> tag do in an html document?";
const answers4 = ["Create a Paragraph Element","Create a P-Icon","Add Parenthesis to a Statement","Pair two Elements"];

const question5 = "What is the primary function of a For Loop?";
const answers5 = ["To continuously loop","Loop every time For is mentioned","Refresh the current page","To continuously loop under specified conditions"];

const question6 = "";
const answers6 = [];

const question7 = "";
const answers7 = [];

const question8 = "";
const answers8 = [];

const question9 = "";
const answers9 = [];

const question10 = "";
const answers10 = [];

const questionPool = [question1, question2, question3, question4, question5];
const answerPool = [answers1, answers2, answers3, answers4, answers5];


// ----------- FUNCTIONS AND EVENTS ----------- 

function questionSelect() {
    rand = Math.floor(Math.random() * 5);
    quizStatement.textContent = questionPool[rand];

    let questionAnswers = answerPool[rand];

    option1.textContent = questionAnswers[0];
    option2.textContent = questionAnswers[1];
    option3.textContent = questionAnswers[2];
    option4.textContent = questionAnswers[3];


if (quizStatement.textContent === questionPool[0]) {
    option1.setAttribute("data-selected", "false");
    option2.setAttribute("data-selected", "true");
    option3.setAttribute("data-selected", "false");
    option4.setAttribute("data-selected", "false");
} else if (quizStatement.textContent === questionPool[1]){
    option1.setAttribute("data-selected", "false");
    option2.setAttribute("data-selected", "false");
    option3.setAttribute("data-selected", "true");
    option4.setAttribute("data-selected", "false");
} else if (quizStatement.textContent === questionPool[2]){
    option1.setAttribute("data-selected", "false");
    option2.setAttribute("data-selected", "true");
    option3.setAttribute("data-selected", "false");
    option4.setAttribute("data-selected", "false");
} else if (quizStatement.textContent === questionPool[3]){
    option1.setAttribute("data-selected", "true");
    option2.setAttribute("data-selected", "false");
    option3.setAttribute("data-selected", "false");
    option4.setAttribute("data-selected", "false");
} else if (quizStatement.textContent === questionPool[4]){
    option1.setAttribute("data-selected", "false");
    option2.setAttribute("data-selected", "false");
    option3.setAttribute("data-selected", "false");
    option4.setAttribute("data-selected", "true");
} else {
}
}


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
    questionSelect();
} else if (bool === "false") {
    answerResult.textContent = "WRONG! MINUS 15 POINT!";
    console.log('it worked false');
    questionSelect();
} else {
    alert("An error has occured, please contact your local pigeon dealer");
    return;
}


})


