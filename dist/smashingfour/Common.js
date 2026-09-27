 // ==============================================================
 // Smashing Four Probability Calculator
 // ==============================================================

(function () {
  "use strict";

  // ------------------------------------------------------------
  // Smashing Four Win Calculator UI
  // ------------------------------------------------------------

  var INIT_ATTR = "data-s4wc-dev-initialized";
  var SITE_INIT_ATTR = "data-s4wc-user-initialized";
  var LIVE_INIT_ATTR = "data-s4wc-initialized";

  // Emergency fallbacks.
  // Normal values are loaded from Module:S4GameConfig.
  var DEFAULT_DAMAGE_WEIGHT = 4;
  var DEFAULT_SCALE = 1800;
  var DEFAULT_HP_REF = 4500;
  var DEFAULT_HP_EXPONENT = 0.85;
  var DEFAULT_COMPOUND_PRESSURE_K = 0.40;
  var DEFAULT_COMPOUND_PRESSURE_EXPONENT = 2.0;
  var DEFAULT_COMPOUND_REALIZATION_FLOOR = 0.55;

  // ------------------------------------------------------------
  // Shared helpers
  // ------------------------------------------------------------

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function parseApiText(res) {
    var html = "";

    if (typeof res === "string") {
      html = res;
    } else if (res && res.text && typeof res.text["*"] === "string") {
      html = res.text["*"];
    } else if (res && typeof res.parsedtext === "string") {
      html = res.parsedtext;
    }

    return String(html)
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseApiHtml(res) {
    if (typeof res === "string") {
      return res;
    }

    if (res && res.text && typeof res.text["*"] === "string") {
      return res.text["*"];
    }

    if (res && typeof res.parsedtext === "string") {
      return res.parsedtext;
    }

    return "";
  }

  // ------------------------------------------------------------
  // Calculator startup
  // ------------------------------------------------------------

  function startCalculator(mount) {

    if (!mount) return;

    if (mount.getAttribute(INIT_ATTR) === "1") {
      return;
    }

    mount.setAttribute(INIT_ATTR, "1");

  // Mark the production initialization guards as satisfied so the
  // site-wide calculator does not overwrite this development version.
	mount.setAttribute(SITE_INIT_ATTR, "1");
	mount.setAttribute(LIVE_INIT_ATTR, "1");

    var api = new mw.Api();

    var pageName = mw.config.get("wgPageName") || "";
    var IS_LIVE_TOOLS_PAGE = pageName === "Tools:S4ProbCalc";

    var DEFAULT_DEBUG = IS_LIVE_TOOLS_PAGE ? 0 : 1;

    var HEROES = [];
    var LEVEL_MIN = 1;
    var LEVEL_MAX = 1;

    // ------------------------------------------------------------
    // Data loading
    // ------------------------------------------------------------

    function fetchHeroList() {
      return api.parse("{{#invoke:HeroData|heroList}}").then(function (res) {

        var text = parseApiText(res);

        HEROES = text
          .split("|")
          .map(function (s) {
            return s.trim();
          })
          .filter(Boolean)
          .sort(function (a, b) {
            return a.localeCompare(b);
          });

        if (!HEROES.length) {
          throw new Error("Hero list came back empty.");
        }
      });
    }

    function fetchMaxHeroLevel() {
      return api.parse("{{#invoke:S4GameConfig|maxHeroLevel}}").then(function (res) {

        var text = parseApiText(res);
        var value = parseInt(text, 10);

        if (!value || value < 1) {
          throw new Error(
            "Invalid maximum hero level returned by S4GameConfig."
          );
        }

        LEVEL_MAX = value;
      });
    }

    function fetchCalculatorDefaults() {
      return Promise.all([
        api.parse("{{#invoke:S4GameConfig|calcDamageWeight}}"),
        api.parse("{{#invoke:S4GameConfig|calcScale}}"),
        api.parse("{{#invoke:S4GameConfig|calcHpRef}}"),
        api.parse("{{#invoke:S4GameConfig|calcHpExponent}}"),
        api.parse("{{#invoke:S4GameConfig|calcCompoundPressureK}}"),
        api.parse("{{#invoke:S4GameConfig|calcCompoundPressureExponent}}"),
        api.parse("{{#invoke:S4GameConfig|calcCompoundRealizationFloor}}")
      ]).then(function (results) {

        var dmgW =
          parseFloat(parseApiText(results[0]));

        var scale =
          parseFloat(parseApiText(results[1]));

        var hpRef =
          parseFloat(parseApiText(results[2]));

        var hpExponent =
          parseFloat(parseApiText(results[3]));

        var pressureK =
          parseFloat(parseApiText(results[4]));

        var pressureExponent =
          parseFloat(parseApiText(results[5]));

        var realizationFloor =
          parseFloat(parseApiText(results[6]));

        if (!dmgW || dmgW <= 0) {
          throw new Error(
            "Invalid calculator damage weight returned by S4GameConfig."
          );
        }

        if (!scale || scale <= 0) {
          throw new Error(
            "Invalid calculator probability scale returned by S4GameConfig."
          );
        }

        if (!hpRef || hpRef <= 0) {
          throw new Error(
            "Invalid HP reference returned by S4GameConfig."
          );
        }

        if (!hpExponent || hpExponent <= 0) {
          throw new Error(
            "Invalid HP exponent returned by S4GameConfig."
          );
        }

        if (!isFinite(pressureK) || pressureK < 0) {
          throw new Error(
            "Invalid compound pressure K returned by S4GameConfig."
          );
        }

        if (!pressureExponent || pressureExponent <= 0) {
          throw new Error(
            "Invalid compound pressure exponent returned by S4GameConfig."
          );
        }

        if (
          !isFinite(realizationFloor) ||
          realizationFloor < 0 ||
          realizationFloor > 1
        ) {
          throw new Error(
            "Invalid compound realization floor returned by S4GameConfig."
          );
        }

        DEFAULT_DAMAGE_WEIGHT = dmgW;
        DEFAULT_SCALE = scale;
        DEFAULT_HP_REF = hpRef;
        DEFAULT_HP_EXPONENT = hpExponent;
        DEFAULT_COMPOUND_PRESSURE_K = pressureK;
        DEFAULT_COMPOUND_PRESSURE_EXPONENT = pressureExponent;
        DEFAULT_COMPOUND_REALIZATION_FLOOR = realizationFloor;
      });
    }

    function fetchCalculatorData() {

      // Keep startup sequential and deterministic:
      // hero list -> max level -> calculator calibration.
      return fetchHeroList()
        .then(function () {
          return fetchMaxHeroLevel();
        })
        .then(function () {
          return fetchCalculatorDefaults();
        });
    }

    // ------------------------------------------------------------
    // Select options
    // ------------------------------------------------------------

    function levelOptions() {

      var out = "";

      for (var i = LEVEL_MIN; i <= LEVEL_MAX; i++) {

        out +=
          '<option value="' +
          i +
          '"' +
          (i === LEVEL_MAX ? " selected" : "") +
          ">" +
          i +
          "</option>";
      }

      return out;
    }

    function heroOptions() {

      var out = '<option value="">Select hero</option>';

      HEROES.forEach(function (hero) {

        out +=
          '<option value="' +
          escapeHtml(hero) +
          '">' +
          escapeHtml(hero) +
          "</option>";
      });

      return out;
    }

    // ------------------------------------------------------------
    // Interface
    // ------------------------------------------------------------

    function renderUI() {

      var heroOpts = heroOptions();
      var lvlOpts = levelOptions();

      function teamRows(prefix, title) {

        var rows = "";

        for (var i = 1; i <= 4; i++) {

          rows +=
            '<div class="s4wc-row">' +
              '<div class="s4wc-turn">' +
                i +
              "</div>" +

              '<div class="s4wc-hero">' +
                '<select id="' +
                  prefix +
                  i +
                  '" class="s4wc-select hero-select">' +
                  heroOpts +
                "</select>" +
              "</div>" +

              '<div class="s4wc-level">' +
                '<select id="' +
                  prefix +
                  "l" +
                  i +
                  '" class="s4wc-select level-select">' +
                  lvlOpts +
                "</select>" +
              "</div>" +
            "</div>";
        }

        return (
          '<div class="s4wc-team">' +

            '<div class="s4wc-team-title">' +
              title +
            "</div>" +

            '<div class="s4wc-head">' +
              '<div class="s4wc-turn">Turn</div>' +
              '<div class="s4wc-hero">Hero</div>' +
              '<div class="s4wc-level">Lv</div>' +
            "</div>" +

            rows +

          "</div>"
        );
      }

      var advancedSettings = "";

      if (!IS_LIVE_TOOLS_PAGE) {

        advancedSettings =
          '<label class="s4wc-setting">' +
            '<span>Damage Weight</span>' +
            '<input id="s4wc-dmgw" ' +
              'type="number" ' +
              'min="0.1" ' +
              'step="0.1" ' +
              'value="' +
              DEFAULT_DAMAGE_WEIGHT +
            '">' +
          "</label>" +

          '<label class="s4wc-setting">' +
			'<span>Probability Scale</span>' +
			'<input id="s4wc-scale" ' +
    			'type="number" ' +
				'min="1" ' +
    			'step="1" ' +
    			'placeholder="Auto" ' +
				'">' +
			"</label>" +

          '<label class="s4wc-setting">' +
            '<span>HP Reference</span>' +
            '<input id="s4wc-hpref" ' +
              'type="number" ' +
              'min="1" ' +
              'step="1" ' +
              'value="' +
              DEFAULT_HP_REF +
            '">' +
          "</label>" +

          '<label class="s4wc-setting">' +
            '<span>HP Exponent</span>' +
            '<input id="s4wc-hpexp" ' +
              'type="number" ' +
              'min="0.01" ' +
              'step="0.01" ' +
              'value="' +
              DEFAULT_HP_EXPONENT +
            '">' +
          "</label>" +

          '<label class="s4wc-setting">' +
            '<span>Pressure K</span>' +
            '<input id="s4wc-pressure-k" ' +
              'type="number" ' +
              'min="0" ' +
              'step="0.01" ' +
              'value="' +
              DEFAULT_COMPOUND_PRESSURE_K +
            '">' +
          "</label>" +

          '<label class="s4wc-setting">' +
            '<span>Pressure Exponent</span>' +
            '<input id="s4wc-pressure-exp" ' +
              'type="number" ' +
              'min="0.01" ' +
              'step="0.01" ' +
              'value="' +
              DEFAULT_COMPOUND_PRESSURE_EXPONENT +
            '">' +
          "</label>" +

          '<label class="s4wc-setting">' +
            '<span>Realization Floor</span>' +
            '<input id="s4wc-realization-floor" ' +
              'type="number" ' +
              'min="0" ' +
              'max="1" ' +
              'step="0.01" ' +
              'value="' +
              DEFAULT_COMPOUND_REALIZATION_FLOOR +
            '">' +
          "</label>";
      }

      mount.innerHTML =

        '<div class="s4wc-wrap">' +

          '<div class="s4wc-controls">' +

            teamRows("a", "Your Team") +
            teamRows("b", "Enemy Team") +

          "</div>" +

          '<div class="s4wc-settings">' +

            '<div class="s4wc-settings-title">Settings</div>' +

            advancedSettings +

            '<label class="s4wc-setting">' +
              '<span>Model</span>' +
              '<select id="s4wc-model">' +
                '<option value="ability" selected>ability</option>' +
                '<option value="base">base</option>' +
              "</select>" +
            "</label>" +

            '<label class="s4wc-setting">' +
              '<span>Initiative</span>' +
              '<select id="s4wc-first">' +
                '<option value="random" selected>random</option>' +
                '<option value="A">Your Team</option>' +
                '<option value="B">Enemy Team</option>' +
              "</select>" +
            "</label>" +

            '<div class="s4wc-actions">' +
              '<button id="s4wc-calc" class="s4wc-btn">' +
                "Calculate" +
              "</button>" +

              '<button id="s4wc-reset" class="s4wc-btn s4wc-btn-secondary">' +
                "Reset" +
              "</button>" +
            "</div>" +

            '<div id="s4wc-status" class="s4wc-status"></div>' +

          "</div>" +

          '<div id="s4wc-output" class="s4wc-output"></div>' +

        "</div>" +

        "<style>" +

          ".s4wc-wrap{" +
            "border:1px solid #a2a9b1;" +
            "background:#f8f9fa;" +
            "padding:12px;" +
            "border-radius:6px;" +
            "max-width:980px;" +
            "margin:12px 0;" +
            "font-size:14px;" +
          "}" +

          ".s4wc-controls{" +
            "display:grid;" +
            "grid-template-columns:1fr 1fr;" +
            "gap:16px;" +
            "margin-bottom:16px;" +
          "}" +

          ".s4wc-team{" +
            "border:1px solid #c8ccd1;" +
            "background:#fff;" +
            "border-radius:4px;" +
            "padding:10px;" +
          "}" +

          ".s4wc-team-title{" +
            "font-weight:bold;" +
            "margin-bottom:8px;" +
          "}" +

          ".s4wc-head," +
          ".s4wc-row{" +
            "display:grid;" +
            "grid-template-columns:56px 1fr 76px;" +
            "gap:8px;" +
            "align-items:center;" +
          "}" +

          ".s4wc-head{" +
            "font-weight:bold;" +
            "color:#54595d;" +
            "border-bottom:1px solid #eaecf0;" +
            "padding-bottom:6px;" +
            "margin-bottom:6px;" +
          "}" +

          ".s4wc-row{" +
            "margin-bottom:6px;" +
          "}" +

          ".s4wc-turn{" +
            "text-align:center;" +
          "}" +

          ".s4wc-select," +
          ".s4wc-settings input{" +
            "width:100%;" +
            "box-sizing:border-box;" +
            "padding:6px;" +
            "border:1px solid #a2a9b1;" +
            "border-radius:4px;" +
            "background:#fff;" +
          "}" +

          ".s4wc-settings{" +
            "border:1px solid #c8ccd1;" +
            "background:#fff;" +
            "border-radius:4px;" +
            "padding:10px;" +
            "margin-bottom:16px;" +
            "display:grid;" +
            "grid-template-columns:repeat(4,minmax(120px,1fr));" +
            "gap:12px;" +
            "align-items:end;" +
          "}" +

          ".s4wc-settings-title{" +
            "grid-column:1/-1;" +
            "font-weight:bold;" +
            "margin-bottom:2px;" +
          "}" +

          ".s4wc-setting{" +
            "display:flex;" +
            "flex-direction:column;" +
            "gap:4px;" +
          "}" +

          ".s4wc-actions{" +
            "display:flex;" +
            "gap:8px;" +
            "align-items:end;" +
          "}" +

          ".s4wc-btn{" +
            "padding:8px 12px;" +
            "border:1px solid #3366cc;" +
            "background:#3366cc;" +
            "color:#fff;" +
            "border-radius:4px;" +
            "cursor:pointer;" +
            "font-weight:bold;" +
          "}" +

          ".s4wc-btn:hover{" +
            "background:#2a4b8d;" +
            "border-color:#2a4b8d;" +
          "}" +

          ".s4wc-btn-secondary{" +
            "background:#fff;" +
            "color:#202122;" +
            "border-color:#a2a9b1;" +
          "}" +

          ".s4wc-btn-secondary:hover{" +
            "background:#f8f9fa;" +
            "border-color:#72777d;" +
          "}" +

          ".s4wc-status{" +
            "grid-column:1/-1;" +
            "color:#54595d;" +
            "font-size:12px;" +
            "min-height:16px;" +
          "}" +

          ".s4wc-output{" +
            "margin-top:10px;" +
          "}" +

          ".s4wc-error{" +
            "color:#b32424;" +
            "font-weight:bold;" +
          "}" +
		".s4wc-explanation-toggle{" +
  "display:inline-flex;" +
  "align-items:center;" +
  "gap:7px;" +
  "margin-top:8px;" +
  "padding:3px 0;" +
  "border:0;" +
  "background:transparent;" +
  "color:inherit!important;" +
  "font:inherit;" +
  "font-weight:bold;" +
  "cursor:pointer;" +
  "text-align:left;" +
"}" +

".s4wc-explanation-toggle:hover{" +
  "text-decoration:underline;" +
"}" +

".s4wc-explanation-caret{" +
  "display:inline-block;" +
  "width:0;" +
  "height:0;" +
  "flex:0 0 auto;" +
  "border-top:5px solid transparent;" +
  "border-bottom:5px solid transparent;" +
  "border-left:7px solid currentColor;" +
  "transform:rotate(0deg);" +
  "transform-origin:3px 5px;" +
  "transition:transform 0.12s ease;" +
"}" +

".s4wc-explanation-toggle[aria-expanded='true'] .s4wc-explanation-caret{" +
  "transform:rotate(90deg);" +
"}" +

".s4wc-calc-explanation{" +
  "margin-top:8px!important;" +
  "padding:12px 14px!important;" +
  "max-width:720px!important;" +
  "box-sizing:border-box;" +
  "background:rgba(127,127,127,0.06)!important;" +
  "color:inherit!important;" +
  "border:1px solid rgba(127,127,127,0.35)!important;" +
  "border-radius:6px;" +
  "box-shadow:0 1px 3px rgba(0,0,0,0.10);" +
  "font-size:12px!important;" +
  "font-weight:400;" +
  "line-height:1.55!important;" +
"}" +

".s4wc-calc-explanation div," +
".s4wc-calc-explanation span," +
".s4wc-calc-explanation b," +
".s4wc-calc-explanation table," +
".s4wc-calc-explanation th," +
".s4wc-calc-explanation td{" +
  "color:inherit!important;" +
"}" +

".s4wc-calc-explanation table{" +
  "width:100%!important;" +
  "max-width:none!important;" +
  "margin:4px 0 10px!important;" +
  "background:transparent!important;" +
  "border:0!important;" +
  "border-collapse:collapse!important;" +
"}" +

".s4wc-calc-explanation th{" +
  "background:rgba(51,102,204,0.12)!important;" +
  "font-weight:bold!important;" +
"}" +

".s4wc-calc-explanation td{" +
  "background:transparent!important;" +
  "font-weight:400!important;" +
"}" +

".s4wc-calc-explanation th," +
".s4wc-calc-explanation td{" +
  "padding:5px 8px!important;" +
  "border:0!important;" +
  "border-bottom:1px solid rgba(127,127,127,0.35)!important;" +
"}" +

".s4wc-calc-explanation th:first-child," +
".s4wc-calc-explanation td:first-child{" +
  "text-align:left!important;" +
"}" +

".s4wc-calc-explanation th:not(:first-child)," +
".s4wc-calc-explanation td:not(:first-child){" +
  "text-align:right!important;" +
  "white-space:nowrap;" +
"}" +

".s4wc-calc-explanation tr:last-child td{" +
  "border-bottom:0!important;" +
"}" +

        "</style>";

      bindUI();
    }

    // ------------------------------------------------------------
    // Form helpers
    // ------------------------------------------------------------

    function getVal(id) {

      var el = document.getElementById(id);

      return el
        ? String(el.value || "").trim()
        : "";
    }

    function setStatus(msg, isError) {

      var el = document.getElementById("s4wc-status");

      if (!el) return;

      el.className =
        "s4wc-status" +
        (isError ? " s4wc-error" : "");

      el.textContent = msg || "";
    }

    function selectedHeroes(prefix) {

      var vals = [];

      for (var i = 1; i <= 4; i++) {

        var v = getVal(prefix + i);

        if (v) {
          vals.push(v);
        }
      }

      return vals;
    }

    function findDuplicates(arr) {

      var seen = Object.create(null);
      var dupes = [];

      arr.forEach(function (v) {

        if (seen[v]) {

          if (dupes.indexOf(v) === -1) {
            dupes.push(v);
          }

        } else {

          seen[v] = true;
        }
      });

      return dupes;
    }

    // ------------------------------------------------------------
    // Hero-selection behavior
    // ------------------------------------------------------------

    function enforceUniqueHeroSelection(changedSelect) {

      var changedVal =
        String(changedSelect.value || "").trim();

      if (!changedVal) return;

      var prevVal =
        changedSelect.dataset.prev || "";

      var teamPrefix =
        changedSelect.id.charAt(0);

      var teamSelects =
        mount.querySelectorAll(
          'select.hero-select[id^="' +
          teamPrefix +
          '"]'
        );

      teamSelects.forEach(function (el) {

        if (
          el !== changedSelect &&
          String(el.value || "").trim() === changedVal
        ) {
          el.value = prevVal;
        }
      });

      changedSelect.dataset.prev = changedVal;
    }

    // ------------------------------------------------------------
    // Event binding
    // ------------------------------------------------------------

    function bindUI() {

      var calcBtn =
        document.getElementById("s4wc-calc");

      var resetBtn =
        document.getElementById("s4wc-reset");

      var heroSelects =
        mount.querySelectorAll(".hero-select");

      heroSelects.forEach(function (el) {

        el.addEventListener("focus", function () {
          el.dataset.prev = el.value || "";
        });

        el.addEventListener("change", function () {
          enforceUniqueHeroSelection(el);
        });
      });

      if (calcBtn) {

        calcBtn.addEventListener(
          "click",
          function (e) {

            e.preventDefault();
            runCalc();
          }
        );
      }

      if (resetBtn) {

        resetBtn.addEventListener(
          "click",
          function (e) {

            e.preventDefault();
            resetUI();
          }
        );
      }
    }

    // ------------------------------------------------------------
    // Calculator request
    // ------------------------------------------------------------

    function buildTemplateWikitext() {

      var aHeroes =
        selectedHeroes("a");

      var bHeroes =
        selectedHeroes("b");

      if (
        aHeroes.length !== 4 ||
        bHeroes.length !== 4
      ) {
        throw new Error(
          "Please select all 8 heroes."
        );
      }

      var dupA =
        findDuplicates(aHeroes);

      var dupB =
        findDuplicates(bHeroes);

      if (dupA.length) {

        throw new Error(
          "Your Team has duplicate hero selections: " +
          dupA.join(", ")
        );
      }

      if (dupB.length) {

        throw new Error(
          "Enemy Team has duplicate hero selections: " +
          dupB.join(", ")
        );
      }

      var params = [];

      for (var i = 1; i <= 4; i++) {

        params.push(
          "a" +
          i +
          "=" +
          getVal("a" + i)
        );

        params.push(
          "al" +
          i +
          "=" +
          getVal("al" + i)
        );
      }

      for (var j = 1; j <= 4; j++) {

        params.push(
          "b" +
          j +
          "=" +
          getVal("b" + j)
        );

        params.push(
          "bl" +
          j +
          "=" +
          getVal("bl" + j)
        );
      }

      var dmgWInput =
        document.getElementById("s4wc-dmgw");

      var scaleInput =
        document.getElementById("s4wc-scale");

      var hpRefInput =
        document.getElementById("s4wc-hpref");

      var hpExpInput =
        document.getElementById("s4wc-hpexp");

      var pressureKInput =
        document.getElementById("s4wc-pressure-k");

      var pressureExpInput =
        document.getElementById("s4wc-pressure-exp");

      var realizationFloorInput =
        document.getElementById("s4wc-realization-floor");

      var dmgW =
        dmgWInput
          ? String(dmgWInput.value || DEFAULT_DAMAGE_WEIGHT).trim()
          : String(DEFAULT_DAMAGE_WEIGHT);

      var scale =
        scaleInput
          ? String(scaleInput.value || "").trim()
          : "";

      var hpRef =
        hpRefInput
          ? String(hpRefInput.value || DEFAULT_HP_REF).trim()
          : String(DEFAULT_HP_REF);

      var hpExp =
        hpExpInput
          ? String(hpExpInput.value || DEFAULT_HP_EXPONENT).trim()
          : String(DEFAULT_HP_EXPONENT);

      var pressureK =
        pressureKInput
          ? String(pressureKInput.value || DEFAULT_COMPOUND_PRESSURE_K).trim()
          : String(DEFAULT_COMPOUND_PRESSURE_K);

      var pressureExp =
        pressureExpInput
          ? String(pressureExpInput.value || DEFAULT_COMPOUND_PRESSURE_EXPONENT).trim()
          : String(DEFAULT_COMPOUND_PRESSURE_EXPONENT);

      var realizationFloor =
        realizationFloorInput
          ? String(realizationFloorInput.value || DEFAULT_COMPOUND_REALIZATION_FLOOR).trim()
          : String(DEFAULT_COMPOUND_REALIZATION_FLOOR);

      params.push(
        "dmgW=" + dmgW
      );

      if (scale !== "") {
	  params.push(
        "scale=" + scale
	  );
	}

      params.push(
        "hpRef=" + hpRef
      );

      params.push(
        "hpExp=" + hpExp
      );

      params.push(
        "pressureK=" + pressureK
      );

      params.push(
        "pressureExp=" + pressureExp
      );

      params.push(
        "realizationFloor=" + realizationFloor
      );

      params.push(
        "model=" +
        getVal("s4wc-model")
      );

      params.push(
        "first=" +
        getVal("s4wc-first")
      );

      params.push(
        "debug=" +
        DEFAULT_DEBUG
      );

      return (
        "{{WinCalc|" +
        params.join("|") +
        "}}"
      );
    }

// ------------------------------------------------------------
// Result explanation disclosure
// ------------------------------------------------------------

function initializeResultExplanation(output) {

  var body =
    output.querySelector(
      ".s4wc-calc-explanation"
    );

  if (!body) return;

  if (
    body.getAttribute(
      "data-s4wc-explanation-ready"
    ) === "1"
  ) {
    return;
  }

  body.setAttribute(
    "data-s4wc-explanation-ready",
    "1"
  );

  // Force the public explanation closed on initial render.
  // Using an explicit inline display state avoids theme/global CSS
  // overriding the native hidden attribute.
  body.style.setProperty(
    "display",
    "none",
    "important"
  );

  var toggle =
    document.createElement("button");

  toggle.type = "button";
  toggle.className =
    "s4wc-explanation-toggle";

  toggle.setAttribute(
    "aria-expanded",
    "false"
  );

  var caret =
    document.createElement("span");

  caret.className =
    "s4wc-explanation-caret";

  caret.setAttribute(
    "aria-hidden",
    "true"
  );

  caret.textContent = "";

  var label =
    document.createElement("span");

  label.textContent =
    "How was this calculated?";

  toggle.appendChild(caret);
  toggle.appendChild(label);

  body.parentNode.insertBefore(
    toggle,
    body
  );

  toggle.addEventListener(
    "click",
    function () {

      var isOpen =
        toggle.getAttribute(
          "aria-expanded"
        ) === "true";

      if (isOpen) {

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        body.style.setProperty(
          "display",
          "none",
          "important"
        );

        caret.textContent = "";

      } else {

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );

        body.style.setProperty(
          "display",
          "block",
          "important"
        );

      }
    }
  );
}

    // ------------------------------------------------------------
    // Run calculation
    // ------------------------------------------------------------

    function runCalc() {

      var output =
        document.getElementById("s4wc-output");

      if (!output) return;

      setStatus(
        "Calculating...",
        false
      );

      output.innerHTML = "";

      var wikitext;

      try {

        wikitext =
          buildTemplateWikitext();

      } catch (err) {

        setStatus(
          err.message || String(err),
          true
        );

        return;
      }

      api.parse(wikitext)
        .then(function (res) {

          var html =
            parseApiHtml(res);

          output.innerHTML =
  html ||
  '<div class="s4wc-error">' +
    "No output returned." +
  "</div>";

initializeResultExplanation(
  output
);

setStatus(
  "Done.",
  false
);

        })
        .catch(function (err) {

          output.innerHTML = "";

          setStatus(
            "Calculation failed: " +
            (
              err && err.message
                ? err.message
                : String(err)
            ),
            true
          );
        });
    }

    // ------------------------------------------------------------
    // Reset
    // ------------------------------------------------------------

    function resetUI() {

      var selects =
        mount.querySelectorAll("select");

      var inputs =
        mount.querySelectorAll("input");

      selects.forEach(function (el) {

        if (
          el.classList.contains(
            "hero-select"
          )
        ) {

          el.value = "";

          el.dataset.prev = "";

        } else if (
          el.classList.contains(
            "level-select"
          )
        ) {

          el.value =
            String(LEVEL_MAX);

        } else if (
          el.id === "s4wc-model"
        ) {

          el.value = "ability";

        } else if (
          el.id === "s4wc-first"
        ) {

          el.value = "random";
        }
      });

      inputs.forEach(function (el) {

        if (
          el.id === "s4wc-dmgw"
        ) {
          el.value =
            String(
              DEFAULT_DAMAGE_WEIGHT
            );
        }

        if (
  el.id === "s4wc-scale"
) {
  el.value = "";
}

        if (
          el.id === "s4wc-hpref"
        ) {
          el.value =
            String(
              DEFAULT_HP_REF
            );
        }

        if (
          el.id === "s4wc-hpexp"
        ) {
          el.value =
            String(
              DEFAULT_HP_EXPONENT
            );
        }

        if (
          el.id === "s4wc-pressure-k"
        ) {
          el.value =
            String(
              DEFAULT_COMPOUND_PRESSURE_K
            );
        }

        if (
          el.id === "s4wc-pressure-exp"
        ) {
          el.value =
            String(
              DEFAULT_COMPOUND_PRESSURE_EXPONENT
            );
        }

        if (
          el.id === "s4wc-realization-floor"
        ) {
          el.value =
            String(
              DEFAULT_COMPOUND_REALIZATION_FLOOR
            );
        }
      });

      var output =
        document.getElementById(
          "s4wc-output"
        );

      if (output) {
        output.innerHTML = "";
      }

      setStatus("", false);
    }

    // ------------------------------------------------------------
    // Initial data load
    // ------------------------------------------------------------

    mount.innerHTML =
      '<div class="s4wc-status">' +
        "Loading calculator data..." +
      "</div>";

    fetchCalculatorData()
      .then(function () {

        renderUI();

        setStatus(
          "Ready.",
          false
        );
      })
      .catch(function (err) {

        mount.innerHTML =
          '<div class="s4wc-error">' +
            "Failed to load calculator data: " +
            escapeHtml(
              err && err.message
                ? err.message
                : String(err)
            ) +
          "</div>";
      });
  }

  // ------------------------------------------------------------
  // Find calculator mount point
  // ------------------------------------------------------------

  function findAndStartCalculator() {

    var mount =
      document.getElementById(
        "wincalc-ui"
      );

    if (mount) {
      startCalculator(mount);
    }
  }

  // ------------------------------------------------------------
  // MediaWiki initialization
  // ------------------------------------------------------------

  if (
    typeof mw === "undefined" ||
    !mw.loader ||
    !mw.hook
  ) {
    return;
  }

  mw.loader
    .using("mediawiki.api")
    .then(function () {

      findAndStartCalculator();

      mw.hook("wikipage.content")
        .add(function () {
          findAndStartCalculator();
        });
    });

})();



