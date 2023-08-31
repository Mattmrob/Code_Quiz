// ------------------- VARIABLES (1) -------------------
// *Variables relating to the question and answer pools are stored at the bottom of the script*

// Targeting starting/ending screen message, paragraph, and button
const quizStart = document.querySelector("#quizstart");
const startEndMessage = document.querySelector("#startEndMessage");
const startEndDetail = document.querySelector("#startEndDetail");
const beginQuizButton = document.querySelector("#beginquiz");

// Targeting sidebar(s)
const sidebar = document.querySelector(".sidebar");

// Targeting Quiz question area, question, answers, and answer results
const quizArea = document.querySelector("#quizarea");
const quizStatement = document.querySelector("#quizstatement");
const quizAnswers = document.querySelector("#quizanswers");
const answerResult = document.querySelector("#answer-result");

// Targeting answer buttons
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");

// Targeting timer and assigning values to questions answered and time
const timer = document.querySelector("#timer");
let timeRemaining = 99;
let questionsAnswered = 0;

// Targeting form for score submission
const submitScore = document.querySelector('#submitScore');
const yourInitials = document.querySelector('#yourInitials');
const submissionMenu = document.querySelector('#submissionMenu');

// Targeting scoreboard page
const scoreBoardPage = document.querySelector('#scoreBoardPage');
const scoreBoard = document.querySelector('#scoreBoard');
const scoreContainer = document.querySelector('#scoreContainer');
const scoreBoardItem = document.querySelector('.scoreBoardItem');

// Targeting scoreboard page buttons
const scoreBoardButton = document.querySelector('#scoreBoardButton');
const returnToQuiz = document.querySelector('#returnToQuiz');
const clearScores = document.querySelector('#clearScores');

// Arrays and data for local data storage
let scores = [];
let scoreText = "";

// Ect. variables for rng, answers, and index
let bool = "";
let rand = "";
let currentIndex = "";
let questionAnswers = "";


// ------------------- INTERFACE -------------------

// Quiz start button - on click it resets everything to base value and displays the quiz area, hiding the start area
// It then starts the question selection logic and starts the timer
// *it also hides the scoreboard button until the quiz is finished*
beginQuizButton.addEventListener("click", function(event){
    let selectedButton = event.target
    
    if (selectedButton.matches("button") === true) {
        quizStart.setAttribute("style", "display:none");
        quizArea.setAttribute("style", "display:flex");
        timeRemaining = 99;
        questionsAnswered = 0;
        submissionMenu.setAttribute("style", "display:none");
        answerResult.textContent = "";
        scoreBoardButton.textContent = "";
        questionSelect();
        timerStart();
    } else {
    }
    
    })

// Open Scoreboard Function - opens the scoreboard and hides everything else
scoreBoardButton.addEventListener("click", function(){

    quizArea.setAttribute("style", "display:none");
    quizStart.setAttribute("style", "display:none");
    submissionMenu.setAttribute("style", "display:none");
    scoreBoardButton.setAttribute("style", "display:none");
    timer.setAttribute("style", "display:none");
    scoreBoardPage.setAttribute("style", "display:flex");

})

// Return From Scoreboard - returns to quiz starting area from scoreboard
returnToQuiz.addEventListener("click", function(){

    quizStart.setAttribute("style", "display:flex");
    scoreBoardButton.setAttribute("style", "display:default");
    timer.setAttribute("style", "display:default");
    scoreBoardPage.setAttribute("style", "display:none");

})

// Quiz Finished function - When the quiz is completed, the following display changes occur
function quizFinish() {
    quizArea.setAttribute("style", "display:none");
    quizStart.setAttribute("style", "display:flex");
    submissionMenu.setAttribute("style", "display:flex");
    startEndMessage.textContent = "Quiz Complete!";
    startEndDetail.textContent = "Good job! Submit your initials below to save your time to the scoreboard!";
    beginQuizButton.textContent = "Go Again?";
    scoreBoardButton.textContent = "Scoreboard";
}

// Quiz Game Over function - When the quiz is ended, the following display changes occur
function gameoverScreen() {
    quizArea.setAttribute("style", "display:none");
    quizStart.setAttribute("style", "display:flex");
    startEndMessage.textContent = "Times Up!";
    startEndDetail.textContent = "You ran out of time! If you would like to try the quiz again, please click below!";
    beginQuizButton.textContent = "Try Again?";
    scoreBoardButton.textContent = "Scoreboard";
}


// ------------------- SCORES -------------------

// SCORE SAVING - the following two functions do the same things but for different input parameters
// Prevents default for event then checks if the data the user typed into the submitScore input is a blank or not
// If not a blank, get info put into the input and add it to the remaining time (see timer function)
// These two values are then stored in scoreText, which is then added to the scores array
// The value of the scores array is then stored and the stored value is then rendered
// Finally the submission menu is hidden and a message appears confirming score submission

