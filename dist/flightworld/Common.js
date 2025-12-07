/* Any JavaScript here will be loaded for all users on every page load. */

// Countdown timer gadget
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime() - now.getTime()) / 1000);

  if (isNaN(diff)) {
    timers[i].firstChild.nodeValue = '** Invalid Date **';
    return;
  }

  var left = '';
  var days = Math.floor(diff / (60 * 60 * 24));
  diff -= days * 60 * 60 * 24;
  var hours = Math.floor(diff / (60 * 60));
  diff -= hours * 60 * 60;
  var minutes = Math.floor(diff / 60);
  var seconds = diff - minutes * 60;

  if (days) left += days + ' Days ';
  if (hours) left += hours + ' Hrs ';
  if (minutes) left += minutes + ' Mins ';
  left += seconds + ' Secs';

  timers[i].firstChild.nodeValue = left;
  setTimeout(function() { updatetimer(i); }, 1000);
}

function checktimers() {
  timers = document.getElementsByClassName('countdowndate');
  for (let i = 0; i < timers.length; i++) {
    timers[i].eventdate = new Date(timers[i].textContent);
    updatetimer(i);
  }

  let countdowns = document.getElementsByClassName('countdown');
  for (let i = 0; i < countdowns.length; i++) {
    countdowns[i].style.display = 'inline';
  }

  let nocountdowns = document.getElementsByClassName('nocountdown');
  for (let i = 0; i < nocountdowns.length; i++) {
    nocountdowns[i].style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', checktimers);