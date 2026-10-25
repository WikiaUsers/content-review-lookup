
(function () {
  "use strict";

  var CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSabMP7QZQxRPvWGwolGPoYGvKNGq1lSkcEXMh4HpktGG35AK0fKidAh0VNSQEwmwiZf3EF32B3wnYy/pub?gid=600081829&single=true&output=csv";
  var BOARD_ID = "next-buses-home";
  var REFRESH_MS = 60000;
  var CLOCK_MS = 1000;
  var MAX_HOURS = 12;
  var MAX_DEPARTURES = 15;
  var DEFAULT_ROUTE_COLOUR = "#2456a6";
  var DEFAULT_TEXT_COLOUR = "#ffffff";

  var refreshTimer = null;
  var clockTimer = null;
  var loading = false;
  var currentBoard = null;

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(
      /[&<>"']/g,
      function (char) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        }[char];
      }
    );
  }

  function validColour(value) {
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(
      String(value || "").trim()
    );
  }

  function addStyles() {
    if (document.getElementById("next-buses-styles")) return;

    var style = document.createElement("style");
    style.id = "next-buses-styles";

    style.textContent =
      "#" + BOARD_ID + "{" +
        "width:max-content;max-width:100%;" +
      "}" +

      "#" + BOARD_ID + " .nb-heading{" +
        "font-size:1.5em;font-weight:bold;" +
        "margin:0 0 8px 0;" +
      "}" +

      "#" + BOARD_ID + " .nb-info{" +
        "font-size:13px;line-height:1.5;" +
        "margin:0 0 10px 0;color:inherit;" +
      "}" +

      "#" + BOARD_ID + " .nb-live-clock{" +
        "font-weight:bold;font-variant-numeric:tabular-nums;" +
      "}" +

      "#" + BOARD_ID + " .nb-table-wrapper{" +
        "width:max-content;max-width:100%;" +
        "overflow-x:auto;" +
        "-webkit-overflow-scrolling:touch;" +
      "}" +

      "#" + BOARD_ID + " .nb-table{" +
        "width:auto;max-width:none;" +
        "border-collapse:collapse;" +
        "text-align:center;font-size:14px;" +
        "table-layout:auto;" +
      "}" +

      "#" + BOARD_ID + " .nb-table th," +
      "#" + BOARD_ID + " .nb-table td{" +
        "padding:9px 10px;" +
        "border-bottom:1px solid var(--theme-border-color, #ddd);" +
        "vertical-align:middle;text-align:center;" +
        "white-space:nowrap;" +
      "}" +

      "#" + BOARD_ID + " .nb-table th{" +
        "background:var(--theme-border-color, #e5e7eb);" +
        "color:inherit;font-weight:bold;" +
      "}" +

      "#" + BOARD_ID + " .nb-table tbody tr{" +
        "background:transparent;" +
      "}" +

      "#" + BOARD_ID + " .nb-time{" +
        "white-space:nowrap;font-weight:600;" +
      "}" +

      "#" + BOARD_ID + " .nb-route{" +
        "display:inline-block;min-width:28px;padding:4px 7px;" +
        "border-radius:5px;text-align:center;font-weight:bold;" +
      "}" +

      "#" + BOARD_ID + " .nb-date{" +
        "display:block;font-size:11px;font-weight:normal;" +
        "opacity:.8;margin-top:3px;" +
      "}" +

      "#" + BOARD_ID + " .nb-message{" +
        "padding:12px;border:1px solid var(--theme-border-color, #ddd);" +
        "border-radius:5px;" +
      "}" +

      "@media(max-width:600px){" +
        "#" + BOARD_ID + " .nb-table th," +
        "#" + BOARD_ID + " .nb-table td{" +
          "padding:7px 5px;" +
        "}" +
        "#" + BOARD_ID + " .nb-table{font-size:12px;}" +
        "#" + BOARD_ID + " .nb-heading{font-size:1.3em;}" +
      "}";

    document.head.appendChild(style);
  }

  
