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
var timer
var score = 0;
var timeCount = quizQuestions.length * 15;
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
var submitBtn = document.getElementById("submit");


function init() {

}

// start quiz function begins
function startQuiz() {
    console.log("start quiz function started");

    // hiding the intro screen
    quizIntroEl.setAttribute("class", "start hide");

    // displaying the questions
    quizContainerEl.setAttribute("class", " ");
    console.log("Intro was replaced with quiz questions container");
    countdown(); //countdown function/timer starts
    displayQuestion(); // displays first question
}

// countdown timer
function countdown() {
    console.log("countdown function started");
    timer = setInterval(function () {
        timeCount--;
        console.log("time remaining: " + timeCount); // displays the countdown within the console log
        remainingTimeEl.textContent = timeCount;
        if (timeCount <= 0) {
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


    while (quizChoicesEl.hasChildNodes()) {
        quizChoicesEl.removeChild(quizChoicesEl.lastChild);
    }
    // update question answers with current question
    for (var i = 0; i < currentQuestion.questionAnswers.length; i++) {

        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "choices");
        answerBtn.textContent = currentQuestion.questionAnswers[i]
        quizChoicesEl.appendChild(answerBtn);
    }
    quizChoicesEl.children[0].addEventListener("click", function () {
        checkAnswer(quizChoicesEl.children[0]);
    });
    quizChoicesEl.children[1].addEventListener("click", function () {
        checkAnswer(quizChoicesEl.children[1]);
    });
    quizChoicesEl.children[2].addEventListener("click", function () {
        checkAnswer(quizChoicesEl.children[2]);
    });
    quizChoicesEl.children[3].addEventListener("click", function () {
        checkAnswer(quizChoicesEl.children[3]);
    });
}

// check answer function
function checkAnswer(userAnswer) {
    if (userAnswer.textContent != quizQuestions[currentQuestionIndex].correctAnswer) {
        timeCount -= 10;
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
    }, 1000);


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
    clearInterval(timer)
    remainingTimeEl.setAttribute("class", "hide");
    quizContainerEl.setAttribute("class", "hide"); // makes section where questions were dissapear
    quizOverEl.setAttribute("class", " "); // section where questions were are replaced by "quizOver" 
    remainingTimeEnd.textContent = ("Your Final Score Is: ") + timeCount;
    console.log("final score is: " + timeCount)


}

function saveHighscore() {
    var initials = initialsEl.value.toUpperCase();
    if (initials === "") {
        alert("Can not be blank'");
        return;
    }
    else if (initials.length > 3) {
        alert("Input must be no more than 3 characters");
        return;
    }
    else {
        var highscores;
        if (JSON.parse(localStorage.getItem("highscores")) != null)
            highscores = JSON.parse(window.localStorage.getItem("highscores"));
        else
            highscores = [];
        var newScore = {
            initials: initials,
            score: timeCount
        };
        highscores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));
        location.href = "highscores.html";
    }
}


submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;