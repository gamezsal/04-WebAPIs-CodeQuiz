"use strict";
var timerDiv = document.getElementById("timer");
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));

var presentQuestion = {};
var acceptAnswers = false;
var score = 0;
var questionCount = 0;
var availQuestions = [];

var questions = [
  {
    question: "Who is the best soccer player in the world now?",
    choice1: "Lionel Messi",
    choice2: "Cristiano Ronaldo",
    choice3: "Wayne Rooney",
    choice4: "Lebron James",
    answer: 1,
  },
  {
    question: "In soccer, an Olympic Goal is a scored shot taken from the?",
    choice1: "Midfield",
    choice2: "The penalty box",
    choice3: "Goal post",
    choice4: "Corner kick area",
    answer: 4,
  },
  {
    question: "Which country was the first to host two World Cups?",
    choice1: "Argentina",
    choice2: "Africa",
    choice3: "China",
    choice4: "Mexico",
    answer: 4,
  },
];

// Contants and Timers
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
const MAX_TIME = 60;

var timeLeft = 0;
var timerHandle;

var setTime = (seconds) => {
  if (seconds < 0) {
    seconds = 0;
  }
  timeLeft = seconds;
  timerDiv.textContent = timeLeft;
};

var startTimer = () => {
  setTime(MAX_TIME);
  timerHandle = setInterval(() => {
    setTime(timeLeft - 1);
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
};

var startGame = () => {
  questionCount = 0;
  score = 0;
  availQuestions = [...questions];
  newQuestion();
  startTimer();
};

//Available questions logic
var newQuestion = () => {
  if (availQuestions.length === 0 || questionCount > MAX_QUESTIONS) {
    // End game page
    return endQuiz();
  }
  questionCount++;
  var questionIndex = Math.floor(Math.random() * availQuestions.length);
  presentQuestion = availQuestions[questionIndex];
  question.innerText = presentQuestion.question;

  choices.forEach((choice) => {
    var number = choice.dataset["number"];
    choice.innerText = presentQuestion["choice" + number];
  });

  availQuestions.splice(questionIndex, 1);

  acceptAnswers = true;
};

var endQuiz = () => {
  clearInterval(timerHandle);
  sessionStorage.setItem("mostRecentScore", score);
  window.location.assign("endgame.html");
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAnswers) return;

    acceptAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset["number"];

    var toApply = "incorrect";
    if (selectedAnswer == presentQuestion.answer) {
      toApply = "correct";
      score = score + CORRECT_BONUS;
    } else {
      setTime(timeLeft - 5);
    }

    selectedChoice.parentElement.classList.add(toApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(toApply);
      newQuestion();
    }, 1000);
  });
});

startGame();
