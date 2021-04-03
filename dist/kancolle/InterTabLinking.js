/**
 * [[Category:Todo]]:
 * 1. Fixing <math> for tabview
 * 2. <tabber> is already ok?
 * 3. Fixing <math> in comments
 * 4. Need to fix <math> in threads?
 */

(function(mw, $) {
  "use strict";

  function debug() {
    return window.kancolle_wikia_debug;
  }

  $(document).ready(function() {
  	/*
    function loadMathJax() {
      $.getScript(location.protocol + "//kancolle.fandom.com/load.php?modules=ext.math.mathjax.enabler&*");
    }

    function renderMath(content) {
      if (content.find(".tex").length) {
        if (!window.MathJax) {
          loadMathJax();
        } else {
          window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
        }
      }
    }
    */

    function scrollTo(content, id) {
      if (!content || typeof id !== "string") {
        return;
      }
      id = "#" + id.replace(/\./g, "\\.");
      if (debug()) {
        console.log("InterTabLinking: scrollTo:", id);
      }
      var element = content.find(id).get(0);
      if (element) {
        element.scrollIntoView();
      }
    }

    function parseHash() {
      var hash = window.location.hash || "";
      hash = hash.replace(/\.2F/g, "/");
      var parts = hash.match(/^#\/([^#]+)#(.+)$/);
      if (parts) {
        return { tab: parts[1], element: parts[2] };
      }
      parts = hash.match(/^#\/([^#]+)$/);
      if (parts) {
        return { tab: parts[1] };
      }
      parts = hash.match(/^#([^#]+)$/);
      if (parts) {
        return { element: parts[1] };
      }
      return {};
    }

    function formatHash(tab, hash) {
      if (tab) {
        return hash ? "#/" + tab.replace(/ /g, "_") + "#" + hash : "#/" + tab.replace(/ /g, "_");
      } else {
        return hash ? "#" + hash : "";
      }
    }

    var parsed = parseHash();
    if (debug()) {
      console.log("InterTabLinking: parsed:", parsed);
    }

    var hash = parsed.element || true,
      tab = parsed.tab,
      switch_hash = null;

    var current_tab;

    function switchToTab(tab, hash) {
	  if (debug()) {
    	console.log("switchToTab:", tab, hash);
      }
      var tabs = $("ul.tabs li a span").filter(function() {
        return $(this).text() === tab.replace(/_/g, " ");
      });
      if (tabs[0]) {
        $(tabs[0]).click();
        $(tabs[0]).parent().parent().mousedown();
        current_tab = tab;
        switch_hash = hash;
        window.scrollTo(0, 0);
      }
    }

    function processTabBody(content) {
      if (debug()) {
        console.log("InterTabLinking: processTabBody:", tab, hash, switch_hash);
        console.log("InterTabLinking: processTabBody: tex:", content.find(".tex").length);
        console.log("InterTabLinking: processTabBody: MathJax:", window.MathJax && window.MathJax.version);
      }

      // renderMath(content);

      if (hash) {
        if (tab) {
          switchToTab(tab, hash);
          tab = null;
        } else {
          scrollTo(content, hash);
          hash = null;
        }
      } else {
        if (switch_hash) {
          scrollTo(content, switch_hash);
          switch_hash = null;
        }
      }

      content.find(".tablink a").each(function() {
        $(this).click(function(link_element) {
          link_element.preventDefault();
          var href = $(this).attr("href"),
            parts = href
              .split("/")
              .pop()
              .split("#"),
            tab = parts[0],
            hash = parts[1];
          if (debug()) {
            console.log("InterTabLinking: tablink.click:", tab, hash);
          }
          window.location.hash = formatHash(tab, hash);
          switchToTab(tab, hash);
          if (hash) {
            scrollTo($(".tabBody.selected"), hash);
          }
        });
      });
    }

    function fixToc(content, toc) {
      function fixLinks() {
        if (!toc.attr("data-fixed")) {
          var links = toc.find("ol li a");
          if (links.length > 0) {
            if (debug()) {
              console.log("InterTabLinking: found links in TOC:", links.length);
            }
            toc.attr("data-fixed", "true");
            links.each(function() {
              var link = $(this);
              link.click(function(e) {
                e.preventDefault();
                var id = link.attr("href").slice(1);
                var target = content.find("[id='" + id + "']");
                if (target.length > 0) {
                  if (debug()) {
                    console.log("InterTabLinking: TOC click:", id);
                  }
                  target[0].scrollIntoView();
                  window.location.hash = formatHash(current_tab, id);
                }
              });
            });
          }
        }
      }

      // try to fix links
      fixLinks();

      // or wait for expand TOC click and then for 100ms (KLUDGE!)
      toc.find(".toctoggle").click(function() {
        setTimeout(fixLinks, 100);
      });
    }

	/*
    if (window.ArticleComments && window.ArticleComments.addHover) {
      var addHover = window.ArticleComments.addHover;
      window.ArticleComments.addHover = function () {
        var result = addHover.apply(this, arguments);
        var comments = $("#article-comments-ul");
        if (comments.length) {
          renderMath(comments);
        }
        return result;
      };
    }
    */

	function pollTab(tab, i) {
		i = i || 0;
		if (tab.find('.mw-parser-output')) {
			setTimeout(function() {
				mw.hook('wikipage.content').fire(tab);
				// setTimeout(function() { tab.ready(); }, 500);
			}, 1000);
		} else if (i < 10) {
			setTimeout(function() { pollTab(tab, i + 1); }, 1000);
		}
	}
	
	function fixTab(link, i) {
		var tab = $(link.parent().parent().parent().find('.tabBody')[i]);
        if (link.attr('data-loaded')) {
        	return;
        }
        link.attr('data-loaded', 'true');
        pollTab(tab);
	}
	
	fixTab($($("[id^='flytabs'] li")[0]), 0);

    $("[id^='flytabs'] li").each(function(i) {
      $(this).mousedown(function() {
        current_tab = $(this)
          .text()
          .replace(/ /g, "_");
        window.location.hash = formatHash($(this).text());
		fixTab($(this), i);
      });
    });

    var worldLinksAdded = false;

    function addWorldLinks() {
      if (worldLinksAdded) {
        return;
      } else {
        worldLinksAdded = true;
      }
      var world = $("#EventTemplate").attr("data-world");
      if (world) {
        var tabs = $("#EventTemplate > div > div > ul");
        for (var i = 1; i <= 7; ++i) {
          var a = $("<a>")
            .attr("onclick", "location.href='World_" + i + "'")
            .text(i);
          var li = $("<li>").css({"float": "right"}).append(a);
          if (i === +world) {
            li.addClass("selected-pure");
          }
          tabs.prepend(li);
        }
      }
    }
    
    $.fn.fixTabber = function() {
		return this.each(function() {
			var $this = $(this),
				tabContent = $this.children('.tabbertab'),
				nav = $('<ul>').addClass('tabbernav');
			tabContent.each(function() {
				var anchor = $('<a>').text(this.title).attr('title', this.title).attr('href', '#');
				$('<li>').append(anchor).appendTo(nav);
				nav.append($('<wbr>'));
			});
			$this.prepend(nav);
			function showContent(title) {
				var content = tabContent.filter('[title="' + title + '"]');
				if (content.length !== 1) return false;
				tabContent.hide();
				content.show();
				nav.find('.tabberactive').removeClass('tabberactive');
				nav.find('a[title="' + title + '"]').parent().addClass('tabberactive');
				$(window).trigger('scroll');
				return true;
			}
			showContent(tabContent.first().attr('title'));
			nav.on('click', 'a', function(e) {
				var title = $(this).attr('title');
				e.preventDefault();
				showContent( title );
			});
			$this.addClass('tabberlive');
		});
	};

    var contentHooks = 0;

    mw.hook("wikipage.content").add(function(content) {
      ++contentHooks;
      content = $(content);
      console.log(contentHooks, content);
      if (contentHooks === 1) {
        addWorldLinks();
      }
      if (content.attr("class") === "tabBody selected" || content.attr("class") === "tabBody") {
		processTabBody(content);
        content.find(".toc").each(function() { fixToc(content, $(this)); });
        content.find(".tabber:not(.tabberlive)").fixTabber();
      }
    });

    // hashchange
    // popstate

  });
})(mediaWiki, jQuery);