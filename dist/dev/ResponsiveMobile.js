/**
 * ResponsiveMobile-JS
 * The JS version of the script
 * @author SuperDragonXD1
 */

/* global mw, $ */
(function () {
  if (window.RSMLoaded || mw.config.get("skin") !== "fandomdesktop") {
    return;
  }

  window.RSMLoaded = true;
  const conf = mw.config.get([
    "wgServer",
    "isDarkTheme",
    "wgUserGroups",
    "wgEnableDiscussions"
  ]);

  /* Generetes the wiki name */
  function createWikiName(ui) {
    const wikiInfo = {
      logo: "",
      display: $(".fandom-sticky-header__sitename").text(),
      link: $(".fandom-sticky-header__sitename").attr("href")
    };
    const wikiSitename = ui.a({
      class: "global-navigation__wiki-name",
      href: wikiInfo.link,
      children: [
        ui.span({
          text: wikiInfo.display
        })
      ]
    });
    const fandomLogo = $("a.global-navigation__logo");
    fandomLogo.after(wikiSitename);
  }

  /* Generates the wiki menu */
  function createWikiMenu(ui) {
    /****** Helper functions */
    function themeTracking() {
      if (conf.isDarkTheme) {
        return "theme-switch-light";
      } else {
        return "theme-switch-dark";
      }
    }

    function isContentModOrAbove() {
      return /sysop|staff|helper|wiki-representative|wiki-specialist|content-moderator|soap/.test(
        conf.wgUserGroups
      );
    }

    function isSysopOrAbove() {
      return /sysop|staff|helper|wiki-representative|wiki-specialist|soap/.test(
        conf.wgUserGroups
      );
    }

    /****** Builder functions */
    function createListItem(ui, class_, icon, link, text, dataLabel) {
      var iconItem = "";

      if (icon) {
        iconItem = ui.svg({
          class: "wds-icon wds-icon-tiny",
          child: ui.use({
            "xlink:href": "#wds-icons-" + icon + "-tiny"
          })
        });
      }

      const listItem = ui.li({
        child: ui.a({
          href: link,
          class: class_ ? "wiki-menu__" + class_ : "",
          children: [iconItem, text],
          "data-tracking-label": dataLabel
        })
      });
      return listItem;
    }

    function themePill(ui) {
      const darkTheme = conf.isDarkTheme;
      const lightToggle = ui.button({
        classes: {
          "wds-switch__item": true,
          "is-active": !darkTheme // lightTheme
        },
        type: "button",
        children: [
          ui.svg({
            class: "wds-icon wds-icon-tiny",
            child: ui.use({
              "xlink:href": "#wds-icons-sun-tiny"
            })
          }),
          ui.span({
            text: "Light mode"
          })
        ]
      });
      const darkToggle = ui.button({
        classes: {
          "wds-switch__item": true,
          "is-active": darkTheme
        },
        type: "button",
        children: [
          ui.svg({
            class: "wds-icon wds-icon-tiny",
            child: ui.use({
              "xlink:href": "#wds-icons-moon-tiny"
            })
          }),
          ui.span({
            text: "Dark mode"
          })
        ]
      });
      const mainList = ui.li({
        child: ui.a({
          class: "wiki-tools__theme-switch",
          href: "#",
          "data-tracking": themeTracking(),
          child: ui.div({
            class: "wds-switch__wrapper",
            children: [lightToggle, darkToggle]
          })
        })
      });
      return mainList;
    }

    function createListItems(ui) {
      const ulList = [];
      const wikiMenuTitle = ui.li({
        text: "Wiki tools",
        class: "wiki-menu__header"
      });
      ulList.push(
        wikiMenuTitle,
        themePill(ui),
        createListItem(ui, "home", "home", "/", "Home", "home")
      );
      if (conf.wgEnableDiscussions)
        ulList.push(
          createListItem(
            ui,
            "discussions",
            "discussions",
            "/f",
            "Discussions",
            "discuss"
          )
        );
      ulList.push(
        createListItem(
          ui,
          "recent-changes",
          "activity",
          "/wiki/Special:RecentChanges",
          "Recent changes",
          "rc"
        ),
        ui.li({
          class: "wiki-menu__seperator"
        }),
        createListItem(
          ui,
          "add-new-page",
          "",
          "/wiki/Special:CreatePage",
          "Add new page",
          "add-new-page"
        ),
        createListItem(
          ui,
          "upload",
          "",
          "/wiki/Special:Upload",
          "Upload New File",
          "upload-new-file"
        )
      );

      if (isContentModOrAbove()) {
        ulList.push(
          createListItem(
            ui,
            "",
            "",
            "/wiki/Special:AdminDashboard",
            "Admin Dashboard",
            "admin-dashboard"
          )
        );
      }

      if (isSysopOrAbove()) {
        ulList.push(
          createListItem(
            ui,
            "",
            "",
            "/wiki/Special:ThemeDesigner",
            "Theme Designer",
            "theme-designer"
          ),
          createListItem(
            ui,
            "",
            "",
            "/wiki/Special:Analytics",
            "Analytics",
            "analytics"
          )
        );
      }

      ulList.push(
        createListItem(
          ui,
          "",
          "",
          "/wiki/Special:SpecialPages",
          "Special Pages",
          "special-pages"
        )
      );
      return ulList;
    }

    function createDropdown(ui) {
      const toggle = ui.div({
        class: "wds-dropdown__toggle",
        child: ui.div({
          class: "global-navigation__icon",
          children: [
            ui.svg({
              class: "wds-icon wds-icon-small",
              child: ui.use({
                "xlink:href": "#wds-icons-left-align-small"
              })
            }),
            ui.svg({
              class: "wds-icon wds-icon-tiny wds-dropdown__toggle-chevron",
              child: ui.use({
                "xlink:href": "#wds-icons-dropdown-tiny"
              })
            })
          ]
        })
      });
      const content = ui.div({
        class: "wds-dropdown__content",
        child: ui.ul({
          class: "wds-list wds-is-linked",
          children: createListItems(ui)
        })
      });
      const dropdown = ui.div({
        id: "wikiMenu",
        class: "wiki-menu wds-dropdown is-attached-to-bottom wds-open-to-right",
        children: [toggle, content]
      });
      return dropdown;
    }

    function initMenu(ui) {
      const wikiMenu = createDropdown(ui);
      $(".global-navigation__bottom > .notifications").after(wikiMenu);
    }

    initMenu(ui);
  }

  /* Mutation Observer - re-adds the "fandom-sticky-header-visible" class */
  function returnStickyHeaderClass() {
    const stickyHeader = $(".fandom-sticky-header");
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (stickyHeader.hasClass("is-visible")) {
          $("body").addClass("fandom-sticky-header-visible");
        } else {
          $("body").removeClass("fandom-sticky-header-visible");
        }
      });
    });
    observer.observe(stickyHeader[0], {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  function createWikiMenuLinks() {
  	console.warn("This feature is very experimental!")
  	
    (function ($) {
      $.fn.changeElementType = function (newType) {
        var attrs = {};
        $.each(this[0].attributes, function (idx, attr) {
          attrs[attr.nodeName] = attr.nodeValue;
        });
        this.replaceWith(function () {
          return $("<" + newType + "/>", attrs).append($(this).contents());
        });
      };
    })(jQuery);

    const clonedWikiNav = $(
      ".fandom-community-header .fandom-community-header__local-navigation .wds-tabs"
    )
      .clone()
      .insertBefore("#wikiMenu > .wds-dropdown__content > .wds-list");

    clonedWikiNav
      .addClass("wiki-menu__contents")
      .removeClass("wds-collapsible-panel")
      .removeClass("wds-tabs");

    clonedWikiNav.each(function (index, element) {
      const $element = $(element);

      // 1st level
      $element.find("> li	").changeElementType("details");

      $element
        .find(".wds-dropdown__toggle.first-level-item")
        .removeClass("wds-dropdown__toggle")
        .removeClass("first-level-item")
        .changeElementType("summary");

      $element.find(".wds-dropdown__content").attr("class", "summary_content");

      // 2nd level
      $element
        .find("li.wds-dropdown-level-nested")
        .changeElementType("details");

      $element
        .find(".wds-dropdown-level-nested__toggle")
        .changeElementType("summary");

      $element
        .find(".wds-is-not-scrollable.wds-dropdown-level-nested__content")
        .attr("class", "summary_content");

      $element.find(".wds-dropdown").removeClass("wds-dropdown");
    });
  }
  
  /* Initialzes the script */
  function init(lib) {
    const ui = lib;
    
    /* Adds helper classes */
    $("body").addClass("responsivemobile-loaded");
    $("body").addClass("responsivemobile-js");
    
    // Init stuff
    createWikiMenu(ui);
    createWikiName(ui);
    returnStickyHeaderClass();
    if (window.RSMwikiMenuLinks) createWikiMenuLinks();
  }

  importArticles({
    articles: [
      "u:dev:MediaWiki:Dorui.js",
      "u:dev:MediaWiki:ResponsiveMobile.js/deps.css"
    ]
  });
  mw.hook("doru.ui").add(init);
})();