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

const quizStart = document.querySelector("#quizstart");
const startEndMessage = document.querySelector("#startEndMessage");
const startEndDetail = document.querySelector("#startEndDetail");
const beginQuizButton = document.querySelector("#beginquiz");


const quizArea = document.querySelector("#quizarea");
const quizStatement = document.querySelector("#quizstatement");
const quizAnswers = document.querySelector("#quizanswers");
const answerResult = document.querySelector("#answer-result");

const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");

const timer = document.querySelector("#timer");
let timeRemaining = 99;

let bool = "";
let rand = "";
let questionAnswers = "";
let correctAnswer = "";

// ----------- QUESTION POOL ----------- 
// 20 questions to avoid too much repetition, only 10 need to be answered for quiz to end

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

const question6 = "Which one of these is not a Coding Language?";
const answers6 = ["HTML", "EMS", "CSS", "JS"];

const question7 = "What is the purpose of a REAMDE file?";
const answers7 = ["Provide information on a project", "Provide an intresting narritive story", "Provide text for a webpage", "Provide readable code"];

const question8 = "What is 'this'?";
const answers8 = ["That","This","Them","Thus"];

const question9 = "In HTML, what is a closing tag?";
const answers9 = ["A statement that closes out the document", "A function that closes the webpage", "An endpoint that contains an element", "The bottom to a text container"];

const question10 = "What is the purpose of Metadata?";
const answers10 = ["Provide useful data on the webpage", "Transform the document's style", "Improve browser speed", "Add context to images"];

const question11 = "What is a Variable?";
const answers11 = ["An HTML Element", "A CSS Style", "A JS Function", "A JS Stored Value"];

const question12 = "The Flex display type is used to:";
const answers12 = ["Stretch an Image","Bend an Element","Create a Flexbox","Form a Flexigon"];

const question13 = "Which of the following is an Array?";
const answers13 = ["Orangitan", "1, 2, 3, 4", "bigcat + henry", "1234"];

const question14 = "Which of these is a built in JavaScript function commonly used to bugfix?";
const answers14 = ["console.log()", "bug.fix()", "report.data.type()", "define.error()"];

const question15 = "What is the difference between && and || in JS?";
const answers15 = ["&& is either, || is both","&& is neither, || is either","&& is either, || is neither","&& is both, || is either"];

const questionPool = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];
const answerPool = [answers1, answers2, answers3, answers4, answers5, answers6, answers7, answers8, answers9, answers10, answers11, answers12, answers13, answers14, answers15];
const optionPool = [option1, option2, option3, option4];


// ----------- FUNCTIONS AND EVENTS ----------- 

// Quiz start button - on click it hides the start screen and reveals the quiz content

quizStart.addEventListener("click", function(event){
    let selectedButton = event.target
    
    if (selectedButton.matches("button") === true) {
        quizStart.setAttribute("style", "display:none");
        quizArea.setAttribute("style", "display:flex");
        init();
        questionSelect();
        timerStart();
    } else {
    
    }
    
    })

// Quiz Game Over function

function gameoverScreen() {
    quizArea.setAttribute("style", "display:none");
    quizStart.setAttribute("style", "display:flex");
    startEndMessage.textContent = "Times Up!";
    startEndDetail.textContent = "You ran out of time! If you would like to try the quiz again, please click below!";
    beginQuizButton.textContent = "Try Again?";
}

// Initialize Function - run every time a quiz starts / restarts

function init() {
    timeRemaining = 99;
}

// setAllFalse is used to reset data attributes to their base values

function setAllFalse() {
    option1.setAttribute("data-selected", "false");
    option2.setAttribute("data-selected", "false");
    option3.setAttribute("data-selected", "false");
    option4.setAttribute("data-selected", "false");
}

// questionSelect generates a random number that is used to select a random question and matching question answers from the question and answer pool arrays
// The selected question is then checked with an if statement, and if true, the correct button answer is assigned 'true' for that question
// Before setting an option to true, all questions are set to false to prevent any carryover from the previous question

function questionSelect() {
    rand = Math.floor(Math.random() * 15);
    quizStatement.textContent = questionPool[rand];

    let questionAnswers = answerPool[rand];

    option1.textContent = questionAnswers[0];
    option2.textContent = questionAnswers[1];
    option3.textContent = questionAnswers[2];
    option4.textContent = questionAnswers[3];

if (quizStatement.textContent === questionPool[0]) {
    setAllFalse();
    option2.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[1]){
    setAllFalse();
    option3.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[2]){
    setAllFalse();
    option2.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[3]){
    setAllFalse();
    option1.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[4]){
    setAllFalse();
    option4.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[5]){
    setAllFalse();
    option2.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[6]){
    setAllFalse();
    option1.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[7]){
    setAllFalse();
    option2.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[8]){
    setAllFalse();
    option3.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[9]){
    setAllFalse();
    option1.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[10]){
    setAllFalse();
    option4.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[11]){
    setAllFalse();
    option3.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[12]){
    setAllFalse();
    option2.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[13]){
    setAllFalse();
    option1.setAttribute("data-selected", "true");
} else if (quizStatement.textContent === questionPool[14]){
    setAllFalse();
    option4.setAttribute("data-selected", "true");
} else {}
}

// TIMER FUNCTION

function timerStart() {
    let countDown = setInterval(function() {
    timeRemaining--;
    timer.textContent = "Timer: " + timeRemaining;

    if(timeRemaining < 1) {
        clearInterval(countDown);
        timeRemaining = 0;
        timer.textContent = "Timer: " + timeRemaining;
        gameoverScreen();
    }
    }, 1000)
}


// ANSWER SELECTION

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
    timeRemaining = timeRemaining - 15;
    questionSelect();
} else {
    alert("An error has occured, please contact your local pigeon dealer");
    return;
}


})


