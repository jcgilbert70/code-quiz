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
var quiz = [
    {
        questionNum: "1",
        answers: ["answer1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 3
    },
    {
        questionNum: "2",
        answers: ["answer1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 0
    },
    {
        questionNum: "3",
        answers: ["answer1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 3
    },
    {
        questionNum: "4",
        answers: ["answer1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 1
    },
    {
        questionNum: "5",
        answers: ["answer1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: 2
    },
]

var score = 0;
var timeRemaining = 75;
var currentQuestion = 0;

var checkBtnA = document.querySelector("answerA");
var checkBtnB = document.querySelector("answerB");
var checkBtnC = document.querySelector("answerC");
var checkBtnD = document.querySelector("answerD");

var quizIntro = document.querySelector("#quizIntro");
var quizHeader = document.querySelector("#quizHeader");
var quizOver = document.querySelector("quizOver");
var remainingTimeEnd = document.querySelector("#remainingTime");
var startBtn = document.querySelector("startBtn");

// countdown timer
function countdown() {
    var timerCountdown = setInterval(function (){
        timeRemaining--;
        displayTime.textContent = timeRemaining;
        if (timeRemaining === 0) {
            clearInterval(timerCountdown);
            endQuiz; // ends quiz if time runs out
        }
        if (currentQuestion > (question.length - 1)) {
            clearInterval(timerCountdown);
            endQuiz; // ends quiz if all questions answered
        }
    }, 1000);
}

// start quiz
function startQuiz() {
    quizIntro.setAttribute("style", "display:none")
    quizContainer.setAttribute("style", "display:flex")
    console.log("Intro was replaced with quiz questions")
}

// display question and remove quiz intro
function displayQuestion() {
    questionNumberEl.textContent = questions[currentQuestion].questionNum;
    questionItselfEl.textContent = questions[currentQuestion].questionContent;
    for (i = 0; i < 4; i++) {
        answerChoiceArray[i].textContent = questions[currentQuestion].answerChoices[i];
    }
}

// run quiz loop per # of questions
function runQuiz() {
    if (currentQuestion < questions.length) {
        displayQuestion();
    }
    console.log("showing question: " + currentQuestion)

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

    if (buttonSelected === correctAnswer) {
        console.log("User answer is Correct");
    } else if (buttonSelected != correctAnswer) {
        console.log("user answer is Incorrect");
        if (timeRemaining > 0) {
            if (timeRemaining - 10 <= 0) {
            }
            else {
                timeRemaining -= 10;
            }
        }
    }
    currentQuestion++
    if (currentQuestion > (questions.length - 1)) {
        endQuiz();
    } else if (currentQuestion <= (questions.length - 1)) {
        runQuiz();
    }
}


function endQuiz() {
quizContainer.setAAttribute("style", "display:none")
quizOver.setAttribute("style", "display:flex")
remainingTimeEnd.textContent = timeRemaining;
// submitButton.addEventListener("click", submitHighScores);
}

// running functions on click of "Start Quiz"
document.querySelector("#startBtn").addEventListener("click", countdown, startQuiz, runQuiz);








/* high score functions

function submitHighScores() {

}

function displayHighScores() {

}

function clearHighScores() {

}

*/





//-----------------------------------------------

// function to start timer & display question onClick of start button

// function when question is called, radom select from array

// function if question answered wrong subtract 5 seconds from timer

// function when all questions answered, stop timer & end game