// =========================================================
// CLAN DIRECTORY - SEARCH FILTER
// =========================================================

mw.hook('wikipage.content').add(function () {
	var searchContainer = document.getElementById(
		's4-clan-directory-search'
	);

	var table = document.querySelector('.s4-clan-table');

	if (!searchContainer || !table) {
		return;
	}

	// Prevent duplicate initialization
	if (searchContainer.dataset.s4SearchReady === 'true') {
		return;
	}

	searchContainer.dataset.s4SearchReady = 'true';

	searchContainer.innerHTML = `
		<div class="s4-clan-search">
			<label for="s4-clan-search-input">
				<strong>Search Clans</strong>
			</label>

			<input
				type="search"
				id="s4-clan-search-input"
				placeholder="Search clan names..."
				autocomplete="off"
			>

			<span id="s4-clan-search-count"></span>
		</div>
	`;

	var searchInput =
		document.getElementById('s4-clan-search-input');

	var searchCount =
		document.getElementById('s4-clan-search-count');

	var clanRows = Array.prototype.slice.call(
		table.querySelectorAll('tr')
	).filter(function (row) {
		return row.querySelector('.s4-clan-cell');
	});

	var totalClans = clanRows.length;
	
	var sortHeader = document.getElementById('s4-clan-sort-name');
var sortAscending = true;

function getClanName(row) {
	var clanCell = row.querySelector('.s4-clan-cell');

	if (!clanCell) {
		return '';
	}

	return clanCell.textContent
		.trim()
		.toLowerCase()
		.replace(/\s+/g, ' ');
}

function sortClanRows() {
	var tbody = table.querySelector('tbody');

	if (!tbody) {
		return;
	}

	clanRows.sort(function (a, b) {
		var nameA = getClanName(a);
		var nameB = getClanName(b);

		return sortAscending
			? nameA.localeCompare(nameB)
			: nameB.localeCompare(nameA);
	});

	clanRows.forEach(function (row) {
		tbody.appendChild(row);
	});

	if (sortHeader) {
		sortHeader.textContent =
			sortAscending ? 'Clan ▲' : 'Clan ▼';
	}

	sortAscending = !sortAscending;
}

if (sortHeader) {
	sortHeader.addEventListener('click', sortClanRows);
}
// Default directory order: Clan name A-Z
sortClanRows();
	
	function normalizeSearchText(text) {
		return text
			.trim()
			.toLowerCase()
			.replace(/\s+/g, ' ');
	}

	function updateCount(visibleCount) {
		if (visibleCount === totalClans) {
			searchCount.textContent =
				totalClans +
				(totalClans === 1 ? ' clan' : ' clans');
		} else {
			searchCount.textContent =
				'Showing ' +
				visibleCount +
				' of ' +
				totalClans +
				' clans';
		}
	}

	function filterClans() {
		var query =
			normalizeSearchText(searchInput.value);

		var visibleCount = 0;

		clanRows.forEach(function (row) {
			var clanCell =
				row.querySelector('.s4-clan-cell');

			var clanName =
				normalizeSearchText(
					clanCell.textContent
				);

			var matches =
				query === '' ||
				clanName.indexOf(query) !== -1;

			row.style.display =
				matches ? '' : 'none';

			if (matches) {
				visibleCount++;
			}
		});

		updateCount(visibleCount);
	}

	searchInput.addEventListener(
		'input',
		filterClans
	);

	updateCount(totalClans);
});


