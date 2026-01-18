/* Any JavaScript here will be loaded for all users on every page load. */

/* ======================================================
   SEASONAL EFFECT TEST PANEL — Snowflake Toggle (Stable)
   ====================================================== */

(function () {

    var monthClasses = [
        "january-frost",
        "february-hearts",
        "march-bloom",
        "april-sakura",
        "may-sunshine",
        "june-pride",
        "july-fireflies",
        "august-heat",
        "september-leaves",
        "october-bats",
        "november-embers",
        "december-snow"
    ];

    function applyAutoSeason() {
        var month = new Date().getMonth();
        document.body.classList.add(monthClasses[month]);
    }

    function clearSeasonal() {
        for (var i = 0; i < monthClasses.length; i++) {
            document.body.classList.remove(monthClasses[i]);
        }
    }

    function initSeasonalToggle() {

        /* Permissions check */
        var groups = mw.config.get("wgUserGroups") || [];
        if (groups.indexOf("sysop") === -1 && groups.indexOf("content-moderator") === -1) {
            return;
        }

        /* Apply automatic month FIRST (always) */
        if (!document.body.classList.contains(monthClasses[new Date().getMonth()])) {
            applyAutoSeason();
        }

        /* Prevent duplicates */
        if (document.getElementById("seasonal-toggle-button")) {
            return;
        }

        /* Snowflake button */
        var toggleButton = document.createElement("div");
        toggleButton.id = "seasonal-toggle-button";
        toggleButton.textContent = "❄";
        document.body.appendChild(toggleButton);

        /* Panel */
        var panel = document.createElement("div");
        panel.id = "seasonal-test-panel";
        panel.innerHTML =
            '<div id="seasonal-panel-inner">' +
                '<select id="seasonal-selector">' +
                    '<option value="">— Select Effect —</option>' +
                    '<option value="auto">Auto Mode (Current Month)</option>' +
                    '<option value="january-frost">January — Frost</option>' +
                    '<option value="february-hearts">February — Hearts</option>' +
                    '<option value="march-bloom">March — Bloom</option>' +
                    '<option value="april-sakura">April — Sakura</option>' +
                    '<option value="may-sunshine">May — Sunshine</option>' +
                    '<option value="june-pride">June — Pride</option>' +
                    '<option value="july-fireflies">July — Fireflies</option>' +
                    '<option value="august-heat">August — Heat</option>' +
                    '<option value="september-leaves">September — Leaves</option>' +
                    '<option value="october-bats">October — Bats</option>' +
                    '<option value="november-embers">November — Embers</option>' +
                    '<option value="december-snow">December — Snow</option>' +
                '</select>' +
            '</div>';

        document.body.appendChild(panel);

        toggleButton.addEventListener("click", function () {
            panel.classList.toggle("open");
        });

        /* Manual override logic (ONLY when changed) */
        document.getElementById("seasonal-selector").addEventListener("change", function () {
            var value = this.value;

            clearSeasonal();

            if (!value) return;

            if (value === "auto") {
                applyAutoSeason();
                return;
            }

            document.body.classList.add(value);
        });
    }

    /* Run on page render + SPA navigation */
    mw.hook('wikipage.content').add(initSeasonalToggle);
    mw.hook('postEdit').add(initSeasonalToggle);

    /* Safety fallback */
    setTimeout(initSeasonalToggle, 500);

})();

