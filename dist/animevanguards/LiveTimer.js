(function (module, mw, $, undefined) {
    'use strict';

    var countdowns = [];
    var ROUND_SECOND = 1;
    var i18n;

    function timeStringToSeconds(timeString) {
        var parts = timeString.split(':').map(Number);
        return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
    }

    function formatTime(seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        var secs = seconds % 60;
        return String(hours).padStart(2, '0') + ':' +
               String(minutes).padStart(2, '0') + ':' +
               String(secs).padStart(2, '0');
    }

    function getCurrentIteration(cycleDuration) {
        var now = Date.now();
        var currentIteration = Math.floor((now + 17000) / (cycleDuration * 1000));
        var startTime = currentIteration * cycleDuration * 1000;
        var endTime = startTime + cycleDuration * 1000;

        return {
            currentIteration: currentIteration,
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        };
    }

    function output(i, totalSeconds) {
        var result = formatTime(totalSeconds);
        countdowns[i].node.text(result);
    }

    function update() {
        $.each(countdowns, function (i, countdown) {
            var iterationInfo = getCurrentIteration(countdown.cycleDuration);
            countdown.totalSeconds = countdown.initialSeconds - Math.floor((Date.now() + 17000 - iterationInfo.startTime) / 1000);

            if (countdown.totalSeconds <= 0) {
                countdown.totalSeconds = countdown.initialSeconds; // Сброс
            }

            output(i, countdown.totalSeconds);

            // Вычисление процента
            var percentage = Math.max(0, (countdown.totalSeconds / countdown.initialSeconds) * 100);
            document.documentElement.style.setProperty('--percentage-' + countdown.id, percentage + '%');

            // Округление до ближайшей минуты
            if (countdown.opts & ROUND_SECOND && countdown.totalSeconds < 60) {
                countdown.totalSeconds = Math.round(countdown.totalSeconds / 60) * 60;
            }
        });

        if (countdowns.length) {
            window.setTimeout(update, 1000);
        }
    }

    function getOptions(node) {
        var text = node.parent().attr('data-options'), opts = 0;
        if (text && /round-second/.test(text)) {
            opts |= ROUND_SECOND;
        }
        return opts;
    }

    function init($content) {
        var countdown = $content.find('.countdown:not(.handled)');
        if (!countdown.length) return;

        countdown.each(function (index) {
            var $this = $(this);
            var timeString = $this.attr('data-time');
            var initialSeconds = timeStringToSeconds(timeString);
            var uniqueId = index; // Используем индекс как уникальный ID

            // Присваиваем ID элементу
            $this.attr('data-id', uniqueId);

            countdowns.push({
                node: $this.find('.livetimer'),
                opts: getOptions($this),
                initialSeconds: initialSeconds,
                totalSeconds: initialSeconds,
                cycleDuration: initialSeconds,
                id: uniqueId // Сохраняем уникальный ID
            });
        });

        countdown.addClass('handled');
        if (countdowns.length) {
            update();
        }
    }

    mw.hook('dev.i18n').add(function(p) {
        p.loadMessages('Countdown', {
            cacheVersion: 2
        }).then(function(p) {
            i18n = p;
            i18n.useUserLang();
            mw.hook('wikipage.content').add(function($content) {
                init($content);
            });
        });
    });

    importArticle({
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));