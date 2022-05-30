function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyStyleRef = document.body.style;
refs.startBtn.disabled = true;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;
let timerStartBtnId = null;

const ColorSwitchOnClick = () => {
  bodyStyleRef.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    const bodyStyle = (bodyStyleRef.backgroundColor = getRandomHexColor());
  }, 1000);
  // timerStartBtnId = setInterval(() => {
  //   refs.startBtn.style.backgroundColor = getRandomHexColor();
  // }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
};

refs.startBtn.addEventListener('click', ColorSwitchOnClick);

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  bodyStyleRef.backgroundColor = 'transparent';
});
