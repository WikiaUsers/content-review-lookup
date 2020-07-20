if (!window.QuizServerTime)
	(function() {
		// Set DST clock adjust time in this year
		var thisYear = new Date().getFullYear();
		var dstOn = new Date(thisYear, 2, 14, 7); // UTC
		var dstOff = new Date(thisYear, 10, 7, 6); // UTC

		dstOn.setDate(14 - dstOn.getDay()); // second Sunday in March - Summer time starts
		dstOff.setDate(7 - dstOff.getDay()); // first Sunday in November - Winter time starts

		window.QuizServerTime = {
			now: function() {
				var d = new Date();
				d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
				if (dstOn <= d && d < dstOff) {
					d.setHours(d.getHours() - 4);
				} else {
					d.setHours(d.getHours() - 5);
				}
				return d;
			},
			getTimezone: function() {
				var d = new Date();
				d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
				if (dstOn <= d && d < dstOff) {
					return "EDT";
				} else {
					return "EST";
				}
			},
		};

	})();