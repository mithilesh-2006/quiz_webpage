const quizData = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    correct: 1
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "Hypertext Markup Language",
      "Hyperloop Machine Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "What year was JavaScript launched?",
    answers: ["1996", "1995", "1994", "none of the above"],
    correct: 1
  },
];

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next');
const timerEl = document.getElementById('time');
const scoreEl = document.getElementById('score');

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function loadQuestion() {
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  nextBtn.disabled = true;
  answersEl.innerHTML = '';
  questionEl.textContent = quizData[currentQuestion].question;

  quizData[currentQuestion].answers.forEach((answer, idx) => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="radio" name="answer" value="${idx}">
      ${answer}
    `;
    answersEl.appendChild(label);
  });

  // Start timer
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextBtn.disabled = false;
    }
  }, 1000);

  answersEl.addEventListener('change', () => {
    if (timeLeft > 0) {
      nextBtn.disabled = false;
    }
  }, { once: true });
}

nextBtn.addEventListener('click', () => {
  clearInterval(timer);
  const selected = document.querySelector('input[name="answer"]:checked');
  if (selected) {
    if (parseInt(selected.value) === quizData[currentQuestion].correct) {
      score++;
    }
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = `Quiz Completed! Your score: ${score} out of ${quizData.length}`;
  answersEl.innerHTML = '';
  nextBtn.style.display = 'none';
  timerEl.textContent = '';
  scoreEl.textContent = '';
}

loadQuestion();