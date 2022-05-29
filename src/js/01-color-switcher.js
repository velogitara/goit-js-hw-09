function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyStyleRef = document.body.style;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;

const ColorSwitchOnClick = () => {
  timerId = setInterval(() => {
    const bodyStyle = (bodyStyleRef.backgroundColor = getRandomHexColor());
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
};

refs.startBtn.addEventListener('click', ColorSwitchOnClick);

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
});
