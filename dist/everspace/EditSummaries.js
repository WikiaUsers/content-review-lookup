/* ┌───────────────────────────────┐ */
/* │  Edit Summaries Script        │ */
/* └───────────────────────────────┘ */
;(function(window, $, mw){
	
	window.everspacewiki = window.everspacewiki || {};
	window.everspacewiki.editSummaries = window.everspacewiki.editSummaries || {};

	// hasRun guard (can be pre-set to disable this script)
	if (window.everspacewiki.editSummaries.hasRun) {
		return;
	}
	window.everspacewiki.editSummaries.hasRun = true;
	/* =========================
	 * Defaults & configuration
	 * ========================= */
	const DEFAULTS = {
		summaries: 'Template:EditSummaries',
		label: 'Predefined Summaries: ',
		wrapperClass: 'edit-summaries-wrapper',
		selectId: 'edit-summaries-dropdown'
	};
	const userConfig = window.everspacewiki.editSummaries;
	
	// Simulate User JS-defined summaries, for testing
	/**
 	userConfig.summaries = [
		'Test summaries',
		[
			'Fix typo',
			'Formatting cleanup'
		],
		'Templates',
		[
			'Update infobox',
			'Standardise parameters'
		]
	];
	/**/
	const config = Object.assign({}, DEFAULTS, userConfig);

	const VALIDATORS = {
		summaries: function(value) {
			if (Array.isArray(value)) return true;
			// Only allow the default template name if it's a string
			if (typeof value === 'string' && value === DEFAULTS.summaries) return true;
			return false;
		},
		label: function(value) {
			return typeof value === 'string';
		},
		wrapperClass: function(value) {
			return typeof value === 'string';
		},
		selectId: function(value) {
			return typeof value === 'string';
		}
	};

	function validateConfig(cfg, userCfg) {
		for (let key in VALIDATORS) {
			if (key in userCfg && !VALIDATORS[key](cfg[key])) {
				console.warn(
					'EditSummaries: Invalid value for "' + key + '". Reverting to default.'
				);
				cfg[key] = DEFAULTS[key];
			}
		}
	}
	validateConfig(config, userConfig);

	/* =========================
	 * Main module
	 * ========================= */

	const EditSummaries = {
		
		templateName: config.summaries,
		wrapperClass: config.wrapperClass,
		dropdownId: config.selectId,
		dropdownLabel: config.label,

		// Flatten array-based summaries into line format
		flattenArraySummaries: function(list, indent) {
			const result = [];
			indent = indent || '';

			for (let i = 0; i < list.length; i++) {
				if (Array.isArray(list[i])) {
					result.push.apply(
						result,
						this.flattenArraySummaries(list[i], '-- ')
					);
				} else if (typeof list[i] === 'string') {
					result.push(indent + list[i]);
				}
			}

			return result;
		},
		// Fetch template lines or use JS-defined array
		fetchTemplateLines: function(callback) {

			// User JS-defined summaries
			if (Array.isArray(this.templateName)) {
				if (callback) {
					callback(this.flattenArraySummaries(this.templateName));
				}
				return;
			}

			// Template-based summaries (string)
			$.get(mw.config.get('wgScript'), {
				title: this.templateName,
				action: 'raw',
				ctype: 'text/plain'
			}).done(function(data) {
				const lines = data.split('\n');
				const filtered = [];

				for (let i = 0; i < lines.length; i++) {
					const line = lines[i].trim();

					if (
						!line ||
						line.startsWith(':') ||
						line.startsWith('*') ||
						line.startsWith('#') ||
						line.startsWith('<') ||
						line.startsWith('{{') ||
						line.startsWith('[[')
					) {
						continue;
					}
					filtered.push(line);
				}
				if (callback) callback(filtered);
			});
		},
		// Insert dropdown
		insertDropdown: function($container, $input, lines) {
			if ($('#' + this.dropdownId).length) return;

			const $wrapper = $('<div>').addClass(this.wrapperClass);

			const $label = $('<label>')
				.attr('for', this.dropdownId)
				.text(this.dropdownLabel);

			const $select = $('<select>')
				.prop('tabIndex', 1)
				.attr('id', this.dropdownId);

			let $currentOptgroup = null;

			for (let i = 0; i < lines.length; i++) {
				const line = lines[i].trim();
				if (!line) continue;

				if (i === 0) {
					$select.append(
						$('<option>')
							.val('')
							.text(mw.html.escape(line))
							.prop('selected', true)
					);
				} else if (line.indexOf('-- ') !== 0) {
					$currentOptgroup = $('<optgroup>')
						.attr('label', mw.html.escape(line));
					$select.append($currentOptgroup);
				} else if ($currentOptgroup) {
					const rawText = line
						.substring(3)
						.trim()
						.replace(/^\d+(\.\d+)*\s*/, '');

					if (rawText) {
						$currentOptgroup.append(
							$('<option>')
								.val(mw.html.escape(rawText))
								.text(mw.html.escape(line))
						);
					}
				}
			}
			$select.change(function() {
				$input.val($(this).val());
			});

			$wrapper.append($label).append($select);
			$container.prepend($wrapper);
		},

		// Classic editor
		handleClassicEditor: function() {
			const $summaryLabel = $('#wpSummaryLabel');
			const $summaryInput = $('#wpSummary');

			if (!$summaryLabel.length || !$summaryInput.length) return;

			const self = this;
			this.fetchTemplateLines(function(lines) {
				self.insertDropdown($summaryLabel, $summaryInput, lines);
			});
		},

		// VisualEditor
		handleVisualEditor: function() {
			const $container = $('.ve-ui-summaryPanel');
			const $input = $('.ve-ui-summaryPanel-summaryInputField > input');

			if (!$container.length || !$input.length) return;

			const self = this;
			this.fetchTemplateLines(function(lines) {
				self.insertDropdown($container, $input, lines);
			});
		},

		// Initialize both editors
		init: function() {
			this.handleClassicEditor();

			const self = this;
			mw.loader.using('ext.visualEditor.desktopArticleTarget.init', function() {
				mw.hook('ve.activationComplete').add(function() {
					self.handleVisualEditor();
				});
			});
		}
	};
	// Run the script
	EditSummaries.init();

})(this, jQuery, mediaWiki);