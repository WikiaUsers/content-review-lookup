/*
 * @name:           UserAccountAge
 * @description:    Displays selected account's age in the Oasis user page masthead
 * @author:         Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @attribution:    Using code by PleaseStand <https://en.wikipedia.org/wiki/User:PleaseStand>
 */

(function() {
    if($('#UserProfileMasthead').length === 0) {
        return;
    }

    var mwVariables = mw.config.get([
        'wgUserLanguage',
        'wgScriptPath'
    ]),
    i18n = {
        en: { //English
            hour: 'hour',
            hours: 'hours',
            day: 'day',
            days: 'days',
            week: 'week',
            weeks: 'weeks',
            month: 'month',
            months: 'months',
            year: 'year',
            years: 'years'
        },
        be: { //Belarusian
            hour: 'гадзіна',
            hours: 'гадзіны',
            hours2: 'гадзінаў',
            day: 'дзень',
            days: 'дзён',
            week: 'тыдзень',
            weeks: 'тыдняў',
            month: 'месяц',
            months: 'месяца',
            months2: 'месяцаў',
            year: 'год',
            years: 'гады',
            years2: 'гадоў'
        },
        de: { //German
            hour: 'Stunde',
            hours: 'Stunden',
            day: 'Tag',
            days: 'Tage',
            week: 'Woche',
            weeks: 'Wochen',
            month: 'Monat',
            months: 'Monate',
            year: 'Jahr',
            years: 'Jahre'
        },
        es: { //Spanish
            hour: 'hora',
            hours: 'horas',
            day: 'día',
            days: 'días',
            week: 'semana',
            weeks: 'semanas',
            month: 'mes',
            months: 'meses',
            year: 'año',
            years: 'años'
        },
        fr: { //French
            hour: 'heure',
            hours: 'heures',
            day: 'jour',
            days: 'jours',
            week: 'semaine',
            weeks: 'semaines',
            month: 'mois',
            months: 'mois',
            year: 'an',
            years: 'ans'
        },
        it: { //Italian
            hour: 'ora',
            hours: 'ore',
            day: 'giorno',
            days: 'giorni',
            week: 'settimana',
            weeks: 'settimane',
            month: 'mese',
            months: 'mesi',
            year: 'anno',
            years: 'anni'
        },
        pl: { //Polish
            hour: 'godzina', //1 hour
            hours: 'godziny', //2-4 hours
            hours2: 'godzin', //All the rest
            day: 'dzień', //1 day
            days: 'dni', //multiple
            week: 'tydzień', //1 week
            weeks: 'tygodnie', //2-4 weeks
            month: 'miesiąc', //1 month
            months: 'miesiące', //2-4 months
            months2: 'miesięcy', //5-11 months
            year: 'rok', //1 year
            years: 'lata', //2-4 years
            years2: 'lat' //5-21 years
        },
        ru: { //Russian
            hour: 'час',
            hours: 'часа',
            hours2: 'часов',
            day: 'день',
            days: 'дней',
            week: 'неделя',
            weeks: 'недель',
            month: 'месяц',
            months: 'месяца',
            months2: 'месяцев',
            year: 'год',
            years: 'года',
            years2: 'лет'
        },
        tr: { // Turkish
            hour: 'saat',
            hours: 'saat',
            day: 'gün',
            days: 'gün',
            week: 'hafta',
            weeks: 'hafta',
            month: 'ay',
            months: 'ay',
            year: 'yıl',
            years: 'yıl'
        },
        uk: { //Ukrainian
            hour: 'година',
            hours: 'години',
            hours2: 'годин',
            day: 'день',
            days: 'днів',
            week: 'тиждень',
            weeks: 'тижнів',
            month: 'місяць',
            months: 'місяці',
            months2: 'місяців',
            year: 'рік',
            years: 'роки',
            years2: 'років'
        },
        'zh-hans': { //Chinese-hans
            hour: '小时',
            hours: '小时',
            day: '天',
            days: '天',
            week: '周',
            weeks: '周',
            month: '个月',
            months: '个月',
            year: '年',
            years: '年'
        },
        'zh-hant': { //Chinese-hant
            hour: '小時',
            hours: '小時',
            day: '天',
            days: '天',
            week: '週',
            weeks: '週',
            month: '個月',
            months: '個月',
            year: '年',
            years: '年'
        },
        
            'pt': { //Portuguese
            hour: 'hora',
            hours: 'horas',
            day: 'dia',
            days: 'dias',
            week: 'semana',
            weeks: 'semanas',
            month: 'mês',
            months: 'meses',
            year: 'ano',
            years: 'anos'
        },
            'pt-br': { //Brazilian Portuguese
            hour: 'hora',
            hours: 'horas',
            day: 'dia',
            days: 'dias',
            week: 'semana',
            weeks: 'semanas',
            month: 'mês',
            months: 'meses',
            year: 'ano',
            years: 'anos'
        }
    },
    lang = i18n[mwVariables.wgUserLanguage] || i18n[mwVariables.wgUserLanguage.split('-')[0]] || i18n.en,
    selectedUser = $('.UserProfileMasthead .masthead-info h1').text();

    function getData(user, callback) {
        $.getJSON(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'users|usercontribs',
            usprop: 'registration',
            ususers: user,
            uclimit: 1,
            ucprop: 'timestamp',
            ucuser: user,
            format: 'json'
        }).done(function(d) {
            if(!d.error) {
                callback(d);
            }
        });
    }

    function processData(data) {
        var results = data.query,
            username = results.users[0].name,
            user, registration, missing, invalid;

        // API tends to have no data on hand for users who created accounts 2006 and earlier
        try {
            user = results.users[0];
            invalid = typeof user.invalid !== "undefined";
            missing = typeof user.missing !== "undefined";
            registration = (typeof user.registration === "string") ? new Date(user.registration) : null;
        } catch(e) {
            return;
        }

        // Provides a link to the API JSON that shows the date of creation
        if (registration) {
            var statusText = 
                '<a style="color:inherit;" href="' + 
                    mwVariables.wgScriptPath +
                    '/api.php?format=jsonfm&action=query&list=users&usprop=registration&ususers=' +
                    mw.util.wikiUrlencode(username) + 
                '">' + 
                    convertDate(registration) + 
                '</a>';

            //Stole the user tag append idea from Cube <https://dev.wikia.com/wiki/User:KockaAdmiralac>
            if (window.UAAeditcount === true) {
                //with help from doru
                $('.tally a span').first().append('(' + statusText + ')');
            } else {
                $('.masthead-info hgroup').append(' <span class="tag">' + statusText + '</span>');
            }
        }
    }

    // From UserInfo <https://en.wikipedia.org/wiki/User:PleaseStand/userinfo.js>
    function convertDate(cd) {
        var age = new Date().getTime() - cd.getTime(),
            ageNumber, ageRemainder, ageWords;
 
        if (age < 3600000) {
            ageWords = '< 1 ' + lang.hour;
        } else if (age < 86400000) {
            ageNumber = Math.floor(age / 3600000);
            ageWords = formatDate(ageNumber, lang.hour, lang.hours, lang.hours2);
            ageRemainder = Math.floor((age - ageNumber * 3600000) / 60000);
        } else if (age < 604800000) {
            ageNumber = Math.floor(age / 86400000);
            ageWords = formatDate(ageNumber, lang.day, lang.days);
        } else if (age < 2592000000) {
            ageNumber = Math.floor(age / 604800000);
            ageWords = formatDate(ageNumber, lang.week, lang.weeks);
        } else if (age < 31536000000) {
            ageNumber = Math.floor(age / 2592000000);
            ageWords = formatDate(ageNumber, lang.month, lang.months, lang.months2);
        } else {
            ageNumber = Math.floor(age / 31536000000);
            ageWords = formatDate(ageNumber, lang.year, lang.years, lang.years2);
            ageRemainder = Math.floor((age - ageNumber * 31536000000) / 2592000000);
            if (ageRemainder) {
                ageWords += " " + formatDate(ageRemainder, lang.month, lang.months, lang.months2);
            }
        }
        return ageWords;
    }

    function formatDate(q, s, p, p2) {
        var w = String(q).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,"),
            l = ['be', 'pl', 'ru', 'uk'];

        if($.inArray(mwVariables.wgUserLanguage, l) !== -1 && q >= 5) {
            return w + " " + (p2);
        } else {
            return w + " " + (q === 1 ? s : p);
        }
    }

    //Do the thing
    getData(selectedUser, processData);
})();