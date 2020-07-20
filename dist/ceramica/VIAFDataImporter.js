/***********************************************************************
 * VIAFDataImporter.js
 * Loaded through [[MediaWiki:Gadget-VIAFDataImporter.js]]
 * Help at [[Help:Gadget-VIAFDataImporter]]
 * <nowiki>
 * A tool to make it easy to select and import authority control data
 * from VIAF (viaf.org) using a text query.
 *
 * Adds a link to the toolbox which opens a frame at the top of the page
 * containing a search box which loads data directly from VIAF. Click
 * the icon to use the record, or the number to jump to the VIAF record
 * page.
 *
 * Bugs and suggestions to [[User:Inductiveload]], or patch as needed
 *
 * Version 0.1   - 2012-01-19 - Initial release
 *               - 2012-01-25 - Allow suggested text to load even on
 *                              non-existent pages
 *               - 2012-03-10 - Warn when VIAF AutoSuggest might not
 *                              return all hits
 *               - 2012-04-23 - Add ability to save pages, update pages
 *                              while editing, de-select VIAF entries
 *         0.2   - 2012-04-25 - Add Commons-specific functionality
 *               - 2012-04-26 - Tweak Template insertion points, add
 *                              category NS support
 *         0.3   - 2012-05-04 - Add Institution namespace support
 *                              Prevent adding AC data to pages with
 *                              Category or Insitution templates
 *               - 2012-06-05   Prevent commented templates breaking
 *                              replacement. Escape input text to avoid
 *                              code injection. Pass JSLint
 *               - 2012-06-08   URLEncode parameters, further escaping
 *                              before inserting stuff into the DOM
 *                              Pass JSLint webtool without having to 
 *                              click buttons
 *               - 2013-01-15   Add SUDOC and ISNI
 *               - 2013-05-02   Change PND to GND
 **********************************************************************/

/*global jQuery:false, mediaWiki:false, alert:false */
/*jslint regexp:true, browser:true, white: true, vars:true */

