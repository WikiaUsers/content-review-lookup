(function () {

  var PHASES = [
    {
      name: 'Day',
      dur: 450,
      color: '#ffe100',
      icon: 'https://static.wikia.nocookie.net/growagarden27847/images/e/e3/DayWeather.png/revision/latest?cb=20260613153119'
    },
    {
      name: 'Sunset',
      dur: 30,
      color: '#ffe45a',
      icon: 'https://static.wikia.nocookie.net/growagarden27847/images/0/0c/SunsetWeather.png/revision/latest?cb=20260613153119'
    },
    {
      name: 'Night',
      dur: 120,
      color: '#1e4794',
      icon: 'https://static.wikia.nocookie.net/growagarden27847/images/a/ae/NightWeather.png/revision/latest?cb=20260613153118'
    }
  ];

  var CYCLE_TOTAL = PHASES.reduce(function (a, p) {
    return a + p.dur;
  }, 0);

  function getState() {
    var now = new Date();
    var nowSec =
      now.getHours() * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds();

    var pos = nowSec % CYCLE_TOTAL;

    for (var i = 0; i < PHASES.length; i++) {
      if (pos < PHASES[i].dur) {
        return {
          phase: PHASES[i],
          elapsed: Math.round(pos)
        };
      }
      pos -= PHASES[i].dur;
    }

    return {
      phase: PHASES[0],
      elapsed: 0
    };
  }

  function fmtTime(sec) {
    sec = Math.round(sec);

    if (sec >= 60) {
      return Math.floor(sec / 60) + 'm ' +
             String(sec % 60).padStart(2, '0') + 's';
    }

    return sec + 's';
  }

  function renderBar(wrapper) {
    var fill = wrapper.querySelector('.dn-bar-fill');
    var label = wrapper.querySelector('.dn-bar-label');
    var icon = wrapper.querySelector('.dn-bar-icon');

    if (!fill || !label || !icon) return;

    var state = getState();
    var phase = state.phase;
    var elapsed = state.elapsed;
    var remaining = phase.dur - elapsed;
    var pct = Math.min(1, elapsed / phase.dur);

    fill.style.width = (pct * 100) + '%';
    fill.style.backgroundColor = phase.color;
    label.textContent = fmtTime(remaining);

    var trackWidth = (wrapper.offsetWidth || 300) - 80;
    icon.style.left = (pct * trackWidth) + 'px';

    var currentImg = icon.querySelector('img');
    if (!currentImg || currentImg.src !== phase.icon) {
      icon.innerHTML =
        '<img src="' + phase.icon + '" alt="' + phase.name + '">';
    }
  }

  function initBars() {
    var wrappers = document.querySelectorAll('.dn-bar-wrap[data-dn]');
    if (!wrappers.length) return;

    wrappers.forEach(function (wrapper) {
      renderBar(wrapper);
    });

    var delay = 1000 - (Date.now() % 1000);

    setTimeout(function () {
      wrappers.forEach(function (wrapper) {
        renderBar(wrapper);
      });

      setInterval(function () {
        wrappers.forEach(function (wrapper) {
          renderBar(wrapper);
        });
      }, 1000);
    }, delay);
  }

 if (typeof mw !== 'undefined' && mw.hook) {
  mw.hook('wikipage.content').add(initBars);
} else {
  document.addEventListener('DOMContentLoaded', initBars);
}

}());