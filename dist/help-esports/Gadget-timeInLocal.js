/* Convert the scheduled next game time into local timezone */
mw.hook("wikipage.content").add(function($content) {
    $content.find(".TimeInLocal").each(function() {
		var original = this.innerHTML;
		var splitStr = original.split(",");
		var date = new Date(
			Date.UTC(
				splitStr[0],
				splitStr[1] - 1,
				splitStr[2],
				splitStr[3],
				splitStr[4],
				0,
				0
			)
		);
		var minutes = date.getMinutes();
		var timeMinutes = "00";
		if (minutes < 10) timeMinutes = "0" + minutes.toString();
		else timeMinutes = minutes.toString();
		var hours = date.getHours();
		var timeHours = "00";
		if (hours < 10) timeHours = "0" + hours.toString();
		else timeHours = hours.toString();
		this.textContent = timeHours + ":" + timeMinutes;
		this.classList.remove("TimeInLocal");
    });
});

mw.hook("wikipage.content").add(function($content) {
    $content.find(".DateInLocal").each(function() {
		var original = this.innerHTML;
		var splitStr = original.split(",");
		var date = new Date(
			Date.UTC(
				splitStr[0],
				splitStr[1] - 1,
				splitStr[2],
				splitStr[3],
				splitStr[4],
				0,
				0
			)
		);
		var year = date.getFullYear();
		var month = date.getMonth();
		month = month + 1;
		var timeMonth = "00";
		if (month < 10) timeMonth = "0" + month.toString();
		else timeMonth = month.toString();
		var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var timeWeekday = weekday[date.getDay()];
		var day = date.getDate();
		var timeDay = "00";
		if (day < 10) timeDay = "0" + day.toString();
		else timeDay = day.toString();
		this.textContent =
			timeWeekday + " " + year + "-" + timeMonth + "-" + timeDay;
		this.classList.remove("DateInLocal");
    });
});

mw.hook("wikipage.content").add(function($content) {
    $content.find(".DateOnlyInLocal").each(function() {
		var original = this.innerHTML;
		var splitStr = original.split(",");
		var date = new Date(
			Date.UTC(
				splitStr[0],
				splitStr[1] - 1,
				splitStr[2],
				splitStr[3],
				splitStr[4],
				0,
				0
			)
		);
		var year = date.getFullYear();
		var month = date.getMonth();
		month = month + 1;
		var timeMonth = "00";
		if (month < 10) timeMonth = "0" + month.toString();
		else timeMonth = month.toString();
		var day = date.getDate();
		var timeDay = "00";
		if (day < 10) timeDay = "0" + day.toString();
		else timeDay = day.toString();
		this.textContent = year + "-" + timeMonth + "-" + timeDay;
		this.classList.remove("DateInLocal");
    });
});

mw.hook("wikipage.content").add(function($content) {
    $content.find(".DateInLocalMatches").each(function() {
		var original = this.innerHTML;
		var splitStr = original.split(",");
		var date = new Date(
			Date.UTC(
				splitStr[0],
				splitStr[1] - 1,
				splitStr[2],
				splitStr[3],
				splitStr[4],
				0,
				0
			)
		);
		var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var monthname = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		var timeWeekday = weekday[date.getDay()];
		var timeMonth = monthname[date.getMonth()];
		var timeDay = date.getDate();
		this.textContent = timeWeekday + " " + timeDay + " " + timeMonth;
		this.classList.remove("DateInLocalMatches");
    });
  });

mw.hook("wikipage.content").add(function($content) {
    $content.find(".DateInLocalSB").each(function() {
		var original = this.innerHTML;
		var splitStr = original.split(",");
		var date = new Date(
			Date.UTC(
				splitStr[0],
				splitStr[1] - 1,
				splitStr[2],
				splitStr[3],
				splitStr[4],
				0,
				0
			)
		);
		var year = date.getFullYear();
		var month = date.getMonth();
		month = month + 1;
		var timeMonth = "00";
		if (month < 10) timeMonth = "0" + month.toString();
		else timeMonth = month.toString();
		var day = date.getDate();
		var timeDay = "00";
		if (day < 10) timeDay = "0" + day.toString();
		else timeDay = day.toString();
		this.textContent = year + "-" + timeMonth + "-" + timeDay;
		this.classList.remove("DateInLocalSB");
    });
});