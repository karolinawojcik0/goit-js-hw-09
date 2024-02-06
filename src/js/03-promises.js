import Notiflix from 'notiflix';

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }

  document.getElementById('createPromisesForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const firstDelay = parseInt(formData.get('delay'));
    const step = parseInt(formData.get('step'));
    const amount = parseInt(formData.get('amount'));

    for (let i = 0; i < amount; i++) {
      const currentDelay = firstDelay + i * step;

      createPromise(i + 1, currentDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });