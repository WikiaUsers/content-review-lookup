/* ┌───────────────────────────────┐ */
/* │  Edit Summaries Script        │ */
/* └───────────────────────────────┘ */
(function(window, $, mw){

	const EditSummaries = {

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
		insertDropdown: function($container, $input, lines, tabindex = 0) {

			const $wrapper = $('<div>', { id: this.wrapperId });

			const $label = $('<label>')
				.attr('for', this.dropdownId)
				.text(this.dropdownLabel);

			const $select = $('<select>')
				.prop('tabIndex', tabindex)
				.attr('id', this.dropdownId);

			let $currentOptgroup = null;

			for (let i = 0; i < lines.length; i++) {
				const line = lines[i].trim();
				if (!line)
					continue;
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
			$select.off('change.editSummaries').on('change.editSummaries', function() {
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

			this.fetchTemplateLines(function(lines) {
				EditSummaries.insertDropdown($summaryLabel, $summaryInput, lines, 1);
			});
		},

		// VisualEditor
		handleVisualEditor: function() {

			const $container = $('.ve-ui-summaryPanel');
			const $input = $('.ve-ui-summaryPanel-summaryInputField > input');

			if (!$container.length || !$input.length) return;

			this.fetchTemplateLines(function(lines) {
				EditSummaries.insertDropdown($container, $input, lines);
			});
		},

		init: function(editor) {

			window.dev = window.dev || {};
			window.dev.editSummaries = window.dev.editSummaries || {};

			if (!window.dev.editSummaries.hasRun)
				window.dev.editSummaries.hasRun = {};

			if (window.dev.editSummaries.hasRun[editor])
				return;

			window.dev.editSummaries.hasRun[editor] = true;

			const DEFAULTS = {
				summaries: 'Template:EditSummaries',
				label: 'Predefined Summaries: ',
				wrapperId: 'edit-summaries-wrapper',
				selectId: 'edit-summaries-dropdown',
				disableStyle: false
			};
			const userConfig = window.dev.editSummaries;

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
					if (typeof value === 'string' && value === DEFAULTS.summaries)
						return true;
					return false;
				},
				label: function(value) {
					return typeof value === 'string';
				},
				wrapperId: function(value) {
					return typeof value === 'string';
				},
				selectId: function(value) {
					return typeof value === 'string';
				}
			};

			const validateConfig = function(cfg, userCfg) {
				for (let key in VALIDATORS) {
					if (key in userCfg && !VALIDATORS[key](cfg[key])) {
						console.warn(
							'EditSummaries: Invalid value for "' + key + '". Reverting to default.'
						);
						cfg[key] = DEFAULTS[key];
					}
				}
			};
			validateConfig(config, userConfig);

			this.templateName = config.summaries;
			this.wrapperId = config.wrapperId;
			this.dropdownId = config.selectId;
			this.dropdownLabel = config.label;

			if( !config.disableStyle )
				mw.util.addCSS('#edit-summaries-wrapper {margin-bottom:0.5em;display:flex;gap:5px;align-items:center}');

			if( 'source' == editor )
				this.handleClassicEditor();
			else if( 'visual' == editor )
				this.handleVisualEditor();
		}
	};
	mw.hook('wikipage.content').add(function () {
		const action = mw.config.get('wgAction');
		if (action === 'edit' || action === 'submit') {
			EditSummaries.init('source');
		}
	});
	mw.loader.using('ext.visualEditor.desktopArticleTarget.init', function () {
		mw.hook('ve.activationComplete').add(function () {
			EditSummaries.init('visual');
		});
	});

})(this, jQuery, mediaWiki);