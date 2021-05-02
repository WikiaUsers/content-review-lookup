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
   * @param {object} - <code>$.Deferred</code> object
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
    window.DiscussionTemplates = {
      templates: {
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

    // Apply custom infobox colors if custom colors are detected
    if ($("#custom-infobox-colors").length) {
      this.applyCustomColors();
    }

    // Build standard summaries dropdown if in edit screen
    if ($("#wpSummaryLabel").length) {
      this.buildSummariesDropdown();
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