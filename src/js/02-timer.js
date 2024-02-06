import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/l10n/pl';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      Notiflix.Notify.failure('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
      return;
    }
    document.querySelector('[data-start]').disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const startButton = document.querySelector('[data-start]');
const endDateInput = document.getElementById('datetime-picker');

startButton.addEventListener('click', () => {
  const endDate = new Date(endDateInput.value);
  const daysSpan = document.querySelector('[data-days]');
  const hoursSpan = document.querySelector('[data-hours]');
  const minutesSpan = document.querySelector('[data-minutes]');
  const secondsSpan = document.querySelector('[data-seconds]');

  startButton.disabled = true;

  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = endDate - currentTime;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      return;
    }

    const timeParts = convertMs(remainingTime);
    daysSpan.textContent = addLeadingZero(timeParts.days);
    hoursSpan.textContent = addLeadingZero(timeParts.hours);
    minutesSpan.textContent = addLeadingZero(timeParts.minutes);
    secondsSpan.textContent = addLeadingZero(timeParts.seconds);
  }, 1000);
});

