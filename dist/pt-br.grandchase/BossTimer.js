$(function () {
    var timer = document.querySelector('.boss-timer');
    if (timer === null && timer === undefined) return;

    function closestHigher(number, candidates) {
        var bestCandidate = Infinity;
        var higherCandidates = candidates.filter(function (candidate) { return candidate > number });
        higherCandidates.forEach(function (candidate) {
            if (candidate < bestCandidate) bestCandidate = candidate;
        });
        return bestCandidate;
    }

    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }

    Date.prototype.addMinutes = function (m) {
        this.setTime(this.getTime() + (m * 60 * 1000));
        return this;
    }

    Date.prototype.addTime = function (ms) {
        this.setTime(this.getTime() + ms);
        return this;
    }

    var getTimezoneOffset = (timeZone, date = new Date()) => {
        var tz = date.toLocaleString("en", { timeZone, timeStyle: "long" }).split(" ").slice(-1)[0];
        var dateString = date.toString();
        var offset = Date.parse(`${dateString} UTC`) - Date.parse(`${dateString} ${tz}`);
        return offset;
    }

    var data = {
        grotto: {
            localization: '#dungeon1-localization',
            href: '/pt-br/wiki/Fornalha_Infernal',
            img: '/pt-br/wiki/Arquivo:Fornalha_Infernal_icon.png'
        },
        plegas: {
            localization: '#dungeon2-localization',
            href: '/pt-br/wiki/Torre_das_Ilusões',
            img: '/pt-br/wiki/Arquivo:Torre_das_Ilusões_newicon.png'
        }
    }

    function msToTime(s) {

        s = parseInt(s);

        // Pad to 2 or 3 digits, default is 2
        function pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
    }

    var breakdown_hours = [];
    var i = 0;
    while (i < 24) {
        if (i % 2 > 0) breakdown_hours.push(i)
        i++
    }

    var grotto_hours = [];
    var i = 1;
    while (i < 24) {
        grotto_hours.push(i);
        i += i % 2 === 0 ? 3 : 1;
    }
    var is_grotto = [];
    var is_plegas = [];

    var status = {
        NA: {
            grotto: true,
            plegas: true
        },
        EU: {
            grotto: true,
            plegas: true
        }
    }

    function start_timer(server, UTC_offset) {
        UTC_offset = getTimezoneOffset(UTC_offset);

        var date1;
        var date2 = new Date();
        date2.addMinutes(date2.getTimezoneOffset());
        date2.addTime(UTC_offset);
        var hourNow;

        function updateDungeon() {
            date1 = new Date();
            date1.addMinutes(date1.getTimezoneOffset());
            date1.addTime(UTC_offset);
            hourNow = date1.getHours();
            var current = [];
            if (grotto_hours.includes(hourNow) && status[server].plegas) {
                status[server].grotto = true;
                status[server].plegas = false;
                current[server] = 'grotto';
            } else if (!grotto_hours.includes(hourNow) && status[server].grotto) {
                status[server].grotto = false;
                status[server].plegas = true;
                current[server] = 'plegas';
            }
            var timer_img = $('.boss-timer-' + server + ' .boss-timer-image img');
            timer_img.attr('srcset', data[current[server]].img).attr('src', data[current[server]].img);
            $('.boss-timer-' + server + ' .boss-timer-image a').attr('href', data[current[server]].href);
            $('.boss-timer-' + server + ' .boss-timer-text').text($(data[current[server]].localization).text());
        }
        updateDungeon();

        var closestBreakdown = closestHigher(hourNow, breakdown_hours);
        if (hourNow == 23) {
            date2.addHours(2);
        } else {
            date2.addHours(closestBreakdown - hourNow);
        }
        date2.setMinutes(0);
        date2.setSeconds(0);

        var diffTime = Math.abs(date2 - date1);
        function updateTime() {
            $('.boss-timer-' + server + ' .boss-timer-countdown').text(msToTime(diffTime));
        }
        updateTime();

        var timer_server = document.querySelector('.boss-timer-' + server);
        if (timer_server === undefined && timer_server === null) return;
        setInterval(function () {
            diffTime = diffTime - 1000;
            if (diffTime < 0) {
                diffTime = 7200000
                updateDungeon();
            }
            updateTime();
        }, 1000);
    }

    start_timer('NA', 'US/Pacific');
    start_timer('EU', 'CET');

    $('.boss-timer img').css('display', 'inline-block');

    function isApple() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac"))
    }

    if (isApple()) $('.boss-timer').hide();

});