/* Any JavaScript here will be loaded for all users on every page load. */

(function () {
  'use strict';

  // copy to clipboard
  $(function(){ // wait for content load
    $('.copy-clipboard').each(function () {
      var $this = $(this);
      var $button = $('<button title="Copy to Clipboard">&#xf0ea;</button>');
      $this.append($button);
      $button.click(function () {
        var $content = $this.find('.copy-content');
        $content.children().remove();
        selectElementText($content[0]);

        try {
          if (!document.execCommand('copy'))
            throw 42;
          mw.notify('Successfully copied to Clipboard.');
        } catch (err) {
          mw.notify('Copy to Clipboard failed. Please do it yourself.', { type: 'error' });
        }
      });
    });
  });

  function selectElementText(element) {
    var range, selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  // load js for calculating wild creature level stats
  if (document.getElementById('wildStatCalc')) {
    mw.loader.load('/index.php?title=MediaWiki:WildCreatureStats.js&action=raw&ctype=text/javascript', 'text/javascript', false);
  }


  // default setting to turn tooltips on
  var tooltipsOn = true;

  var $tfb;
  var activeHoverLink = null;
  var tipCache = new Object();

  // hides the tooltip
  function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    activeHoverLink = null;
  }

  // displays the tooltip
  function displayTip(e) {
    $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $tfb.not(":empty").css("visibility", "visible");
    moveTip(e);
  }

  // moves the tooltip
  function moveTip(e) {
    var $ct = $tfb.not(":empty");
    var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($ct.innerHeight() + 20) : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($ct.innerWidth() + 20) : 20);
    $ct.css({ "position": "fixed", "top": newTop + "px", "left": newLeft + "px" });
  }

  // AJAX tooltips
  function showTip(e) {
    var $t = $(this);
    activeHoverLink = $t;
    var $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
      $t.removeAttr("title");
      $p.removeAttr("title");
      var url;
      if ($(location).attr('href').indexOf("Schematics") > -1 || $(location).attr('href').indexOf("Crafting") > -1) {
        url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "&action=render .tooltip-crafting-content";
      } else { /*url = "/index.php?title="+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"&action=render .tooltip-content";*/ }
      if (tipCache[url] !== null) {
        $tfb.html(tipCache[url]);
        displayTip(e);
        return;
      }
      $tfb.load(url, function () {
        if ($t != activeHoverLink) return;
        if ($tfb.html() === "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
        $tfb.find(".tooltip-content").css("display", "");
        $tfb.find(".tooltip-crafting-content").css("display", "");
        tipCache[url] = $tfb.html();
        displayTip(e);
      });
    }
  }

  function bindTT() {
    var $t = $(this);
    var $l = $t.find("a");
    if (!$l.hasClass("selflink")) {
      $t.data("tt", $l.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
    }
  }

  // check to see if it is active then do it
  function ttMouseOver() {
    if (tooltipsOn) {
      $("#bodyContent").append('<div id="tfb" class="htt"></div>');
      $tfb = $("#tfb");
      $("#bodyContent span.ajaxttlink").each(bindTT);
    }
  }

  $(ttMouseOver);

  var i18n = {
	// Collapsible elements and page loader
	hideText: 'hide',
	showText: 'show',
	
	// Page loader
	loadErrorTitle: 'An error occurred loading the content'
  };

  /* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
  mw.hook('wikipage.content').add(function ($wikipageContent) {
    /**
     * Collapsible elements
     *
     * Add the "collapsible" class to an element and the child element with class "collapsible-content"
     * (or everything but the header row if a table) will be hidden when the element is collapsed.
     *
     * * Add the class "collapsed" to the element to make it start out collapsed.
     * * Add either "collapsetoggle-left" or "collapsetoggle-inline" to the element to choose the collapse
     *   toggle alignment (defaults to right).
     * * Add an ID in the format of "collapsible-<x>" to the element to make any element with the class
     *  "collapsetoggle-custom" and a matching class in the format of "collapsible-<x>-toggle" control
     *   the collapsing instead of the standard button.
     *   If the custom toggle contains an element with the "jslink" class, only that will be clickable.
     */
    (function () {
      var $collapsibles = $wikipageContent.find('.collapsible');
      if (!$collapsibles.length) {
        return;
      }

      var $toggleTemplate = $('<span>').addClass('collapsetoggle').append(
        $('<button>').addClass('jslink')
      );
      $collapsibles.each(function () {
        var $collapsible = $(this);
        if ($collapsible.data('made-collapsible')) {
          return true;
        }

        var $children = $collapsible.children();
        var showText = $collapsible.data('expandtext') || i18n.showText;
        var hideText = $collapsible.data('collapsetext') || i18n.hideText;

        // If there is no content area, add it
        if (!$collapsible.is('table') && !$children.filter('.collapsible-content').length) {
          if ($collapsible.is('tr')) {
            $children.addClass('collapsible-content');
          } else {
            $collapsible.wrapInner('<div class="collapsible-content">');
          }
        }

        var $toggle;
        var id = $collapsible.attr('id');
        if (id && id.match(/^collapsible-./)) {
          $toggle = $($wikipageContent[0].getElementsByClassName(id + '-toggle'))
            .filter('.collapsetoggle-custom').css('visibility', 'visible');
        }

        // Create and insert the toggle button if there is no custom one
        if (!$toggle || !$toggle.length) {
          var $toggleContainer;
          if ($collapsible.is('table')) {
            var $rows = $children.filter('thead').children();
            if (!$rows.length) {
              $rows = $children.filter('tbody').first().children();
              if (!$rows.length) {
                $rows = $children.filter('tr');
              }
            }
            $toggleContainer = $rows.first().children().last();
          } else {
            $toggleContainer = $children.first();
            if ($toggleContainer.hasClass('collapsible-content')) {
              $toggleContainer = $collapsible;
            }
          }

          $toggle = $toggleTemplate.clone();
          if ($collapsible.hasClass('collapsetoggle-inline') || $collapsible.hasClass('collapse-button-none')) {
            $toggleContainer.append($toggle);
          } else {
            $toggleContainer.prepend($toggle);
          }
        }

        var $toggleLink = $toggle.find('.jslink');
        if (!$toggleLink.length) {
          $toggleLink = $toggle;
        }
        $toggleLink.attr('tabindex', 0).text(hideText);

        // Find max toggle size, and set its min-width to it
        var hideWidth = $toggle.width();
        $toggleLink.text(showText);
        var showWidth = $toggle.width();
        if (hideWidth !== showWidth) {
          $toggle.css('min-width', hideWidth > showWidth ? hideWidth : showWidth);
        }

        // Set the text back to hide if it's not collapsed to begin with
        if (!$collapsible.hasClass('collapsed')) {
          $toggleLink.text(hideText);
        }

        $toggleLink.on('click keydown', function (e) {
          // Only trigger on enter press
          if (e.keyCode && e.keyCode !== 13) {
            return;
          }

          // Don't toggle when clicking buttons or links inside the toggle
          var $target = $(e.target);
          if ($target.is('button') || $target.is('a')) {
            return;
          }

          $collapsible.toggleClass('collapsed');
          if ($collapsible.hasClass('collapsed')) {
            $toggleLink.text(showText);
          } else {
            $toggleLink.text(hideText);
          }

          // Stop table sorting activating when clicking the link
          e.stopPropagation();
        });

        $collapsible.data('made-collapsible', true);
      });
    }());


    /**
     * Page loader
     *
     * Allows a page to be downloaded and displayed on demand.
     * Use with [[Template:LoadPage]] and [[Template:LoadBox]]
     */
    (function () {
      var $loadPage = $wikipageContent.find('.load-page');
      if (!$loadPage.length) {
        return;
      }

      // We need the spinner to show loading is happening, but we don't want
      // to have a delay while the module downloads, so we'll load this now,
      // regardless of if something is clicked
      mw.loader.load('jquery.spinner');

      // Create button starting with hide text
      // Will be changed to the show text while calculating the maximum button size
      var $buttonTemplate = $('<span>').addClass('mw-editsection-like load-page-button')
        .append($('<button>').addClass('jslink').text(i18n.hideText));

      var extractList = function ($contentContainer, listClass) {
        var $content = $contentContainer.find('> ul > li > ul').children(':not(.nbttree-inherited)');
        if (listClass) {
          $content.addClass(listClass);
        }

        return $content;
      };

      $loadPage.each(function () {
        var $body = $(this);
        var page = $body.data('page');
        if (!page) {
          return;
        }

        var template = $body.data('template');
        var treeview = $body.data('treeview');
        var treeviewClass = $body.data('treeviewclass');
        var $heading;
        var $contentContainer;
        var $content;
        var $button = $buttonTemplate.clone();
        var $buttonLink = $button.find('.jslink');
        if (treeview) {
          $heading = $body;
          $contentContainer = $('<div>');
        } else {
          $heading = $body.children().first();
          $contentContainer = $body.find('.load-page-content');
        }

        // Add the button
        $heading.append($button);

        // Move the edit button to the right spot
        $contentContainer.find('.mw-editsection, .mw-editsection-like').insertAfter($button);

        // Find max button width, and set its min-width to it
        var hideWidth = $button.width();
        $buttonLink.text(i18n.showText);
        var showWidth = $button.width();

        if (hideWidth !== showWidth) {
          $button.css('min-width', hideWidth > showWidth ? hideWidth : showWidth);
        }

        $contentContainer.empty();

        $buttonLink.click(function () {
          if ($body.hasClass('pageloader-contentloaded')) {
            if ($buttonLink.text() === i18n.showText) {
              if (treeview) {
                $content.insertAfter($body);
              } else {
                $contentContainer.show();
              }
              $buttonLink.text(i18n.hideText);
            } else {
              if (treeview) {
                $content.detach();
              } else {
                $contentContainer.hide();
              }
              $buttonLink.text(i18n.showText);
            }
            return;
          }

          // See if this was loaded elsewhere before making a request
          var gotContent;
          $('.pageloader-contentloaded').each(function () {
            var $fLoader = $(this);
            if ($fLoader.data('page') === page && $fLoader.data('pageloader-content')) {
              $contentContainer.html($fLoader.data('pageloader-content')).removeClass('noscript');
              mw.hook('wikipage.content').fire($contentContainer);

              if (treeview) {
                $body.find('.noscript').remove();
                $content = extractList($contentContainer, treeviewClass);
                $content.insertAfter($body);
              }

              $buttonLink.text(i18n.hideText);
              $body.addClass('pageloader-contentloaded');
              gotContent = true;
              return false;
            }
          });
          if (gotContent) {
            return;
          }

          // Just in-case the spinner module is still not ready yet
          var $spinner = $();
          mw.loader.using('jquery.spinner', function () {
            // $spinner will be false if the content somehow loaded before the module did
            if ($spinner) {
              $spinner = $.createSpinner().addClass('mw-editsection-like')
                .css('min-width', $button.css('min-width'));
              $button.hide().after($spinner);
            }
          });

          var requestData = {
            action: 'parse',
            prop: 'text'
          };
          if (template) {
            requestData.page = page;
          } else {
            requestData.title = mw.config.get('wgPageName');
            requestData.text = '{' + '{:' + page + '}}';
          }
          new mw.Api().get(requestData).done(function (data) {
            var html = data.parse.text['*'];
            $contentContainer.html(html).removeClass('noscript');

            // Resolve self-links
            if (template) {
              var curPage = '/' + mw.config.get('wgPageName');
              $contentContainer.find('a').each(function () {
                var $link = $(this);
                if ($link.attr('href') === curPage) {
                  $link.replaceWith($('<strong>').addClass('selflink').append($link.contents()));
                }
              });
              html = $contentContainer.html();
            }

            $body.data('pageloader-content', html);

            // Fire content hook on the new content, running all this stuff again and more :)
            mw.hook('wikipage.content').fire($contentContainer);

            if (treeview) {
              $body.find('.noscript').remove();
              $content = extractList($contentContainer, treeviewClass);
              $content.insertAfter($body);
            }

            $spinner.remove();
            $spinner = false;
            $buttonLink.text(i18n.hideText);
            $button.show();
            $body.addClass('pageloader-contentloaded');
          }).fail(function (_, error) {
            $spinner.remove();
            $spinner = false;
            $button.show();

            var errorText = '';
            if (error.textStatus) {
              errorText = error.textStatus;
            } else if (error.error) {
              errorText = error.error.info;
            }

            mw.notify(errorText, { title: i18n.loadErrorTitle, autoHide: false });
          });
        });
      });
    }());

  });
  /* End wikipage.content hook */

}());