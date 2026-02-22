
// Stores all the quiz questions, answer choices, and which answer is correct
const questions = [
  {
    question: "What is the main purpose of national parks?",
    answers: [
      "To build cities",
      "To protect nature and wildlife",
      "To create shopping centers",
      "To increase traffic"
    ],
    correct: 1
  },
  {
    question: "One major threat to national parks is:",
    answers: [
      "Too many trees",
      "Pollution",
      "Too much clean air",
      "Wild animals"
    ],
    correct: 1
  },
  {
    question: "Which of the following is a way to help protect national parks?",
    answers: [
      "Littering",
      "Using single-use plastics",
      "Staying on marked trails",
      "Feeding wildlife"
    ],
    correct: 2
  },
  {
    question:"What can you do to help reduce pollution in national parks?",
    answers: [
      "Use reusable water bottles",
      "Leave trash behind",
      "Start campfires everywhere",
      "Disturb wildlife"
    ],
    correct: 0
  },
  {
    question: "Why is it important to protect national parks?",
    answers: [
      "They are fun places to visit",
      "They provide habitat for wildlife and help preserve biodiversity",
      "They are good for building roads",
      "They are not important"
    ],
    correct: 1
  }
];

// Keeps track of which question the user is currently on
let currentQuestion = 0;

// Get references to the HTML elements we need to update
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const result = document.getElementById("result");

// Loads the current question and answer choices into the page
function loadQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  answerButtons.forEach((button, index) => {
    button.textContent = q.answers[index];
  });
}

// Listens for when user clicks an answer button, checks if it's correct
answerButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index === questions[currentQuestion].correct) {
      result.textContent = "Correct! 🌿";
    } else {
      result.textContent = "Try again!";
    }
// Move to the next question
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(() => {
        result.textContent = "";
        loadQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        questionElement.textContent = "Quiz Complete!"; // Displays a completion message 
        document.querySelector(".answers").style.display = "none";
      }, 1000);
    }
  });
});

loadQuestion(); // Start the quiz by loading the first question
