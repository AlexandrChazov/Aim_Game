const screens = document.querySelectorAll(".screen");
const startButton = document.querySelector(".start");
const timeButtons = document.querySelector(".time-list");
const timeSpan = document.getElementById("time");
const board = document.querySelector(".board");
const colors = ["#f70a1a", "#f70ae0", "#900af7", "#1e0af7", "#0accf7", "#0af7a0", "#0af722", "#f8fc05", "#fc7d05"];

let time = 0;
let score = 0;

startButton.addEventListener("click", () => {
  screens[0].classList.add("up");
})

timeButtons.addEventListener("click", (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.attributes[1].nodeValue);
    startGame();
    const interval = setInterval(() => {
      setTime();
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, ((time+1)*1000));
    screens[1].classList.add("up");
  }
})

function setTime() {
  if (time === 0) {
    finishGame();
  }
  if (time < 10) {
    timeSpan.innerHTML = `00:0${time}`
  } else {
    timeSpan.innerHTML = `00:${time}`
  }
  time--;
}

function finishGame() {
  document.querySelector(".circle").remove();
  timeSpan.parentNode.classList.add("hide");
  const finishText = document.createElement("div");
  finishText.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
  board.append(finishText);
  score = 0;
  setTimeout(() => {
    for (const screen of screens) {
      screen.classList.remove("up")
    }
    finishText.remove();
    timeSpan.parentNode.classList.remove("hide");
    time = 0;
  }, 3000);
}

function startGame() {
  addCircle();
}

function setPosition(min, max) {
  return Math.round(Math.random()*(max-min)+min)
}

function addCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const diameter = setPosition(7,25);
  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  const {width, height} = board.getBoundingClientRect();
  const x = setPosition(0, width-diameter);
  const y = setPosition(0, height-diameter);
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  const randomIndex = Math.floor(Math.random() * colors.length);
  circle.style.background = colors[randomIndex];
  circle.addEventListener("click", () => {
    score++;
    circle.remove();
    addCircle()
  })
  board.append(circle);
}
