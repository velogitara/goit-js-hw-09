import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

const Refs = {
  delayRef: document.querySelector('input[name="delay"]'),
  stepRef: document.querySelector('input[name="step"]'),
  amountRef: document.querySelector('input[name="amount"]'),
  formRef: document.querySelector('.form'),
  submitBtn: document.querySelector('#submitBtn-js'),
};

Refs.formRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  Refs.submitBtn.disabled = true;

  let promiseCounter = 1;
  let delay = Number(Refs.delayRef.value);
  let amount = Number(Refs.amountRef.value);
  let step = +Refs.stepRef.value;

  if (delay < 0 || step < 0) {
    Notiflix.Report.warning('Sorry', 'Выберите положительные значения', 'OK');
  } else if (amount <= 0) {
    Notiflix.Report.failure('Sorry', 'Значение "Amount" не может быть пустым или равно 0', 'OK');
  } else {
    setTimeout(() => {
      const intervalForPromises = setInterval(() => {
        if (Number(amount) < Number(promiseCounter)) {
          clearInterval(intervalForPromises);
          console.log('we are done here');
          return;
        }

        createPromise(promiseCounter, delay)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          });
        delay += step;

        promiseCounter += 1;
      }, step);
      Refs.submitBtn.disabled = false;
    }, delay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}

///============================================================================

// function onSubmit(event) {
//   event.preventDefault();

//   // let promiseCounter = 1;
//   let delay = Number(Refs.delayRef.value);
//   let amount = Number(Refs.amountRef.value);
//   let step = Number(Refs.stepRef.value);

//   if (delay < 0 || amount <= 0 || step < 0) {
//     Notiflix.Report.warning('Sorry', 'Выберите положительные значения', 'OK');
//   }

//   for (let i = 1; i <= amount; i += 1) {
//     createPromise(i, delay)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     delay += step;
//   }

//   function createPromise(position, delay) {
//     const shouldResolve = Math.random() > 0.3;
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (shouldResolve) {
//           resolve({ position, delay });
//         } else {
//           reject({ position, delay });
//         }
//       }, delay);
//     });
//   }
// }
