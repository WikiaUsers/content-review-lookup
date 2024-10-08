function getWeatherData() {
    return {
        'Заморозки': {
            style: 'frosty-style',
            image: 'https://static.wikia.nocookie.net/dayr/images/0/0e/%D0%9C%D0%BE%D1%80%D0%BE%D0%B7.png/revision/latest?cb=20201031163748&path-prefix=ru'
        },
        'Ясная зимняя погода': {
            style: 'clear_winter_weather',
            image: 'https://static.wikia.nocookie.net/dayr/images/b/bd/%D0%AF%D1%81%D0%BD%D0%BE.png/revision/latest/scale-to-width-down/50?cb=20180929035813&path-prefix=ru'
        }
    };
}

function generateCalendar() {
    var calendarContainer = document.getElementById('calendar-container');

    if (calendarContainer) {
        var monthsData = {
            'Январь': 31,
            'Февраль': 28,
            'Март': 31,
            'Апрель': 30,
            'Май': 31,
            'Июнь': 30,
            'Июль': 31,
            'Август': 31,
            'Сентябрь': 30,
            'Октябрь': 31,
            'Ноябрь': 30,
            'Декабрь': 31
        };

        var weatherData = {
            'Декабрь': [
                { start: 31, end: 31, type: 'Заморозки' }
            ],
            'Январь': [
                { start: 1, end: 6, type: 'Заморозки' },
                { start: 7, end: 13, type: 'Заморозки' },
                { start: 14, end: 20, type: 'Ясная зимняя погода' }
            ]
        };

        var weatherInfo = getWeatherData();

        var html = '';
        var tableCount = 0;

        for (var month in monthsData) {
            if (tableCount % 3 === 0) {
                html += '<div class="calendar-row">';
            }

            var daysInMonth = monthsData[month];

            html += '<table class="calendar-table">';
            html += '<tr><th colspan="7" style="text-align: center;">' + month + '</th></tr>';

            var day = 1;
            while (day <= daysInMonth) {
                html += '<tr>';

                for (var i = 0; i < 7; i++) {
                    var cellClass = '';
                    var imgHTML = '';

                    if (day <= daysInMonth) {
                        var weatherType = '';
                        var isWeatherApplied = false;

                        if (weatherData[month]) {
                            weatherData[month].forEach(function (weather) {
                                if (day >= weather.start && day <= weather.end) {
                                    weatherType = weather.type;
                                    cellClass = weatherInfo[weatherType].style;
                                    imgHTML = '<img src="' + weatherInfo[weatherType].image + '" class="weather-image" alt="Weather Image">';
                                    isWeatherApplied = true;
                                }
                            });
                        }

                        html += '<td class="' + cellClass + '" style="text-align: center; padding: 5px;">' + imgHTML + day + '</td>';
                        day++;
                    } else {
                        html += '<td></td>';
                    }
                }

                html += '</tr>';
            }

            html += '</table>';

            tableCount++;
            if (tableCount % 3 === 0) {
                html += '</div>';
            }
        }

        calendarContainer.innerHTML = html;
    }
}

generateCalendar();