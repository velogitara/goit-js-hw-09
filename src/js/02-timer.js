// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      // Notiflix.Notify.failure('Please choose a date in the future');
      Notiflix.Report.warning('Wrong Date', 'Please choose a date in the future', 'OK');
      return;
    }
    Refs.startBtn.disabled = false;
    // console.log(selectedDates[0].getTime());
  },
};

flatpickr('#datetime-picker', options);

const Refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  secondsVal: document.querySelector('[data-seconds]'),
  minutesVal: document.querySelector('[data-minutes]'),
  hoursVal: document.querySelector('[data-hours]'),
  daysVal: document.querySelector('[data-days]'),
};

let chosenDate = null;
Refs.startBtn.disabled = true;
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init;
  }
  init() {
    const { days, hours, minutes, seconds } = this.convertMs(0);
    this.onTick({ days, hours, minutes, seconds });
  }
  start() {
    chosenDate = new Date(Refs.inputDate.value);

    if (this.isActive) {
      return;
    }
    const startTime = chosenDate.getTime();

    this.isActive = true;
    this.intervalId = setInterval(() => {
      if (Math.trunc(Date.now() / 1000) === Math.trunc(startTime / 1000)) {
        this.clearing();
      } else {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);
        this.onTick({ days, hours, minutes, seconds });
      }
    }, 1000);
  }
  stop() {
    this.clearing();
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  clearing() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const { days, hours, minutes, seconds } = this.convertMs(0);
    this.onTick({ days, hours, minutes, seconds });
  }
}

const timer = new Timer({
  onTick: updateClockFace,
});

Refs.startBtn.addEventListener('click', timer.start.bind(timer));
Refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateClockFace({ days, hours, minutes, seconds }) {
  Refs.secondsVal.textContent = `${seconds}`;
  Refs.minutesVal.textContent = `${minutes}`;
  Refs.hoursVal.textContent = `${hours}`;
  Refs.daysVal.textContent = `${days}`;
}
