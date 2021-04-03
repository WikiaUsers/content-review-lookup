/**
	A library for previewing api edits.
	Methods: makeApiEditPreviewElement

	Usage example (load first with mw.loader):

	apiEditPreview.makeApiEditPreviewElement({action: "edit" ...}).done(function(ele) {
		$( "#mw-content-text" ).append( ele.$element );
	});
*/
var apiEditPreview = apiEditPreview ? apiEditPreview : (function () {
	"use strict";
	
	var api = new mw.Api();	
	var changeTags; // Will become defined after an indeterminate amount of time spent getting the list of change tags from the api. Not very important, so it doesn't need to be waited on.

	api.get( {
		action: "query",
		format: "json",
		list: "tags",
		tgprop: "source",
		tglimit: "max"
	} ).done( function ( data ) {
		var tags = data.query.tags;
		var sources;
		changeTags = [];
		for (var i = 0; i < tags.length; i++) {
			sources = tags[i].source;
			for (var j = 0; j < sources.length; j++) {
				if (sources[j] === "manual") {
					changeTags.push({data: tags[i].name});
					break;
				}
			}
		}
	} ).fail(function(e){mw.log.warn("Failed to get list of change tags from the API: "+e);});

	var module = {
		makeApiEditPreviewElement: undefined
	};

	//Feel free to support these
	var UNSUPPORTED_PARAMETERS = ["unwatch","watchlist","starttimestamp","basetimestamp","md5","undo","undoafter","contentformat","contentmodel","token","captchaword","captchaid"];

	
	/**
	 * Test an API boolean. This function is from the MediaWiki source code for Special:ApiSandbox
	 *
	 * @param {Mixed} value
	 * @return {boolean}
	 */
	function apiBool( value ) {
		return value !== undefined && value !== false;
	}
	
	/**
		Parses "Values (separate with | or alternative)" data type from the API. This function is from the MediaWiki source code for Special:ApiSandbox
		@param {v} string to parse
		@return An array of values
	*/
	function parseApiValue( v ) {
		if ( v === undefined || v === '' || v === '\x1f' ) {
			return [];
		} else {
			v = String( v );
			if ( v[ 0 ] !== '\x1f' ) {
				return v.split( '|' );
			} else {
				return v.substr( 1 ).split( '\x1f' );
			}
		}
	}
	
	/**
		Parses an array of strings into a string satisfying the "Values (separate with | or alternative)" data type from the API. This function is from the MediaWiki source code for Special:ApiSandbox
		@param {items} An array of values
		@return string
	*/
	function getApiValue(items) {
		if ( items.join( '' ).indexOf( '|' ) === -1 ) {
			return items.join( '|' );
		} else {
			return '\x1f' + items.join( '\x1f' );
		}
	}

	function uncheckOtherCheckboxesIfThisIsChecked(thisCheckbox, otherCheckboxes) {
		thisCheckbox.on("change", function(isChecked) {
			if (isChecked) {
				for (var i = 0; i < otherCheckboxes.length; i++) {
					otherCheckboxes[i].setSelected(false);
				}
			}
		});
	}

	function notifyError(errorMessage) {
		mw.loader.using("mediawiki.notify", function() {
			mw.notify(errorMessage, { title: "Error" });
			mw.log.error(errorMessage);
		}, function(e) {
			mw.log.warn(e);
			mw.log.error(errorMessage);
		});
	}

	function createCheckbox(apiParameter) {
		return new OO.ui.CheckboxInputWidget( apiParameter === undefined ? {
			indeterminate: true
		} : {
			selected: apiBool(apiParameter)
		});
	}

/**
	makeApiEditPreviewElement(apiParameters, onSubmit, onCancel) returns jQuery promise that contains an OOUI element representing apiParameters.
	http://api.jquery.com/Types/#Promise
	https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PanelLayout

	apiParamters: The API parameters object.
	onSubmit: A callback function of the form function(apiParameters, previewElement){}.
	onCancel: A callback function of the form function(previewElement){}.
*/

	module.makeApiEditPreviewElement = function (apiParameters, onSubmit, onCancel) {
		return mw.loader.using("oojs-ui-widgets").then(function() {
			for (var i = 0; i < UNSUPPORTED_PARAMETERS.length; i++) {
				if (apiParameters[UNSUPPORTED_PARAMETERS[i]]) {
					throw new Error("Unsupported parameter in apiParameters");
				}
			}

			var fieldsetLayoutItems = [];
			var titleItem;
			var pageidItem;
			var sectionItem;
			var sectiontitleItem;
			var prependtextItem;
			var textItem;
			var appendtextItem;
			var summaryItem = new OO.ui.TextInputWidget( {
				autocomplete: false,
				value: apiParameters.summary
			});
			var tagsItem = new OO.ui.MenuTagMultiselectWidget( {
				allowArbitrary: !changeTags,
				allowDuplicates: false,
				options: changeTags,
				icon: "tag",
				selected: parseApiValue(apiParameters.tags)
			});
			var minorItem = createCheckbox(apiParameters.minor);
			var notminorItem = createCheckbox(apiParameters.notminor);
			var recreateItem = createCheckbox(apiParameters.recreate);
			var createonlyItem = createCheckbox(apiParameters.createonly);
			var nocreateItem = createCheckbox(apiParameters.nocreate);
			var botItem = createCheckbox(apiParameters.bot);
			var redirectItem = createCheckbox(apiParameters.redirect);
			var submitButton = new OO.ui.ButtonWidget( {
				"label":"Submit",
				"flags":["progressive","primary"]
			} );
			var cancelButton = new OO.ui.ButtonWidget( {
				"framed":false,
				"label":"Cancel",
				"flags":["destructive"]
			} );
			
			var previewElement;

			uncheckOtherCheckboxesIfThisIsChecked(minorItem, [notminorItem]);
			uncheckOtherCheckboxesIfThisIsChecked(notminorItem, [minorItem]);
			uncheckOtherCheckboxesIfThisIsChecked(createonlyItem, [nocreateItem]);
			uncheckOtherCheckboxesIfThisIsChecked(recreateItem, [nocreateItem]);
			uncheckOtherCheckboxesIfThisIsChecked(nocreateItem, [createonlyItem,recreateItem]);
			
			if (apiParameters.title || !apiParameters.pageid) {
				titleItem = new OO.ui.TextInputWidget( {
					autocomplete: false,
					required: true,
					validate: /^[^\[\]{}|#<>%+?]+$/,
					value: apiParameters.title
				});
				fieldsetLayoutItems.push(new OO.ui.FieldLayout(titleItem, {label: "Title"}));
			}
			if (apiParameters.pageid) {
				pageidItem = new OO.ui.NumberInputWidget( {
					autocomplete: false,
					required: true,
					min: 0,
					type: "number",
					showButtons: false,
					value: apiParameters.pageid
				});
				fieldsetLayoutItems.push(new OO.ui.FieldLayout(pageidItem, {label: "Page ID"}));
			}
			if (apiParameters.section) {
				sectionItem = new OO.ui.TextInputWidget( {
					autocomplete: false,
					validate: /^(?:new|\d+)$/,
					value: apiParameters.section
				});
				fieldsetLayoutItems.push(new OO.ui.FieldLayout(sectionItem, {label: "Section"}));
				if (apiParameters.section === "new") {
					sectiontitleItem = new OO.ui.TextInputWidget( {
						autocomplete: false,
						value: apiParameters.sectiontitle
					});
					fieldsetLayoutItems.push(new OO.ui.FieldLayout(sectiontitleItem, {label: "Section Title"}));
				}
			}
			
			if (!(apiParameters.prependtext || apiParameters.appendtext)) {
				textItem = new OO.ui.MultilineTextInputWidget( {
					autosize: true,
					classes: ["mw-editfont-monospace"],
					autocomplete: false,
					spellcheck: true,
					value: apiParameters.text
				});
				fieldsetLayoutItems.push(new OO.ui.FieldLayout(textItem, {label: "Text"}));
			} else {
				prependtextItem = new OO.ui.MultilineTextInputWidget( {
					autosize: true,
					classes: ["mw-editfont-monospace"],
					autocomplete: false,
					spellcheck: true,
					value: apiParameters.prependtext
				});
				appendtextItem = new OO.ui.MultilineTextInputWidget( {
					autosize: true,
					classes: ["mw-editfont-monospace"],
					autocomplete: false,
					spellcheck: true,
					value: apiParameters.appendtext
				});
				fieldsetLayoutItems.push(
					new OO.ui.FieldLayout(prependtextItem, {label: "Prepend text"}),
					new OO.ui.FieldLayout(appendtextItem, {label: "Append text"})
				);
			}
			fieldsetLayoutItems.push(
				new OO.ui.FieldLayout(summaryItem, {label: "Edit summary"}),
				new OO.ui.FieldLayout(tagsItem, {label: "Change tags"}),
				new OO.ui.HorizontalLayout( {
					items: [
						new OO.ui.FieldLayout(minorItem, {label: "Minor edit", align: "inline"}),
						new OO.ui.FieldLayout(notminorItem, {label: "Not minor edit", align: "inline"}),
						new OO.ui.FieldLayout(botItem, {label: "Bot", align: "inline"}),
						new OO.ui.FieldLayout(recreateItem, {label: new OO.ui.HtmlSnippet("<code>recreate</code>"), align: "inline"}),
						new OO.ui.FieldLayout(createonlyItem, {label: new OO.ui.HtmlSnippet("<code>createonly</code>"), align: "inline"}),
						new OO.ui.FieldLayout(nocreateItem, {label: new OO.ui.HtmlSnippet("<code>nocreate</code>"), align: "inline"}),
						new OO.ui.FieldLayout(redirectItem, {label: "Resolve redirects", align: "inline"})
					]
				}),
				new OO.ui.HorizontalLayout( {
					items: [
						submitButton,
						cancelButton
					]
				} )
			);

			var updateApiParameters = function() {
				if (titleItem) {
					apiParameters.title = titleItem.getValue();
				}
				if (pageidItem) {
					apiParameters.pageid = pageidItem.getValue();
				}
				if (sectionItem) {
					apiParameters.section = sectionItem.getValue();
				}
				if (sectiontitleItem) {
					apiParameters.sectiontitle = sectiontitleItem.getValue();
				}
				if (prependtextItem) {
					apiParameters.prependtext = prependtextItem.getValue();
				}
				if (textItem) {
					apiParameters.text = textItem.getValue();
				}
				if (appendtextItem) {
					apiParameters.appendtext = appendtextItem.getValue();
				}
				if (summaryItem) {
					apiParameters.summary = summaryItem.getValue();
				}
				if (tagsItem) {
					apiParameters.tags = getApiValue(tagsItem.getValue());
				}
				if (!minorItem.isIndeterminate()) {
					apiParameters.minor = minorItem.isSelected();
				}
				if (!notminorItem.isIndeterminate()) {
					apiParameters.notminor = notminorItem.isSelected();
				}
				if (!recreateItem.isIndeterminate()) {
					apiParameters.recreate = recreateItem.isSelected();
				}
				if (!createonlyItem.isIndeterminate()) {
					apiParameters.createonlyItem = createonlyItem.isSelected();
				}
				if (!nocreateItem.isIndeterminate()) {
					apiParameters.nocreate = nocreateItem.isSelected();
				}
				if (!botItem.isIndeterminate()) {
					apiParameters.bot = botItem.isSelected();
				}
				if (!redirectItem.isIndeterminate()) {
					apiParameters.redirect = redirectItem.isSelected();
				}
			};

			previewElement = new OO.ui.PanelLayout( {
				content: [
					new OO.ui.FieldsetLayout( {
						items: fieldsetLayoutItems
					})
				],
				framed: true,
				expanded: false,
				padded: true
			});

			submitButton.on("click", onSubmit ? function() {
				updateApiParameters();
				onSubmit(apiParameters, previewElement);
			} : function() {
				updateApiParameters();
				api.postWithEditToken(apiParameters).done(function() {
					previewElement.$element.remove();
				}).fail(function(e){
					submitButton.setDisabled(false);
					notifyError(e);
				});
				submitButton.setDisabled(true);
			});

			cancelButton.on("click", onCancel ? function() {
				onCancel(previewElement);
			} : function() {
				previewElement.$element.remove();
			});
			
			return previewElement;
		}).fail(notifyError);
	};

	return module;
})();