// Quiz Score Submissions - on Click
submitScore.addEventListener("click", function(event){
    event.preventDefault();

    if (yourInitials.value === "") {
        return;
      }

    scoreText = yourInitials.value + " Score:" + timeRemaining;
    console.log(scoreText);
    scores.push(scoreText);
    yourInitials.value = "";
    storeScore();
    renderScores();

    submissionMenu.setAttribute("style", "display:none");
    startEndDetail.textContent = "Score Submitted! Play again?";
}) 

// Quiz Score Submissions - on Submit
yourInitials.addEventListener("submit", function(event){
    event.preventDefault();

    if (yourInitials.value === "") {
        return;
      }

    scoreText = yourInitials.value + " Score:" + timeRemaining;
    console.log(scoreText);
    scores.push(scoreText);
    yourInitials.value = "";
    storeScore();
    renderScores();

    submissionMenu.setAttribute("style", "display:none");
    startEndDetail.textContent = "Score Submitted! Play again?";
}) 

// Store Score Locally - converts scores array into a JSON string for storage
function storeScore() {
    localStorage.setItem("score", JSON.stringify(scores));
}

// Initialize Function - Grabs stored score array data with a JSON parse then runs renderScores
function init() {
    let storedScores = JSON.parse(localStorage.getItem("score"));
    console.log(storedScores);
    console.log(scores);

    if (storedScores !== null) {
        scores = storedScores;
      }

    console.log(scores);

    renderScores();
}

// Render Scores on Score Page - resets current scoreboard render then does a for loop to:
// render an item for each value in the scores array and display them as text content under a UL as LIs
function renderScores() {

    scoreContainer.innerHTML = "";

    for (let i = 0; i < scores.length; i++) {

        let score = scores[i];
        let li = document.createElement("li");
        li.setAttribute("class", "scoreBoardItem");
        li.textContent = score;
        scoreContainer.appendChild(li);
      }
}

// Clear Scoreboard - deletes rendered scoreboard data and saves over the locally saved data as a blank
clearScores.addEventListener("click", function(){

    scores = [];
    storeScore();
    init();
    
    })


// // ------------------- QUIZ FUNCTIONALITY -------------------

// Timer Function - reduces time remaining by 1 per 1000ms and displays info to page
// Triggers game over if timer goes below 1 (0), or a completion if the number of questions answered correctly is 10
function timerStart() {
    let countDown = setInterval(function() {
    timeRemaining--;
    timer.textContent = "Timer: " + timeRemaining;

    if(timeRemaining < 1) {
        clearInterval(countDown);
        timeRemaining = 0;
        timer.textContent = "Timer: " + timeRemaining;
        gameoverScreen();
    } else if (questionsAnswered === 10){
        clearInterval(countDown);
        quizFinish()
    }
    }, 1000)
}

// ANSWER SELECTION - Answer Buttons
// When clicking a button, each button has a data value of either true or false
// If true, you get a positive message and +1 to total questions answered.
// If false, time remaining drops by 15s
// After every selection, the questionselect function is called to select a new question
quizAnswers.addEventListener("click", function(event) {

let selectedButton = event.target;

if (selectedButton.matches("button") === true) {
bool = selectedButton.getAttribute("data-selected");
}

if (bool === "true") {
    answerResult.textContent = "Nice Job!";
    questionsAnswered = questionsAnswered + 1
    questionSelect();
} else if (bool === "false") {
    answerResult.textContent = "WRONG! MINUS 15 POINT!";
    timeRemaining = timeRemaining - 15;
    questionSelect();
} else {
    alert("An error has occured, please contact your local pigeon dealer");
    return;
}
})

// setAllFalse is used to reset data attributes for buttons to their base values
function setAllFalse() {
    option1.setAttribute("data-selected", "false");
    option2.setAttribute("data-selected", "false");
    option3.setAttribute("data-selected", "false");
    option4.setAttribute("data-selected", "false");
}

// Question Select - generates a random number to be used for question pool selection
// First if statement prevents the same question from being selected twice in a row
// The random number generated will pull from two array pools, the question and answer pool
// The question pool is an array of questions from index 1-15 and the answer pool is an array of 1-15 with each item being its own array
// The content for each question option is dependant on the contained array within the selected answerpool array
// All arrays match up their questions and answers

// Answer Loading (inside Question Select) - a lengthy if statement is then ran that checks which question is currently selected
// It then applies a false value to all answers and a true answer to the answer pool's corresponding correct answer
function questionSelect() {

    rand = Math.floor(Math.random() * 15);

    if (rand === currentIndex) {
        rand = Math.floor(Math.random() * 15)
    }

    currentIndex = rand;

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


// ----------- QUESTION POOL / VARIABLES (2) ----------- 
// Each question is a string while their answers are arrays

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

const question7 = "What is the purpose of a README file?";
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

// All Questions, answers, and buttons are then stored in arrays.
// Questionpool index will always match up with their answerpool if the index for both is the same number

const questionPool = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15];
const answerPool = [answers1, answers2, answers3, answers4, answers5, answers6, answers7, answers8, answers9, answers10, answers11, answers12, answers13, answers14, answers15];
const optionPool = [option1, option2, option3, option4];

// Page initialization

init();


