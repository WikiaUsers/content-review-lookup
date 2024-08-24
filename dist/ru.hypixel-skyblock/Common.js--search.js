// Load Styles
$("<link>", {
  rel: "stylesheet",
  href: "https://hypixel-skyblock.fandom.com/ru/wiki/MediaWiki:Common.js/calc.css?action=raw&ctype=text/css",
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
  const searchStore = {};

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
      this.placeholder = config.placeholder;
      this.suggestions = config.suggestions ? config.suggestions.split(",") : [];

      if(!this.template) {
        this.configError = "Must specify a template the handle search results!";
      }

      this.comboBox = undefined; // added in build()
      this.$result = undefined; // added in build()
    }

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
		const suggestions = this.suggestions;
		
		const sugToOpt = (item)=>({ label: item, data: item });
		
		let $form = $("<form>")
			.addClass("hsb-custom-search")
			.attr({ action: "#" })
			.submit((e) => {
			  e.preventDefault();
			  this.submitForm();
			});
		this.$container.empty().append($form);
        
        this.comboBox = new OO.ui.ComboBoxInputWidget({
        	icon: 'search',
			placeholder: this.placeholder,
			options: suggestions.sort().map(sugToOpt),
		});
		this.comboBox.on('change', () => {
			const val = this.comboBox.getValue().toLowerCase();
			const filtered = suggestions.filter((s)=>s.toLowerCase().indexOf(val) > -1).sort().map(sugToOpt);
			this.comboBox.setOptions(filtered.length > 0 ? filtered : suggestions);
			
	      	// Auto search if text matches a suggestion (mostly so selecting a suggestion auto-searches)
	      	const matchI = suggestions.map(s=>s.toLowerCase()).indexOf(val);
	      	if(matchI > -1) {
				this.comboBox.setValue(suggestions[matchI]); // set to exact suggestion just encase
				$form.submit();
	      	}
		});
		this.comboBox.$element.find('.oo-ui-comboBoxInputWidget-dropdownButton .oo-ui-buttonElement-button').on("click", ()=>{
	      	this.comboBox.setValue('');
			this.comboBox.setOptions( suggestions.sort().map(sugToOpt) );
		});
		$form.append(this.comboBox.$element);

		$("<button>").appendTo($form)
	        .addClass("noselect")
	        .click(function () {
	          $form.submit();
	        });
	    this.toggleSubmitButton(true);

		this.$result = this.resultId
			? $("#"+this.resultId)
			: $("<div>").appendTo(this.$container);
	
		if (this.configError) {
			this.$result.append(this.configError);
		}
      
      if(location.hash) {
      	const search = decodeURI(location.hash.replace("#", "").replace("_", " "));
      	if(this.suggestions.map(s=>s.toLowerCase()).indexOf(search.toLowerCase()) > -1) {
	      	this.comboBox.setValue(search);
	        $form.submit();
	        
	        $("html, body").animate({ scrollTop: this.comboBox.$element.offset().top - 100 });
      	}
      }
    }

    /**
     * Form submission handler
     */
    submitForm() {
      let searchTerm = this.comboBox.getValue();

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
          this.displayResult(html);
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
    displayResult(html) {
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

    toggleSubmitButton(on) {
      const $button = this.$container.find("form button");
      if(on) {
        $button.html('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-magnifying-glass-small"></use></svg>');
      } else {
        $button.html('<div style="width:18px; text-align:center; font-size:24px;">··</div>');
      }
    }
  }

  /**
   * @todo
   */
  function lookupSearch(calcId) {
    return searchStore[calcId];
  }

  /**
   * @todo
   */
  function init() {
  	mw.loader.using(["oojs-ui-core"]).then(function(){
	    $(".jsCustomSearch").each(function () {
	      var c = new CustomSearch(this);
	      c.build();
	
	      searchStore[c.form] = c;
	    });
	
	    // allow scripts to hook into calc setup completion
	    mw.hook(`${HOOK_ID}.setupComplete`).fire();
    });
  }

  $(init);

  hsb.customSearch = {};
  hsb.customSearch.lookup = lookupSearch;
})(jQuery, mediaWiki, hsbwiki);