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
    "wgUserGroups"
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
    function discussionsExists() {
      const http = new XMLHttpRequest();
      http.open("HEAD", conf.wgServer + "/f", false);
      http.send();
      if (http.status != 404) return true;
      else return false;
    }

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
      var iconItem = '';
      
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
          class: class_ ? "wiki-menu__" + class_ : '',
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
     
     if (discussionsExists()) ulList.push(
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
          class: 'wiki-menu__seperator'
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
              }),
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
        children: [
          toggle,
          content
        ]
      });
      
      return dropdown;
    }
    
    function initMenu(ui) {
      const wikiMenu = createDropdown(ui);
      $(".global-navigation__bottom > .notifications").after(wikiMenu);
      
      // Todo: MutationObserver
      // https://stackoverflow.com/a/19401707
    }
    
    initMenu(ui);
  }

  /* Mutation Observer - re-adds the "fandom-sticky-header-visible" class */
  function returnStickyHeaderClass() {
    const stickyHeader = $(".fandom-sticky-header");
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (stickyHeader.hasClass("is-visible")) {
      $("body").addClass("fandom-sticky-header-visible")
    } else {
      $("body").removeClass("fandom-sticky-header-visible");
    } 
  });
});

observer.observe(stickyHeader[0], {
  attributes: true,
  attributeFilter: ['class']
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
    returnStickyHeaderClass()
    
    /*
 // Will do soon™

    $('.fandom-community-header .fandom-community-header__local-navigation .wds-dropdown').clone().insertBefore("#wikiMenu > .wds-dropdown__content > .wds-list")
    
    $('#wikiMenu .wiki-menu__header .fandom-community-header__local-navigation')
.addClass("wiki-menu__contents")
    $('#wikiMenu .wiki-menu__header .fandom-community-header__local-navigation')
.removeClass("fandom-community-header__local-navigation")
    
    const clonedLocalNav = $("#wikiMenu .wiki-menu__contents")

    
    clonedLocalNav.each(function(index, element) {
        const $element = $(element);
        $element.addClass('wds-collapsible-panel');
        $element.find('.wds-dropdown__toggle.first-level-item').addClass('wds-collapsible-panel__header');
        $element.find('.wds-dropdown__content').attr('class', 'wds-is-not-scrollable wds-collapsible-panel__content');
        $element.find('.wds-dropdown__toggle.first-level-item > .wds-dropdown__toggle-chevron').replaceWith(
            $('<svg class="wds-icon wds-icon-tiny wds-collapsible-panel__chevron"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg>')
        );
    })
*/
  }

  importArticle({
    type: "script",
    article: "u:dev:MediaWiki:Dorui.js"
  });
  
  importStylesheetPage("MediaWiki:ResponsiveMobile.js/deps.css", "dev");
  
  mw.hook("doru.ui").add(init);
})();