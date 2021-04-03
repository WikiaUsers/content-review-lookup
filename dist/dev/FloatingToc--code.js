/**
 * @name        FloatingToc
 * @author      Pecoes, KhangND
 * @desc        Makes the Table of Contents floatable
 * @doc         https://dev.fandom.com/wiki/FloatingToc
 * @files used:
 *   [[File:Ui-icons_ffffff_256x240.png]]
 *   [[File:Ui-icons_222222_256x240.png]]
 */

(function (mw, $, window) {
  var root = $("#toc");
  if (window.FloatingTocLoaded || !root.length) return;
  window.FloatingTocLoaded = true;

  function importArticle(page) {
    const isScript = page.split(".").pop() === "js";
    return $.ajax({
      url: mw.config.get("wgLoadScript"),
      data: {
        mode: "articles",
        only: isScript ? "scripts" : "styles",
        articles: "u:dev:MediaWiki:" + page,
      },
    }).then(function (content) {
      $("head").append($(isScript ? "<script>" : "<style>").html(content));
    });
  }

  var css = importArticle("FloatingToc.css");

  var colors = (window.dev || {}).colors
    ? $.Deferred().resolve()
    : importArticle("Colors/code.js");

  var i18n = ((window.dev || {}).i18n || {}).loadMessages
    ? $.Deferred().resolve()
    : importArticle("I18n-js/code.js");

  var jQueryUI = mw.loader.using([
    "jquery.ui.dialog",
    "jquery.ui.draggable",
    "jquery.ui.resizable",
    "jquery.effects.slide",
  ]);

  $.when(i18n, css, colors, jQueryUI)
    .then(function () {
      return window.dev.i18n.loadMessages("FloatingToc");
    })
    .then(function (_i18n) {
      var colors = window.dev.colors;
      var pageBright = colors.parse(colors.wikia.page).isBright();
      var menuBright = colors.parse(colors.wikia.menu).isBright();
      var iconLight = 'url("https://images.wikia.nocookie.net/dev/images/c/c2/Ui-icons_ffffff_256x240.png")';
      var iconDark = 'url("https://images.wikia.nocookie.net/dev/images/a/aa/Ui-icons_222222_256x240.png")';
      var styles =
        ".toc-dialog{\
            border: 2px solid $border;\
        }\
        .toc-dialog .ui-dialog-titlebar {\
            background: $menu;\
            border: 1px solid $menu;\
            color: $contrast;\
        }\
        .toc-dialog.ui-widget-content .ui-icon {\
            background-image: $menu-icons;\
        }\
        .toc-dialog.ui-widget-content a {\
          color: $link;\
        }\
        .toc-dialog,\
        .toc-dialog .toc {\
            background-color: $page;\
            color: $text;\
        }\
        #toc-open {\
            border: 1px solid $page-border-gray;\
            background-image: $page-icons;\
        }\
        .toc-btn, .toc-btn:hover {\
            background-image: $menu-icons;\
        }\
        .toc-btn:hover {\
            background-color: $gradient;\
        }";

      mw.util.addCSS(
        colors.replace(styles, {
          "page-border-gray": colors.wikia.border,
          "menu-icons": menuBright ? iconDark : iconLight,
          "page-icons": pageBright ? iconDark : iconLight,
        })
      );

      var win = $(window),
        page = $("#WikiaPage"),
        rail = $("#WikiaRail"),
        navHeight = $("#globalNavigation").height(),
        barHeight = $("#WikiaBarWrapper").height(),
        speed = 250,
        i18n = _i18n.msg,
        options = $.extend(
          {
            auto: false,
            enableKey: true,
          },
          window.FloatingToc
        );

      // root ToC components
      var rootToc = {
        top: root.offset().top,
        width: root.outerWidth(),
        height: root.outerHeight(),
      };

      // creates a clone of the root ToC
      // and transforms it to jQuery UI Dialog
      var toc = {
        resizing: false,
        padWrap: 0,
        wrapper: $(),
        clone: $("<nav>", {
          class: "toc show",
          id: "tocDialog",
          title: i18n("contents").plain(),
          css: { display: "none" },
          appendTo: page,
        }),

        state: function () {
          var w = rootToc.width;
          var h = Math.min(
            rootToc.height,
            win.height() - navHeight - barHeight
          );
          return {
            position: [(win.width() - w) / 2, navHeight],
            width: w,
            height: h,
            maxWidth: win.height() * (w / h),
            maxHeight: win.height() - navHeight - barHeight,
          };
        },

        toggle: function (action) {
          var links = $(".toc-link");

          if (links.css("display") === "none") links.show(speed);
          else links.hide(speed);

          if (root.css("display") === "none")
            root.slideDown(speed, toc.keepPos(action));
          else root.slideUp(speed, toc.keepPos(action));
        },

        keepPos: function (action) {
          var winPos = win.scrollTop();
          if (action === "open" && winPos > rootToc.top + rootToc.height) {
            win.scrollTop(winPos - rootToc.height);
          }
          if (action === "close") {
            if (!options.enableKey) {
              win.scrollTop(rootToc.top - navHeight);
              return;
            }

            if (winPos > rootToc.top) win.scrollTop(winPos + rootToc.height);
          }
        },

        fixPos: function () {
          if (toc.wrapper.css("position") === "fixed") return;
          toc.wrapper.css({
            top: toc.wrapper.offset().top - win.scrollTop(),
            left: toc.wrapper.offset().left - win.scrollLeft(),
            position: "fixed",
          });
        },

        reset: function () {
          toc.clone.dialog("option", toc.state());
        },

        dock: function () {
          toc.clone.dialog("option", {
            width:
              rail.width() + parseInt(page.css("padding-right")) - toc.padWrap,
            position: [rail.offset().left, navHeight],
          });
        },

        back: function () {
          win.scrollTop(0);
        },

        open: function () {
          toc.clone.dialog("open");
        },

        close: function () {
          toc.clone.dialog("close");
        },

        button: function (action) {
          return $("<button>", {
            class: "toc-btn",
            id: "toc-" + action,
            title: i18n(action).plain(),
            click: toc[action],
          });
        },

        onOpen: function () {
          toc.reset();
          toc.fixPos();
          toc.toggle("open");
        },

        onClose: function () {
          toc.toggle("close");
        },

        onCreate: function () {
          // sets properties
          toc.wrapper = $(this).parent();
          toc.padWrap =
            (parseInt(toc.wrapper.css("border-width")) +
              parseInt(toc.wrapper.css("padding"))) *
            2;

          // modifies components
          toc.toggle();
          toc.wrapper.find(".ui-dialog-titlebar-close").remove();
          $("<div>", {
            id: "toc-btns",
            appendTo: toc.wrapper.find(".ui-dialog-titlebar"),
            append: [
              toc.button("back"),
              toc.button("dock"),
              toc.button("reset"),
              toc.button("close"),
            ],
          });
          toc.wrapper.draggable({
            scroll: false,
            containment: "window",
          });
        },

        init: function () {
          var selector = root.find("ol")[0] ? "ol" : "ul";
          toc.clone.append(root.find(selector + ":first")[0].outerHTML);
          toc.clone.dialog(
            $.extend(
              {
                dialogClass: "toc-dialog",
                show: { effect: "slideDown", duration: speed },
                hide: { effect: "slideUp", duration: speed },
                create: toc.onCreate,
                open: toc.onOpen,
                close: toc.onClose,
                resizeStart: function () {
                  toc.resizing = true;
                },
                resizeStop: function () {
                  toc.resizing = false;
                  toc.fixPos();
                },
              },
              toc.state()
            )
          );

          win.on("resize", function () {
            if (!toc.resizing && toc.clone.dialog("isOpen")) toc.reset();
          });

          // overrides click
          $(this).on("click", function () {
            if (toc.clone.dialog("isOpen")) toc.close();
            else toc.open();
          });
        },
      };

      // adds ToC links to h2, h3
      $("#mw-content-text")
        .find("h2,h3")
        .find(".mw-headline")
        .after(
          $("<a>", {
            class: "toc-link",
            href: "",
            title: i18n("toc").plain(),
            click: function () {
              win.scrollTop(rootToc.top - navHeight);
              return false;
            },
          })
        );

      var tocButton = $("<button>", {
        id: "toc-open",
        title: i18n("open").plain(),
        appendTo: root.find("div:first"),
      }).one("click", toc.init);

      if (options.auto) tocButton.trigger("click");
      if (options.enableKey) {
        $(document).on("keyup", function (e) {
          var elem = document.activeElement;
          if (
            $("body").hasClass("ve") ||
            $("html").hasClass("ve-active") ||
            elem.tagName === "INPUT" ||
            elem.tagName === "TEXTAREA" ||
            elem.hasAttribute("contenteditable")
          )
            return;

          if (e.key === "t") tocButton.trigger("click");
        });
      }
    });
})(mw, $, window);