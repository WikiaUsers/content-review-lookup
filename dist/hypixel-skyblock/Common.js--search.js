// Load Styles
$("<link>", {
  rel: "stylesheet",
  href: "https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Common.js/calc.css?action=raw&ctype=text/css",
}).appendTo("head");

/*global mediaWiki, hsbwiki */
window.hsbwiki = window.hsbwiki || {};
(function ($, mw, hsb) {
  "use strict";

  const HOOK_ID = "hsb_calc";

  /**
   * Caching for search suggestions
   */
  const cache = {};

  /**
   * Internal variable to store references to each calculator on the page.
   */
  const calcStore = {};

  /**
   * Private helper methods for `Calc`
   *
   * Most methods here are called with `Function.prototype.call`
   * and are passed an instance of `Calc` to access it's prototype
   */
  const helper = {
    /**
     * Parse the template used to display the result of the form
     *
     * @param code {string} Wikitext to send to the API for parsing
     */
    loadTemplate(code) {
      return new Promise((resolve, reject) => {
        let params = {
          action: "parse",
          text: code,
          prop: "text",
          title: mw.config.get("wgPageName"),
          disablepp: "true",
        };

        // experimental support for using VE to parse calc templates
        if (!!mw.util.getParamValue("vecalc")) {
          params = {
            action: "visualeditor",
            // has to be a mainspace page or VE won't work
            page: "No page",
            paction: "parsefragment",
            wikitext: code,
          };
        }

        // @todo time how long these calls take
        new mw.Api()
          .post(params)
          .done(function (response) {
            var html;

            if (!!mw.util.getParamValue("vecalc")) {
              // strip body tag
              html = $(response.visualeditor.content).contents();
            } else {
              html = response.parse.text["*"];
            }

            resolve(html);
          })
          .fail(reject);
      });
    },
  };

  class CustomSearch {
    /**
     * Manages a search bar and search behavior
     * @param elem {Element} An Element representing the HTML tag that contains
     * the search's configuration as well as the container holding the search bar
     */
    constructor(elem) {
      this.$container = $(elem);

      const config = this.$container.data();
      this.template = config.template;
      this.resultId = config.resultId;

      if(!this.template) {
        this.configError = "Must specify a template the handle search results!";
      }

      this.$input = undefined; // added in build()
      this.$result = undefined; // added in build()
    }

    /**
     * @todo document
     */
    getInput(id) {
      if (id) {
        id = this.getId(id);
        return $("#" + id);
      }

      return $("#jsForm-" + self.form).find("select, input");
    }

    /**
     * Helper function for getting the id of an input
     *
     * @param id {string} The id of the input as specified by the calculator config.
     * @returns {string} The true id of the input with prefixes.
     */
    getId() {
      return [this.form, this.result, inputId].join("-");
    }

    /**
     * Output an error to the UI
     *
     * @param error {String} A string representing the error message to be output
     */
    showError(error) {
      this.$result
        .empty()
        .append($("<span>").addClass("jcError").text(error))
        .show();
    }

    /**
     * Build the search form
     */
    build() {
      let $form = $("<form>")
        .addClass("hsb-custom-search")
        .attr({ action: "#" })
        .submit((e) => {
          e.preventDefault();
          this.submitForm();
        });

      this.$input = $("<input>").appendTo($form);

      $("<button>").appendTo($form)
        .addClass("noselect")
        .append(
          $("<div>").text("↵").css({
            "font-size": "2em",
            padding: "0 0.3em",
            "text-align": "center",
          })
        )
        .click(function () {
          $form.submit();
        });

      this.$container.empty().append($form);

      this.$result = this.resultId
        ? $("#"+this.resultId)
        : $("<div>").appendTo(this.$container);

      if (this.configError) {
        this.$result.append(this.configError);
      }

      this.enableSuggestions();
    }

    /**
     * Form submission handler
     */
    submitForm() {
      let searchTerm = this.$input.val();

      if (!searchTerm) {
        this.showError("Search must not be blank.");
        return;
      }

      // Load response
      const code = `{{${this.template}|${searchTerm}}}`;

      this.toggleSubmitButton(false);
      helper
        .loadTemplate(code)
        .then((html) => {
          this.toggleSubmitButton(true);
          this.dispResult(html);
        })
        .catch((error) => {
          this.toggleSubmitButton(true);
          this.showError(error);
        });
    }

    /**
     * Display the search result on the page
     *
     * @param response {String} A string representing the HTML to be added to the page
     */
    dispResult(html) {
      this.$result
        .empty()
        .html(html)
        .show();

      // allow scripts to hook into form submission
      mw.hook(`${HOOK_ID}.submit`).fire();

      mw.loader.using("jquery.tablesorter", function () {
        $("table.sortable").tablesorter();
      });
      mw.loader.using("jquery.makeCollapsible", function () {
        $(".mw-collapsible").makeCollapsible();
      });
    }

    enableSuggestions() {
      // Enable suggest on article fields
      mw.loader.using(["mediawiki.api", "jquery.ui.autocomplete"], function () {
        self.acInputs.forEach(function (input) {
          $("#" + input).autocomplete({
            // matching wikia's search min length
            minLength: 3,
            source: function (request, response) {
              var term = request.term;

              if (term in cache) {
                response(cache[term]);
                return;
              }

              new mw.Api()
                .get({
                  action: "opensearch",
                  search: term,
                  // default to main namespace
                  namespace: self.suggestns.join("|") || 0,
                  suggest: "",
                })
                .done(function (data) {
                  cache[term] = data[1];
                  response(data[1]);
                });
            },
          });
        });
      });
    }

    toggleSubmitButton(on) {
      const $button = this.$container.find("form button div");
      if(on) {
        $button.text("↵").css("color", "white");
      } else {
        $button.text('..').css('color','gray');
      }
    }
  }

  /**
   * @todo
   */
  function lookupSearch(calcId) {
    return calcStore[calcId];
  }

  /**
   * @todo
   */
  function init() {
    $(".jsCustomSearch").each(function () {
      var c = new CustomSearch(this);
      c.build();

      calcStore[c.form] = c;
    });

    // allow scripts to hook into calc setup completion
    mw.hook(`${HOOK_ID}.setupComplete`).fire();
  }

  $(init);

  hsb.customSearch = {};
  hsb.customSearch.lookup = lookupSearch;
})(jQuery, mediaWiki, hsbwiki);