// <pre><nowiki>
/**
 * @file Common.js contains all SWF-specific code snippets not loaded externally
 * via <code>MediaWiki:ImportJS</code>. All reports of functionality loss or
 * bugs should be directed to current maintainer User:Sebolto.
 *
 * @author Squishy Vic <swf.wikia.com/w/User talk:VDO>
 * @author Jack Phoenix <jack@countervandalism.net>
 * @author TK-999 <swf.wikia.com/w/User talk:TK-999>
 * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
 * @author Grunny <sw.wikia.com/w/User talk:Grunny>
 *
 * @license CC-BY-SA 3.0
 * @external "window"
 * @external "window.mediaWiki"
 * @external "window.jQuery"
 * @external "mediawiki.util"
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true */

;(function (window, mw, $) {
  "use strict";

  /**
   * @description This function is used to retrieve raw template content from
   * the <code>Template</code> namespace page passed as a parameter. A resolved/
   * rejected <code>$.Deferred</code> instance is returned.
   *
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @param {string} template - <code>string</code> template name
   * @returns {object} - <code>$.Deferred</code> object
   */
  this.getTemplate = function (template) {
    var config, prefix;

    // Cache wgs
    config = mw.config.get([
      "wgFormattedNamespaces",
      "wgScript"
    ]);

    // "Template:"
    prefix = config.wgFormattedNamespaces[10] + ":";

    // Template name must start with "Template:"
    if (template.substring(0, 0 + prefix.length) !== prefix) {
      template = prefix + template;
    }

    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("index") || config.wgScript,
      data: {
        title: template,
        action: "raw",
        ctype: "text/plain"
      }
    });
  };

  /**
   * @description This function, original developed by Jack Phoenix, is used to
   * add the contents of <code>Template:Information</code> to the element whose
   * selector is passed as a parameter. It is used in Special:Upload at present.
   *
   * @author Jack Phoenix <jack@countervandalism.net>
   * @author TK-999 <swf.wikia.com/w/User talk:TK-999>
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @param {string} target - The selector of the target element
   * @returns {undefined}
   */
  this.insertInformationTemplate = function (target) {
    var $target, defaultText;

    $target = (target instanceof $) ? target : $(target);
    defaultText = "==Summary==\n{{Information\n|description=\n|source=\n" +
      "|author=\n|licensing=\n}}";

    this.getTemplate("Template:Stdinformation").then(
      function (data) {
        return data;
      },
      function () {
        return defaultText;
      }
    ).then(function (value) {
      $target.val(value);
    });
  };

  /**
   * @description This function is used to replace instances & appearances of
   * <code><nowiki>{{USERNAME}}</nowiki></code> with the username of the viewing
   * user. It also handles legacy cases of the template appearing in the
   * document title by means of <code><nowiki>{{DISPLAYTITLE}}</nowiki></code>
   * invocations.
   *
   * @author TK-999 <swf.wikia.com/w/User talk:TK-999>
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @returns {undefined}
   */
  this.replaceWithUsername = function () {
    var defaultText, userName;

    defaultText = /<insert name here>/;
    userName = mw.config.get("wgUserName");

    $(".insertusername").text(userName);
    document.title = document.title.replace(defaultText, userName);
  };

  /**
   * @description This function is used to permit certain on-page content (i.e.
   * <code><nowiki>[[Template:App]]</nowiki></code>) to be manually collapsed
   * and toggled by the user by means of a series of "Show/Hide" buttons. The
   * use of JS to modify element CSS is pretty reprehensible; maybe refactor to
   * use classes at some point?
   *
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @returns {undefined}
   */
  this.permitCollapsibleContent = function () {
    var textOptions, displayOptions;

    // Possible toggle values (i18n?)
    textOptions = Object.freeze(["[Hide]", "[Show]"]);

    // Possible display options
    displayOptions = Object.freeze(["block", "none"]);

    // Iterate over all extact collapsible objects
    $(".hidable").each(function () {
      var $content, $buttons, startHidden, startText;

      // Grab document node sets for this collapsible
      $content = $(this).find(".hidable-content");
      $buttons = $(this).find(".hidable-button");

      // Presence of ".start-hidden" class used as flag
      startHidden = $(this).hasClass("start-hidden");

      //Starting text depends on present of ".start-hidden" class
      startText = textOptions[+startHidden];

      // Ensure all buttons have corresponding collapsible section
      if (!$content.length || !$buttons.length ||
          $content.length !== $buttons.length) {
        return;
      }

      // Set initial hidden/visible values for collapsible sections
      $content.each(function (i) {
        if (!$($content[i]).length) {
          return;
        }

        $(this).css("display", displayOptions[+startHidden]);
      });

      // Set handler and behavior for each button
      $buttons.each(function (i) {
        if (!$($buttons[i]).length) {
          return;
        }

        // Define function-scoped, button-specific internal toggle flag
        var isHidden;

        // Apply initial starting text to each hidden button
        $(this).append(startText);

        // Set initial flag value
        isHidden = startHidden;

        // Click handler for visibility toggle
        $(this).on("click", function () {

          // Toggle display (and re-set flag value via bitwise xor)
          $($content[i]).css("display", displayOptions[+(isHidden ^= 1)]);

          // Alter original text to the correct display text depending on collapse
          $(this).text(textOptions[+isHidden]);
        });
      });
    });
  };

  /**
   * @description This function was initially developed by TK-999 in vanilla JS
   * as the mechanism responsible for applying user-inputted custom styling to
   * certain PI infoboxes. It was cleaned up & jQueryified by Sebolto in 2020
   * during his post-UCP bug fix bonanza.
   *
   * @author TK-999 <swf.wikia.com/w/User talk:TK-999>
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @returns {undefined}
   */
  this.applyCustomColors = function () {
    var $dataElement, $infobox, $infoboxTitle, $infoboxHeaders, $image, titleBg,
      headingBg, titleText, headingText, imgWidth, imgHeight, width, height;

    // jQuery object definitions
    $dataElement = $("#custom-infobox-colors");
    $infobox = $(".portable-infobox");
    $infoboxTitle = $(".pi-title");
    $infoboxHeaders = $(".pi-header");
    $image = $(".pi-image-thumbnail");

    // Attribute data
    titleBg = $dataElement.attr("data-title-background");
    headingBg = $dataElement.attr("data-heading-background");
    titleText = $dataElement.attr("data-title-text");
    headingText = $dataElement.attr("data-heading-text");
    imgWidth = $dataElement.attr("data-image-width");
    imgHeight = $dataElement.attr("data-image-height");

    // Style title & footer
    if ($infoboxTitle.length) {
      $infoboxTitle.css({
        "background": titleBg,
        "color": titleText
      });

      // Apply title background color to bottom border
      $infobox.css("border-bottom", "24px solid " + titleBg);
    }

    // Style all section headers
    if ($infoboxHeaders.length) {
      $infoboxHeaders.css({
        "background": headingBg,
        "color": headingText
      });
    }

    // Custom image properties (legacy)
    width = (imgWidth === "px") ? "auto" : imgWidth;
    height = (imgHeight === "px") ? "auto" : imgHeight;

    // Legacy holdover (replace?)
    if (width !== "auto" || height !== "auto") {
      try {
        $image.css({
          "width": width,
          "height": height
        });
      } catch (error) {}
    }
  };

  /**
   * @description This function is a dedicated jQuery version of Sikon's
   * <code>fillEditSummaries</code> initially modified by Grunny for use on
   * Wookieepedia, & subsequently retrieved & modified by Sebolto for use on
   * Star Wars Fanon.
   *
   * @author Grunny <sw.wikia.com/w/User talk:Grunny>
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @returns {undefined}
   */
  this.buildSummariesDropdown = function () {
    var wrapperText, $summaryLabel, $summaryField, $wrapper, lines,
      $summaryOptionsList, editSummary, editSummaryText, $summaryOption;

    wrapperText = "Standard summaries: ";
    $summaryLabel = $("#wpSummaryLabel");
    $summaryField = $("#wpSummary");

    // Construct new jQuery elements
    $wrapper = $("<div>").addClass("edit-widemode-hide").text(wrapperText);
    $summaryOptionsList = $("<select />").attr("id", "stdEditSummaries");

    this.getTemplate("Template:Stdsummaries").done(function (data) {
      lines = data.split('\n');

      $summaryOptionsList.change(function () {
        editSummary = $(this).val();

        // Ignore empty fields
        if (editSummary !== "") {
          $summaryField.val(editSummary);
        }
      });

      // Summary input should not have "--" prefix, only dropdown list
      lines.forEach(function (line) {
        editSummaryText = (line.indexOf("-- ") === 0) ? line.substring(3) : "";
        $summaryOption = $("<option>").val(editSummaryText).text(line);

        $summaryOptionsList.append($summaryOption);
      });

      // Add dropdown directly above summary label & input
      $summaryLabel.prepend($wrapper.append($summaryOptionsList));
    }).fail(window.console.error);
  };

  /**
   * @description This function is used to append the {{tl|Top}} template to the
   * top of the page in the page header. This function was adapted from code
   * found in Wookieepedia's MediaWiki:Common.js file & previously written by
   * User:Grunny.
   *
   * @author Grunny <sw.wikia.com/w/User talk:Grunny>
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @returns {undefined}
   */
  this.situateTopTemplate = function () {
    var $top, $target;

    $top = $("#title-top");
    $target = (mw.config.get("skin") === "fandomdesktop")
      ? $(".page-header__actions").first()
      : $(".page-header__contribution > div").first();

    if ($top.length) {
      $target.prepend($top.show());
    }
  };

  /**
   * @description This function is used to load a set of tools & plugins for 
   * exclusive use by Administrators alone. This functionality was previously
   * loaded from <code>MediaWiki:Group-sysop.js</code> prior to its deactivation
   * by members of Staff.
   *
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @returns {void}
   */
  this.loadAdminTools = function () {
    var config, skinSpecificTarget, skinSpecificClass, buttonText;

    // Cache window properties
    config = mw.config.get([
      "skin",
      "wgNamespaceNumber"
    ]);

    // Element to which PageCreator + LastEdited will be appended
    skinSpecificTarget = (config.skin === "oasis")
      ? ".page-header__contribution-buttons"
      : ".page-header__actions";

    // Styling for the button
    skinSpecificClass = (config.skin === "oasis")
      ? "wds-button wds-is-squished wds-is-secondary"
      : "wds-button wds-is-text page-header__action-button has-label";

    // Display text for button
    buttonText = "Info";

    window.pageCreatorConfig = {
      namespaces: [0, 4, 6, 8, 10, 14],
      useAvatar: false,
      useUTC: false,
      useTimestamp: true
    };

    window.lastEdited = {
      avatar: false,
      comment: false,
      size: false,
      namespaces: {
        exclude: [1, 2, 3, 5, 7, 9, 11, 12, 15, 110, 111, 1202]
      }
    };

    window.DiscussionTemplates = {
      templates: {
        "Welcome message": {
          name: "Template:DT-Welcome",
          title: "Welcome to Star Wars Fanon"
        },
        "Image Policy": {
          name: "Template:DT-Image Policy",
          title: "Image Policy"
        },
        "Editing Policy": {
          name: "Template:DT-Editing Policy",
          title: "Editing Policy"
        },
        "Categorization Policy": {
          name: "Template:DT-Categorization Policy",
          title: "Categorization Policy"
        },
        "Impermissible template removal": {
          name: "Template:DT-Advisory Templates",
          title: "Template removal"
        }
      }
    };

    window.importArticles({
      type: "script",
      articles: [
        "MediaWiki:AutoDelete.js",
        "u:dev:MediaWiki:DiscussionTemplates.js"
      ]
    });

    if (
      $(skinSpecificTarget).length &&
      $.inArray(
        config.wgNamespaceNumber,
        window.pageCreatorConfig.namespaces
      ) !== -1
    ) {
      // Load PageCreator & LastEdited on click
      $(skinSpecificTarget).append(
        $("<a>", {
          "class": skinSpecificClass,
          "id": "toggle-page-info-button",
          "text": buttonText,
        }).click(function () {
          window.importArticles({
            type: "script",
            articles: [
              "u:dev:MediaWiki:LastEdited/code.js",
              "u:dev:MediaWiki:PageCreator/code2.js",
            ],
          });

          mw.util.addCSS(
            "#lastEdited {" +
              "font-size: 12px !important;" +
            "}"
          );

          // Remove button once pressed
          $(this).remove();
        })
      );
    }
  };

  /**
   * @description This function, invoked once the required <code>util</code>
   * ResourceLoader module has been loaded, determines which additional
   * snippets to run depending on the specific page the user is viewing.
   *
   * @author Sebolto <swf.wikia.com/w/User talk:Sebolto>
   *
   * @returns {undefined}
   */
  this.init = function () {

    // Add <nowiki>{{Information}}</nowiki> to field if viewing Special:Upload
    if (mw.config.get("wgCanonicalSpecialPageName") === "Upload") {
      this.insertInformationTemplate("#wpUploadDescription");
    }

    // Replace instances of <nowiki>{{USERNAME}}</nowiki> with viewer's username
    if ($(".insertusername").length) {
      this.replaceWithUsername();
    }

    // Permit certain on-page content to be manually collapsed via a toggle
    if ($(".hidable").length) {
      this.permitCollapsibleContent();
    }

    // Apply custom infobox colors if custom colors are detected
    if ($("#custom-infobox-colors").length) {
      this.applyCustomColors();
    }

    // Build standard summaries dropdown if in edit screen
    if ($("#wpSummaryLabel").length) {
      this.buildSummariesDropdown();
    }
    
    // Situate Template:Top in page header (load page tools 1st)
    if ($("#title-top").length) {
      this.situateTopTemplate();
    }

    // Load tools restricted to Administrators
    if (new RegExp("sysop").test(mw.config.get("wgUserGroups").join(" "))) {
      this.loadAdminTools();
    }
  };

  // Only run once ResourceLoader modules are loaded & document ready
  $.when(mw.loader.using(["mediawiki.util"]), $.ready)
    .done(this.init.bind(this))
    .fail(window.console.error);

}.call(Object.create(null), this, this.mediaWiki, this.jQuery));