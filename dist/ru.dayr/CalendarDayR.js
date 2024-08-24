document.addEventListener('DOMContentLoaded', function() {
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

        var weatherData = [
            { start: '31', end: '31', weather: 'frosty-style', month: 'Декабрь' },
            { start: '1', end: '6', weather: 'frosty-style', month: 'Январь' }
        ];

        function applyWeatherStyles(table, weatherData) {
            var days = table.querySelectorAll('td');
            weatherData.forEach(function(range) {
                var start = parseInt(range.start) - 1;
                var end = parseInt(range.end) - 1;

                for (var i = start; i <= end; i++) {
                    var cell = days[i];
                    if (cell) {
                        cell.classList.add(range.weather);
                        var img = document.createElement('img');
                        img.src = 'Файл:Мороз.png'; 
                        img.style.width = '5px';
                        cell.appendChild(img);
                    }
                }
            });
        }

        var row;
        var tableCount = 0;

        for (var month in monthsData) {
            if (tableCount % 3 === 0) {
                row = document.createElement('div');
                row.className = 'calendar-row';
                calendarContainer.appendChild(row);
            }

            var daysInMonth = monthsData[month];

            var table = document.createElement('table');
            table.className = 'calendar-table';

            var headerRow = document.createElement('tr');
            var headerCell = document.createElement('th');
            headerCell.colSpan = 7;
            headerCell.style.textAlign = 'center';
            headerCell.textContent = month;
            headerRow.appendChild(headerCell);
            table.appendChild(headerRow);

            var day = 1;
            while (day <= daysInMonth) {
                var rowElement = document.createElement('tr');

                for (var i = 0; i < 7; i++) {
                    var cell = document.createElement('td');
                    cell.style.textAlign = 'center';
                    cell.style.padding = '5px';
                    if (day <= daysInMonth) {
                        cell.textContent = day;
                        day++;
                    }
                    rowElement.appendChild(cell);
                }

                table.appendChild(rowElement);
            }

            applyWeatherStyles(table, weatherData.filter(data => data.month === month));

            row.appendChild(table);
            tableCount++;
        }
    }
});