// Multiversal Crisis Clock (In-Universe) (Adapted from Doomsday Clock by Pr0tato210)
;(function (mw, document) {
	'use strict';

	/* Namespace */
	if (mw.multiversalcrisisClock) {
		return; // prevent double-load
	}

	mw.multiversalcrisisClock = {};

	/* Time calculations */
	function calculateTimeDiff(now, target) {
		var nowDate = new Date(now);
		var targetDate = new Date(target);
		var negative = target < now;

		if (negative) {
			var tmp = nowDate;
			nowDate = targetDate;
			targetDate = tmp;
		}

		var months = 0;
		var years = targetDate.getFullYear() - nowDate.getFullYear();
		months = years * 12;
		months += targetDate.getMonth() - nowDate.getMonth();

		if (targetDate.getDate() < nowDate.getDate()) {
			months--;
		}

		var afterMonths = new Date(nowDate);
		afterMonths.setMonth(afterMonths.getMonth() + months);

		var remainingSeconds = Math.floor((targetDate - afterMonths) / 1000);

		return {
			months: months,
			seconds: remainingSeconds,
			negative: negative
		};
	}

	function pad(num) {
		return num < 10 ? '0' + num : String(num);
	}

	function unitLabel(value, name) {
		var label = value === 1 ? name : name + 's';
		return label.toUpperCase();
	}

	/* Time Rendering */
	function render(nowDate, targetDate, frozen, showCrisis) {
		var diff = calculateTimeDiff(nowDate, targetDate);

		var seconds = frozen ? 0 : Math.abs(diff.seconds);
		var months = frozen ? 0 : diff.months;

		var s = seconds % 60;
		seconds = Math.floor(seconds / 60);
		var m = seconds % 60;
		seconds = Math.floor(seconds / 60);
		var h = seconds % 24;
		var d = Math.floor(seconds / 24);

		var parts;

		if (frozen && showCrisis) {
			parts = [
				{ v: 'C',  l: unitLabel(0, 'month') },
				{ v: 'RI', l: unitLabel(0, 'day') },
				{ v: 'S',  l: unitLabel(0, 'hour') },
				{ v: 'IS', l: unitLabel(0, 'minute') },
				{ v: '!',  l: unitLabel(0, 'second') }
			];
		} else {
			parts = [
				{ v: months, l: unitLabel(months, 'month') },
				{ v: d,      l: unitLabel(d, 'day') },
				{ v: h,      l: unitLabel(h, 'hour') },
				{ v: m,      l: unitLabel(m, 'minute') },
				{ v: s,      l: unitLabel(s, 'second') }
			];
		}

		var html = '<div class="mcc-display">';
		html += '<div class="mcc-numbers">';

		parts.forEach(function (p, i) {
			var displayValue = typeof p.v === 'string' ? p.v : pad(p.v);
			html += '<span class="mcc-number">' + displayValue + '</span>';
			if (i < parts.length - 1) {
				html += '<span class="mcc-sep">:</span>';
			}
		});

		html += '</div><div class="mcc-labels">';

		parts.forEach(function (p, i) {
			html += '<span class="mcc-label">' + p.l + '</span>';
			if (i < parts.length - 1) {
				html += '<span class="mcc-label-sep"></span>';
			}
		});

		html += '</div></div>';

		return html;
	}

	/* CSS Injection */
	function injectCSS() {
		if (document.getElementById('mcc-styles')) return;

		var style = document.createElement('style');
		style.id = 'mcc-styles';
		style.textContent = `
			.mcc-display { display: inline-flex; flex-direction: column; align-items: center; width: max-content; max-width: 100%; }
			.mcc-numbers { display: flex; font-size: clamp(24px, 5.6vw, 56px); font-weight: bold; font-family: DS-Digital, sans-serif; }
			.mcc-number { width: clamp(40px, 8vw, 80px); text-align: center; flex-shrink: 0; }
			.mcc-sep { width: clamp(10px, 2vw, 20px); text-align: center; flex-shrink: 0; }
			.mcc-labels { display: flex; font-size: clamp(10px, 1.6vw, 16px); font-family: DS-Digital, sans-serif; margin-top: clamp(-12px, -0.6vw, -15px); }
			.mcc-label { width: clamp(40px, 8vw, 80px); text-align: center; flex-shrink: 0; }
			.mcc-label-sep { width: clamp(10px, 2vw, 20px); flex-shrink: 0; }

			@supports (container-type: inline-size) {
				.multiversalcrisisCountdown { container-type: inline-size; container-name: mcc-container; }
				@container mcc-container (max-width: 600px) {
					.mcc-numbers { font-size: clamp(20px, 7vw, 42px); }
					.mcc-number,
					.mcc-label { width: clamp(32px, 10vw, 64px); }
					.mcc-sep,
					.mcc-label-sep { width: clamp(8px, 2.5vw, 16px); }
					.mcc-labels { font-size: clamp(8px, 2vw, 13px); }
				}
				@container mcc-container (max-width: 400px) {
					.mcc-numbers { font-size: clamp(16px, 8vw, 32px); }
					.mcc-number,
					.mcc-label { width: clamp(24px, 12vw, 48px); }
					.mcc-sep,
					.mcc-label-sep { width: clamp(6px, 3vw, 12px); }
					.mcc-labels { font-size: clamp(7px, 2.5vw, 11px); }
				}
			}
		`;
		document.head.appendChild(style);
	}

	/* Initialization */
	function init($content) {
		injectCSS();

		var containers = $content.querySelectorAll('.multiversalcrisisCountdown');
		var clocks = [];

		containers.forEach(function (container) {
			var nowNode = container.querySelector('.multiversalcrisisNow');
			var targetNode = container.querySelector('.multiversalcrisisCountdownDate');
			var nocountdown = container.querySelector('.noMultiversalcrisisCountdown');

			if (!nowNode || !targetNode) {
				if (nocountdown) nocountdown.style.display = '';
				return;
			}

			var nowDate = new Date(nowNode.textContent.trim()).valueOf();
			var targetDate = new Date(targetNode.textContent.trim()).valueOf();

			if (isNaN(nowDate) || isNaN(targetDate)) {
				if (nocountdown) nocountdown.style.display = '';
				return;
			}

			if (nocountdown) nocountdown.style.display = 'none';

			// Hide the raw in-universe "now" date span so it doesn't show on-page.
			nowNode.style.display = 'none';

			clocks.push({
				node: targetNode,

				// In-universe starting timestamp (seed)
				inUniverseStart: nowDate,

				// Real time starting timestamp (anchor)
				realStart: Date.now(),

				targetDate: targetDate,
				frozen: nowDate >= targetDate,
				flickerState: false
			});
		});

		if (!clocks.length) return;

		function tick() {
			clocks.forEach(function (c) {
				// Advance in-universe time at a 1:1 ratio with real time
				var now = c.inUniverseStart + (Date.now() - c.realStart);

				// Freeze is determined by in-universe time
				c.frozen = now >= c.targetDate;

				if (!c.frozen) {
					c.node.innerHTML = render(now, c.targetDate, false, false);
				} else {
					c.node.innerHTML = render(now, c.targetDate, true, c.flickerState);
				}
			});
		}

		// Flicker interval for frozen clocks (750ms)
		setInterval(function () {
			clocks.forEach(function (c) {
				if (c.frozen) {
					c.flickerState = !c.flickerState;
				}
			});
		}, 750);

		tick();

		// Update rate (keeps flicker smooth + low performance cost)
		setInterval(tick, 250);
	}

	mw.hook('wikipage.content').add(function ($content) {
		init($content[0] || document);
	});

}(mediaWiki, document));

