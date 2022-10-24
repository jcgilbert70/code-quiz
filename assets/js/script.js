/* 
1)  A) Game begins by cliking "Start" button

2)  A) A timer starts
    B) user is presented with first question
    C) user mouse click to select a multiple choice answer
    D) users selection is verified to be correct or incorrect
    E) A wrong answer deducts time from the clock
    F) quiz moves to next question
    G) user is presented with next question and answers

3)  A) game ends when all questions done
    B) game ends when time runs out

4)  A) user is presented with their quiz score
    B) user enters initials for score of 1 to 3 characters 
    C) score and initals added to high score list
    D) high score list can be refreshed, or user can return to main page
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


function startQuiz() { // start quiz function begins
    console.log("start quiz function started");

    // hiding the intro screen
    quizIntroEl.setAttribute("class", "start hide");

    // displaying the questions
    quizContainerEl.setAttribute("class", " ");
    console.log("Intro was replaced with quiz questions container");
    countdown(); //countdown function/timer starts
    displayQuestion(); // displays first question
}

// 2-A) countdown timer begins
function countdown() {
    console.log("countdown function started");
    timer = setInterval(function () {
        timeCount--;
        console.log("time remaining: " + timeCount); // displays the countdown within the console log
        remainingTimeEl.textContent = timeCount;
        if (timeCount <= 0) {
            console.log("user ran out of time")
            endQuiz(); // 3-B) if the timer runs out end game function will run
        }
    }, 1000);
}

// 2-B) users s presented with the first question, this loops through all questions
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

    // 2-C) the user selects one of the 4 possible answers on mouse click
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

// 2-D) The users selections is checked to be correct or incorrect
function checkAnswer(userAnswer) {
    if (userAnswer.textContent != quizQuestions[currentQuestionIndex].correctAnswer) {
        timeCount -= 10; // 2-E) a wrong answer deducts 10 seconds off the timer
        feedbackEl.textContent = "Incorrect";
        console.log("Answer was incorrect, 10 seconds were deducted from timer");
    }
    else {
        feedbackEl.textContent = "Correct";
        console.log("Answer was correct")
    }

    // feedbackEl gives the user a 1 second pop-up indicating if last selection was correct or incorrect
    feedbackEl.setAttribute("class", "feedback");
    setInterval(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);


    currentQuestionIndex++; // 2-F) moves reference for quiz to the next question

    console.log("checking if there is another question")
    if (currentQuestionIndex >= (quizQuestions.length)) {
        console.log("there are no more questions in quiz array")
        endQuiz(); // 3-A) ends quiz when quiz goes through full question array of questions

    } else
        displayQuestion(); // 2-F) if available user is presented with the next question
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

function saveHighscore() { // 4-B) this function captures users initials and highscore
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

// 1-A) User starts the quiz by clikcing a start button
startBtn.onclick = startQuiz;