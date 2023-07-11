
const quizData = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
      correctChoice: ["Hyper Text Markup Language"]
    },
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheet", "Colorful Style Sheet", "Computer Style Sheet"],
      correctChoice: ["Cascading Style Sheet"]
    },

  ];
  
  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const choicesList = document.getElementById("choices");
  const resultContainer = document.getElementById("result-container");
  const resultElement = document.getElementById("result");
  const nextButton = document.getElementById("next-btn");
  const startButton = document.getElementById("start-btn");
  const restartButton = document.getElementById("restart-btn");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  const gameOverContainer = document.getElementById("game-over-container");
  const questionCountElement = document.getElementById("question-count");
  const finalScoreElement = document.getElementById("final-score");
  
  let currentQuestion = 0;
  let score = 0;
  let timeRemaining = 30; 
  let timer;
  
 
  function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    gameOverContainer.style.display = "none";
    score = 0;
    currentQuestion = 0;
    timeRemaining = 5;
    showQuestion();
    startTimer();

    restartButton.style.display = "block";
  }
  

  function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    choicesList.innerHTML = "";
  
    question.choices.forEach((choice, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = choice;
      button.value = index;
      button.addEventListener("click", selectAnswer);
      li.appendChild(button);
      choicesList.appendChild(li);
    });
  }
  
 
  function selectAnswer(event) {
    const selectedAnswer = event.target.value;
    const question = quizData[currentQuestion];
  
    if (selectedAnswer === question.choices[question.correctChoice]) {
      score++;
      resultElement.textContent = "Correct!";
    } else {
      resultElement.textContent = "Wrong!";
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  
    scoreElement.textContent = score;
  }

  
 
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";
    gameOverContainer.style.display = "block";
    questionCountElement.textContent = `Questions Answered: ${quizData.length}`;
    finalScoreElement.textContent = `Final Score: ${score}`;
    
    if (currentQuestion >= quizData.length) {
      restartButton.style.display = "block";
    }
  }
  
  function restartQuiz() {
    restartButton.style.display = "none";
    startQuiz();
  }
  
 
  function startTimer() {
    timer = setInterval(() => {
      timeRemaining--;
      timerElement.textContent = timeRemaining;
  
      if (timeRemaining <= 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }


  startButton.addEventListener("click", startQuiz);
  restartButton.addEventListener("click", restartQuiz);