// =========================================================
// Clan Directory - Shared configuration
// =========================================================

var s4ClanConfigPromise = null;

function loadS4ClanConfig() {
	if (s4ClanConfigPromise) {
		return s4ClanConfigPromise;
	}

	var api = new mw.Api();

	s4ClanConfigPromise = api.get({
		action: 'expandtemplates',
		text:
			'DATA_PAGE={{#invoke:ClanDirectory|dataPage}}\n' +
			'MAX_NAME={{#invoke:S4GameConfig|maxClanNameLength}}\n' +
			'MAX_ABOUT={{#invoke:S4GameConfig|maxClanAboutLength}}',
		prop: 'wikitext',
		formatversion: 2
	}).then(function (response) {
		var expanded =
			response.expandtemplates &&
			response.expandtemplates.wikitext
				? response.expandtemplates.wikitext
				: '';

		var dataPageMatch =
			expanded.match(/(?:^|\n)DATA_PAGE=([^\r\n]+)/);

		var maxNameMatch =
			expanded.match(/(?:^|\n)MAX_NAME=(\d+)/);

		var maxAboutMatch =
			expanded.match(/(?:^|\n)MAX_ABOUT=(\d+)/);

		var dataPage = dataPageMatch
			? dataPageMatch[1].trim()
			: '';

		var maxClanNameLength = maxNameMatch
			? parseInt(maxNameMatch[1], 10)
			: 0;

		var maxClanAboutLength = maxAboutMatch
			? parseInt(maxAboutMatch[1], 10)
			: 0;

		if (
			!dataPage ||
			maxClanNameLength < 1 ||
			maxClanAboutLength < 1
		) {
			throw new Error(
				'Clan Directory configuration could not be loaded.'
			);
		}

		return {
			dataPage: dataPage,
			maxClanNameLength: maxClanNameLength,
			maxClanAboutLength: maxClanAboutLength
		};
	}).catch(function (error) {
		// Allow a later retry if the configuration request failed.
		s4ClanConfigPromise = null;
		throw error;
	});

	return s4ClanConfigPromise;
}


