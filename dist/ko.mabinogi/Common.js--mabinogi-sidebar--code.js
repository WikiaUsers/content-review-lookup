/**
 * <pre>
 * 이 스크립트는 사이드바에 여러 정보를 표시하기 위한 것입니다.
 * 현재는 에린 시계를 표시하는 기능만 가지고 있습니다.
 */
(function () {
	"use strict";
	
	var TEMPLATE_TITLE =
		'Project:MabinogiSidebar.html';

	// 한국표준시 오프셋. +9시간.
	var KOREAN_OFFSET = 9;

	var SECONDS_IN_DAY = 60 * 60 * 24;
	var FIX_SECONDS = 0 * 60 * 60 - 8 * 60 + 0;

	var $period;
	var $time;

	function htmlToElement(html) {
		var template = mw.template.compile(html, 'html');
		return template.render()[0];
	}

	function getErinnTime() {
		var date = new Date();

		var KoreanHours = (date.getUTCHours() + KOREAN_OFFSET) % 24;
		var KoreanMinutes = (date.getUTCMinutes() + KOREAN_OFFSET * 60) % 60;
		var KoreanSeconds = (date.getUTCSeconds() + KOREAN_OFFSET * 60 * 60) % 60;

		var KoreanTimeInSeconds =
			KoreanHours * 60 * 60 + KoreanMinutes * 60 + KoreanSeconds;
		var ErinnTimeInSeconds = KoreanTimeInSeconds * 40;

		ErinnTimeInSeconds = ErinnTimeInSeconds + FIX_SECONDS;
		ErinnTimeInSeconds %= SECONDS_IN_DAY;

		return [
			Math.floor((ErinnTimeInSeconds / 60 / 60) % 24),
			Math.floor((ErinnTimeInSeconds / 60) % 60),
			ErinnTimeInSeconds % 60,
		];
	}

	function startTime() {
		var erinnTime = getErinnTime();
		$period.innerHTML = erinnTime[0] < 12 ? '오전' : '오후';

	erinnTime[0] %= 12;
		if (erinnTime[0] === 0) {
			erinnTime[0] = 12;
		}
		$time.innerHTML = erinnTime.join(':');
		setTimeout(startTime, 1000);
	}

	function main() {
		if (!mw.Api) {
			return;
		}
		new mw.Api()
			.get({
				action: 'query',
				prop: 'revisions',
				titles: TEMPLATE_TITLE,
				rvprop: 'content',
				rvslots: 'main',
				format: 'json',
			})
			.then(function (data) {
				var templateSource = Object.values(
					Object.values(data.query.pages)[0].revisions[0]
				)[0].main['*'];

				var wrapper = document.querySelector('.sticky-modules-wrapper');
				var element = htmlToElement(templateSource);
				wrapper.insertBefore(element, wrapper.firstChild);
				$period = document.querySelector('.mabinogi-clock-period');
				$time = document.querySelector('.mabinogi-clock-time');
				startTime();
			});
	}
	
	mw.loader.using('mediawiki.template').then(function() {
		$(main);
	});
})();