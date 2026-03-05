// https://4classic.fandom.com/wiki/Guilds/Castle_War

(function() {

    var valorianScore = 50.0;
    var derionScore = 50.0;

    var wrapper = document.querySelector('.castlewar-sb-wrapper');
    if (!wrapper) return;

    var buttons = wrapper.querySelectorAll('.cw-btn');
    var vBar = wrapper.querySelector('.cw-valorian-bar');
    var dBar = wrapper.querySelector('.cw-derion-bar');
    var vTxt = wrapper.querySelector('.cw-valorian');
    var dTxt = wrapper.querySelector('.cw-derion');
    var resetBtn = wrapper.querySelector('.cw-reset');

    var hv1 = wrapper.querySelector('.cw-holy-valorian1');
    var hv2 = wrapper.querySelector('.cw-holy-valorian2');
    var hd1 = wrapper.querySelector('.cw-holy-derion1');
    var hd2 = wrapper.querySelector('.cw-holy-derion2');

    var autoplay = true;
    var autoplayTimer = null;
    var autoplayIndex = 0;
    var interval = null;
    var ended = false;

    var autoplayScript = [{
            d: 5000,
            s: ['neutral', 'neutral', 'neutral', 'neutral'],
            h: ['Player 1', 'Player 2', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'neutral', 'neutral', 'derion'],
            h: ['-- not available --', 'Player 2', 'Player 3', '-- not available --']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'derion', 'derion'],
            h: ['-- not available --', '-- not available --', '-- not available --', '-- not available --']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'derion', 'derion'],
            h: ['Player 1', 'Player 2', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'neutral', 'derion'],
            h: ['Player 1', 'Player 2', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'valorian', 'derion'],
            h: ['Player 1', '-- not available --', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'neutral', 'derion'],
            h: ['Player 1', '-- not available --', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'derion', 'derion'],
            h: ['Player 1', '-- not available --', 'Player 3', '-- not available --']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'derion', 'derion'],
            h: ['Player 1', 'Player 2', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'neutral', 'derion', 'derion'],
            h: ['Player 1', 'Player 2', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'derion', 'derion', 'derion'],
            h: ['Player 1', 'Player 2', '-- not available --', 'Player 4']
        },
        {
            d: 3000,
            s: ['neutral', 'derion', 'derion', 'derion'],
            h: ['Player 1', 'Player 2', '-- not available --', 'Player 4']
        },
        {
            d: 3000,
            s: ['derion', 'derion', 'derion', 'derion'],
            h: ['Player 1', 'Player 2', '-- not available --', '-- not available --']
        },
        {
            d: 3000,
            s: ['neutral', 'neutral', 'derion', 'derion'],
            h: ['Player 1', 'Player 2', '-- not available --', '-- not available --']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'derion', 'derion'],
            h: ['-- not available --', '-- not available --', '-- not available --', '-- not available --']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'derion', 'derion'],
            h: ['Player 1', 'Player 2', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'neutral', 'neutral'],
            h: ['Player 1', 'Player 2', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'valorian', 'valorian'],
            h: ['-- not available --', '-- not available --', 'Player 3', 'Player 4']
        },
        {
            d: 3000,
            s: ['valorian', 'valorian', 'neutral', 'neutral'],
            h: ['-- not available --', '-- not available --', 'Player 3', 'Player 4']
        },
        {
            d: 5000,
            s: ['valorian', 'valorian', 'derion', 'derion'],
            h: ['-- not available --', '-- not available --', '-- not available --', '-- not available --']
        }
    ];

    function count() {
        return {
            v: wrapper.querySelectorAll('.cw-btn[data-side="valorian"]').length,
            d: wrapper.querySelectorAll('.cw-btn[data-side="derion"]').length
        };
    }

    function updateUI() {
        vBar.style.width = (192 * valorianScore / 100) + 'px';
        dBar.style.width = (192 * derionScore / 100) + 'px';
        vTxt.textContent = valorianScore.toFixed(1) + '%';
        dTxt.textContent = derionScore.toFixed(1) + '%';
    }

    function updateHolyManual() {
        var c = count();
        var diff = c.v - c.d;

        hv1.textContent = 'Player 1';
        hv2.textContent = 'Player 2';
        hd1.textContent = 'Player 3';
        hd2.textContent = 'Player 4';

        if (diff >= 2) {
            if (diff === 2) {
                hv2.textContent = '-- not available --';
            }
            if (diff >= 4) {
                hv1.textContent = '-- not available --';
                hv2.textContent = '-- not available --';
            }
        }

        if (diff <= -2) {
            if (diff === -2) {
                hd2.textContent = '-- not available --';
            }
            if (diff <= -4) {
                hd1.textContent = '-- not available --';
                hd2.textContent = '-- not available --';
            }
        }
    }

    function stopProcess() {
        clearInterval(interval);
        interval = null;
    }

    function startProcess() {
        stopProcess();
        interval = setInterval(tick, 1000);
    }

    function stopAutoplay() {
        autoplay = false;
        clearTimeout(autoplayTimer);
        autoplayTimer = null;
    }

    function endGame() {
        ended = true;
        stopProcess();
        stopAutoplay();

        buttons.forEach(function (b) {
            b.classList.add('inactive');
            b.style.pointerEvents = 'none';
        });
    }

    function tick() {
        if (ended) return;

        var c = count();
        var net = c.v - c.d;
        var step = net * 0.5;
        if (step === 0) return;

        valorianScore = Math.min(100, Math.max(0, valorianScore + step));
        derionScore = 100 - valorianScore;

        updateUI();

        if (valorianScore >= 100 || derionScore >= 100) {
            endGame();
        }
    }

    function setSide(btn, side) {
        btn.dataset.side = side;

        btn.classList.remove('neutral', 'valorian', 'derion');
        btn.classList.add(side);
    }

    function applyAutoplayState(step) {
        if (ended) return;

        buttons.forEach(function (b, i) {
            setSide(b, step.s[i]);
        });

        hv1.textContent = step.h[0];
        hv2.textContent = step.h[1];
        hd1.textContent = step.h[2];
        hd2.textContent = step.h[3];

        startProcess();
    }

    function autoplayStep() {
        if (!autoplay || ended) return;

        var step = autoplayScript[autoplayIndex];
        applyAutoplayState(step);

        autoplayTimer = setTimeout(function () {
            autoplayIndex = (autoplayIndex + 1) % autoplayScript.length;
            autoplayStep();
        }, step.d);
    }

    function handleClick(btn, isRight) {
        if (ended) return;
        if (btn.classList.contains('inactive')) return;

        stopAutoplay();

        var cur = btn.dataset.side || 'neutral';

        if (cur === 'neutral') {
            setSide(btn, isRight ? 'derion' : 'valorian');
            updateHolyManual();
        } else {
            setSide(btn, 'neutral');
            updateHolyManual();
        }

        startProcess();
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            handleClick(btn, false);
        });

        btn.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            handleClick(btn, true);
        });
    });

    function resetAll() {
        ended = false;

        stopProcess();
        stopAutoplay();

        valorianScore = 50.0;
        derionScore = 50.0;

        buttons.forEach(function (b) {
            b.classList.remove('inactive');
            b.style.pointerEvents = '';
            setSide(b, 'neutral');
        });

        autoplay = true;
        autoplayIndex = 0;
        updateHolyManual();
        updateUI();
        autoplayStep();
    }

    resetBtn.addEventListener('click', resetAll);

    resetAll();

})();