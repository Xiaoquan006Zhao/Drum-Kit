const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");
const millisecondElement = document.getElementById("millisecond");

const startTimerButton = document.querySelector("#start-timer");
const stopTimerButton = document.querySelector("#stop-timer");

import { bpm, playMetronme, isMetronome } from "./bpm.js";

let recordIntervalId;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let metronomeInterval = undefined;
let metronomeMiliseconds = 0;

export function startTimer() {
  stopTimer();
  recordIntervalId = setInterval(updateTimer, 10);

  if (isMetronome) {
    playMetronme();
    metronomeInterval = (60 / bpm) * 1000;
  }
}

export function stopTimer() {
  clearInterval(recordIntervalId);
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateDOM();
}

function updateTimer() {
  milliseconds += 10;
  metronomeMiliseconds += 10;

  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
        document.getElementById("hour").style.display = "inline";
      }
    }
  }

  if (isMetronome && metronomeMiliseconds >= metronomeInterval) {
    playMetronme();
    metronomeMiliseconds -= metronomeInterval;
  }

  updateDOM();
}

function updateDOM() {
  const hour = `${formatNumber(hours)}:`;
  const minute = `${formatNumber(minutes)}:`;
  const second = `${formatNumber(seconds)}:`;
  const millisecond = `${formatNumber(milliseconds / 10)}`;
  hourElement.textContent = hour;
  minuteElement.textContent = minute;
  secondElement.textContent = second;
  millisecondElement.textContent = millisecond;
}

export function formatNumber(num, digits = 2) {
  const str = num.toString();
  if (str.length === digits) {
    return str;
  } else if (str.length > digits) {
    return str.substring(0, digits);
  } else {
    const padding = "0".repeat(digits - str.length);
    return padding + str;
  }
}

startTimerButton.addEventListener("click", startTimer);

stopTimerButton.addEventListener("click", stopTimer);