function headerHTML() {
  return (
    '<h2 class="nb-heading">Next Bus Departures</h2>' +
    '<p class="nb-info">' +
      'Current Arndale time: ' +
      '<span class="nb-live-clock" id="' +
        BOARD_ID + '-live-clock">--:--:--</span>' +
      '<br>' +
      'Departures update automatically every 60 seconds.' +
      '<br>' +
      'This table lists the next <strong>15</strong> departures - ' +
      'click for the next ' +
      '<a href="https://arndale.fandom.com/wiki/Next_Bus_Departures">' +
        '50 departures</a> or for ' +
      '<a href="https://arndale.fandom.com/wiki/List_of_Departures">' +
        'all departures</a>.' +
    '</p>'
  );
}

  function updateLiveClock() {
    var clock = document.getElementById(BOARD_ID + "-live-clock");

    if (!clock) return;

    clock.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23"
    }).format(new Date());
  }

  function showMessage(board, message) {
    board.innerHTML =
      headerHTML() +
      '<p class="nb-message">' + escapeHTML(message) + "</p>";

    updateLiveClock();
  }

  function parseCSV(text) {
    var records = [];
    var row = [];
    var field = "";
    var quoted = false;
    var i;
    var ch;
    var headers;

    text = text.replace(/^\uFEFF/, "");

    for (i = 0; i < text.length; i++) {
      ch = text.charAt(i);

      if (ch === '"' && quoted && text.charAt(i + 1) === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = !quoted;
      } else if (ch === "," && !quoted) {
        row.push(field.trim());
        field = "";
      } else if ((ch === "\r" || ch === "\n") && !quoted) {
        if (ch === "\r" && text.charAt(i + 1) === "\n") i++;

        row.push(field.trim());

        if (row.some(function (v) { return v !== ""; })) {
          records.push(row);
        }

        row = [];
        field = "";
      } else {
        field += ch;
      }
    }

    row.push(field.trim());

    if (row.some(function (v) { return v !== ""; })) {
      records.push(row);
    }

    if (records.length < 2) return [];

    headers = records.shift().map(function (header) {
      return header.trim().toLowerCase();
    });

    return records.map(function (values) {
      var result = {};

      headers.forEach(function (header, index) {
        result[header] = (values[index] || "").trim();
      });

      return result;
    });
  }

  function getValue(row, name) {
    return String(row[name] || "").trim();
  }

  function getUKParts(date) {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
      hourCycle: "h23"
    }).formatToParts(date);

    var result = {};

    parts.forEach(function (part) {
      if (part.type !== "literal") {
        result[part.type] = part.value;
      }
    });

    return result;
  }

  function getDayNumber(date) {
    var weekday = getUKParts(date).weekday.toLowerCase();
    var days = {
      sun: 0, mon: 1, tue: 2, wed: 3,
      thu: 4, fri: 5, sat: 6
    };

    return days[weekday.substring(0, 3)];
  }

  function parseTime(value) {
    var match = String(value || "").trim().match(
      /^(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)?$/i
    );

    if (!match) return null;

    var hour = Number(match[1]);
    var minute = Number(match[2]);
    var suffix = (match[3] || "").toLowerCase();

    if (minute > 59) return null;

    if (suffix) {
      if (hour < 1 || hour > 12) return null;
      if (suffix === "am" && hour === 12) hour = 0;
      if (suffix === "pm" && hour !== 12) hour += 12;
    }

    if (hour > 23) return null;

    return {
      hour: hour,
      minute: minute,
      formatted:
        String(hour).padStart(2, "0") + ":" +
        String(minute).padStart(2, "0")
    };
  }

  function dayMatches(value, weekday) {
    var day = String(value || "").trim().toLowerCase();

    if (
      !day ||
      day === "daily" ||
      day === "every day" ||
      day === "everyday"
    ) {
      return true;
    }

    if (day.indexOf("weekday") !== -1) {
      return weekday >= 1 && weekday <= 5;
    }

    if (day.indexOf("weekend") !== -1) {
      return weekday === 0 || weekday === 6;
    }

    var aliases = {
      sun: 0, sunday: 0,
      mon: 1, monday: 1,
      tue: 2, tues: 2, tuesday: 2,
      wed: 3, wednesday: 3,
      thu: 4, thur: 4, thurs: 4, thursday: 4,
      fri: 5, friday: 5,
      sat: 6, saturday: 6
    };

    var tokens = day.match(
      /sunday|monday|tuesday|wednesday|thursday|friday|saturday|sundays|mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|\b(?:sun|mon|tue|tues|wed|thu|thur|thurs|fri|sat)\b/g
    ) || [];

    if (tokens.length) {
      return tokens.some(function (token) {
        token = token.replace(/s$/, "");
        return aliases[token] === weekday;
      });
    }

    var range = day.match(
      /(sun|mon|tue|tues|wed|thu|thur|thurs|fri|sat)[a-z]*\s*(?:-|to)\s*(sun|mon|tue|tues|wed|thu|thur|thurs|fri|sat)[a-z]*/
    );

    if (range) {
      var start = aliases[range[1]];
      var end = aliases[range[2]];

      if (start <= end) {
        return weekday >= start && weekday <= end;
      }

      return weekday >= start || weekday <= end;
    }

    return false;
  }

  function getDateOffset(daysAhead) {
    var now = getUKParts(new Date());

    var date = new Date(Date.UTC(
      Number(now.year),
      Number(now.month) - 1,
      Number(now.day) + daysAhead
    ));

    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      weekday: date.getUTCDay()
    };
  }

  function getDateLabel(daysAhead) {
    var date = getDateOffset(daysAhead);
    var utcDate = new Date(Date.UTC(
      date.year, date.month - 1, date.day
    ));

    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "UTC",
      weekday: "short",
      day: "numeric",
      month: "short"
    }).format(utcDate);
  }

  function nextOccurrence(service) {
    var parsed = parseTime(service.time);
    if (!parsed) return null;

    var now = getUKParts(new Date());
    var nowMinutes =
      Number(now.hour) * 60 +
      Number(now.minute) +
      Number(now.second) / 60;

    for (var offset = 0; offset <= 7; offset++) {
      var date = getDateOffset(offset);

      if (!dayMatches(service.day, date.weekday)) continue;

      var minutesUntil =
        offset * 1440 +
        parsed.hour * 60 +
        parsed.minute -
        nowMinutes;

      if (minutesUntil < 0) continue;

      return {
        time: parsed.formatted,
        daysAhead: offset,
        minutesUntil: minutesUntil
      };
    }

    return null;
  }

  function render(board, services) {
    var departures = services.map(function (service) {
      var occurrence = nextOccurrence(service);

      return occurrence
        ? Object.assign({}, service, occurrence)
        : null;
    }).filter(function (bus) {
      return bus &&
        bus.minutesUntil >= 0 &&
        bus.minutesUntil <= MAX_HOURS * 60;
    }).sort(function (a, b) {
      return a.minutesUntil - b.minutesUntil;
    }).slice(0, MAX_DEPARTURES);

    if (!departures.length) {
      showMessage(
        board,
        "No departures in the next " + MAX_HOURS + " hours."
      );
      return;
    }

    var rows = departures.map(function (bus) {
      var bg = validColour(bus.colour)
        ? bus.colour
        : DEFAULT_ROUTE_COLOUR;

      var fg = validColour(bus.textcolour)
        ? bus.textcolour
        : DEFAULT_TEXT_COLOUR;

      var dateLabel = bus.daysAhead === 1
        ? '<span class="nb-date">' +
            escapeHTML(getDateLabel(1)) +
          "</span>"
        : "";

      return "<tr>" +
        '<td class="nb-time">' +
          escapeHTML(bus.time) + dateLabel +
        "</td>" +
        "<td><a class=\"nb-route\" href=\"" +
          escapeHTML(mw.util.getUrl("Bus Route " + bus.route)) +
          "\" style=\"background-color:" +
          escapeHTML(bg) + ";color:" + escapeHTML(fg) +
          ";text-decoration:none\">" +
          escapeHTML(bus.route) +
        "</a></td>" +
        "<td>" + escapeHTML(bus.origin) + "</td>" +
        "<td>" + escapeHTML(bus.destination) + "</td>" +
        "<td>" +
        (bus.timetable
        ? "<a href=\"" + escapeHTML(bus.timetable) +
        "\" target=\"_blank\" rel=\"noopener noreferrer\">" +
      escapeHTML(bus.route) + " Timetable</a>"
    : "—") +
"</td>" +
      "</tr>";
    }).join("");

    board.innerHTML =
      headerHTML() +
      '<div class="nb-table-wrapper">' +
        '<table class="nb-table">' +
          "<thead><tr>" +
            "<th>Time</th><th>Route</th>" +
            "<th>Origin</th><th>Destination</th>" +
            "<th>Timetable</th>" +
          "</tr></thead>" +
          "<tbody>" + rows + "</tbody>" +
        "</table>" +
      "</div>";

    updateLiveClock();
  }

  function load(board) {
    if (loading) return;
    loading = true;

    fetch(CSV_URL, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Google Sheets returned HTTP " + response.status);
        }
        return response.text();
      })
      .then(function (text) {
        if (/^\s*</.test(text)) {
          throw new Error("The spreadsheet URL returned HTML instead of CSV.");
        }

        var rows = parseCSV(text);

        if (!rows.length) {
          throw new Error("The CSV is empty or could not be parsed.");
        }

        var services = rows.map(function (row) {
          return {
            day: getValue(row, "day"),
            time: getValue(row, "time"),
            route: getValue(row, "route"),
            origin: getValue(row, "origin"),
            destination: getValue(row, "destination"),
            timetable: getValue(row, "timetable"),
            colour: getValue(row, "colour") || getValue(row, "color"),
            textcolour:
              getValue(row, "textcolour") ||
              getValue(row, "textcolor")
          };
        }).filter(function (service) {
          return service.time && service.route;
        });

        if (!services.length) {
          throw new Error("No rows with a time and route were found.");
        }

        render(board, services);
      })
      .catch(function (error) {
        console.error("Next Buses:", error);
        showMessage(
          board,
          "Unable to load bus departures: " + error.message
        );
      })
      .finally(function () {
        loading = false;
      });
  }

  function initialise(root) {
    var board = root && root.querySelector
      ? root.querySelector("#" + BOARD_ID)
      : null;

    if (!board) return;

    if (board.getAttribute("data-next-buses-started") === "yes") return;

    board.setAttribute("data-next-buses-started", "yes");
    currentBoard = board;

    addStyles();
    showMessage(board, "Loading upcoming departures...");
    updateLiveClock();
    load(board);

    if (refreshTimer) clearInterval(refreshTimer);
    if (clockTimer) clearInterval(clockTimer);

    refreshTimer = setInterval(function () {
      if (currentBoard && document.contains(currentBoard)) {
        load(currentBoard);
      }
    }, REFRESH_MS);

    clockTimer = setInterval(function () {
      updateLiveClock();
    }, CLOCK_MS);
  }

  function scanPage() {
    initialise(document);
  }

  if (window.mw && mw.hook) {
    mw.hook("wikipage.content").add(function ($content) {
      var root = $content && $content[0] ? $content[0] : document;
      initialise(root);

      if (root.querySelector && !root.querySelector("#" + BOARD_ID)) {
        scanPage();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scanPage);
  } else {
    scanPage();
  }
})();