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

var quizQuestions = [ // questions array for quiz
    {
        questionNum: "1",
        questionAsk: "The condition in an if/else statement is enclosed within:",
        questionAnswers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "curly brackets"
    },
    {
        questionNum: "2",
        questionAsk: "Arrays in JavaScript can be used to store:",
        questionAnswers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        questionNum: "3",
        questionAsk: "Commonly used data types DO NOT include:",
        questionAnswers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        questionNum: "4",
        questionAsk: "String values must be enclosed within ________ when being assigned to variables.",
        questionAnswers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },
    {
        questionNum: "5",
        questionAsk: "A very useful tool used during developement and debuggin for printing content to the debugger is:",
        questionAnswers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    }
]

var highscoresArray = [];
var currentQuestionIndex = 0;
var score = 0;
var timeCount = 75;
var timer

//  variables to reference the DOM
var highscoresListEl = document.querySelector("#highscoresList");
var highscoresTableEl = document.querySelector("#highscoresTable");
var initialsEl = document.querySelector("#initials");
var quizIntroEl = document.querySelector("#quizIntro");
var quizContainerEl = document.querySelector("#quizContainer");
var quizNumE1 = document.querySelector("#quizNum");
var quizHeaderEl = document.querySelector("#quizHeader");
var quizChoicesEl = document.querySelector("#quizChoices");
var quizOverEl = document.querySelector("#quizOver");
var remainingTimeEl = document.querySelector("#remainingTime");
var remainingTimeEndEl = document.querySelector("#remainingTimeEnd");
var resultEl = document.querySelector("#result");


// variables to referencee buttons in DOM
var clearHighscoresBtn = document.querySelector("#clearHighscoresBtn");
var goBackBtn = document.querySelector("#goBackBtn");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#startBtn");
var viewHighscoresBtn = document.querySelector("#viewHighscoresBtn");

function init() {
    console.log("initialize function started");
    timeCount = 75;
    currentQuestionIndex = 0;
    quizIntroEl.setAttribute("class", "");
    quizContainerEl.setAttribute("class", "hide");
    quizOverEl.setAttribute("class", "hide");
    highscoresTableEl.setAttribute("class", "hide");
    remainingTimeEl.setAttribute("class", "");
}

function goBack() {
    console.log("go back button pressed")
    init();
}

function highscoreViewer() {
    console.log("view highscore button pressed and highscore viewer function started");
    quizIntroEl.setAttribute("class", "hide");
    quizContainerEl.setAttribute("class", "hide");
    quizOverEl.setAttribute("class", "hide");
    highscoresTableEl.setAttribute("class", "");
}

function startQuiz() { // start quiz function begins
    console.log("start quiz function started");

    // hiding the intro screen
    quizIntroEl.setAttribute("class", "hide");
    viewHighscoresBtn.setAttribute("class", "hide");
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
        answerBtn.setAttribute("class", "myBtn");
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
        resultEl.textContent = "Incorrect";
        console.log("Answer was incorrect, 10 seconds were deducted from timer");
    }
    else {
        resultEl.textContent = "Correct";
        console.log("Answer was correct")
    }

    // feedbackEl gives the user a 1 second pop-up indicating if last selection was correct or incorrect
    resultEl.setAttribute("class", "result");
    setInterval(function () {
        resultEl.setAttribute("class", "result hide");
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
    viewHighscoresBtn.setAttribute("class", "");
    viewHighscoresBtn.setAttribute("class", "myBtn");
    remainingTimeEl.setAttribute("class", "hide");
    quizContainerEl.setAttribute("class", "hide"); // makes section where questions were dissapear
    quizOverEl.setAttribute("class", " "); // section where questions were are replaced by "quizOver" 
    if (timeCount < 0) {
        timeCount = 0
    }
    remainingTimeEndEl.textContent = ("Your Final Score Is: ") + timeCount;
    highscoresListEl.innerHTML = ""; // clear text initials text entry
    console.log("final score is: " + timeCount)

}

function printHighscores() { // 4-C) users initials and scores created in a list
    console.log("printHighscores function started");
    quizOverEl.setAttribute("class", "hide");
    highscoresTableEl.setAttribute("class", "");

    

    var storedHighscores = JSON.parse(localStorage.getItem("userScore"));
    console.log("High Score List: " + storedHighscores)

    if (storedHighscores !== null) {
        highscoresArray = storedHighscores; // display stored high scores
    } else if (storedHighscores === null) {
        highscoresListEl.textContent = "NO HIGH SCORES"; // if no stored high scores display message
    }

    for (var i = 0; i < highscoresArray.length; i++) {
        var highscore = highscoresArray[i];

        var li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i);

        highscoresListEl.appendChild[li]
    }

}

function saveHighscore() { // 4-B) this function captures users initials and highscore
    console.log("saveHighscore function started");

    var userInitials = initialsEl.value.trim();

    var userScore = {
        userInitials,
        timeCount
    }
   
    var newHighscore = localStorage.setItem("userScore", JSON.stringify(userScore));
    console.log("new high score saved to local storage: " + newHighscore)

    highscoresArray.push(newHighscore);

    printHighscores();
}


function clearHighscores() {   // 4-D) high score list can be cleared
    console.log("clearHighscores function started");
    initialsEl = "";
}

init();

viewHighscoresBtn.onclick = highscoreViewer;

goBackBtn.onclick = goBack;

clearHighscoresBtn.onclick = clearHighscores;

submitBtn.onclick = saveHighscore;

// 1-A) User starts the quiz by clikcing a start button
startBtn.onclick = startQuiz;