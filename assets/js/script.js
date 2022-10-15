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
const quiz = [
{
    question: "question 1",
    answers: ["answer1", "answer 2", "answer 3", "answer 4"]
    correctAnswer: 3
},
{
    question: "question 2",
    answers: ["answer1", "answer 2", "answer 3", "answer 4"],
    correctAnswer: 0
},
{
    question: "question 3",
    answers: ["answer1", "answer 2", "answer 3", "answer 4"],
    correctAnswer: 3
},
{
    question: "question 4",
    answers: ["answer1", "answer 2", "answer 3", "answer 4"],
    correctAnswer: 1
},
{
    question: "question 5",
    answers: ["answer1", "answer 2", "answer 3", "answer 4"],
    correctAnswer: 2
},
]

var score= 0;
var time= 75;

const timer= document.getElementById("timer");




// Array of questions

/*

var questionList: []


*/

//-----------------------------------------------

// function to start timer & display question onClick of start button

// function when question is called, radom select from array

// function if question answered wrong subtract 5 seconds from timer

// function when all questions answered, stop timer & end game

// function end game, show score & initial entry
function endGame {
    time= 0;

}