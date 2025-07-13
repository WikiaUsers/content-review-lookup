/* Any JavaScript here will be loaded for all users on every page load. */
/* =============================================================== */
/* ============ Library of Aries Master Common.js ================ */
/* ========== Built Different Fandom Script Suite ================ */
/* =============================================================== */

(function() {
  "use strict";

  /* ======================= CONFIG ======================== */
  window.dev = window.dev || {};
  dev.i18n = dev.i18n || {};
  var userLang = mw.config.get("wgUserLanguage");

  /* =================== AUTO REFRESH ====================== */
  window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
  ];
  window.AjaxRCRefreshText = "Auto-refresh";
  window.AjaxRCRefreshHoverText = "Automatically refresh this page";

  importArticles({
    type: "script",
    articles: [
      "u:dev:MediaWiki:AjaxRC/code.js",
      "u:dev:MediaWiki:ShowHide/code.js",
      "u:dev:MediaWiki:DisplayTimer/code.js",
      "u:dev:MediaWiki:BackToTopButton/code.js",
      "u:dev:MediaWiki:ReferencePopups/code.js",
      "u:dev:MediaWiki:Toggler.js",
      "u:dev:MediaWiki:Tooltips/code.js",
      "u:dev:MediaWiki:CollapsibleInfobox/code.js"
    ]
  });

  /* ============ SMOOTH SCROLL FOR ANCHORS =============== */
  $(document).ready(function () {
    $('a[href^="#"]').on("click", function (e) {
      var target = this.hash;
      var $target = $(target);
      if ($target.length) {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: $target.offset().top - 70
        }, 600);
      }
    });
  });

  /* ============ DARK MODE TOGGLE (Optional) ============= */
  // Replace with your own theme system if you want more control
  mw.loader.using("mediawiki.util", function() {
    if (!$('#darkModeToggle').length) {
      $('<div>', {
        id: "darkModeToggle",
        text: "🌓 Toggle Dark Mode",
        css: {
          cursor: "pointer",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "8px",
          backgroundColor: "#222",
          color: "#fff",
          borderRadius: "6px",
          zIndex: "9999"
        },
        click: function () {
          $('body').toggleClass("dark-theme");
        }
      }).appendTo("body");
    }
  });

  /* ============ PAGE-SPECIFIC JS LOADER ================ */
  var pageName = mw.config.get("wgPageName");
  var customScript = "MediaWiki:" + pageName + ".js";

  $.get(mw.util.wikiScript("api"), {
    action: "query",
    titles: customScript,
    format: "json"
  }).done(function (data) {
    var pages = data.query.pages;
    for (var id in pages) {
      if (!pages[id].missing) {
        importScript(customScript);
      }
    }
  });

  /* ============= DEVELOPER CONSOLE TOOLS =============== */
  window.LibraryOfAries = {
    log: function(msg) {
      console.log(`[LibraryOfAries] ${msg}`);
    },
    loadScript: function(url) {
      var s = document.createElement('script');
      s.src = url;
      document.head.appendChild(s);
    }
  };

  /* ====== HIDE NONESSENTIAL UI/ADS WHERE POSSIBLE ====== */
  mw.hook('wikipage.content').add(function ($content) {
    $content.find('.wds-global-footer, .fandom-sticky-header, .fandom-community-header__top-container, .wds-banner-notification').remove();
  });

  /* =============== INITIALIZE CONSOLE =================== */
  console.log("%cLibrary of Aries - Loaded", "color: cyan; font-size: 14px;");
})();

/* =================== STYLES FOR DARK THEME ============= */
mw.util.addCSS(`
body.dark-theme {
  background: #111 !important;
  color: #ddd !important;
}
.dark-theme a { color: #8ccfff !important; }
.dark-theme .mw-parser-output { background: #111 !important; }
.dark-theme .infobox, .dark-theme .WikiaInfobox { background: #222 !important; border-color: #333 !important; }
`);