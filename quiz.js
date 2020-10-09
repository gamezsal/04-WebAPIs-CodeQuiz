var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName('choice-text'));
// console.log(choices);

var presentQuestion = {};
var acceptAnswers = false;
var score = 0;
var questionCount = 0;
var availQuestions = [];

var questions = [
    {
        question: "Inside4?",
        choice1: "by the house",
        choice2: "by the park",
        choice3: "by the store",
        choice4: "by the movies",
        answer: 4
    },
    {
        question: "Inside3?",
        choice1: "by the house",
        choice2: "by the park",
        choice3: "by the store",
        choice4: "by the movies",
        answer: 3
    },
    {
        question: "Inside1?",
        choice1: "by the house",
        choice2: "by the park",
        choice3: "by the store",
        choice4: "by the movies",
        answer: 1
    }

];

// Contants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCount = 0;
    score = 0;
    availQuestions = [...questions];
    console.log(availQuestions)
    newQuestion();
};

newQuestion = () => {
    questionCount++;
    var questionIndex = Math.floor(Math.random() * availQuestions.length);
    presentQuestion = availQuestions[questionIndex]
    question.innerText = presentQuestion.question;

    choices.forEach( choice => {
      var number = choice.dataset["number"];
      choice.innerText = presentQuestion['choice' + number];
    })

    availQuestions.splice(questionIndex, 1);

    acceptAnswers = true;
};

startGame()