// =========================================================
// Clan Directory - Add Clan form
// =========================================================

mw.hook('wikipage.content').add(function () {
	var container = document.getElementById('s4-add-clan-form');

if (!container) {
	return;
}


// Prevent duplicate initialization if MediaWiki fires the content hook again.
if (container.dataset.s4AddClanReady === 'true') {
	return;
}

	container.dataset.s4AddClanReady = 'true';
	
	var currentUserId = mw.config.get('wgUserId');
	var clanConfig = null;

if (!currentUserId) {
	container.innerHTML =
		'<div class="s4-clan-account-note">' +
		'<strong>You must be logged in to a Fandom account to add a clan.</strong>' +
		'</div>';

	return;
}

	container.innerHTML = `
		<div class="s4-clan-form">

			<div class="s4-clan-form-field">
	<label for="s4-clan-name">
		<strong>Clan Name</strong>
		<small id="s4-clan-name-limit"></small>
	</label><br>
	<input type="text" id="s4-clan-name" disabled>
	<div id="s4-clan-name-count">Loading entry limits...</div>
	<div id="s4-clan-duplicate-warning"></div>
</div>

			<div class="s4-clan-form-field">
				<strong>Clan Shield</strong><br>
				<button type="button" id="s4-clan-shield-button">
					Choose Shield
				</button>
				<span id="s4-clan-shield-selected">
	No shield selected
</span>
<input type="hidden" id="s4-clan-shield-value" value="">
			</div>

			<div class="s4-clan-form-field">
	<label for="s4-clan-pitch">
		<strong>About Your Clan</strong>
		<small id="s4-clan-about-limit"></small>
	</label><br>
	<div id="s4-clan-pitch-count">Loading entry limits...</div>
	<textarea id="s4-clan-pitch" rows="5" disabled></textarea>
</div>

			<div class="s4-clan-form-field">
	<label for="s4-clan-discord">
		<strong>Discord Invite</strong> <small>(optional)</small>
	</label><br>
	<input
		type="url"
		id="s4-clan-discord"
		placeholder="https://discord.gg/..."
	>
	<div id="s4-clan-discord-note" class="s4-clan-field-note" style="display:none;">
	<strong>Important:</strong> Discord invite links can expire.

	For a long-term Clan Directory listing, create an invite that will remain valid.
	In Discord, open your server, choose <strong>Create Invite</strong>, then select
	<strong>Edit Invite Link</strong> before copying it.

	If your server has <strong>Community</strong> enabled, set
	<strong>Expire After</strong> to <strong>Never</strong> and
	<strong>Max Number of Uses</strong> to <strong>No Limit</strong>.

	Without Community enabled, Discord currently limits invite links to a maximum
	of 30 days, so you may need to update your clan listing when the invite expires.
</div>
</div>

<div class="s4-clan-form-field">
	<label for="s4-clan-website">
		<strong>Website</strong> <small>(optional)</small>
	</label><br>
	<input
		type="url"
		id="s4-clan-website"
		placeholder="https://..."
	>
</div>

			<div class="s4-clan-form-field">
	<button type="button" id="s4-clan-submit" disabled>
		Add Clan
	</button>

	<button type="button" id="s4-clan-cancel" style="margin-left:8px;">
		Cancel
	</button>

	<div id="s4-clan-submit-status"></div>
</div>

		</div>
	`;
	
	var clanNameInput = document.getElementById('s4-clan-name');
var clanNameCount = document.getElementById('s4-clan-name-count');
var clanPitchInput = document.getElementById('s4-clan-pitch');
var clanPitchCount = document.getElementById('s4-clan-pitch-count');
var clanDuplicateWarning = document.getElementById('s4-clan-duplicate-warning');
var clanSubmitButton = document.getElementById('s4-clan-submit');
var clanCancelButton = document.getElementById('s4-clan-cancel');
var clanShieldValue = document.getElementById('s4-clan-shield-value');
var clanDiscordInput = document.getElementById('s4-clan-discord');
var clanWebsiteInput = document.getElementById('s4-clan-website');
var clanSubmitStatus = document.getElementById('s4-clan-submit-status');
var clanDiscordNote = document.getElementById('s4-clan-discord-note');
var clanNameLimit = document.getElementById('s4-clan-name-limit');
var clanAboutLimit = document.getElementById('s4-clan-about-limit');

loadS4ClanConfig()
	.then(function (config) {
		clanConfig = config;

		clanNameInput.maxLength =
			clanConfig.maxClanNameLength;

		clanPitchInput.maxLength =
			clanConfig.maxClanAboutLength;

		clanNameLimit.textContent =
			'— ' +
			clanConfig.maxClanNameLength +
			' characters maximum';

		clanAboutLimit.textContent =
			'— ' +
			clanConfig.maxClanAboutLength +
			' characters maximum';
		
		clanNameCount.textContent =
			clanConfig.maxClanNameLength +
			' characters remaining';
			
		clanPitchCount.textContent =
			clanConfig.maxClanAboutLength +
			' characters remaining';

		clanNameInput.disabled = false;
		clanPitchInput.disabled = false;

		validateClanForm();
	})
	.catch(function () {
		clanSubmitStatus.textContent =
			'Unable to load Clan Directory configuration.';
	});

function updateDiscordNote() {
	if (
		document.activeElement === clanDiscordInput ||
		clanDiscordInput.value.trim() !== ''
	) {
		clanDiscordNote.style.display = 'block';
	} else {
		clanDiscordNote.style.display = 'none';
	}
}

clanDiscordInput.addEventListener('focus', updateDiscordNote);
clanDiscordInput.addEventListener('input', updateDiscordNote);
clanDiscordInput.addEventListener('blur', updateDiscordNote);

// Allow Enter to advance through single-line form fields
var enterAdvanceOrder = [
	's4-clan-name',
	's4-clan-shield-button',
	's4-clan-pitch',
	's4-clan-discord',
	's4-clan-website',
	's4-clan-submit'
];

enterAdvanceOrder.forEach(function (id, index) {
	var element = document.getElementById(id);

	if (!element) {
		return;
	}

	// Textarea keeps normal Enter/new-line behavior.
	// Buttons keep their normal Enter/click behavior.
	if (
		element.tagName === 'TEXTAREA' ||
		element.tagName === 'BUTTON'
	) {
		return;
	}

	element.addEventListener('keydown', function (event) {
		if (event.key !== 'Enter') {
			return;
		}

		event.preventDefault();

		var nextId = enterAdvanceOrder[index + 1];
		var nextElement = document.getElementById(nextId);

		if (nextElement) {
			nextElement.focus();
		}
	});
});

function validateClanForm() {
	if (!clanConfig) {
		clanSubmitButton.disabled = true;
		return;
	}

	var nameLength =
		clanNameInput.value.trim().length;

	var pitchLength =
		clanPitchInput.value.trim().length;

	var hasName =
		nameLength > 0 &&
		nameLength <= clanConfig.maxClanNameLength;

	var hasShield =
		clanShieldValue.value !== '';

	var hasPitch =
		pitchLength > 0 &&
		pitchLength <= clanConfig.maxClanAboutLength;

	clanSubmitButton.disabled =
		!(hasName && hasShield && hasPitch);
}

clanNameInput.addEventListener('input', function () {
	if (!clanConfig) {
		return;
	}

	var remaining =
		clanConfig.maxClanNameLength -
		clanNameInput.value.length;

	clanNameCount.textContent =
		remaining +
		(remaining === 1
			? ' character remaining'
			: ' characters remaining');

	validateClanForm();
});

clanPitchInput.addEventListener('input', function () {
	if (!clanConfig) {
		return;
	}

	var remaining =
		clanConfig.maxClanAboutLength -
		clanPitchInput.value.length;

	clanPitchCount.textContent =
		remaining +
		(remaining === 1
			? ' character remaining'
			: ' characters remaining');

	validateClanForm();
});

// =========================================================
// ADD CLAN - DIRECTORY SUBMISSION
// =========================================================

function sanitizeClanText(value) {
	return value
		.replace(/\r?\n/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\|/g, '&#124;')
		.replace(/\{/g, '&#123;')
		.replace(/\}/g, '&#125;')
		.replace(/\[/g, '&#91;')
		.replace(/\]/g, '&#93;');
}

function getOptionalUrl(input, fieldName) {
	var value = input.value.trim();

	if (!value) {
		return '';
	}

	try {
		var url = new URL(value);

		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			throw new Error();
		}

		return url.href;

	} catch (error) {
		throw new Error(
			fieldName + ' must be a valid http:// or https:// address.'
		);
	}
}

function normalizeClanEditKey(value) {
	return (value || '')
		.trim()
		.replace(/[\s-]/g, '')
		.toUpperCase();
}


function generateClanEditKey() {
	var bytes = new Uint8Array(16);

	window.crypto.getRandomValues(bytes);

	var rawKey = Array.prototype.map.call(
		bytes,
		function (byte) {
			return byte
				.toString(16)
				.padStart(2, '0');
		}
	).join('').toUpperCase();

	return rawKey.match(/.{1,8}/g).join('-');
}


function hashClanEditKey(value) {
	var normalizedKey =
		normalizeClanEditKey(value);

	var encoded =
		new TextEncoder().encode(
			normalizedKey
		);

	return window.crypto.subtle
		.digest(
			'SHA-256',
			encoded
		)
		.then(function (buffer) {
			return Array.prototype.map.call(
				new Uint8Array(buffer),
				function (byte) {
					return byte
						.toString(16)
						.padStart(2, '0');
				}
			).join('');
		});
}

function buildClanEntry(id, editKeyHash) {
	var clanName = sanitizeClanText(clanNameInput.value);
	var clanPitch = sanitizeClanText(clanPitchInput.value);

	var discord = getOptionalUrl(
		clanDiscordInput,
		'Discord link'
	);

	var website = getOptionalUrl(
		clanWebsiteInput,
		'Website'
	);

	var addedDate = new Date()
		.toISOString()
		.slice(0, 10);

	return [
		'{{ClanEntry',
		'|id=' + id,
		'|name=' + clanName,
		'|shield=' + clanShieldValue.value,
		'|pitch=' + clanPitch,
		'|discord=' + discord,
		'|website=' + website,
		'|added=' + addedDate,
		'|updated=' + addedDate,
		'|verified=' + addedDate,
		'|active=yes',
		'|editkeyhash=' + editKeyHash,
		'}}'
	].join('\n');
}


function addClanToDirectory() {
	clanSubmitStatus.textContent = '';

	if (!clanConfig || clanSubmitButton.disabled) {
		return;
	}

	var rawName = clanNameInput.value.trim();
	var rawPitch = clanPitchInput.value.trim();

	if (rawName.length > clanConfig.maxClanNameLength) {
		clanSubmitStatus.textContent =
			'Clan name cannot exceed ' +
			clanConfig.maxClanNameLength +
			' characters.';
		validateClanForm();
		return;
	}

	if (rawPitch.length > clanConfig.maxClanAboutLength) {
		clanSubmitStatus.textContent =
			'About Your Clan cannot exceed ' +
			clanConfig.maxClanAboutLength +
			' characters.';
		validateClanForm();
		return;
	}

	var originalButtonText =
		clanSubmitButton.textContent;

	var editKey =
		generateClanEditKey();

	clanSubmitButton.disabled = true;
	clanSubmitButton.textContent =
		'Adding Clan...';

	var api = new mw.Api();

	hashClanEditKey(editKey)
		.then(function (editKeyHash) {

			return api.edit(
				clanConfig.dataPage,
				function (revision) {
					var source =
						revision.content;

					// -----------------------------------------
					// Find permanent next-ID counter
					// -----------------------------------------

					var counterRegex =
						/<!--\s*S4_NEXT_CLAN_ID:\s*(\d+)\s*-->/i;

					var counterMatch =
						source.match(counterRegex);

					if (!counterMatch) {
						throw new Error(
							'The Clan Directory ID counter could not be found.'
						);
					}

					var counterId =
						parseInt(
							counterMatch[1],
							10
						);

					// -----------------------------------------
					// Also inspect existing IDs.
					// -----------------------------------------

					var maxExistingId = 0;

					var idRegex =
						/\{\{\s*ClanEntry\b[\s\S]*?\|\s*id\s*=\s*(\d+)/gi;

					var idMatch;

					while (
						(idMatch =
							idRegex.exec(source)) !== null
					) {
						var existingId =
							parseInt(
								idMatch[1],
								10
							);

						if (
							existingId >
							maxExistingId
						) {
							maxExistingId =
								existingId;
						}
					}

					var newId =
						Math.max(
							counterId,
							maxExistingId + 1
						);

					var nextId =
						newId + 1;

					var clanEntry =
						buildClanEntry(
							newId,
							editKeyHash
						);

					source =
						source.replace(
							counterRegex,
							'<!-- S4_NEXT_CLAN_ID: ' +
								nextId +
								' -->'
						);

					var tableClose =
						source.lastIndexOf('\n|}');

					if (tableClose === -1) {
						throw new Error(
							'The Clan Directory table closing marker could not be found.'
						);
					}

					source =
						source.slice(
							0,
							tableClose
						) +
						'\n' +
						clanEntry +
						source.slice(
							tableClose
						);

					return {
						text: source,
						summary:
							'Add clan to Clan Directory: ' +
							clanNameInput.value.trim()
					};
				}
			);
		})
		.then(function () {

			cachedClanNames = null;

			clanSubmitStatus.innerHTML =
				'<div class="s4-clan-account-note">' +
				'<strong>Clan added successfully — save your Clan Edit Key.</strong>' +
				'<p>Your Clan Edit Key is:</p>' +
				'<p><code style="font-size:120%; user-select:all;">' +
				editKey +
				'</code></p>' +
				'<p><strong>Keep this key in a safe place.</strong> ' +
				'You will need it whenever you want to access your clan listing through the Edit Clan page.</p>' +

				'<p>You will need the key to change your clan name, shield, description, Discord invite, or website; ' +
				'to replace an expired Discord invite; or to allow another trusted clan member to maintain the listing.</p>' +

				'<p><strong>You will also need this key even if none of your clan information has changed.</strong> ' +
				'Clan listings must be periodically verified to remain eligible for features such as Featured Clan. ' +
				'Verification is performed through the Edit Clan page, so keeping this key is necessary for future verification.</p>' +

				'<p>Anyone who has this key can edit your clan listing. Share it only with trusted clan members.</p>' +

				'<p>If the key is lost, a wiki administrator will need to issue a replacement.</p>' +

				'<button type="button" id="s4-clan-add-finished">' +
				'Return to Clan Directory' +
				'</button>' +
				'</div>';

			var finishedButton =
				document.getElementById(
					's4-clan-add-finished'
				);

			if (finishedButton) {
				finishedButton.addEventListener(
					'click',
					function () {
						window.location.href =
							mw.util.getUrl(
								'Clan Directory'
							);
					}
				);
			}

			// Reset the entry fields, but leave the
			// generated key visible until the user
			// deliberately leaves this page.
			clanNameInput.value = '';
			clanPitchInput.value = '';
			clanDiscordInput.value = '';
			clanWebsiteInput.value = '';
			clanShieldValue.value = '';

			clanNameCount.textContent =
				clanConfig.maxClanNameLength +
				' characters remaining';

			clanPitchCount.textContent =
				clanConfig.maxClanAboutLength +
				' characters remaining';

			clanDuplicateWarning.innerHTML = '';

			var shieldDisplay =
				document.getElementById(
					's4-clan-shield-selected'
				);

			if (shieldDisplay) {
				shieldDisplay.textContent =
					'No shield selected';
			}

			clanSubmitButton.textContent =
				originalButtonText;

			validateClanForm();
		})
		.catch(function () {

			clanSubmitButton.textContent =
				originalButtonText;

			validateClanForm();

			clanSubmitStatus.textContent =
				'Unable to add the clan. No changes were made.';
		});
}


clanSubmitButton.addEventListener(
	'click',
	addClanToDirectory
);

clanCancelButton.addEventListener('click', function () {
	window.location.href = mw.util.getUrl('Clan Directory');
});	
	
	var cachedClanNames = null;

function normalizeClanName(name) {
	return name
		.trim()
		.toLowerCase()
		.replace(/\s+/g, ' ');
}

function loadExistingClanNames() {
	if (cachedClanNames !== null) {
		return Promise.resolve(cachedClanNames);
	}

	var api = new mw.Api();

	return api.get({
		action: 'query',
		prop: 'revisions',
		titles: clanConfig.dataPage,
		rvprop: 'content',
		rvslots: 'main',
		formatversion: 2
	}).then(function (response) {
		var page = response.query.pages[0];
		var source = page.revisions[0].slots.main.content;
		var clans = [];

		var entryRegex = /\{\{\s*ClanEntry\b([\s\S]*?)\}\}/gi;
var match;

function getParam(block, name) {
	var regex = new RegExp(
		'(?:^|\\n)[ \\t]*\\|[ \\t]*' +
		name +
		'[ \\t]*=[ \\t]*([^\\r\\n]*)',
		'i'
	);

	var paramMatch = block.match(regex);

	return paramMatch
		? paramMatch[1].trim()
		: '';
}

while ((match = entryRegex.exec(source)) !== null) {
	var block = match[1];

	var clanName = getParam(block, 'name');

	if (clanName) {
		clans.push({
			name: clanName,
			id: getParam(block, 'id'),
			shield: getParam(block, 'shield'),
			pitch: getParam(block, 'pitch'),
			discord: getParam(block, 'discord'),
			website: getParam(block, 'website')
		});
	}
}

		cachedClanNames = clans;
		return clans;
	});
}

function checkDuplicateClanName() {
	var enteredName = clanNameInput.value.trim();

	if (!enteredName) {
		clanDuplicateWarning.innerHTML = '';
		return;
	}

	clanDuplicateWarning.textContent = 'Checking existing clans...';

	loadExistingClanNames().then(function (clans) {
		var normalized = normalizeClanName(enteredName);

		var matches = clans.filter(function (clan) {
			return normalizeClanName(clan.name) === normalized;
		});

		// No matching clans
		if (matches.length === 0) {
			clanDuplicateWarning.innerHTML = '';
			return;
		}

		// Clear "Checking..." message
		clanDuplicateWarning.innerHTML = '';

		// Warning heading
		var heading = document.createElement('div');
		heading.style.fontWeight = 'bold';
		heading.style.marginTop = '8px';
		heading.style.marginBottom = '4px';

		heading.textContent =
			matches.length +
			(matches.length === 1
				? ' clan with this name is already listed.'
				: ' clans with this name are already listed.');

		clanDuplicateWarning.appendChild(heading);

		// Explanation
		var explanation = document.createElement('div');
		explanation.style.marginBottom = '8px';

		explanation.textContent =
			'Check the existing clan' +
			(matches.length === 1 ? '' : 's') +
			' below. If one is your clan, do not create another listing. ' +
			'Otherwise, you may continue.';

		clanDuplicateWarning.appendChild(explanation);

		// Scrollable match list
		var matchList = document.createElement('div');

		matchList.style.maxHeight = '240px';
		matchList.style.overflowY = 'auto';
		matchList.style.border = '1px solid rgba(128,128,128,0.4)';
		matchList.style.borderRadius = '6px';
		matchList.style.padding = '6px';

		matches.forEach(function (clan, index) {
			var card = document.createElement('div');

			card.style.display = 'flex';
			card.style.alignItems = 'center';
			card.style.gap = '10px';
			card.style.padding = '8px';

			if (index > 0) {
				card.style.borderTop =
					'1px solid rgba(128,128,128,0.25)';
			}

			// Shield
			var shieldNumber = parseInt(clan.shield, 10);

			if (
				!isNaN(shieldNumber) &&
				shieldNumber >= 1
			) {
				var shield = document.createElement('img');

				var shieldFile =
					'ClanShield_' +
					String(shieldNumber).padStart(3, '0') +
					'.png';

				shield.src = mw.util.getUrl(
					'Special:Redirect/file/' + shieldFile
				);

				shield.alt = clan.name + ' clan shield';
				shield.width = 40;
				shield.height = 40;
				shield.style.flex = '0 0 auto';

				card.appendChild(shield);
			}

			// Clan information
			var info = document.createElement('div');
			info.style.minWidth = '0';
			info.style.flex = '1';

			var name = document.createElement('div');
			name.style.fontWeight = 'bold';
			name.style.fontSize = '110%';
			name.textContent = clan.name;

			info.appendChild(name);

			// Pitch
			if (clan.pitch) {
				var pitch = document.createElement('div');

				pitch.style.marginTop = '2px';
				pitch.style.fontSize = '90%';

				pitch.textContent = clan.pitch;

				info.appendChild(pitch);
			}

			// Discord / Website
if (clan.discord || clan.website) {
	var linkLine = document.createElement('div');
	linkLine.style.marginTop = '4px';
	linkLine.style.display = 'flex';
	linkLine.style.gap = '10px';
	linkLine.style.alignItems = 'center';

	// Discord
	if (
		clan.discord &&
		/^https?:\/\//i.test(clan.discord)
	) {
		var discordLink = document.createElement('a');
		discordLink.href = clan.discord;
		discordLink.target = '_blank';
		discordLink.rel = 'noopener noreferrer';
		discordLink.textContent = 'Discord';

		linkLine.appendChild(discordLink);
	}

	// Website
	if (
		clan.website &&
		/^https?:\/\//i.test(clan.website)
	) {
		var websiteLink = document.createElement('a');
		websiteLink.href = clan.website;
		websiteLink.target = '_blank';
		websiteLink.rel = 'noopener noreferrer';
		websiteLink.textContent = 'Website';

		linkLine.appendChild(websiteLink);
	}

	info.appendChild(linkLine);
}

			card.appendChild(info);
			matchList.appendChild(card);
		});

		clanDuplicateWarning.appendChild(matchList);

	}).catch(function () {
		clanDuplicateWarning.textContent =
			'Unable to check the Clan Directory for matching names.';
	});
}

clanNameInput.addEventListener('blur', checkDuplicateClanName);
	
		var selectedShield = null;

	document.getElementById('s4-clan-shield-button').addEventListener('click', function () {
		openShieldPicker();
	});

	function openShieldPicker() {
		var existing = document.getElementById('s4-shield-picker');

		if (existing) {
			existing.remove();
		}

		var picker = document.createElement('div');
		picker.id = 's4-shield-picker';

		picker.innerHTML = `
			<div>
				<strong>Choose Clan Shield</strong>
				<button type="button" id="s4-shield-picker-close">Close</button>
			</div>

			<div id="s4-shield-picker-grid">
				Loading shields...
			</div>
		`;

		var shieldField =
	document.getElementById('s4-clan-shield-button')
		.closest('.s4-clan-form-field');

shieldField.insertAdjacentElement('afterend', picker);

		document.getElementById('s4-shield-picker-close').addEventListener('click', function () {
			picker.remove();
		});

		loadShieldImages();
	}

	function loadShieldImages() {
		var grid = document.getElementById('s4-shield-picker-grid');
		var api = new mw.Api();

		function fetchShieldFiles(continueToken, files) {
			var params = {
				action: 'query',
				list: 'allimages',
				aiprefix: 'ClanShield_',
				aiprop: 'url',
				ailimit: 'max',
				formatversion: 2
			};

			if (continueToken) {
				params.aicontinue = continueToken;
			}

			return api.get(params).then(function (response) {
				if (response.query && response.query.allimages) {
					Array.prototype.push.apply(files, response.query.allimages);
				}

				if (response.continue && response.continue.aicontinue) {
					return fetchShieldFiles(response.continue.aicontinue, files);
				}

				return files;
			});
		}

		fetchShieldFiles(null, []).then(function (files) {
			var shields = [];

			files.forEach(function (file) {
				var match = file.name.match(/^ClanShield_(\d+)\.png$/i);

				if (!match || !file.url) {
					return;
				}

				shields.push({
					number: parseInt(match[1], 10),
					url: file.url
				});
			});

			shields.sort(function (a, b) {
				return a.number - b.number;
			});

			grid.innerHTML = '';

			if (shields.length === 0) {
				grid.textContent = 'No clan shields were found.';
				return;
			}

			shields.forEach(function (shieldData) {
				var number = shieldData.number;
				var button = document.createElement('button');

				button.type = 'button';
				button.dataset.shield = number;

				var image = document.createElement('img');
				image.src = shieldData.url;
				image.alt = 'Clan Shield ' + number;
				image.width = 40;

				button.appendChild(image);

				button.addEventListener('click', function () {
					selectedShield = number;

					document.getElementById('s4-clan-shield-value').value = number;
					validateClanForm();

					var display = document.getElementById('s4-clan-shield-selected');
					display.innerHTML = '';

					var preview = image.cloneNode(true);
					preview.width = 40;
					preview.style.verticalAlign = 'middle';
					preview.style.marginLeft = '8px';
					preview.style.marginRight = '6px';

					display.appendChild(preview);
					display.appendChild(
						document.createTextNode(
							'Shield ' + String(number).padStart(3, '0')
						)
					);

					var picker = document.getElementById('s4-shield-picker');

					if (picker) {
						picker.remove();
					}
				});

				grid.appendChild(button);
			});
		}).catch(function () {
			grid.textContent = 'Unable to load clan shields.';
		});
	}

});


// =========================================================
// CLAN DIRECTORY - EDIT CLAN FORM
// =========================================================

mw.hook('wikipage.content').add(function () {
	var container =
		document.getElementById('s4-edit-clan-form');

	if (!container) {
		return;
	}

	
	// Prevent duplicate initialization if MediaWiki fires the content hook again.
	if (container.dataset.s4EditClanReady === 'true') {
		return;
	}

	container.dataset.s4EditClanReady = 'true';

	var currentUserId =
		mw.config.get('wgUserId');

	if (!currentUserId) {
		container.innerHTML =
			'<div class="s4-clan-account-note">' +
			'<strong>You must be logged in to edit a clan listing.</strong>' +
			'</div>';

		return;
	}

	container.innerHTML =
	'<div id="s4-edit-clan-status">' +
	'Loading clan listings...' +
	'</div>';

var api = new mw.Api();
var clanConfig = null;

loadS4ClanConfig()
	.then(function (config) {
		clanConfig = config;

		return api.get({
			action: 'query',
			prop: 'revisions',
			titles: clanConfig.dataPage,
			rvprop: 'content',
			rvslots: 'main',
			formatversion: 2
		});
	})
	.then(function (response) {

	var page = response.query.pages[0];
	var source =
		page.revisions[0].slots.main.content;

	var allClans = [];
	var clans = [];
	var authorizedEditKeyHash = '';

	var entryRegex =
		/\{\{\s*ClanEntry\b([\s\S]*?)\}\}/gi;

	var match;

	function getParam(block, name) {
		var regex = new RegExp(
			'(?:^|\\n)[ \\t]*\\|[ \\t]*' +
			name +
			'[ \\t]*=[ \\t]*([^\\r\\n]*)',
			'i'
		);

		var paramMatch =
			block.match(regex);

		return paramMatch
			? paramMatch[1].trim()
			: '';
	}


	function normalizeEditClanKey(value) {
		return (value || '')
			.trim()
			.replace(/[\s-]/g, '')
			.toUpperCase();
	}


	function hashEditClanKey(value) {
		var normalizedKey =
			normalizeEditClanKey(value);

		var encoded =
			new TextEncoder().encode(
				normalizedKey
			);

		return window.crypto.subtle
			.digest(
				'SHA-256',
				encoded
			)
			.then(function (buffer) {
				return Array.prototype.map.call(
					new Uint8Array(buffer),
					function (byte) {
						return byte
							.toString(16)
							.padStart(2, '0');
					}
				).join('');
			});
	}


	while (
		(match = entryRegex.exec(source)) !== null
	) {
		var block = match[1];

		var editKeyHash =
			getParam(
				block,
				'editkeyhash'
			);

		if (!editKeyHash) {
			continue;
		}

		allClans.push({
			id: getParam(block, 'id'),
			name: getParam(block, 'name'),
			shield: getParam(block, 'shield'),
			pitch: getParam(block, 'pitch'),
			discord: getParam(block, 'discord'),
			website: getParam(block, 'website'),
			added: getParam(block, 'added'),
			updated: getParam(block, 'updated'),
			active: getParam(block, 'active'),
			editkeyhash: editKeyHash
		});
	}


	container.innerHTML =
		'<div class="s4-clan-form">' +

		'<div class="s4-clan-form-field">' +
		'<label for="s4-edit-clan-key">' +
		'<strong>Clan Edit Key</strong>' +
		'</label><br>' +

		'<div style="display:flex; align-items:center; gap:8px; max-width:100%;">' +

'<input ' +
'type="text" ' +
'id="s4-edit-clan-key" ' +
'placeholder="Enter your Clan Edit Key" ' +
'autocomplete="off" ' +
'style="width:50%; box-sizing:border-box;">' +

'<button type="button" id="s4-edit-clan-unlock">' +
'Unlock Clan' +
'</button>' +

'</div>' +

		'<div id="s4-edit-clan-key-status"></div>' +
		'</div>' +

		'<div id="s4-edit-clan-selection" style="display:none;">' +

		'<div class="s4-clan-form-field">' +
		'<label for="s4-edit-clan-select">' +
		'<strong>Select Clan</strong>' +
		'</label><br>' +

		'<select id="s4-edit-clan-select">' +
		'<option value="">Choose a clan...</option>' +
		'</select>' +
		'</div>' +

		'<div id="s4-edit-clan-fields"></div>' +

		'</div>' +
		'</div>';


	var editKeyInput =
		document.getElementById(
			's4-edit-clan-key'
		);

	var unlockButton =
		document.getElementById(
			's4-edit-clan-unlock'
		);

	var keyStatus =
		document.getElementById(
			's4-edit-clan-key-status'
		);

	var selectionContainer =
		document.getElementById(
			's4-edit-clan-selection'
		);

	var clanSelect =
		document.getElementById(
			's4-edit-clan-select'
		);

	var fieldsContainer =
		document.getElementById(
			's4-edit-clan-fields'
		);


	function unlockClanListings() {

		var enteredKey =
			editKeyInput.value.trim();

		if (!enteredKey) {
			keyStatus.textContent =
				'Enter your Clan Edit Key.';
			return;
		}

		keyStatus.textContent =
			'Checking Clan Edit Key...';

		unlockButton.disabled = true;

		hashEditClanKey(enteredKey)
			.then(function (enteredHash) {

				clans =
					allClans.filter(
						function (clan) {
							return (
								clan.editkeyhash.toLowerCase() ===
								enteredHash.toLowerCase()
							);
						}
					);

				if (clans.length === 0) {

					authorizedEditKeyHash = '';

					selectionContainer.style.display =
						'none';

					fieldsContainer.innerHTML = '';

					clanSelect.innerHTML =
						'<option value="">Choose a clan...</option>';

					keyStatus.textContent =
						'No clan listing matches that Clan Edit Key.';

					return;
				}

				authorizedEditKeyHash =
					enteredHash;

				clanSelect.innerHTML =
					'<option value="">Choose a clan...</option>';

				clans.forEach(function (clan) {

					var option =
						document.createElement(
							'option'
						);

					option.value =
						clan.id;

					option.textContent =
						clan.name;

					clanSelect.appendChild(
						option
					);
				});

				fieldsContainer.innerHTML = '';

				selectionContainer.style.display =
					'block';

				keyStatus.textContent =
					clans.length === 1
						? 'Clan Edit Key accepted.'
						: 'Clan Edit Key accepted. Select the clan you want to edit.';
			})
			.catch(function () {

				authorizedEditKeyHash = '';

				selectionContainer.style.display =
					'none';

				keyStatus.textContent =
					'Unable to verify the Clan Edit Key.';
			})
			.finally(function () {
				unlockButton.disabled = false;
			});
	}


	unlockButton.addEventListener(
		'click',
		unlockClanListings
	);


	editKeyInput.addEventListener(
		'keydown',
		function (event) {

			if (event.key !== 'Enter') {
				return;
			}

			event.preventDefault();

			unlockClanListings();
		}
	);


function escapeHtml(value) {
	return $('<div>')
		.text(value || '')
		.html();
}


function sanitizeEditClanText(value) {
	return value
		.replace(/\r?\n/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\|/g, '&#124;')
		.replace(/\{/g, '&#123;')
		.replace(/\}/g, '&#125;')
		.replace(/\[/g, '&#91;')
		.replace(/\]/g, '&#93;');
}


function getEditOptionalUrl(input, fieldName) {
	var value = input.value.trim();

	if (!value) {
		return '';
	}

	try {
		var url = new URL(value);

		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			throw new Error();
		}

		return url.href;
	} catch (error) {
		throw new Error(
			fieldName + ' must be a valid http:// or https:// address.'
		);
	}
}


function validateCurrentEditForm() {
	var nameInput = document.getElementById('s4-edit-clan-name');
	var pitchInput = document.getElementById('s4-edit-clan-pitch');
	var shieldValue = document.getElementById('s4-edit-clan-shield-value');
	var saveButton = document.getElementById('s4-edit-clan-save');

	if (!nameInput || !pitchInput || !shieldValue || !saveButton) {
		return;
	}

	var nameLength =
		nameInput.value.trim().length;

	var pitchLength =
		pitchInput.value.trim().length;

	var hasName =
		nameLength > 0 &&
		nameLength <= clanConfig.maxClanNameLength;

	var hasPitch =
		pitchLength > 0 &&
		pitchLength <= clanConfig.maxClanAboutLength;

	var hasShield = shieldValue.value !== '';

	saveButton.disabled = !(hasName && hasPitch && hasShield);
}


function saveEditedClan() {
	var selectedId = clanSelect.value;
	var nameInput = document.getElementById('s4-edit-clan-name');
	var pitchInput = document.getElementById('s4-edit-clan-pitch');
	var shieldValue = document.getElementById('s4-edit-clan-shield-value');
	var discordInput = document.getElementById('s4-edit-clan-discord');
	var websiteInput = document.getElementById('s4-edit-clan-website');
	var saveButton = document.getElementById('s4-edit-clan-save');
	var saveStatus = document.getElementById('s4-edit-clan-save-status');

	if (
		!selectedId ||
		!nameInput ||
		!pitchInput ||
		!shieldValue ||
		!discordInput ||
		!websiteInput ||
		!saveButton ||
		!saveStatus
	) {
		return;
	}

	var rawName = nameInput.value.trim();
	var rawPitch = pitchInput.value.trim();
	var shield = shieldValue.value;

	if (!rawName || !rawPitch || !shield) {
		saveStatus.textContent =
			'Clan name, shield, and About Your Clan are required.';
		validateCurrentEditForm();
		return;
	}

	if (rawName.length > clanConfig.maxClanNameLength) {
		saveStatus.textContent =
			'Clan name cannot exceed ' +
			clanConfig.maxClanNameLength +
			' characters.';
		validateCurrentEditForm();
		return;
	}

	if (rawPitch.length > clanConfig.maxClanAboutLength) {
		saveStatus.textContent =
			'About Your Clan cannot exceed ' +
			clanConfig.maxClanAboutLength +
			' characters.';
		validateCurrentEditForm();
		return;
	}

	var discord;
	var website;

	try {
		discord = getEditOptionalUrl(discordInput, 'Discord link');
		website = getEditOptionalUrl(websiteInput, 'Website');
	} catch (error) {
		saveStatus.textContent = error.message;
		return;
	}

	var clanName = sanitizeEditClanText(rawName);
var clanPitch = sanitizeEditClanText(rawPitch);

var updatedDate = new Date()
	.toISOString()
	.slice(0, 10);

var originalButtonText = saveButton.textContent;

	saveStatus.textContent = '';
	saveButton.disabled = true;
	saveButton.textContent = 'Saving Changes...';

	api.edit(
		clanConfig.dataPage,
		function (revision) {
			var latestSource = revision.content;
			var fullEntryRegex = /\{\{\s*ClanEntry\b[\s\S]*?\}\}/gi;
			var entryMatch;
			var targetEntry = null;
			var targetIndex = -1;

			while ((entryMatch = fullEntryRegex.exec(latestSource)) !== null) {
				if (getParam(entryMatch[0], 'id') === selectedId) {
					targetEntry = entryMatch[0];
					targetIndex = entryMatch.index;
					break;
				}
			}

			if (!targetEntry || targetIndex === -1) {
				throw new Error('The selected clan could not be found.');
			}

			var storedEditKeyHash =
	getParam(
		targetEntry,
		'editkeyhash'
	);

if (
	!authorizedEditKeyHash ||
	!storedEditKeyHash ||
	storedEditKeyHash.toLowerCase() !==
		authorizedEditKeyHash.toLowerCase()
) {
	throw new Error(
		'The Clan Edit Key no longer matches this clan listing.'
	);
}

			var added =
	getParam(
		targetEntry,
		'added'
	);

var verified =
	getParam(
		targetEntry,
		'verified'
	);

var active =
	getParam(
		targetEntry,
		'active'
	) || 'yes';

var editKeyHash =
	getParam(
		targetEntry,
		'editkeyhash'
	);
			var verifiedDates = verified
				? verified.split(',').map(function (date) {
					return date.trim();
				}).filter(Boolean)
				: [];

			if (verifiedDates.indexOf(updatedDate) === -1) {
				verifiedDates.push(updatedDate);
}

verified = verifiedDates.join(',');

			var replacement = [
				'{{ClanEntry',
				'|id=' + selectedId,
				'|name=' + clanName,
				'|shield=' + shield,
				'|pitch=' + clanPitch,
				'|discord=' + discord,
				'|website=' + website,
				'|added=' + added,
				'|updated=' + updatedDate,
				'|verified=' + verified,
				'|active=' + active,
				'|editkeyhash=' + editKeyHash,
				'}}'
			].join('\n');

			latestSource =
				latestSource.slice(0, targetIndex) +
				replacement +
				latestSource.slice(targetIndex + targetEntry.length);

			return {
				text: latestSource,
				summary: 'Update clan in Clan Directory: ' + rawName
			};
		}
	).then(
		function () {
			var clan = clans.find(function (item) {
				return item.id === selectedId;
			});

			if (clan) {
	clan.name = rawName;
	clan.shield = shield;
	clan.pitch = rawPitch;
	clan.discord = discord;
	clan.website = website;
	clan.updated = updatedDate;
}

			var option = clanSelect.querySelector(
				'option[value="' + selectedId + '"]'
			);

			if (option) {
				option.textContent = rawName;
			}

			saveButton.textContent = originalButtonText;
saveStatus.textContent =
	'Clan updated successfully. Returning to Clan Directory...';

setTimeout(function () {
	window.location.href = mw.util.getUrl('Clan Directory');
}, 1500);
		},
		function (code) {
			saveButton.textContent = originalButtonText;
			validateCurrentEditForm();

			if (code === 'editconflict') {
				saveStatus.textContent =
					'The Clan Directory changed while you were editing. Please save again.';
				return;
			}

			saveStatus.textContent =
				'Unable to update the clan. No changes were made.';
		}
	);
}


function renderClanFields(clan) {
	if (!clan) {
		fieldsContainer.innerHTML = '';
		return;
	}

	var shieldNumber =
		parseInt(clan.shield, 10);

	var shieldFile =
		'ClanShield_' +
		String(shieldNumber).padStart(3, '0') +
		'.png';

	var shieldUrl =
		mw.util.getUrl(
			'Special:Redirect/file/' + shieldFile
		);

	var nameLength =
		(clan.name || '').length;

	var nameRemaining =
		clanConfig.maxClanNameLength -
		nameLength;

	var pitchLength =
		(clan.pitch || '').length;

	var remaining =
		clanConfig.maxClanAboutLength -
		pitchLength;

	fieldsContainer.innerHTML = `
		<div class="s4-clan-form-field">
			<label for="s4-edit-clan-name">
				<strong>Clan Name</strong>
				<small>— ${clanConfig.maxClanNameLength} characters maximum</small>
			</label><br>

			<input
				type="text"
				id="s4-edit-clan-name"
				maxlength="${clanConfig.maxClanNameLength}"
				value="${escapeHtml(clan.name)}"
			>
			
			<div id="s4-edit-clan-name-count">
				${nameRemaining} ${
				nameRemaining === 1
				? 'character remaining'
				: 'characters remaining'
	}
			</div>
		</div>


		<div class="s4-clan-form-field">
	<strong>Clan Shield</strong><br>

	<button type="button" id="s4-edit-clan-shield-button">
		Change Shield
	</button>

	<span id="s4-edit-clan-shield-selected">
		<img
			src="${shieldUrl}"
			alt="${escapeHtml(clan.name)} clan shield"
			width="40"
			style="vertical-align:middle; margin-left:8px; margin-right:6px;"
		>
		Shield ${String(shieldNumber).padStart(3, '0')}
	</span>

	<input
		type="hidden"
		id="s4-edit-clan-shield-value"
		value="${shieldNumber}"
	>
</div>


		<div class="s4-clan-form-field">
			<label for="s4-edit-clan-pitch">
				<strong>About Your Clan</strong>
				<small>— ${clanConfig.maxClanAboutLength} characters maximum</small>
			</label><br>

			<div id="s4-edit-clan-pitch-count">
				${remaining} ${
					remaining === 1
						? 'character remaining'
						: 'characters remaining'
				}
			</div>

			<textarea
				id="s4-edit-clan-pitch"
				rows="5"
				maxlength="${clanConfig.maxClanAboutLength}"
			>${escapeHtml(clan.pitch)}</textarea>
		</div>


		<div class="s4-clan-form-field">
			<label for="s4-edit-clan-discord">
				<strong>Discord Invite</strong>
				<small>(optional)</small>
			</label><br>

			<input
				type="url"
				id="s4-edit-clan-discord"
				value="${escapeHtml(clan.discord)}"
				placeholder="https://discord.gg/..."
			>
			<div id="s4-edit-clan-discord-note" class="s4-clan-field-note" style="display:none;">
	<strong>Important:</strong> Discord invite links can expire.

	For a long-term Clan Directory listing, create an invite that will remain valid.
	In Discord, open your server, choose <strong>Create Invite</strong>, then select
	<strong>Edit Invite Link</strong> before copying it.

	If your server has <strong>Community</strong> enabled, set
	<strong>Expire After</strong> to <strong>Never</strong> and
	<strong>Max Number of Uses</strong> to <strong>No Limit</strong>.

	Without Community enabled, Discord currently limits invite links to a maximum
	of 30 days, so you may need to update your clan listing when the invite expires.
</div>
		</div>


		<div class="s4-clan-form-field">
			<label for="s4-edit-clan-website">
				<strong>Website</strong>
				<small>(optional)</small>
			</label><br>

			<input
				type="url"
				id="s4-edit-clan-website"
				value="${escapeHtml(clan.website)}"
				placeholder="https://..."
			>
		</div>


		<div class="s4-clan-form-field">
			<button type="button" id="s4-edit-clan-save">
				Save Changes
			</button>

			<button type="button" id="s4-edit-clan-cancel" style="margin-left:8px;">
				Cancel
			</button>

			<div id="s4-edit-clan-save-status"></div>
		</div>
	`;


	// Live About-character counter
	var pitchInput =
		document.getElementById(
			's4-edit-clan-pitch'
		);

	var pitchCount =
		document.getElementById(
			's4-edit-clan-pitch-count'
		);

	pitchInput.addEventListener(
		'input',
		function () {
			var remaining =
				clanConfig.maxClanAboutLength -
				pitchInput.value.length;

			pitchCount.textContent =
				remaining +
				(remaining === 1
					? ' character remaining'
					: ' characters remaining');
		}
	);

	var editDiscordInput =
		document.getElementById('s4-edit-clan-discord');

	var editDiscordNote =
		document.getElementById('s4-edit-clan-discord-note');

	function updateEditDiscordNote() {
		if (
			document.activeElement === editDiscordInput ||
			editDiscordInput.value.trim() !== ''
		) {
			editDiscordNote.style.display = 'block';
		} else {
			editDiscordNote.style.display = 'none';
		}
	}

	editDiscordInput.addEventListener('focus', updateEditDiscordNote);
	editDiscordInput.addEventListener('input', updateEditDiscordNote);
	editDiscordInput.addEventListener('blur', updateEditDiscordNote);

	updateEditDiscordNote();

	// Change Shield button
	var editShieldButton =
		document.getElementById(
			's4-edit-clan-shield-button'
		);

	if (editShieldButton) {
		editShieldButton.addEventListener(
			'click',
			openEditShieldPicker
		);
	}

	var editNameInput =
	document.getElementById('s4-edit-clan-name');

	var editNameCount =
	document.getElementById('s4-edit-clan-name-count');

	var editSaveButton =
		document.getElementById('s4-edit-clan-save');

	var editCancelButton =
		document.getElementById('s4-edit-clan-cancel');

	if (editNameInput && editNameCount) {
	editNameInput.addEventListener(
		'input',
		function () {
			var remaining =
				clanConfig.maxClanNameLength -
				editNameInput.value.length;

			editNameCount.textContent =
				remaining +
				(remaining === 1
					? ' character remaining'
					: ' characters remaining');

			validateCurrentEditForm();
		}
	);
}

	pitchInput.addEventListener(
		'input',
		validateCurrentEditForm
	);

	if (editSaveButton) {
		editSaveButton.addEventListener(
			'click',
			saveEditedClan
		);
	}

	if (editCancelButton) {
		editCancelButton.addEventListener('click', function () {
			window.location.href = mw.util.getUrl('Clan Directory');
		});
	}

	validateCurrentEditForm();
}


function openEditShieldPicker() {
	var existing =
		document.getElementById(
			's4-shield-picker'
		);

	if (existing) {
		existing.remove();
	}

	var picker =
		document.createElement('div');

	picker.id = 's4-shield-picker';

	picker.innerHTML = `
		<div>
			<strong>Choose Clan Shield</strong>
			<button type="button" id="s4-shield-picker-close">Close</button>
		</div>

		<div id="s4-shield-picker-grid">
			Loading shields...
		</div>
	`;

	var shieldField =
	document.getElementById('s4-edit-clan-shield-button')
		.closest('.s4-clan-form-field');

shieldField.insertAdjacentElement('afterend', picker);

	document
		.getElementById('s4-shield-picker-close')
		.addEventListener('click', function () {
			picker.remove();
		});

	loadEditShieldImages();
}


function loadEditShieldImages() {
	var grid =
		document.getElementById(
			's4-shield-picker-grid'
		);

	var shieldApi = new mw.Api();

	function fetchShieldFiles(continueToken, files) {
		var params = {
			action: 'query',
			list: 'allimages',
			aiprefix: 'ClanShield_',
			aiprop: 'url',
			ailimit: 'max',
			formatversion: 2
		};

		if (continueToken) {
			params.aicontinue = continueToken;
		}

		return shieldApi.get(params).then(function (response) {
			if (response.query && response.query.allimages) {
				Array.prototype.push.apply(files, response.query.allimages);
			}

			if (response.continue && response.continue.aicontinue) {
				return fetchShieldFiles(response.continue.aicontinue, files);
			}

			return files;
		});
	}

	fetchShieldFiles(null, []).then(function (files) {
		var shields = [];

		files.forEach(function (file) {
			var match = file.name.match(/^ClanShield_(\d+)\.png$/i);

			if (!match || !file.url) {
				return;
			}

			shields.push({
				number: parseInt(match[1], 10),
				url: file.url
			});
		});

		shields.sort(function (a, b) {
			return a.number - b.number;
		});

		grid.innerHTML = '';

		if (shields.length === 0) {
			grid.textContent = 'No clan shields were found.';
			return;
		}

		shields.forEach(function (shieldData) {
			var number = shieldData.number;
			var button = document.createElement('button');

			button.type = 'button';
			button.dataset.shield = number;

			var image = document.createElement('img');
			image.src = shieldData.url;
			image.alt = 'Clan Shield ' + number;
			image.width = 40;

			button.appendChild(image);

			button.addEventListener('click', function () {
				var shieldValue =
					document.getElementById(
						's4-edit-clan-shield-value'
					);

				var display =
					document.getElementById(
						's4-edit-clan-shield-selected'
					);

				if (!shieldValue || !display) {
					return;
				}

				shieldValue.value = number;
				validateCurrentEditForm();
				display.innerHTML = '';

				var preview = image.cloneNode(true);
				preview.width = 40;
				preview.style.verticalAlign = 'middle';
				preview.style.marginLeft = '8px';
				preview.style.marginRight = '6px';

				display.appendChild(preview);
				display.appendChild(
					document.createTextNode(
						'Shield ' + String(number).padStart(3, '0')
					)
				);

				var picker = document.getElementById('s4-shield-picker');

				if (picker) {
					picker.remove();
				}
			});

			grid.appendChild(button);
		});
	}).catch(function () {
		grid.textContent = 'Unable to load clan shields.';
	});
}


clanSelect.addEventListener(
	'change',
	function () {
		var selectedId =
			clanSelect.value;

		if (!selectedId) {
			fieldsContainer.innerHTML = '';
			return;
		}

		var selectedClan =
			clans.find(function (clan) {
				return clan.id === selectedId;
			});

		renderClanFields(selectedClan);
	}
);

	}).catch(function () {
		container.innerHTML =
			'<div class="s4-clan-account-note">' +
			'Unable to load clan listings.' +
			'</div>';
	});
});