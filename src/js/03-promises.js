import Notiflix from 'notiflix';

const Refs = {
  delayRef: document.querySelector('input[name="delay"]'),
  stepRef: document.querySelector('input[name="step"]'),
  amountRef: document.querySelector('input[name="amount"]'),
  formRef: document.querySelector('.form'),
};

Refs.formRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  let promiseCounter = 1;
  let delay = Refs.delayRef.value;
  let amount = Refs.amountRef.value;
  let step = Refs.stepRef.value;
  let delayStep = Number(delay);

  const intervalForPromises = setInterval(() => {
    if (Number(amount) < Number(promiseCounter)) {
      clearInterval(intervalForPromises);
      console.log('we are done here');
      return;
    }

    createPromise(promiseCounter, delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayStep += Number(step);

    promiseCounter += 1;
  }, delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}

// createPromise(2, 1500)
// .then(({ position, delay }) => {
//   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
// })
// .catch(({ position, delay }) => {
//   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
// });
