let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
const display = document.getElementById("display");
const laps = document.getElementById("laps");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

function updateDisplay() {
  display.textContent = timeFormat(elapsedTime);
}

function timeFormat(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

// Start
startBtn.addEventListener("click", () => {
  if (timerInterval) return; // Prevent multiple intervals
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 75); // Efficient update rate
});

// Pause
pauseBtn.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

// Reset
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  updateDisplay();
  laps.innerHTML = "";
});

// Lap
lapBtn.addEventListener("click", () => {
  if (elapsedTime > 0) {
    const li = document.createElement("li");
    li.textContent = timeFormat(elapsedTime);
    laps.appendChild(li);
  }
});
