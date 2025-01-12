window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d.%m.%Y (МСК)',
    hoverText: 'Московское время',
    interval: 200, /* How often the timer updates in milliseconds (1000=1 second) */
    location: 'header',
    offset: 180 /* Меняет Гринвич на Московское */
};
window.AjaxBlock = {
    expiryTimes: {
        '2 hours': '2 hours',
        '4 hours': '4 hours',
        '8 hours': '8 hours',
        '16 hours': '16 hours',
        '1 day': '1 day',
        '3 days': '3 days',
        '1 week': '1 week',
        '10 days': '10 days',
        '2 weeks': '2 weeks',
        '3 weeks': '3 weeks',
    }
};