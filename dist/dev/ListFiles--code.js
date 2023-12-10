/*!
 * Copyright (c) 2012 Jeff Bradford (User:Mathmagician)
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*jshint noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, laxbreak:true, jquery:true */
/*global mediaWiki */

(function ($, mw, window, undefined) {
	"use strict";

	// private properties
	var baseURL, url, urlParameters, query, displayParameters, pathRegex,
		$container, $aifrom, $aito, $ascending, $descending, $aiprefix, $aiminsize, $aimaxsize, $ailimit, $query;

	/**
	 * Typical element of the 'query' array:
	 *
	 * descriptionurl: "https://mathmagician.wikia.com/wiki/File:100px-Main_buildings.png"
	 * height: 52
	 * mime: "image/png"
	 * name: "100px-Main_buildings.png"
	 * ns: 6
	 * size: 4897
	 * timestamp: "2012-09-18T01:07:21Z"
	 * title: "File:100px-Main buildings.png"
	 * url: "https://vignette.wikia.nocookie.net/mathmagician/images/3/37/100px-Main_buildings.png/revision/latest?cb=20120918010721"
	 * user: "Surriela"
	 * width: 100
	*/

	// returns approximate file size rounded to 2 decimal places: e.g. 100000 -> 97.66 KB
	function getApproxSize(num) {
		if (num < 1024) {
			return (num + ' B');
		}
		num = num / 1024;
		if (num < 1024) {
			return ((Math.round(num * 100) / 100) + ' KB');
		}
		num = num / 1024;
		return ((Math.round(num * 100) / 100) + ' MB');
	}

	// sets the URL used by query (format=json not appended)
	function setURL() {
		url = baseURL;
		for (var p in urlParameters) {fi
			url += '&' + p + '=' + urlParameters[p];
		}
		var	link = '<a id="qo-url" href="' + url + '">' + url + '</a>';
		$('#qo-url').replaceWith(link);
	}

	// API callback, processes data and builds results to display
	function apiCall(data) {
		try {
			// get query
			query = data.query && data.query.allimages;
			if (!Array.isArray(query)) {
				query = [];
			}
			var length = query.length;

			// save last filename to populate aifrom
			if (length !== 0) {
				var lastFilename = query[length - 1].name;
			}

			// build results to display
			rebuildResults();

			// re-enable query button and populate aifrom after 3 seconds
			window.setTimeout(function () {
				if (length !== 0) {
					$('#qo-aifrom').val(lastFilename);
					urlParameters.aifrom = lastFilename;
					setURL();
				}
				$('#qo-query').removeAttr('disabled');
			}, 2000);
		} catch (e) {
			window.console.log('Unhandled exception in apiCall():', e);
			$('#qo-query').removeAttr('disabled');
			window.alert(e);
		}
	}

	// sort query array, must specify property and direction
	function sortQueryByProperty(property, direction) {
		query.sort(function (a, b) {
			if (a[property] === b[property]) {
				return 0;
			} else if (a[property] < b[property]) {
				return direction;
			} else {
				return direction * -1;
			}
		});
	}

	// escape data that'll be concatenated into HTML
	function escape(input) {
		return mw.html.escape(String(input));
	}

	// show sorting table or sorting textarea after a query
	function rebuildResults() {
		try {
			// show results counter
			var message;
			if (query.length === 0) {
				message = 'There are no API query results available for display.';
			} else if (query.length === 1) {
				message = 'Currently displaying 1 result returned from API query.';
			} else {
				message = 'Currently displaying ' + query.length + ' results returned from API query.';
			}
			var div = '<div id="results-counter">' + message + '</div>';
			$('#results-counter').remove();
			$('#d-table').after(div);

			// sort the query array
			sortQueryByProperty(displayParameters.sortingProperty, displayParameters.sortingDirection);

			// rebuild either textarea or table
			if (displayParameters.rawtext) {
				rebuildDisplayTextarea();
			} else {
				rebuildDisplayTable();
			}
		} catch (e) {
			window.console.log('Unhandled exception in rebuildResults():', e);
			window.alert(e);
		}
	}

	// rebuilds the sorting table using current 'displayParameters' and 'query'
	function rebuildDisplayTable() {
		// Sorting Table
		var sortingTable = '<table id="s-table" class="wikitable"><tbody>',
			sortingRows = [],
			filenameJoiner = '">',
			length = query.length,
			i;

		// filenames
		if (displayParameters.filensprefix) {
			filenameJoiner += 'File:';
		}
		i = -1;
		while (++i < length) {
			sortingRows[i] = '<tr><td><a class="s-table-filename-a" data-url="' + escape(query[i].url) + '" href="' + escape(query[i].descriptionurl) + filenameJoiner + escape(query[i].name) + '</a></td>';
		}
		sortingRows[length] = '<tr><th>Filename</th>';

		// timestamps
		if (displayParameters.timestamp) {
			i = -1;
			while (++i < length) {
				sortingRows[i] += '<td>' + escape(query[i].timestamp) + '</td>';
			}
			sortingRows[length] += '<th>Timestamp</th>';
		}

		// uploaders
		if (displayParameters.user) {
			i = -1;
			while (++i < length) {
				sortingRows[i] += '<td><a href="' + mw.util.getUrl('Special:ListFiles/' + query[i].user) + '" title="Show all images uploaded by this user">' + escape(query[i].user) + '</a></td>';
			}
			sortingRows[length] += '<th>Uploader</th>';
		}

		// mime type
		if (displayParameters.mime) {
			i = -1;
			while (++i < length) {
				sortingRows[i] += '<td>' + escape(query[i].mime) + '</td>';
			}
			sortingRows[length] += '<th>MIME type</th>';
		}

		// file size
		if (displayParameters.size) {
			i = -1;
			if (displayParameters.approxsize) {
				while (++i < length) {
					sortingRows[i] += '<td>' + escape(getApproxSize(query[i].size)) + '</td>';
				}
			} else {
				while (++i < length) {
					sortingRows[i] += '<td>' + escape(query[i].size) + '</td>';
				}
			}
			sortingRows[length] += '<th>Size (bytes)</th>';
		}

		// width
		if (displayParameters.width) {
			i = -1;
			while (++i < length) {
				sortingRows[i] += '<td>' + escape(query[i].width) + '</td>';
			}
			sortingRows[length] += '<th>Width (px)</th>';
		}

		// height
		if (displayParameters.height) {
			i = -1;
			while (++i < length) {
				sortingRows[i] += '<td>' + escape(query[i].height) + '</td>';
			}
			sortingRows[length] += '<th>Height (px)</th>';
		}

		// populate the table
		i = -1;
		sortingTable += sortingRows[length] + '</tr>';
		while (++i < length) {
			sortingTable += sortingRows[i] + '</tr>';
		}
		sortingTable += '</tbody></table>';

		// insert table into the document
		$('#s-table, #s-textarea').remove();
		$('#results-counter').after(sortingTable);

		// Event handling for hover image preview
		$('.s-table-filename-a').parent()
		.mouseover(function () {
			var $a = $(this).children('a'),
				url = $a.attr('data-url');
			var preview = '<img id="s-image-hover-preview" src="' + url + '"/>';
			$(document.body).append(preview);
			$container.css('opacity', '.75');
		})
		.mouseout(function () {
			$container.css('opacity', '1');
			$('#s-image-hover-preview').remove();
		});
	}

	// rebuilds the sorting textarea using current 'displayParameters' and 'query'
	function rebuildDisplayTextarea() {
		var separator = displayParameters.rawtextSeparator;

		// Sorting textarea
		var $textarea = $('<textarea id="s-textarea" wrap="off"></textarea>');

		// populate the textarea
		var str = '';
		for (var i = 0, len = query.length; i < len; i++) {
			var q = query[i];
			if (displayParameters.filensprefix) {
				str += ('File:' + q.name);
			} else {
				str += q.name;
			}
			if (displayParameters.timestamp) {
				str += (separator + q.timestamp);
			}
			if (displayParameters.user) {
				str += (separator + q.user);
			}
			if (displayParameters.mime) {
				str += (separator + q.mime);
			}
			if (displayParameters.size) {
				if (displayParameters.approxsize) {
					str += (separator + getApproxSize(q.size));
				} else {
					str += (separator + q.size);
				}
			}
			if (displayParameters.width) {
				str += (separator + q.width);
			}
			if (displayParameters.height) {
				str += (separator + q.height);
			}
			str += '\n';
		}
		$textarea.css('height', (((query.length + 2) * 10) + 'px')).val(str);

		// insert table into the document
		$('#s-table, #s-textarea').remove();
		$('#results-counter').after($textarea);
	}

	// function that initializes the entire script on pageload
	function initListFilesForm() {
		// set container
		$container = $('#ListFiles-container');

		// do nothing if container doesn't exist
		if ($container.length === 0) {
			var index = mw.config.get('wgPageName').indexOf('ListFiles');
			var wgNamespaceNumber = mw.config.get('wgNamespaceNumber');
			if ((index !== -1) && (wgNamespaceNumber === 2 || wgNamespaceNumber === 4)) {
				$container = $('#mw-content-text');
			} else {
				return;
			}
		}

		// remove old stylesheet and interface
		$('#ListFiles-stylesheet').remove();
		$container.children().remove();
		$container.text('');

		// create stylesheet
		var qostyle = '#settings-save,#settings-reset{margin-left:100px;}#settings-save a, #settings-reset a{cursor:pointer;}#qo-table{width:100%;margin-top:30px;}#qo-table input[type="text"],#qo-table div{width:99%;}#qo-table label{font-family:monospace;}#qo-title{font-size:150%;}#qo-table td{padding:5px;width:33%;}#qo-descending{margin-left:10px;}#qo-query{float:right;}#qo-inner-table td{border:0;}';

		var dstyle = '#d-table{width:100%;margin-top:30px;}#d-title{font-size:150%;}#d-table td{padding:5px 5px 5px 25px;}.margin-left-20,.d-radio,#d-sorting-property{margin-left:20px;}';

		var sstyle = '#results-counter{margin-top:30px;width:100%;text-align:center;font-weight:bold;}#s-table{table-layout:fixed;width:100%;margin-top:30px;word-wrap:break-word;}#s-textarea{width:99%;margin-top:30px;white-space:nowrap;overflow-x:auto;overflow-y:auto;}#s-image-hover-preview{background-color:black;border-radius:10px;border:5px solid black;left:35%;opacity:1;padding:1px;position:fixed;top:10%;width:30%;z-index:2000000;}';

		$(document.head).append(('<style id="ListFiles-stylesheet">'
			+ '#WikiaMainContent{width:1010px;}.WikiaRail{display:none;}' + qostyle + dstyle + sstyle + '</style>'));

		// initialize private properties: query, baseURL, urlParameters and displayParameters
		query = [];
		baseURL = mw.util.wikiScript('api') + '?action=query&list=allimages';
		initURLandDisplayParams();

		// Dev Info: script-dev-div
		var devInfo = '<div id="script-dev-div"><a href="https://dev.fandom.com/wiki/ListFiles" '
			+ 'title="Read about this script">w:c:dev:ListFiles</a>';
		if (window.localStorage) {
			devInfo += ('<span id="settings-save">[<a title="Saves your settings to local storage">Save current settings</a>]</span>'
				+ '<span id="settings-reset">[<a title="Resets all settings back to their default values">Reset to default settings</a>]</span>');
		}
		devInfo += '</div>';

		// Query Options: qo-table
		var queryOptions = '<table id="qo-table" class="wikitable" data-expandtext="Show" data-collapsetext="Hide"><tbody>'
			+ '<tr><th colspan="3"><span id="qo-title">Query Options</span></th></tr>'
			+ '<tr><td><label>aifrom</label> - start file enumeration at (alphabetic)'
			+ '<input id="qo-aifrom" type="text" placeholder="Filename1.png" /></td>'
			+ '<td><label>aito</label> - end file enumeration at (alphabetic)'
			+ '<input id="qo-aito" type="text" placeholder="Filename2.jpg" /></td>'
			+ '<td><label>aidir</label> - direction to enumerate (alphabetic)<div>'
			+ '<label><input id="qo-ascending" type="radio" />ascending</label>'
			+ '<label><input id="qo-descending" type="radio" />descending</label>'
			+ '</div></td></tr><tr><td><label>aiprefix</label> - restrict search to files with prefix'
			+ '<input id="qo-aiprefix" type="text" placeholder="prefix" /></td>'
			+ '<td colspan="2" style="padding:0;"><table id="qo-inner-table"><tr><td>'
			+ '<label>aiminsize</label> - minimum file size'
			+ '<input id="qo-aiminsize" type="text" placeholder="number (bytes)" /></td><td>'
			+ '<label>aimaxsize</label> - maximum file size'
			+ '<input id="qo-aimaxsize" type="text" placeholder="number (bytes)" /></td><td>'
			+ '<label>ailimit</label> - max number of files<br /><select id="qo-ailimit">'
			+ '<option value="50">50</option><option value="100">100</option><option value="250">250</option>'
			+ '<option value="500">500 (user max)</option><option value="1000">1000</option><option value="2500">2500</option>'
			+ '<option value="5000">5000 (bot max)</option></select></td></tr></table></td></tr>'
			+ '<tr><td colspan="3"><div><a id="qo-url"></a><button id="qo-query">Query</button></div></td></tr>'
			+ '</tbody></table>';

		// Display Options: d-table
		var displayOptions = '<table id="d-table" class="wikitable" data-expandtext="Show" data-collapsetext="Hide"><tbody>'
			+ '<tr><th colspan="3"><span id="d-title">Display Options</span></th></tr>'
			+ '<tr><td>File information to display</td><td colspan="2">'
			+ '<label><input dparam="timestamp" class="d-checkbox" type="checkbox" />Timestamp</label>'
			+ '<label><input dparam="user" class="d-checkbox margin-left-20" type="checkbox" />Uploader</label>'
			+ '<label><input dparam="mime" class="d-checkbox margin-left-20" type="checkbox" />MIME type</label>'
			+ '<label><input dparam="size" class="d-checkbox margin-left-20" type="checkbox" />File size</label>'
			+ '<label><input dparam="width" class="d-checkbox margin-left-20" type="checkbox" />Width</label>'
			+ '<label><input dparam="height" class="d-checkbox margin-left-20" type="checkbox" />Height</label></td></tr>'
			+ '<tr><td>Sorting Algorithm</td><td>Sorting direction:'
			+ '<label><input id="d-ascending" class="d-radio" type="radio" />Ascending</label>'
			+ '<label><input id="d-descending" class="d-radio" type="radio" />Descending</label></td>'
			+ '<td>Sorting property:'
			+ '<select id="d-sorting-property"><option value="name">Filename</option><option value="timestamp">Timestamp</option>'
			+ '<option value="user">Uploader</option><option value="mime">MIME type</option>'
			+ '<option value="size">Size</option><option value="width">Width</option><option value="height">Height</option>'
			+ '</select></td></tr><tr><td colspan="3">'
			+ '<label><input dparam="rawtext" class="d-checkbox" type="checkbox" />Display results as raw text</label>'
			+ '<label><input dparam="filensprefix" class="d-checkbox margin-left-20" type="checkbox" />Show File: prefix for filenames</label>'
			+ '<label><input dparam="approxsize" class="d-checkbox margin-left-20" type="checkbox" />Show file size in KB or MB</label>'
			+ '</td></tr></tbody></table>';

		// insert HTML into the document
		$container.append(devInfo + queryOptions + displayOptions);

		// set private properties: jQuery objects for attaching event handlers
		$aifrom = $('#qo-aifrom');
		$aito = $('#qo-aito');
		$ascending = $('#qo-ascending');
		$descending = $('#qo-descending');
		$aiprefix = $('#qo-aiprefix');
		$aiminsize = $('#qo-aiminsize');
		$aimaxsize = $('#qo-aimaxsize');
		$ailimit = $('#qo-ailimit');
		$query = $('#qo-query');

		// finish setting form state
		//$('#qo-table, #d-table').makeCollapsible();
		initSavedFormState();
		rebuildResults();

		// initialize events
		initQueryEvents();
		initDisplayEvents();
	}

	// if purgeLocalStorage, deletes urlParameters and displayParameters from
	// local storage and sets them to their default values.
	// Otherwise, initializes urlParameters and displayParameters
	// to values in localStorage.
	function initURLandDisplayParams(purgeLocalStorage) {
		var u, d;
		if (purgeLocalStorage && window.localStorage) {
			window.localStorage.removeItem('ListFiles-urlParameters');
			window.localStorage.removeItem('ListFiles-displayParameters');
		} else if (window.localStorage) {
			u = window.localStorage.getItem('ListFiles-urlParameters');
			d = window.localStorage.getItem('ListFiles-displayParameters');
		}

		// initialize urlParameters
		if (u) {
			urlParameters = JSON.parse(u);
		} else {
			urlParameters = {
				ailimit: 100,
				aiprop: 'timestamp|user|url|size|mime'
			};
		}

		// initialize displayParameters
		if (d) {
			displayParameters = JSON.parse(d);
		} else {
			displayParameters = {
				timestamp: 'checked',
				user: 'checked',
				mime: 'checked',
				size: 'checked',
				width: 'checked',
				height: 'checked',
				rawtextSeparator: '\t',
				sortingDirection: -1,
				sortingProperty: 'name'
			};
		}
	}

	// initializes form state from the current urlParameters and displayParameters
	function initSavedFormState() {
		// Set form to using current urlParameters
		if (urlParameters.aidir) {
			$descending.attr('checked', 'checked');
			$ascending.removeAttr('checked');
		} else {
			$ascending.attr('checked', 'checked');
			$descending.removeAttr('checked');
		}
		$ailimit.children().removeAttr('selected');
		$ailimit.children(('[value="' + urlParameters.ailimit + '"]')).attr('selected', 'selected');
		$aifrom.val((urlParameters.aifrom || ''));
		$aito.val((urlParameters.aito || ''));
		$aiprefix.val((urlParameters.aiprefix || ''));
		$aiminsize.val((urlParameters.aiminsize || ''));
		$aimaxsize.val((urlParameters.aimaxsize || ''));
		setURL();

		// Set form to using current displayParameters
		$('.d-checkbox').each(function () {
			var $this = $(this);
			var dparam = $this.attr('dparam');
			if (displayParameters[dparam]) {
				$this.attr('checked', 'checked');
			} else {
				$this.removeAttr('checked');
			}
		});
		if (displayParameters.sortingDirection === -1) {
			$('#d-ascending').attr('checked', 'checked');
			$('#d-descending').removeAttr('checked');
		} else {
			$('#d-descending').attr('checked', 'checked');
			$('#d-ascending').removeAttr('checked');
		}
		$('#d-sorting-property').children().removeAttr('selected');
		$('#d-sorting-property').children(('[value="' + displayParameters.sortingDirection + '"]')).attr('selected', 'selected');
	}

	// initializes event handlers for Query Options after the form has been constructed
	function initQueryEvents() {
		// Event handling for settings save link
		$('#settings-save').click(function () {
			window.localStorage.setItem('ListFiles-urlParameters', JSON.stringify(urlParameters));
			window.localStorage.setItem('ListFiles-displayParameters', JSON.stringify(displayParameters));
		});

		// Event handling for settings reset link
		$('#settings-reset').click(function () {
			initURLandDisplayParams(true);
			initSavedFormState();
			rebuildResults();
		});

		// Event handling for aidir radio buttons
		$ascending.change(function () {
			$descending.attr('checked', false);
			delete urlParameters.aidir;
			setURL();
		});
		$descending.change(function () {
			$ascending.attr('checked', false);
			urlParameters.aidir = "descending";
			setURL();
		});

		// Event handling for aifrom
		$aifrom.change(function () {
			var temp = $(this).val();
			if (temp.length > 0) {
				urlParameters.aifrom = window.encodeURIComponent(temp.replace(/ /g, '_'));
			} else {
				delete urlParameters.aifrom;
			}
			setURL();
		});

		// Event handling for aito
		$aito.change(function () {
			var temp = $(this).val();
			if (temp.length > 0) {
				urlParameters.aito = window.encodeURIComponent(temp.replace(/ /g, '_'));
			} else {
				delete urlParameters.aito;
			}
			setURL();
		});

		// Event handling for aiprefix
		$aiprefix.change(function () {
			var temp = $(this).val();
			if (temp.length > 0) {
				urlParameters.aiprefix = window.encodeURIComponent(temp.replace(/ /g, '_'));
			} else {
				delete urlParameters.aiprefix;
			}
			setURL();
		});

		// Event handling for aiminsize
		$aiminsize.change(function () {
			var temp = window.parseInt($(this).val());
			if (window.isNaN(temp) || typeof temp !== "number") {
				delete urlParameters.aiminsize;
			} else {
				urlParameters.aiminsize = temp;
			}
			setURL();
		});

		// Event handling for aimaxsize
		$aimaxsize.change(function () {
			var temp = window.parseInt($(this).val());
			if (window.isNaN(temp) || typeof temp !== "number") {
				delete urlParameters.aimaxsize;
			} else {
				urlParameters.aimaxsize = temp;
			}
			setURL();
		});

		// Event handling for ailimit dropdown
		$ailimit.change(function () {
			var temp = window.parseInt($(this).val());
			if (window.isNaN(temp) || typeof temp !== "number") {
				delete urlParameters.ailimit;
			} else {
				urlParameters.ailimit = temp;
			}
			setURL();
		});

		// Event handling for query button
		$query.click(function () {
			$(this).attr('disabled', 'disabled');
			$.getJSON((url + '&format=json'), apiCall);
		});
	}

	// initializes event handlers for Display Options after the form has been constructed
	function initDisplayEvents() {
		// Event handling for sorting direction radio buttons
		$('#d-ascending').change(function () {
			$('#d-descending').attr('checked', false);
			displayParameters.sortingDirection = -1;
			rebuildResults();
		});
		$('#d-descending').change(function () {
			$('#d-ascending').attr('checked', false);
			displayParameters.sortingDirection = 1;
			rebuildResults();
		});

		// Event handling for sorting property dropdown
		$('#d-sorting-property').change(function () {
			displayParameters.sortingProperty = $(this).children(':selected').attr('value');
			rebuildResults();
		});

		// Event handling for all display checkboxes
		$('.d-checkbox').change(function () {
			var $this = $(this);
			var dparam = $this.attr('dparam');
			if ($this.is(':checked')) {
				// action to take if checked
				displayParameters[dparam] = 'checked';

				// get rawtextSeparator if applicable
				if (dparam === 'rawtext') {
					displayParameters.rawtextSeparator = window.prompt('When results are concatenated in raw text, they are separated by a certain string or character. Please choose your separator string. Note: the default separator is a single \'tab\' character.', '\t');
				}
			} else {
				// action to take if NOT checked
				delete displayParameters[dparam];
			}
			rebuildResults();
		});
	}

	// return filename from href attribute
	function getFile(element) {
		if (element instanceof jQuery) {
			element = element[0];
		}
		return decodeURIComponent(new mw.Uri(element.href).path).replace(pathRegex, '');
	}

	// main form initialization sequence
	function initialize() {
	    var escapeRegex = mw.RegExp.escape || mw.util.escapeRegExp;
        pathRegex = new RegExp('^' + escapeRegex(mw.config.get('wgArticlePath').replace('$1', '')));
		if (mw.config.get('wgAction') !== 'edit') {
			$(initListFilesForm);
		}

		var specialPage = mw.config.get('wgCanonicalSpecialPageName');
		// Special:ListFiles modification - adds a raw list of filenames uploaded by given user
		if (specialPage === "Listfiles") {
			$(function () {
				var filenames = "",
					count = 0,
					$table = $('.listfiles'),
					$tr;

				// set filenames
				$table.find('.TablePager_col_img_name').each(function () {
					var filename = getFile($(this).children('a:first'))
					if (filename !== "Special:Upload") {
						filenames += filename + "\n";
						count++;
					}
				});
				$tr = $('<tr id="filenames-list-tr"><td colspan="6" style="text-align:center; padding:10px;">Here is a raw list of the ' + count + ' filename(s) currently shown on this page, provided by the <a title="w:c:dev:ListFiles" href="https://dev.fandom.com/wiki/ListFiles">ListFiles</a> script on the Fandom Developers Wiki.<br /><textarea id="filenames-list-textarea" style="width:95%; height:150px;"></textarea></td></tr>');
				$tr.find('#filenames-list-textarea').val(filenames);

				// insert new table row
				$('#filenames-list-tr').remove(); // prevent duplicates
				$table.children('tbody').prepend($tr);
			});
		} else if (specialPage === "Unusedimages" || specialPage === "UnusedVideos" || specialPage === "Uncategorizedimages") {
		// Special:UnusedFiles, Special:UnusedVideos, Special:UncategorizedImages raw text list
			$(function () {
				var filenames = "",
					count = 0,
					$container;

				// set filenames
			    $('.gallery-image-wrapper > a').each(function() {
			        filenames += getFile(this) + "\n";
			        count++;
			    });
				$container = $('<div id="filesnames-list-container"><hr /><p>Here is a raw list of the ' + count + ' filename(s) currently shown on this page, provided by the <a title="w:c:dev:ListFiles" href="https://dev.fandom.com/wiki/ListFiles">ListFiles</a> script on the Fandom Developers Wiki.</p><textarea id="filesnames-list-textarea" style="width: 95%; height: 150px"></textarea></div>');
				$container.children('#filesnames-list-textarea').val(filenames);

				// insert container
				$('#filesnames-list-container').remove(); // prevent duplicates
			    $('.wikia-gallery').before($container);
			});
		}
	}

	mw.loader.using(['mediawiki.util'], function () {
		initialize();

		// AjaxRC support
		window.ajaxCallAgain = window.ajaxCallAgain || [];
		window.ajaxCallAgain.push(initialize);
	});
}(jQuery, mediaWiki, window));