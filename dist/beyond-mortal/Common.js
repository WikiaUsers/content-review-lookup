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

document.addEventListener("DOMContentLoaded", function () {
	var carousels = document.querySelectorAll('[data-bm-carousel="featuredcast"]');

	carousels.forEach(function (carousel) {
		var track = carousel.querySelector(".bm-featuredcast-track");
		if (!track) return;

		var step = 157; // card width + gap
		var intervalTime = 2800;
		var autoScroll;

		function startAutoScroll() {
			autoScroll = setInterval(function () {
				var maxScroll = track.scrollWidth - track.clientWidth;

				if (track.scrollLeft + step >= maxScroll) {
					track.scrollTo({ left: 0, behavior: "smooth" });
				} else {
					track.scrollBy({ left: step, behavior: "smooth" });
				}
			}, intervalTime);
		}

		function stopAutoScroll() {
			clearInterval(autoScroll);
		}

		startAutoScroll();

		carousel.addEventListener("mouseenter", stopAutoScroll);
		carousel.addEventListener("mouseleave", startAutoScroll);
		carousel.addEventListener("focusin", stopAutoScroll);
		carousel.addEventListener("focusout", startAutoScroll);
	});
});

document.addEventListener("DOMContentLoaded", function () {
	function escapeHtml(text) {
		var div = document.createElement("div");
		div.textContent = text;
		return div.innerHTML;
	}

	function formatTimeStamp(ts) {
		if (!ts) return "";
		var d = new Date(ts);
		if (isNaN(d.getTime())) return "";
		return d.toLocaleDateString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric"
		});
	}

	function buildBadge(type) {
		if (type === "created") {
			return '<span class="bm-main-update-badge bm-main-update-badge-new">New</span>';
		}
		return '<span class="bm-main-update-badge bm-main-update-badge-edited">Updated</span>';
	}

	function renderList(containerId, items, type) {
		var container = document.getElementById(containerId);
		if (!container) return;

		if (!items || !items.length) {
			container.innerHTML = '<li class="bm-main-update-empty">Nothing to show yet.</li>';
			return;
		}

		container.innerHTML = items.map(function (item) {
			var title = escapeHtml(item.title || "Untitled");
			var urlTitle = encodeURIComponent((item.title || "").replace(/ /g, "_"));
			var label = type === "created" ? "Created " : "Updated ";
			var meta = item.timestamp
				? '<span class="bm-main-update-meta">' + label + escapeHtml(formatTimeStamp(item.timestamp)) + '</span>'
				: "";

			return (
				'<li>' +
					'<div class="bm-main-updates-mainline">' +
						buildBadge(type) +
						'<a href="/wiki/' + urlTitle + '">' + title + '</a>' +
					'</div>' +
					meta +
				'</li>'
			);
		}).join("");
	}

	function fetchRecentPages() {
		var url = mw.util.wikiScript("api") +
			"?action=query&format=json&origin=*&list=recentchanges" +
			"&rcnamespace=0" +
			"&rctype=new" +
			"&rclimit=5" +
			"&rcprop=title|timestamp";

		fetch(url)
			.then(function (r) { return r.json(); })
			.then(function (data) {
				var items = data && data.query && data.query.recentchanges ? data.query.recentchanges : [];
				renderList("bm-recent-pages", items, "created");
			})
			.catch(function () {
				var container = document.getElementById("bm-recent-pages");
				if (container) container.innerHTML = '<li class="bm-main-update-empty">Could not load recent pages.</li>';
			});
	}

	function fetchRecentEdits() {
		var url = mw.util.wikiScript("api") +
			"?action=query&format=json&origin=*&list=recentchanges" +
			"&rcnamespace=0" +
			"&rctype=edit" +
			"&rclimit=10" +
			"&rcprop=title|timestamp";

		fetch(url)
			.then(function (r) { return r.json(); })
			.then(function (data) {
				var raw = data && data.query && data.query.recentchanges ? data.query.recentchanges : [];
				var seen = {};
				var items = raw.filter(function (item) {
					if (!item.title || seen[item.title]) return false;
					seen[item.title] = true;
					return true;
				}).slice(0, 5);

				renderList("bm-recent-edits", items, "edited");
			})
			.catch(function () {
				var container = document.getElementById("bm-recent-edits");
				if (container) container.innerHTML = '<li class="bm-main-update-empty">Could not load recent edits.</li>';
			});
	}

	fetchRecentPages();
	fetchRecentEdits();
});

document.addEventListener("DOMContentLoaded", function () {
	var seasonsScroll = document.querySelector(".bm-rail-seasons-scroll");
	var currentSeason = seasonsScroll ? seasonsScroll.querySelector(".bm-rail-season-card.is-current") : null;

	if (seasonsScroll && currentSeason) {
		var cardTop = currentSeason.offsetTop;
		var cardHeight = currentSeason.offsetHeight;
		var containerHeight = seasonsScroll.clientHeight;

		var targetScroll = cardTop - (containerHeight / 2) + (cardHeight / 2);

		seasonsScroll.scrollTo({
			top: Math.max(targetScroll, 0),
			behavior: "smooth"
		});
	}
});