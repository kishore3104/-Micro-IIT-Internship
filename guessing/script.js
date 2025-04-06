let randomNumber = Math.floor(Math.random() * 50) + 1;
let attempts = 5;
let timeLeft = 30;
let timerInterval;

const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitGuess");
const hintBtn = document.getElementById("hintBtn");
const feedback = document.getElementById("feedback");
const hintText = document.getElementById("hintText");
const attemptsLeft = document.getElementById("attemptsLeft");
const restartBtn = document.getElementById("restartBtn");
const timerDisplay = document.getElementById("timer");

// Set initial attempts and start timer
attemptsLeft.textContent = attempts;
startTimer();

submitBtn.addEventListener("click", function () {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess)) {
    feedback.textContent = "Please enter a valid number!";
    return;
  }

  attempts--;

  if (userGuess === randomNumber) {
    feedback.textContent = `🎉 Correct! The number was ${randomNumber}.`;
    launchConfetti(); // 👈 Add this line
    endGame();
  }
   else if (attempts > 0) {
    feedback.textContent = userGuess < randomNumber ? "Too low!" : "Too high!";
    attemptsLeft.textContent = attempts;
  } else {
    feedback.textContent = `❌ Game over! The number was ${randomNumber}.`;
    attemptsLeft.textContent = 0;
    endGame();
  }
});

hintBtn.addEventListener("click", function () {
  const evenOdd = randomNumber % 2 === 0 ? "even" : "odd";
  const lowerBound = Math.max(1, randomNumber - 5);
  const upperBound = Math.min(50, randomNumber + 5);
  hintText.textContent = `Hint: The number is ${evenOdd} and between ${lowerBound} and ${upperBound}.`;
});

restartBtn.addEventListener("click", function () {
  randomNumber = Math.floor(Math.random() * 50) + 1;
  attempts = 5;
  timeLeft = 30;

  feedback.textContent = "";
  hintText.textContent = "";
  attemptsLeft.textContent = attempts;
  timerDisplay.textContent = timeLeft;
  guessInput.value = "";

  guessInput.disabled = false;
  submitBtn.disabled = false;
  hintBtn.disabled = false;
  restartBtn.style.display = "none";

  clearInterval(timerInterval);
  startTimer();
});

function endGame() {
  guessInput.disabled = true;
  submitBtn.disabled = true;
  hintBtn.disabled = true;
  restartBtn.style.display = "inline-block";
  clearInterval(timerInterval);
}

function startTimer() {
  timerDisplay.textContent = timeLeft;
  timerInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedback.textContent = `⏰ Time's up! The number was ${randomNumber}.`;
      endGame();
    }
  }, 1000);
}



function launchConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  






 