(function ($, mw) {
	"use strict";
	
	var namespaceNumber = mw.config.get('wgNamespaceNumber'),
		currentAction = mw.config.get('wgAction'),
		pageName = mw.config.get('wgPageName'),
		apiUrl = mw.util.wikiScript('api'),
		VIAFDataGrabber;

	window.VIAFDataGrabber = VIAFDataGrabber = function () { //constructor

			//translating from VIAF JSON names to Wiki template names
			this.template_parameters_translation = {
				'dnb': 'GND',
				'lc': 'LCCN',
				'viafid': 'VIAF',
				'selibr': 'SELIBR',
				'bnf': 'BNF',
				'sudoc': 'SUDOC',
				'isni': 'ISNI',
				'jpg': 'ULAN',
				'nla': 'NLA'
			};

			this.acTemplateRE = /\{\{ *[Aa]uthority[ _]control *\|[^\}]*?\}\}/m; //regex to find AC templates
			this.preferredTemplatesRE = /\{\{ *([Cc]reator|[Ii]nstitution) *\:(.*?)\}\}/; //regex to find templates which preclude using AC templates on that page directly
			this.acTemplate = 'Authority control'; //the template name
			this.acTemplateBareParameters = ['bare', 'Bare']; //the template parameters to trigger a "bare" template - the first one will be used
			this.editSummary = 'Authority control template information from VIAF (added by [[Help:Gadget-VIAFDataImporter|VIAFDataImporter]]).';
			this.preferredTemplatesWarning = 'This page has a {{$1}} template on it already. Please add the Authority Control data to that page instead.';

			this.icons = {
				'add': '//upload.wikimedia.org/wikipedia/commons/thumb/4/41/Ambox_emblem_plus.svg/20px-Ambox_emblem_plus.svg.png',
				'remove': '//upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/20px-Dialog-error-round.svg.png'
			};

			this.pageDataFound = false;
			this.acDataFound = false;
			this.acDataFoundIsBad = false;
			this.acTemplateBare = $.inArray(namespaceNumber, [100, 106]) > -1; //add the bare option to the template in the right namespaces
			this.viafAutosuggestMaxResults = 10; //max results viaf returns
			
			//this.add_VIAF_pane(); //uncomment when debugging to prevent having to click button each time
		};

	// NOTICE: This is the function which you should change to alter where
	// this gadget saves the template within the page.
	VIAFDataGrabber.prototype.add_ac_template_to_text = function (text) {
		//splice the template into the text, overwriting any current template
		var raw_template = $('#viaf_raw_proposed_data').text();

		if (namespaceNumber === 100 || namespaceNumber === 106) { //creator or institution namespace
			var parameter_re = /( *\| *[Aa]uthority *= *)(?:<!-- *)?(\{\{[^\}\n]*\}\})(?: *-->)?/, //regex to find an existing AC template as an existing parameter
				parameter = parameter_re.exec(text);

			if (parameter !== null) { //replace existing parameter
				text = text.replace(parameter_re, parameter[1] + raw_template);
			} else { //there is no parameter in the creator template - add to the end

				//format according to the namespace - {{creator}} and {{institution}} have different standard spacing
				if (namespaceNumber === 100) {
					text = text.replace(/\}\}\n*$/, ' | Authority         = ' + raw_template + '\n}}');
				} else if (namespaceNumber === 106) {
					text = text.replace(/\}\}\n*$/, '  | authority = ' + raw_template + '\n}}');
				}
			}
			return text;
		}

		if ($.inArray(namespaceNumber, [0, 14]) > -1) { //gallery or category page - place above IW links

			//warn about preferred templates and abort
			var preferredTemplatesMatch = this.preferredTemplatesRE.exec(text);
			if (preferredTemplatesMatch !== null) {
				alert(this.preferredTemplatesWarning.replace('$1', preferredTemplatesMatch[1]));
				return false;
			}

			var footer_re = /((\n(\[\[[a-z\-]+:[^\]]+\]\])?[\n\s]*)*)$/; //regex to find the footers which go under the AC template
			var match = this.acTemplateRE.exec(text);

			if (match === null) { //there is no existing template
				var foot = footer_re.exec(text);

				if (foot !== null) {
					text = text.replace(footer_re, '\n\n' + raw_template + foot[1]);
				} else {
					text = text + '\n\n' + raw_template;
				}

			} else {
				text = text.replace(this.acTemplateRE, raw_template); //update the text in the text box
			}
			return text;
		}

		alert('Saving is not supported in this namespace');
		return false;
	};


	VIAFDataGrabber.prototype.construct_VIAF_search_URL = function (query) {

		return '//viaf.org/viaf/search?query=local.personalNames = "' + encodeURIComponent(query) + '"&stylesheet=/viaf/xsl/results.xsl&sortKeys=holdingscount&maximumRecords=100';
	};

	VIAFDataGrabber.prototype.close_VIAF_pane = function () {
		$('#add_viaf_data_pane').remove();
	};

	VIAFDataGrabber.prototype.add_VIAF_pane = function () {

		var myself = this;
		if ($('#add_viaf_data_pane').length > 0) {
			return;
		}

		mw.util.addCSS('.selected .viaf-id-link { font-weight:bold; }');
		mw.util.addCSS('.viaf-entry-icon { float:left; width:20px; height:20px; background-image:url("' + this.icons.add + '"); }');
		mw.util.addCSS('.selected .viaf-entry-icon { background-image:url("' + this.icons.remove + '"); }');
		mw.util.addCSS('#viaf_raw_proposed_data {margin-left:1em; font-size:120%; background-color:white; }');
		mw.util.addCSS('.viaf-changes-list {margin-left:2em; font-size:80%;}');
		mw.util.addCSS('.current_authority_control_data {margin-left:1em;}');

		this.viafDiv = $('<div id="add_viaf_data_pane" style="position:relative; background-color:#EEEEEE; border:1px solid blue; padding:1em; margin-bottm:0.5em;"><h3>Add authority control data</h3></div>');

		var closeDiv = $('<div style="position:absolute; right:1em; top:0.1em;"><div/>');

		var closeLink = $('<a href="#">[Close]</a>');

		closeLink.click(function () {
			myself.close_VIAF_pane();
		});

		closeDiv.append(closeLink);
		this.viafDiv.append(closeDiv);


		var jump_to_viaf_link = $("<a> Go to VIAF's search page.</a>");

		var viaf_query_input = $('<input>', {
			type: 'text',
			value: mw.config.get('wgTitle'),
			name: 'viaf_query',
			id: "viaf_query_input"
		});

		viaf_query_input.change(function () {
			// link to real VIAF search
			jump_to_viaf_link.attr('href', myself.construct_VIAF_search_URL($('#viaf_query_input').val()));
		});


		var submitVIAFquery = $('<input type="button" value="Search VIAF" id="submit_viaf_query" name="submit_viaf_query"/>');

		submitVIAFquery.click(function () {

			//using real search (but how to make the cross domain request?)
			//var url = 'https://viaf.org/viaf/search?query=local.personalNames = "' + $('#viaf_query_input').val() + '"&version=1.1&operation=searchRetrieve&recordSchema=https://viaf.org/VIAFCluster&maximumRecords=50&startRecord=1&resultSetTTL=300&recordPacking=xml&recordXPath=&sortKeys=&httpAccept=text/xml'

			//using autosuggest (clumsy, but we can use JSONP)
			$.getJSON("https://viaf.org/viaf/AutoSuggest?query=" + encodeURIComponent($('#viaf_query_input').val()) + "&callback=?", function (data) {
				myself.display_query_results(data);
			});
		});

		this.viafResultsDiv = $('<div id="viaf_results"></div>');
		this.viafCurrentDataDiv = $('<div></div>');
		this.viafProposedDataDiv = $('<div id="proposed_authority_control_data"></div>');
		this.viafSaveACDiv = $('<div id="viaf_save_authority_control" style="display:none;"><hr></div>');

		var saveACButton = $('<input type="button" value="Update authority control information" id="viaf_save_ac_template" name="viaf_save_ac_template"/>');
		this.viafSaveACDiv.append(saveACButton);

		saveACButton.click(function () {
			myself.save_ac_data();
		});

		this.viafDiv.append(viaf_query_input, submitVIAFquery, jump_to_viaf_link);

		this.viafDiv.append('<hr>', this.viafResultsDiv);
		this.viafDiv.append('<hr>', this.viafCurrentDataDiv);
		this.viafDiv.append('<hr>', this.viafProposedDataDiv);
		this.viafDiv.append(this.viafSaveACDiv);

		mw.util.$content.prepend(this.viafDiv);

		viaf_query_input.change(); //trigger an update of the link
		if (currentAction === 'view') { //get data from API
			this.get_raw_page(pageName, this.show_current_authority_data);
		} else if ($.inArray(currentAction, ['submit', 'edit']) > -1) { //or from the current edit box
			this.show_current_authority_data($('#wpTextbox1').val());
		}

		submitVIAFquery.click(); //preload the page name results
	};

	VIAFDataGrabber.prototype.show_current_authority_data = function (data) {

		var current_ac_data, i;

		if (data === null) {
			current_ac_data = null;
		} else {
			current_ac_data = data.match(/\{\{ *[Aa]uthority control *\|.*\}\}/g);
		}

		this.pageDataFound = true;

		if (current_ac_data === null) {
			this.viafCurrentDataDiv.html('No existing authority data has been found on this page.');
			this.acDataFound = false;
			this.acDataFoundIsBad = false;
		} else if (current_ac_data.length === 1) {
			this.viafCurrentDataDiv.html('Authority control template found on this page. New data will be merged with it.<br>');
			this.viafCurrentDataDiv.append($('<tt>', {'class': 'current_authority_control_data', text: current_ac_data[0]}));
			this.acDataFound = this.parse_ac_template(current_ac_data[0]);
			this.acDataFoundIsBad = false;
		} else {
			this.viafCurrentDataDiv.html('<span class="error">Multiple authority control templates exist on this page:</span><br>');
			this.acDataFound = true;
			this.acDataFoundIsBad = true;
			for (i = 0; i < current_ac_data.length; i += 1) {
				this.viafCurrentDataDiv.append($('<tt>', {'class': 'current_authority_control_data', text: current_ac_data[i]}), '<br>');
			}
		}
	};

	VIAFDataGrabber.prototype.parse_ac_template = function (template) {
		//parse a string holding a AC template into the AC array
		var i = 0;
		var parameter = '';
		var array = {};


		while (template[i] !== '|') { //get past the {{template name|
			i = i + 1;
		}

		while (true) {

			if (i === template.length) { //somehow we have overstepped the end of the template - maybe it was incomplete
				break;
			}

			i = i + 1;

			if (template[i] !== '|' && template[i] !== '}') {
				parameter = parameter + template[i];
			} else { //we have completed a parameter
				var myRegexp = /([^=]+)\s*=\s*(.*)/g; //look for parameter = value
				var match = myRegexp.exec(parameter);

				if (match !== null && $.inArray(match[1], this.acTemplateBareParameters) === -1 && match[2] !== '') {
					array[match[1]] = match[2];
				}

				if (template[i] === '}') { //end of the template
					break;
				}

				parameter = '';
			}
		}

		return array;
	};

	VIAFDataGrabber.prototype.add_VIAF_button = function () {
		var btn_id = 'tb-viaf-authority-control';
		mw.util.addPortletLink('p-tb', '#', 'Add authority control', btn_id, 'Add an authority control template using data from VIAF');

		// Bind click handler
		$('#' + btn_id).click($.proxy(this.add_VIAF_pane, this));
	};

	VIAFDataGrabber.prototype.display_query_results = function (results) {
		var i;

		if (results.result === null) {
			this.viafResultsDiv.html('No results found for "' + results.query + '"');
		} else {

			var viafids = []; //list of ids to prevent dupes
			var results_list = $('<ul id="viaf-results-list" style="list-style: none;"><ul>');

			var count = 0;

			for (i = 0; i < results.result.length; i += 1) {

				if ($.inArray(results.result[i].viafid, viafids) === -1) { //fliter out duplicate VIAF ids
					viafids.push(results.result[i].viafid);
					results_list.append(this.build_list_entry(results.result[i]));
				}
				count += 1;
			}

			this.viafResultsDiv.html('').append(results_list);

			if (count >= this.viafAutosuggestMaxResults) {
				var warning = $('<span>', { style: 'font-style:italic', id: 'viaf-warn-further-results' }).append(
					"These may not be all the results available from VIAF. See the ", 
					$('<a>', { href: this.construct_VIAF_search_URL($('#viaf_query_input').val()), text: "full VIAF search page" }),
					" for more results."
				);
				this.viafResultsDiv.append(warning);
			}
		}
	};

	VIAFDataGrabber.prototype.build_list_entry = function (result) {
		var myself = this;
		var entry = $('<li>');

		var use_id = $('<div class="viaf-entry-icon"></div>');

		use_id.click(function () {

			if (entry.hasClass('selected')) {
				entry.removeClass('selected');
				myself.remove_data();
			} else {
				myself.add_viaf_data(result);
				myself.viafResultsDiv.find('li').removeClass('selected'); //remove other entries' bolding
				entry.addClass('selected'); //add it to this one
			}
		});

		entry.append(use_id, '&nbsp;VIAF ID: ', '<a class="viaf-id-link" href="https://viaf.org/viaf/' + mw.html.escape(result.viafid) + '">' + mw.html.escape(result.viafid) + '</a> ', mw.html.escape(result.term));

		return entry;
	};

	VIAFDataGrabber.prototype.remove_data = function () {
		//remove any result selected
		this.viafProposedDataDiv.empty();
		this.viafProposedDataDiv.empty();
		this.merge_authority_data(null);
	};

	VIAFDataGrabber.prototype.add_viaf_data = function (result) {
		// adds data from a viaf json result to the AC data already present
		if (!this.pageDataFound) {
			this.viafCurrentDataDiv.html('<span class="error">Current page wikitext not loaded, please wait until this message changes and try again.</span>');
			return;
		}

		if (this.acDataFoundIsBad) {
			this.viafCurrentDataDiv.append('<span class="error">The current authority control data cannot be merged with imported data. Fix the existing data first (eg. remove duplicate templates) and try again.</span>');
			return;
		}

		//page data is loaded, and it is OK, let's merge the data!
		this.merge_authority_data(result);
	};

	VIAFDataGrabber.prototype.construct_ac_template = function (data, bare) {

		var text = '{{' + this.acTemplate;

		$.each(data, function (field, value) {
			text += '|' + field + '=' + value;
		});

		text = text + (bare ? ('|' + this.acTemplateBareParameters[0] + '=1') : '') + '}}';

		return text;
	};

	VIAFDataGrabber.prototype.merge_authority_data = function (result) {
		//Merge authority data from a VIAF result with any existing data
		var myself = this;

		//construct an array of new data
		var new_data = {};
		var i, id;

		$.each(result, function (field, orig_id) {
			if (field === 'lc') { //format IDs as needed
				id = '';
				var id_i = 0;
				while (orig_id[id_i].search(/[A-Za-z]/) !== -1) { //alphabetical prefix
					id = id + orig_id[id_i];
					id_i = id_i + 1;
				}
				var year_len = (result[field].length - id_i < 9) ? 2 : 4;
				id = id + '/' + orig_id.slice(id_i, id_i + year_len) + '/' + orig_id.slice(id_i + year_len).replace(/^0+/, ''); //truncate leading zeroes
			} else if (field === 'dnb') {
				id = orig_id.toUpperCase();
			} else if (field === 'nla') {
				id = orig_id.replace(/^0+/, ''); //truncate leading zeroes
			} else if (field === 'bnf') {

				var bnf_xdigits = '0123456789bcdfghjkmnpqrstvwxz';
				var bnf_check_digit = 0;

				id = 'cb' + orig_id;
				for (i = 0; i < id.length; i += 1) {
					bnf_check_digit += bnf_xdigits.indexOf(id[i]) * (i + 1);
				}
				id += bnf_xdigits[bnf_check_digit % 29]; //29 is the radix
			} else {
				id = orig_id;
			}

			if (myself.template_parameters_translation.hasOwnProperty(field)) { //if the parameter is allowed, get the WS template parameter and save it
				new_data[myself.template_parameters_translation[field]] = id;
			}
		});

		this.added_fields = {}; //fields add the existing data
		this.conflicted_fields = {}; //fields that conflict and need approval
		this.pending_fields = {}; //fields that don't conflict but won't be added
		$.each(new_data, function (field, value) {
			if (myself.acDataFound && myself.acDataFound.hasOwnProperty(field)) {

				if (myself.acDataFound[field] === value) { //duplicate field, ignore
					return true;
				}

				myself.conflicted_fields[field] = value;
			} else {
				myself.added_fields[field] = value;
			}
		});

		this.provisional_data = $.extend({}, this.acDataFound);

		$.each(this.added_fields, function (field, value) {
			if (!myself.provisional_data.hasOwnProperty(field)) { //add any new data by default
				myself.provisional_data[field] = value;
			}
		});

		this.show_suggestions();
	};

	VIAFDataGrabber.prototype.show_suggestions = function () {

		var myself = this;
		this.viafSaveACDiv.css('display', 'none');

		if (!this.provisional_data.hasOwnProperty('VIAF')) { //we don't have a selected item, clear out and get out
			this.viafProposedDataDiv.empty();
			return;
		}

		if ($.isEmptyObject(this.added_fields) && $.isEmptyObject(this.pending_fields) && $.isEmptyObject(this.conflicted_fields)) {
			this.viafProposedDataDiv.html('No changes available for authority control template using VIAF ID ' + mw.html.escape(this.provisional_data.VIAF) + '.');
		} else {
			if ($.isEmptyObject(this.added_fields) && $.isEmptyObject(this.provisional_data)) {
				this.viafProposedDataDiv.html('No authority data selected.<br>');
			} else {
				var template = this.construct_ac_template(this.provisional_data, this.acTemplateBare);

				this.viafProposedDataDiv.html('Proposed authority control template:<br><tt id="viaf_raw_proposed_data">' + mw.html.escape(template) + '</tt><br>');

				var renderedTemplateHTML = $('<div id="viaf-rendered-template"></div>');
				this.viafProposedDataDiv.append(renderedTemplateHTML);

				//render the template and display it
				$.ajax({
					url: apiUrl + '?' + $.param({
						format: 'json',
						action: 'parse',
						prop: 'text',
						title: pageName,
						text: template
					}),
					success: function (data) {
						renderedTemplateHTML.append($(data.parse.text['*']));
					}
				});
			}

			var added_list = $('<ul class="viaf-changes-list"></ul>');
			var pending_list = $('<ul class="viaf-changes-list"></ul>');
			var conflict_list = $('<ul class="viaf-changes-list"></ul>');

			var list_item, link;

			$.each(this.added_fields, function (field, value) {
				list_item = $('<li>').text('Added field: ' + field + ': ' + value + '.');
				link = $('<a href="#">Remove this field.</a>');

				link.bind('click', {
					field: field
				}, function (e) {
					myself.remove_added(e.data.field);
					return false;
				});

				added_list.append(list_item.append(link));
			});

			$.each(this.pending_fields, function (field, value) {
				list_item = $('<li>').text('Pending field: ' + field + ': ' + value + '.');
				link = $('<a href="#">Add this value.</a>');

				link.bind('click', {
					field: field
				}, function (e) {
					myself.add_removed(e.data.field);
					return false;
				});

				pending_list.append(list_item.append(link));
			});

			$.each(this.conflicted_fields, function (field, value) {
				list_item = $('<li>Conflict in field: ' + field + '. Current value: ' + myself.provisional_data[field] + '; conflicting value: ' + value + '. </li>');
				link = $('<a href="#">Switch values.</a>');

				link.bind('click', {
					field: field
				}, function (e) {
					myself.approve_conflict(e.data.field);
					return false;
				});

				conflict_list.append(list_item.append(link));
			});

			//show whichever list have items
			if (!$.isEmptyObject(this.added_fields)) {
				this.viafProposedDataDiv.append('Changes made:', added_list);
			}
			if (!$.isEmptyObject(this.pending_fields)) {
				this.viafProposedDataDiv.append('Available fields:', pending_list);
			}
			if (!$.isEmptyObject(this.conflicted_fields)) {
				this.viafProposedDataDiv.append('Conflicts:', conflict_list);
			}

			if ($('#viaf_raw_proposed_data').length > 0 && $('#viaf_raw_proposed_data').text() !== $('.current_authority_control_data').text()) { //if we changed anything
				this.viafSaveACDiv.css('display', '');
			} else {
				this.viafSaveACDiv.css('display', 'none');
			}
		}
	};

	VIAFDataGrabber.prototype.approve_conflict = function (field) {

		var temp = this.provisional_data[field];

		this.provisional_data[field] = this.conflicted_fields[field];
		this.conflicted_fields[field] = temp;

		this.show_suggestions(); //update the suggestions
	};

	VIAFDataGrabber.prototype.remove_added = function (field) {

		this.pending_fields[field] = this.added_fields[field];
		delete this.added_fields[field];
		delete this.provisional_data[field];
		this.show_suggestions(); //update the suggestions
	};

	VIAFDataGrabber.prototype.add_removed = function (field) {

		this.added_fields[field] = this.pending_fields[field];
		this.provisional_data[field] = this.pending_fields[field];
		delete this.pending_fields[field];
		this.show_suggestions(); //update the suggestions
	};

	VIAFDataGrabber.prototype.save_ac_data = function () {


		if (currentAction === 'view') { //update in the background
			this.get_raw_page(pageName, this.update_page);
		} else if ($.inArray(currentAction, ['submit', 'edit']) > -1) {
			var text = $('#wpTextbox1').val();
			text = this.add_ac_template_to_text(text);

			if (!text) {
				return;
			}

			$('#wpTextbox1').val(text);

			$('#wpTextbox1').css({
				'outline': '2px solid green'
			});
			setTimeout(function () {
				$('#wpTextbox1').css({
					'outline': ''
				});
			}, 2000);
		}
	};

	VIAFDataGrabber.prototype.update_page = function (data) {
		var text = this.add_ac_template_to_text(data);

		if (text) {
			this.save_page(pageName, text, this.editSummary);
		}

	};

	VIAFDataGrabber.prototype.get_raw_page = function (pagetitle, callback) {
		var myself = this;

		//get the current page text
		/*jslint unparam: true*/
		$.ajax({
			url: mw.util.wikiScript(),
			data: {
				action: 'raw',
				title: pagetitle
			},
			cache: false,
			success: function (data) {
				$.proxy(callback, myself)(data);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert('Page text could not be loaded: [[' + pagetitle + ']]');
			}
		});
	};

	VIAFDataGrabber.prototype.save_page = function (title, content, summary) {

		$.ajax({
			url: apiUrl,
			data: {
				format: 'json',
				action: 'edit',
				title: title,
				summary: summary,
				text: content,
				token: mw.user.tokens.get('editToken')
			},
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				if (data && data.edit && data.edit.result === 'Success') {
					window.location = mw.util.wikiScript() + '?' + $.param({
						title: pageName,
						diff: data.edit.newrevid,
						oldid: data.edit.oldrevid
					});
				} else if (data && data.error) {
					alert('Error: API returned error code "' + data.error.code + '": ' + data.error.info);
				} else {
					alert('Error: Unknown result from API.');
				}
			},
			error: function () {
				$.alert('Error: Request failed.');
			}
		});
	};

	$(function () {
		if ($.inArray(namespaceNumber, [0, 2, 14, 100, 106]) > -1) { //only trigger in sensible namespaces
			var x = new VIAFDataGrabber();
			$(document).triggerHandler('scriptLoaded', ['VIAFDataImporter', x]);
		}
	});

}(jQuery, mediaWiki)); //END IIFE
//<nowiki>