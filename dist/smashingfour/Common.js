(function () {
  "use strict";

  // ------------------------------------------------------------
  // Smashing Four Win Calculator UI
  // ------------------------------------------------------------

  var INIT_ATTR = "data-s4wc-initialized";

  // Emergency fallbacks.
  // Normal values are loaded from Module:S4GameConfig.
  var DEFAULT_DAMAGE_WEIGHT = 4;
  var DEFAULT_SCALE = 1800;

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
        api.parse("{{#invoke:S4GameConfig|calcScale}}")
      ]).then(function (results) {

        var dmgW =
          parseFloat(parseApiText(results[0]));

        var scale =
          parseFloat(parseApiText(results[1]));

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

        DEFAULT_DAMAGE_WEIGHT = dmgW;
        DEFAULT_SCALE = scale;
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
              'value="' +
              DEFAULT_SCALE +
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

      var dmgW =
        dmgWInput
          ? String(dmgWInput.value || DEFAULT_DAMAGE_WEIGHT).trim()
          : String(DEFAULT_DAMAGE_WEIGHT);

      var scale =
        scaleInput
          ? String(scaleInput.value || DEFAULT_SCALE).trim()
          : String(DEFAULT_SCALE);

      params.push(
        "dmgW=" + dmgW
      );

      params.push(
        "scale=" + scale
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
          el.value =
            String(
              DEFAULT_SCALE
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