/* =========================================================
   Beyond Mortal - Seasons Carousel
   Requires markup:
   .bm-carousel[data-carousel="seasons"]
   .bm-carousel-track
   .bm-carousel-btn.prev / .bm-carousel-btn.next
   .bm-carousel-dots
   ========================================================= */

(function () {
  "use strict";

  function initCarousel(root) {
    var track = root.querySelector(".bm-carousel-track");
    if (!track) return;

    var slides = track.querySelectorAll(".bm-carousel-slide");
    if (!slides || !slides.length) return;

    var prevBtn = root.querySelector(".bm-carousel-btn.prev");
    var nextBtn = root.querySelector(".bm-carousel-btn.next");
    var dotsWrap = root.querySelector(".bm-carousel-dots");

    var index = 0;
    var autoTimer = null;

    function slideWidth() {
      if (!slides[0]) return 0;
      var style = window.getComputedStyle(track);
      var gap = parseInt(style.columnGap || style.gap || "0", 10) || 0;
      return slides[0].getBoundingClientRect().width + gap;
    }

    function scrollToIndex(i) {
      if (i < 0) i = 0;
      if (i > slides.length - 1) i = slides.length - 1;
      index = i;
      track.scrollTo({ left: slideWidth() * index, behavior: "smooth" });
      setActiveDot();
    }

    function setActiveDot() {
      if (!dotsWrap) return;
      var dots = dotsWrap.querySelectorAll(".bm-carousel-dot");
      for (var d = 0; d < dots.length; d++) {
        if (d === index) dots[d].classList.add("is-active");
        else dots[d].classList.remove("is-active");
      }
    }

    function rebuildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement("span");
        dot.className = "bm-carousel-dot" + (i === 0 ? " is-active" : "");
        (function (n) {
          dot.addEventListener("click", function () {
            stopAuto();
            scrollToIndex(n);
          });
        })(i);
        dotsWrap.appendChild(dot);
      }
    }

    function next() {
      var nextIndex = index + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      scrollToIndex(nextIndex);
    }

    function prev() {
      var prevIndex = index - 1;
      if (prevIndex < 0) prevIndex = slides.length - 1;
      scrollToIndex(prevIndex);
    }

    function syncIndexToScroll() {
      var w = slideWidth();
      if (!w) return;
      var newIndex = Math.round(track.scrollLeft / w);
      if (newIndex !== index) {
        index = newIndex;
        setActiveDot();
      }
    }

    function startAuto() {
      stopAuto();
      autoTimer = window.setInterval(function () {
        next();
      }, 4500);
    }

    function stopAuto() {
      if (autoTimer) {
        window.clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    // Buttons
    if (prevBtn) prevBtn.addEventListener("click", function () { stopAuto(); prev(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { stopAuto(); next(); });

    // Track scroll sync
    track.addEventListener("scroll", function () {
      window.clearTimeout(track._bmScrollTimer);
      track._bmScrollTimer = window.setTimeout(syncIndexToScroll, 80);
    });

    // Pause autoplay on hover
    root.addEventListener("mouseenter", stopAuto);
    root.addEventListener("mouseleave", startAuto);

    // Initialize
    rebuildDots();
    scrollToIndex(0);
    startAuto();

    // Recalculate on resize
    window.addEventListener("resize", function () {
      scrollToIndex(index);
    });
  }

  function boot() {
    var carousels = document.querySelectorAll('.bm-carousel[data-carousel="seasons"]');
    for (var i = 0; i < carousels.length; i++) initCarousel(carousels[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();