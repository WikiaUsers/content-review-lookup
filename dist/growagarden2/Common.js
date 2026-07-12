importStylesheet( 'MediaWiki:MutationGalleryUpload.css' );
importScript( 'MediaWiki:MutationGalleryUpload.js' );

(function () {
  var CYCLE = 600;
  var TIME_API = "https://gag.gg/api/time";
  var RESYNC_MS = 180000;

  var phases = [
    { name: "Day",    start: 0,   end: 450 },
    { name: "Sunset", start: 450, end: 480 },
    { name: "Night",  start: 480, end: 600 }
  ];

  var serverOffsetMs = 0;

  function fmt(sec) {
    sec = Math.max(0, Math.ceil(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  function serverNowMs() { return Date.now() + serverOffsetMs; }

  function sync() {
    if (!TIME_API) return;
    var t0 = Date.now();
    fetch(TIME_API, { cache: "no-store" }).then(function (res) {
      var t1 = Date.now(), rtt = t1 - t0;
      function apply(serverNow) {
        if (serverNow == null || isNaN(serverNow)) return;
        serverOffsetMs = serverNow + rtt / 2 - t1;
      }
      if (!res.ok) { apply(Date.parse(res.headers.get("date"))); return; }
      return res.json().then(function (j) {
        if (j && typeof j.now === "number") apply(j.now);
        else apply(Date.parse(res.headers.get("date")));
      }).catch(function () { apply(Date.parse(res.headers.get("date"))); });
    }).catch(function () {});
  }

  function tick() {
    var counters = document.querySelectorAll(".gag-cycle-counter");
    if (!counters.length) return;
    var o = ((serverNowMs() / 1000) % CYCLE + CYCLE) % CYCLE;
    counters.forEach(function (el) {
      var name = el.getAttribute("data-phase"), p = null;
      for (var i = 0; i < phases.length; i++) if (phases[i].name === name) p = phases[i];
      if (!p) return;
      var timeEl = el.querySelector(".gag-cycle-time");
      var active = o >= p.start && o < p.end;
      el.style.opacity = active ? "1" : "0.55";
      el.style.fontWeight = active ? "700" : "400";
      if (timeEl) timeEl.textContent = active
        ? fmt(p.end - o) + " left"
        : "in " + fmt(((p.start - o) % CYCLE + CYCLE) % CYCLE);
    });
  }

  sync();
  setInterval(sync, RESYNC_MS);
  tick();
  setInterval(tick, 1000);
})();

$(function () {
    $(".application-button").on("click", function () {
        var button = $(this);
        var username = mw.config.get("wgUserName");

        if (!username) return;

        var role = button.data("role");

        var applications = [
            "Applications:" + role + "/" + username,
            "Applications:" + role + "/" + username + " (1)",
            "Applications:" + role + "/" + username + " (2)"
        ];

        function showError() {
            button.next(".application-error").remove();

            $("<div>")
                .addClass("application-error")
                .css({
                    "color": "red",
                    "font-weight": "bold",
                    "margin-top": "10px"
                })
                .text("You have reached the maximum number of applications allowed.")
                .insertAfter(button);
        }

        function checkPage(index) {
            if (index >= applications.length) {
                showError();
                return;
            }

            $.ajax({
                url: mw.util.getUrl(applications[index], {
                    action: "raw"
                }),
                type: "GET",

                success: function () {
                    checkPage(index + 1);
                },

                error: function (xhr) {
                    if (xhr.status === 404) {
                        // Page does not exist, open creation editor
                        window.location.href = mw.util.getUrl(applications[index], {
                            action: "edit",
                            preload: "Template:Application_Template"
                        });
                    } else {
                        checkPage(index + 1);
                    }
                }
            });
        }

        checkPage(0);
    });
});