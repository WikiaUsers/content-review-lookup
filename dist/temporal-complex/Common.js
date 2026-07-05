/* Relógio da Temporal Complex Wiki */
(function () {
    'use strict';

    var CLOCK_ID = 'tc-brasilia-clock';

    var formatter = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    function getClockText() {
        var values = {};

        formatter.formatToParts(new Date()).forEach(function (part) {
            if (part.type !== 'literal') {
                values[part.type] = part.value;
            }
        });

        return values.hour + ':' +
            values.minute + ':' +
            values.second + ' — ' +
            values.day + '/' +
            values.month + '/' +
            values.year +
            ' (Horário de Brasília)';
    }

    function updateClock() {
        var header = document.querySelector(
            '.fandom-community-header__top-container'
        );

        if (!header) {
            return;
        }

        var tools = header.querySelector('.wiki-tools');
        var clock = document.getElementById(CLOCK_ID);

        if (!clock) {
            clock = document.createElement('span');
            clock.id = CLOCK_ID;
            clock.className = 'tc-community-clock';
            clock.title = 'Horário de Brasília';
            clock.appendChild(document.createTextNode(''));
        }

        if (tools && clock.nextElementSibling !== tools) {
            header.insertBefore(clock, tools);
        } else if (!tools && clock.parentNode !== header) {
            header.appendChild(clock);
        }

        clock.firstChild.nodeValue = getClockText();
    }

    function startClock() {
        updateClock();

        window.setInterval(updateClock, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startClock);
    } else {
        startClock();
    }
})();