const screens = document.querySelectorAll(".screen");
const startButton = document.querySelector(".start");
const timeButtons = document.querySelector(".time-list");
const timeSpan = document.getElementById("time");
const board = document.querySelector(".board");
const colors = ["#000000", "#ffffff", "#f70a1a", "#f70ae0", "#900af7", "#1e0af7", "#0accf7", "#0af7a0", "#0af722", "#f8fc05", "#fc7d05"];

let time = 0;
let score = 0;

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
})

timeButtons.addEventListener("click", (event) => {
  if (event.target.classList.contains('time-btn')) {
    startGame(event);
    screens[1].classList.add("up");
  }
})

function startGame(event) {
  time = parseInt(event.target.attributes[1].nodeValue);
    const interval = setInterval(() => {
      setTime();
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, ((time+1)*1000));
  addCircle();
}

function addCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const diameter = getRandomNumber(7,25);
  circle.style.width = circle.style.height = `${diameter}px`;
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width-diameter);
  const y = getRandomNumber(0, height-diameter);
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  const randomIndex = Math.floor(Math.random() * colors.length);
  const color = colors[randomIndex];
  circle.style.background = color;
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
  circle.addEventListener("click", () => {
    score++;
    circle.remove();
    addCircle()
  })
  board.append(circle);
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

function getRandomNumber(min, max) {
  return Math.round(Math.random()*(max-min)+min)
}

function setTime() {
  time === 0 && finishGame();
  time < 10
    ? timeSpan.innerHTML = `00:0${time}`
    : timeSpan.innerHTML = `00:${time}`;
  time--;
}
