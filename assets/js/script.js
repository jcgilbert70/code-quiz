/* 

1)  A) Game begins by cliking "Start" button

2)  A) A timer starts
    B) user is presented with a random question
    C) When 1st question is answered, next question appears
    D) A wrong answer deducts time from the clock

3)  A) game ends when all questions done
    B) game ends when time runs out

4)  A) user enters initials for score
    B) score and initals added to high score list
    C) high score list can be refreshed

*/

var score = 0;
var timeRemaining = 75;
var currentQuestion = 0;

var checkBtnA = document.querySelector("#answerA");
var checkBtnB = document.querySelector("#answerB");
var checkBtnC = document.querySelector("#answerC");
var checkBtnD = document.querySelector("#answerD");

var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var quizChoicesEl = document.querySelector("#quizChoices")
var quizIntro = document.querySelector("#quizIntro");
var quizHeaderEl = document.querySelector("#quizHeader");
var quizNumE1 = document.querySelector("#quizNum")
var quizOver = document.querySelector("#quizOver");
var remainingTime = document.querySelector("#remainingTime");
var remainingTimeEnd = document.querySelector("#remainingTimeEnd");
var startBtn = document.querySelector("#startBtn");

// countdown timer
function countdown() {
    console.log("countdown function started");
    var timerCountdown = setInterval(function () {
        timeRemaining--;
        remainingTime.textContent = timeRemaining + (" Seconds Left");
        if (timeRemaining === 0) {
            console.log("user ran out of time")
            clearInterval(timerCountdown);
            endQuiz; // ends quiz if time runs out
        }
        if (currentQuestion > (question.length - 1)) {
            clearInterval(timerCountdown);
            endQuiz; // ends quiz if all questions answered
        }
    }, 1000);
}

// start quiz makes intro screen dissapear, and makes questions appear
function startQuiz() {
    console.log("start quiz function started");
    countdown() //countdown function/timer starts
    quizIntro.setAttribute("style", "display:none")
    quizContainer.setAttribute("style", "display:inline-block")
    // quizContainer.setAttribute("style", "object-position:center")
    console.log("Intro was replaced with quiz questions");
    runQuiz() // display adjusted to show questions and quiz begins
}

// display question
function displayQuestion() {
    console.log("display question function started");

    quizNumE1.textContent = ("Question Number: ") + quizQuestions[currentQuestion].questionNum;
    quizHeaderEl.textContent = quizQuestions[currentQuestion].questionAsk;
    quizChoicesEl.textContent - quizQuestions[currentQuestion].answers;


    for (var i = 0; i < quizQuestions.length; i++) {
        quizQuestions[i].textContent = quizQuestions[currentQuestion].answers[i];
    }
}

// run quiz loop per # of questions
function runQuiz() {
    console.log("run quiz function started");
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    }
    console.log("showing question: " + currentQuestion);

    // when button is clicked, check answer function will run
    checkBtnA.addEventListener("click", checkAnswer);
    checkBtnB.addEventListener("click", checkAnswer);
    checkBtnC.addEventListener("click", checkAnswer);
    checkBtnD.addEventListener("click", checkAnswer);
}

// check answer function
function checkAnswer() {
    var buttonSelected = this.id;
    console.log("user selected: " + buttonSelected);

    if (buttonSelected != correctAnswer) {
        feedbackEl.textContent = "Incorrect";
        console.log("User answer is Incorrect. feedback pop-up of incorrect");

        // this deducts 10s if user guesses wrong answer
        if (timeRemaining > 0) {
            if (timeRemaining - 10 <= 0) { // if 10s or less go to 0s
            }
            else {
                timeRemaining -= 10; // else subtract 10 from time remaining
            }
        }

    } else if (buttonSelected === correctAnswer) {
        feedbackEl.textContent = "Correct";
        console.log("user answer is Correct, feedback pop-up of correct");
    }

    feedbackEl.setAttribute("class", "feedback");
    serInterval(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 500);


    currentQuestion++; // after previous answer checked, go to next question

    console.log("checking if there is another question")
    if (currentQuestion > (questions.length - 1)) {
        console.log("there are no more questions in quiz array")
        endQuiz(); // ends quiz when quiz goes through full question array

    } else if (currentQuestion <= (questions.length - 1)) {
        console.log("quiz has checked an answer and moved to next question")
        runQuiz(); // run quiz loop for next question

    }
}

function endQuiz() {
    console.log("The quiz ended");
    quizContainer.setAttribute("style", "display:none"); // makes section where questions were dissapear
    quizOver.setAttribute("style", "display:flex"); // section where questions were are replaced by "quizOver" 
    remainingTimeEnd.textContent = timeRemaining;
    // submitButton.addEventListener("click", submitHighScores);
}

// running function on click of "Start Quiz"
startBtn.addEventListener("click", startQuiz);








/* high score functions

function submitHighScores() {

}

function displayHighScores() {

}

function clearHighScores() {

}

*/