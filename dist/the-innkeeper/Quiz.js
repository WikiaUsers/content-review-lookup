(function () {
  'use strict';

  var REPO = 'sparklucifer/Innkeeper';

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickRandom(arr, n) {
    return shuffle(arr).slice(0, Math.min(n, arr.length));
  }

  function buildQuestions(rawQuestions) {
    return pickRandom(rawQuestions, 5).map(function (q) {
      var correct = q[1];
      var opts = shuffle([q[1], q[2], q[3], q[4]]);
      return { text: q[0], correct: correct, options: opts };
    });
  }

  function getResultText(score, total, labels) {
    if (!labels || labels.length === 0) return '';
    var pct = score / total;
    if (pct >= 0.75) return labels[labels.length - 1];
    if (pct >= 0.4)  return labels[Math.floor(labels.length / 2)];
    return labels[0];
  }

  function renderQuiz(root) {
    var quizId   = root.getAttribute('data-quiz');
    var quizName = root.getAttribute('data-name') || quizId || 'Quiz';

    if (!quizId) {
      console.error('[InnkeeperQuiz] Missing data-quiz attribute.');
      root.innerHTML = '<div class="iq-error">Quiz not configured (missing data-quiz).</div>';
      return;
    }

    var API_URL = 'https://api.github.com/repos/' + REPO + '/contents/'
                + encodeURIComponent(quizId) + '.json';

    var state = {
      quizData:  null,
      questions: [],
      current:   0,
      score:     0,
      answered:  [],
      phase:     'loading'
    };

    function draw() {
      var h = '<div class="iq-wrap">';
      h += '<div class="iq-title">' + quizName + '</div>';
      h += '<div class="iq-subtitle">Five questions from the vault</div>';

      if (state.phase === 'loading') {
        h += '<div class="iq-loading">Consulting the archives\u2026</div>';

      } else if (state.phase === 'error') {
        h += '<div class="iq-error">Could not load quiz data.</div>';

      } else if (state.phase === 'quiz') {
        var q   = state.questions[state.current];
        var pct = (state.current / state.questions.length * 100).toFixed(0);

        h += '<div class="iq-progress">Question ' + (state.current + 1) +
             ' of ' + state.questions.length + '</div>';
        h += '<div class="iq-progress-bar-bg"><div class="iq-progress-bar" style="width:' +
             pct + '%"></div></div>';
        h += '<div class="iq-card">';
        h += '<div class="iq-q-num">Q' + (state.current + 1) + '</div>';
        h += '<div class="iq-q-text">' + q.text + '</div>';
        h += '<ul class="iq-options">';

        q.options.forEach(function (opt, idx) {
          var cls = 'iq-opt-btn';
          var dis = '';
          if (state.answered[state.current] !== undefined) {
            dis = ' disabled';
            if (opt === q.correct) {
              cls += ' correct';
            } else if (opt === state.answered[state.current]) {
              cls += ' wrong';
            }
          }
          h += '<li><button class="' + cls + '"' + dis +
               ' data-idx="' + idx + '">' + opt + '</button></li>';
        });

        h += '</ul></div>';

        if (state.answered[state.current] !== undefined) {
          if (state.current < state.questions.length - 1) {
            h += '<div class="iq-nav"><button class="iq-restart-btn" id="iq-next">Next \u2192</button></div>';
          } else {
            h += '<div class="iq-nav"><button class="iq-restart-btn" id="iq-finish">See Results</button></div>';
          }
        }

      } else if (state.phase === 'result') {
        var label = getResultText(
          state.score, state.questions.length,
          state.quizData ? state.quizData.resultsTextArray : []
        );
        h += '<div class="iq-result">';
        h += '<div class="iq-result-score">' + state.score + ' / ' + state.questions.length + '</div>';
        if (label) h += '<div class="iq-result-label">' + label + '</div>';
        h += '<button class="iq-restart-btn" id="iq-restart">Try Again</button>';
        h += '</div>';
      }

      h += '</div>';
      root.innerHTML = h;
      attachEvents();
    }

    function attachEvents() {
      root.querySelectorAll('.iq-opt-btn:not([disabled])').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idx    = parseInt(btn.getAttribute('data-idx'), 10);
          var chosen = state.questions[state.current].options[idx];
          state.answered[state.current] = chosen;
          if (chosen === state.questions[state.current].correct) state.score++;
          draw();
        });
      });

      var next = root.querySelector('#iq-next');
      if (next) next.addEventListener('click', function () { state.current++; draw(); });

      var finish = root.querySelector('#iq-finish');
      if (finish) finish.addEventListener('click', function () { state.phase = 'result'; draw(); });

      var restart = root.querySelector('#iq-restart');
      if (restart) restart.addEventListener('click', function () { loadAndStart(); });
    }

    function loadAndStart() {
      state.quizData  = null;
      state.questions = [];
      state.current   = 0;
      state.score     = 0;
      state.answered  = [];
      state.phase     = 'loading';
      draw();

      fetch(API_URL, {
        headers: { 'Accept': 'application/vnd.github.raw+json' }
      })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (data) {
          state.quizData  = data;
          state.questions = buildQuestions(data.questions);
          state.phase     = 'quiz';
          draw();
        })
        .catch(function (err) {
          console.error('[InnkeeperQuiz] Failed to load ' + quizId + ':', err);
          state.phase = 'error';
          draw();
        });
    }

    loadAndStart();
  }

  function init() {
    document.querySelectorAll('.innkeeper-quiz').forEach(function (el) {
      renderQuiz(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());