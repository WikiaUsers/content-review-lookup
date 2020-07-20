if (wgAction == 'view') {
	function displayTimer() {
		function e() {
			timerDate = new Date;
			s.innerHTML = (timerDate.getUTCDay() < 10 ? "" : "") + a[timerDate.getUTCDay()] + ", " + (timerDate.getUTCDate() < 10 ? "0" : "") + timerDate.getUTCDate() + " " + (timerDate.getUTCMonth() < 10 ? "" : "") + u[timerDate.getUTCMonth()]
		}

		function t() {
			timerDate = new Date;
			timerDate.setMinutes(timerDate.getMinutes() + timerDate.getTimezoneOffset() + r * 60);
			s.innerHTML = (timerDate.getDay() < 10 ? "" : "") + a[timerDate.getDay()] + ", dzień " + (timerDate.getDate() < 10 ? "0" : "") + timerDate.getDate() + " " + (timerDate.getMonth() < 10 ? "" : "") + u[timerDate.getMonth()]
		}
		if (typeof timerDisplay !== "undefined" && timerDisplay === false) return;
		var n;
		var r = 1;
		if (skin == "monobook") {
			var i = document.getElementById("p-personal").getElementsByTagName("ul")[0]
		}
		var s = document.createElement("a");
		var o = document.createElement("div");
		s.href = "/wiki/" + wgPageName + "?action=purge";
		s.title = "Odśwież pamięć podręczną serwera i wymuś pokazanie aktualnej wersji strony.";
		o.id = "displayTimer";
		o.appendChild(s);
		if (skin == "oasis") {
			$(".hiddenLinks").after(o);
			$("#displayTimer").css({
				"text-align": "right",
				"font-size": "11px",
				"position": "absolute",
				"right": "20px",
				"bottom": "5px",
				"z-index": "2"
			});
			$("#displayTimer a").css({
				color: "#D5D4D4"
			})
		}
		var u = new Array(12);
		u[0] = "Gwiazda Poranna";
		u[1] = "Wschodzące Słońce";
		u[2] = "Pierwszy Siew";
		u[3] = "Deszczowa Dłoń";
		u[4] = "Drugi Siew";
		u[5] = "Śródrocze";
		u[6] = "Pełnia Słońca";
		u[7] = "Ostatni Siew";
		u[8] = "Domowe Ognisko";
		u[9] = "Pierwsze Mrozy";
		u[10] = "Zachodzące Słońce";
		u[11] = "Gwiazda Wieczorna";
		var a = new Array(7);
		a[0] = "Sundas";
		a[1] = "Morndas";
		a[2] = "Tirdas";
		a[3] = "Middas";
		a[4] = "Turdas";
		a[5] = "Fridas";
		a[6] = "Loredas";
		if (typeof r !== "number") {
			e();
			setInterval(e, 1e3)
		} else {
			t();
			setInterval(t, 1e3)
		}
	}
	addOnloadHook(displayTimer)
}