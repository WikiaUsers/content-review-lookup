/* ┌───────────────────────────────┐ */
/* │  Edit Summaries Script        │ */
/* └───────────────────────────────┘ */
;(function(window, $, mw){
	
	const EditSummaries = {
		
		// Template to read summaries from
		templateName: 'Template:EditSummaries',
		// Class for CSS to target (if necessary)
		wrapperClass: 'edit-summaries-wrapper',
		// ID for the dropdown
		dropdownId: 'EverspaceWiki-summaries',
		// Label text to show beside the dropdown
		dropdownLabel: 'Predefined Summaries: ',
	
		// Fetch template lines
		fetchTemplateLines: function(callback) {
			$.get(mw.config.get('wgScript'), {
				title: this.templateName,
				action: 'raw',
				ctype: 'text/plain'
			}).done(function(data) {
				const lines = data.split('\n');
				const filtered = [];
	
				for (let i = 0; i < lines.length; i++) {
					const line = lines[i].trim();
					// skip blank or wikitext-style lines
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
	
			const $wrapper = $('<div>');
			$wrapper.addClass(this.wrapperClass);
			
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
					$select.append($('<option>').val('').text(mw.html.escape(line)).prop('selected', true));
				} else if (line.indexOf('-- ') !== 0) {
					$currentOptgroup = $('<optgroup>').attr('label', mw.html.escape(line));
					$select.append($currentOptgroup);
				} else if ($currentOptgroup) {
					const rawText = line.substring(3).trim().replace(/^\d+(\.\d+)*\s*/, '');
					const value = mw.html.escape(rawText);
					const displayText = mw.html.escape(line);
					if (value) {
						$currentOptgroup.append($('<option>').val(value).text(displayText));
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