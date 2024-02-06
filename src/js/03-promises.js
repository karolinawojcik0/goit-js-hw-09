import Notiflix from 'notiflix';

const firstDelay = document.querySelector('[name=delay]');
const delayStep = document.querySelector('[name=step]');
const amountInput = document.querySelector('[name="amount"]');
const button = document.querySelector('[type="submit"]');
const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const amount = Number(amountInput.value);
  const startDelay = Number(firstDelay.value);
  const step = Number(delayStep.value);

  for (let i = 1; i <= amount; i++) {
    const currentDelay = startDelay + (i - 1) * step;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${i} in ${currentDelay}ms`
        );
        console.log(`✅ Fulfilled promise ${i} in ${currentDelay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${i} in ${currentDelay}ms`
        );
        console.log(`❌ Rejected promise ${i} in ${currentDelay}ms`);
      });
  }
  amountInput.value = null;
  firstDelay.value = null;
  delayStep.value = null;
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}