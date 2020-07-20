(function ($, mw) {
  "use strict";

  var usefulButtons = usefulButtons || {};

  const config = mw.config.get([
    "wgCanonicalSpecialPageName",
    "wgNamespaceNumber",
    "wgUserName",
  ]);

  if (
    (
      $.inArray(config.wgNamespaceNumber, [2, 500, 1200]) === -1 &&
      config.wgCanonicalSpecialPageName !== "Contributions"
    ) ||
    $("#UserProfileMasthead h1").text() !== config.wgUserName||
    window.isUsefulButtonsLoaded
  ) {
    return;
  }
  window.isUsefulButtonsLoaded = true;

  usefulButtons.defaultButtonsArray = [
    {text: "My Userpage",      href: "Special:MyPage",            },
    {text: "My Sandbox",       href: "Special:MyPage/Sandbox",    },
    {text: "My Talkpage",      href: "Special:MyTalk",            },
    {text: "My Contributions", href: "Special:Contributions",     },
    {text: "My Activity",      href: "Special:UserActivity",      },
    {text: "Special Pages",    href: "Special:SpecialPages",      },
    {text: "Wiki Activity",    href: "Special:WikiActivity",      },
    {text: "Recent Changes",   href: "Special:RecentChanges",     },
    {text: "Wiki Logs",        href: "Special:Logs",              },
    {text: "Wiki Common.js",   href: "MediaWiki:Common.js",       },
    {text: "Wiki Common.css",  href: "MediaWiki:Common.css",      },
    {text: "Wiki.js",          href: "MediaWiki:Wikia.js",        },
    {text: "Wiki.css",         href: "MediaWiki:Wikia.css",       },
    {text: "Wiki Chat.js",     href: "MediaWiki:Chat.js",         },
    {text: "Wiki Chat.css",    href: "MediaWiki:Chat.css",        },
    {text: "My Common.js",     href: "Special:MyPage/common.js",  },
    {text: "My Common.css",    href: "Special:MyPage/common.css", },
    {text: "My Global.js",     href: "Special:MyPage/global.js",  },
    {text: "My Global.css",    href: "Special:MyPage/global.css", },
    {text: "My Wikia.js",      href: "Special:MyPage/Wikia.js",   },
    {text: "My Wikia.css",     href: "Special:MyPage/Wikia.css",  },
    {text: "My Chat.js",       href: "Special:MyPage/chat.js",    },
    {text: "My Chat.css",      href: "Special:MyPage/chat.css",   },
    {text: "Developer",        href: "w:c:dev:User:Anonminati",   },
    {text: "Join the Chat",    href: "Special:Chat",              },
  ];

  usefulButtons.determinePlacement = function () {
    switch (config.wgNamespaceNumber) {
      case 2: // Userpage
        return "#WikiaUserPagesHeader";
      case 500: // Blog
        return "#WikiaUserPagesHeader";
      case 1200: // Message wall
        return "#WikiaUserPagesHeader";
      default: // Contribs page
        return "#contentSub";
    }
  };

  usefulButtons.injectStyles = function () {
    mw.util.addCSS(
      ".useful-button {" +
        "margin-left: 2px;" +
        "border-style: solid;" +
        "border-color: #000000 !important;" +
        "width: 125px;" +
        "color: #FFFFFF;" +
      "}"
    );
  };

  usefulButtons.constructButton = function (paramText, paramHref) {
    return mw.html.element("a", {
      "class": "wds-button useful-button",
      "href": mw.util.getUrl(paramHref),
      "title": paramText,
    }, paramText);
  };

  usefulButtons.init = function () {
    var that = this;

    this.placementLocation = this.determinePlacement();
    this.injectStyles();

    $(that.placementLocation).append("<br />");
    this.defaultButtonsArray.forEach(function (paramButton) {
      $(that.placementLocation).append(
          that.constructButton(paramButton.text, paramButton.href));
    });
  };

  mw.loader.using("mediawiki.util").then(
    $.proxy(usefulButtons.init, usefulButtons));
})(jQuery, mediaWiki);