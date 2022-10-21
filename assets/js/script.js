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
var currentQuestionIndex = 0;

//  variables to reference the DOM
var remainingTimeEl = document.getElementById("remainingTime");

var quizIntroEl = document.getElementById("quizIntro");
var startBtnEl = document.getElementById("startBtn");

var quizContainerEl = document.getElementById("quizContainer");
var quizNumE1 = document.getElementById("quizNum");
var quizHeaderEl = document.getElementById("quizHeader");
var quizChoicesEl = document.getElementById("quizChoices");

var feedbackEl = document.getElementById("feedback");

var quizOverEl = document.getElementById("quizOver");
var remainingTimeEnd = document.getElementById("remainingTimeEnd");
var initialsEl = document.getElementById("initials");


// start quiz makes intro screen dissapear, and makes questions appear
function startQuiz() {
    console.log("start quiz function started");
    quizIntroEl.setAttribute("class", "start hide");

    quizContainerEl.setAttribute("class", " ");
    console.log("Intro was replaced with quiz questions container");
    countdown(); //countdown function/timer starts
    displayQuestion(); // displays first question
}

// countdown timer
function countdown() {
    console.log("countdown function started");
    remainingTimeEl = setInterval(function () {
        timeRemaining--;
        console.log("time remaining: " + timeRemaining);
        remainingTimeEl.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            console.log("user ran out of time")
            endQuiz();
        }
    }, 1000);
}




// display question
function displayQuestion() {
    console.log("display question function started");

    var currentQuestion = quizQuestions[currentQuestionIndex];

    // update Question number with current question
    quizContainerEl.children[0].textContent = ("Question Number: ") + currentQuestion.questionNum
    quizContainerEl.children[1].textContent = currentQuestion.questionAsk



    //quizChoicesEl.textContent - quizQuestions[currentQuestion].answers;

    while (quizChoicesEl.hasChildNodes()) {
        quizChoicesEl.removeChild(quizChoicesEl.lastChild);
    }
    // update question answers with current question
    for (var i = 0; i < currentQuestion.questionAnswers.length; i++) {
        //quizQuestions[i].textContent = quizQuestions[currentQuestion].questionAnswers[i];

        var answerBtn = document.createElement("button");
        answerBtn.textContent = currentQuestion.questionAnswers[i]

        quizChoicesEl.appendChild(answerBtn);
    }
    quizChoicesEl.children[0].addEventListener("click", function (event) {
        checkAnswer(quizChoicesEl.children[0]);
    });
    quizChoicesEl.children[1].addEventListener("click", function (event) {
        checkAnswer(quizChoicesEl.children[1]);
    });
    quizChoicesEl.children[2].addEventListener("click", function (event) {
        checkAnswer(quizChoicesEl.children[2]);
    });
    quizChoicesEl.children[3].addEventListener("click", function (event) {
        checkAnswer(quizChoicesEl.children[3]);
    });
}

// check answer function
function checkAnswer(userAnswer) {
    if (userAnswer.textContent != quizQuestions[currentQuestionIndex].correctAnswer) {
        timeRemaining -= 10;
        feedbackEl.textContent = "Incorrect";
        console.log("Answer was incorrect, 10 seconds were deducted from timer");
    }
    else {
        feedbackEl.textContent = "Correct";
        console.log("Answer was correct")
    }

    feedbackEl.setAttribute("class", "feedback");
    setInterval(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 700);


    currentQuestionIndex++; // after previous answer checked, go to next question

    console.log("checking if there is another question")
    if (currentQuestionIndex >= (quizQuestions.length)) {
        console.log("there are no more questions in quiz array")
        endQuiz(); // ends quiz when quiz goes through full question array

    } else
        displayQuestion();
}


function endQuiz() {
    console.log("The quiz ended");
    quizContainerEl.setAttribute("class", "hide"); // makes section where questions were dissapear
    quizOverEl.setAttribute("class", " "); // section where questions were are replaced by "quizOver" 
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