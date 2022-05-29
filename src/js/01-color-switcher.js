import BSN from 'bootstrap.native';

const modal = new BSN.Modal('#subscriptionModal');
console.log(modal);
modal.show();

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
console.log(refs.startBtn);
console.log(refs.stopBtn);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// const PROMPT_DELAY = 1000;
// const MAX_PROMPT_ATTEMPTS = 3;

// let promptCounter = 0;
// console.log(promptCounter);

// const naughtyInterval = setInterval(() => {
//   if (promptCounter === MAX_PROMPT_ATTEMPTS) {
//     console.log('остановили интервал');
//     clearInterval(naughtyInterval);
//     return;
//   }

//   console.log('Subscribe please - ' + Date.now());
//   promptCounter += 1;
//   console.log(promptCounter);
// }, PROMPT_DELAY);
