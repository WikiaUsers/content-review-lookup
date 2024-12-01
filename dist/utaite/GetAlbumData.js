(function(mw, $) {
    'use strict';

    // Check URL parameter first
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('blankspecial') !== 'albumparser') {
        return;
    }

    var AlbumTemplateParser = {
        // Store field definitions
        fields: [
            'albumtitle', 'image', 'imagealt', 'image3', 'image4', 'image5',
            'albumartist', 'datereleased', 'crossfadeyt', 'crossfadennd',
            'streams', 'shops', 'downloads'
        ],

        trackFields: ['title', 'info', 'utaite', 'lyricist', 'composer', 'arranger'],

        // Initialize the parser and interface
        init: function() {
            this.createInterface();
            this.bindEvents();
        },

        // Parse template text into field values
        parseTemplate: function(templateText) {
            var values = {
                basic: {},
                tracks: []
            };
            var lines = templateText.split('\n');
            var currentField = '';
            var currentValue = '';
            var bracketCount = 0;
            var inField = false;

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                
                // Skip empty lines and the opening/closing template tags
                if (!line || line === '{{Album' || line === '}}') {
                    continue;
                }

                // Handle field parsing with consideration for nested templates
                if (line.indexOf('|') === 0) {
                    // New field starts
                    if (currentField && currentValue) {
                        // Determine if it's a track field
                        var trackMatch = currentField.match(/^track(\d+)(title|info|lyricist|composer|arranger|utaite)$/);
                        if (trackMatch) {
                            var trackNum = parseInt(trackMatch[1]) - 1;
                            var fieldName = trackMatch[2];
                            
                            // Initialize track object if it doesn't exist
                            if (!values.tracks[trackNum]) {
                                values.tracks[trackNum] = {};
                            }
                            values.tracks[trackNum][fieldName] = currentValue.trim();
                        } else if (this.fields.indexOf(currentField) !== -1) {
                            values.basic[currentField] = currentValue.trim();
                        }
                    }
                    
                    var parts = line.substring(1).split('=');
                    currentField = parts[0].trim();
                    currentValue = parts.slice(1).join('=').trim();
                    
                    // Count opening brackets
                    bracketCount = (currentValue.match(/{{/g) || []).length - 
                                 (currentValue.match(/}}/g) || []).length;
                    
                    inField = true;
                } else if (inField) {
                    // Continue previous field if we're inside nested templates
                    bracketCount += (line.match(/{{/g) || []).length - 
                                  (line.match(/}}/g) || []).length;
                    currentValue += '\n' + line;
                }

                // If brackets are balanced, end the current field
                if (bracketCount === 0 && inField) {
                    var trackMatch = currentField.match(/^track(\d+)(title|info|lyricist|composer|arranger|utaite)$/);
                    if (trackMatch) {
                        var trackNum = parseInt(trackMatch[1]) - 1;
                        var fieldName = trackMatch[2];
                        
                        if (!values.tracks[trackNum]) {
                            values.tracks[trackNum] = {};
                        }
                        values.tracks[trackNum][fieldName] = currentValue.trim();
                    } else if (this.fields.indexOf(currentField) !== -1) {
                        values.basic[currentField] = currentValue.trim();
                    }
                    
                    inField = false;
                    currentField = '';
                    currentValue = '';
                }
            }

            return values;
        },

        // Create the interface elements
        createInterface: function() {
            var container = $('<div>')
                .attr('id', 'album-template-parser')
                .addClass('album-parser-container');

            var notification = $('<div>')
                .addClass('parser-notification')
                .html('⚠️ Before parsing, please ensure your album template code is cleaned using the <a href="https://utaite.fandom.com/wiki/Special:BlankPage?blankspecial=albumcleaner" target="_blank">album cleaner tool</a> for best results.');
            
            container.append(notification);

            // Create input area for template text
            var inputArea = $('<div>').addClass('parser-input-area');
            $('<label>')
                .text('Paste Album Template:')
                .appendTo(inputArea);
            $('<textarea>')
                .attr({
                    id: 'template-input',
                    rows: 10,
                    cols: 80
                })
                .appendTo(inputArea);
            $('<button>')
                .text('Parse Template')
                .attr('id', 'parse-button')
                .appendTo(inputArea);

            container.append(inputArea);

            // Create basic fields display area
            var basicFieldsContainer = $('<div>')
                .attr('id', 'basic-fields-container')
                .addClass('fields-container');
            
            $('<h3>').text('Basic Information').appendTo(basicFieldsContainer);

            this.fields.forEach(function(field) {
                var fieldDiv = $('<div>').addClass('field-group');
                $('<label>')
                    .text(field + ':')
                    .appendTo(fieldDiv);
                $('<input>')
                    .attr({
                        type: 'text',
                        id: 'field-' + field,
                        name: field
                    })
                    .addClass('field-input')
                    .appendTo(fieldDiv);
                basicFieldsContainer.append(fieldDiv);
            });

            container.append(basicFieldsContainer);

            // Create tracks container
            var tracksContainer = $('<div>')
                .attr('id', 'tracks-container')
                .addClass('tracks-container');
            
            $('<h3>').text('Track Information').appendTo(tracksContainer);

            // Create track sections (up to 50)
            for (var i = 1; i <= 50; i++) {
                var trackSection = $('<div>')
                    .addClass('track-section')
                    .attr('id', 'track-' + i)
                    .hide();
                
                $('<h4>').text('Track ' + i).appendTo(trackSection);

                this.trackFields.forEach(function(field) {
                    var fieldDiv = $('<div>').addClass('field-group');
                    $('<label>')
                        .text(field + ':')
                        .appendTo(fieldDiv);
                    $('<input>')
                        .attr({
                            type: 'text',
                            id: 'track-' + i + '-' + field,
                            name: 'track-' + i + '-' + field
                        })
                        .addClass('field-input')
                        .appendTo(fieldDiv);
                    trackSection.append(fieldDiv);
                });

                tracksContainer.append(trackSection);
            }

            container.append(tracksContainer);

            // Add copy buttons
            var buttonContainer = $('<div>').addClass('button-container');
            $('<button>')
                .text('Copy Basic Info')
                .attr('id', 'copy-basic-button')
                .appendTo(buttonContainer);
            $('<button>')
                .text('Copy Track Info')
                .attr('id', 'copy-tracks-button')
                .appendTo(buttonContainer);
            $('<button>')
                .text('Copy All')
                .attr('id', 'copy-all-button')
                .appendTo(buttonContainer);

            container.append(buttonContainer);

            // Add container to page
            $('#mw-content-text').prepend(container);

            // Add basic styles
            mw.loader.addStyleTag(
                '.album-parser-container { padding: 1em; border: 1px solid #ddd; margin-bottom: 1em; }' +
                '.parser-notification { background-color: #fff3cd; border: 1px solid #ffeeba; color: #856404; ' +
                'padding: 1em; margin-bottom: 1em; border-radius: 4px; }' +
                '.parser-notification a { color: #533f03; text-decoration: underline; }' +
                '.parser-notification a:hover { color: #533f03; text-decoration: none; }' +
                '.parser-input-area { margin-bottom: 1em; }' +
                '.parser-input-area textarea { display: block; margin: 0.5em 0; }' +
                '.field-group { margin: 0.5em 0; }' +
                '.field-group label { display: inline-block; width: 150px; }' +
                '.field-input { width: 500px; }' +
                '.track-section { border: 1px solid #eee; padding: 1em; margin: 1em 0; }' +
                '.button-container { margin-top: 1em; }' +
                '.button-container button { margin-right: 1em; }'
            );
        },

        // Bind event handlers
        bindEvents: function() {
            var self = this;

            $('#parse-button').on('click', function() {
                var templateText = $('#template-input').val();
                var values = self.parseTemplate(templateText);
                
                // Fill in basic fields
                Object.keys(values.basic).forEach(function(field) {
                    $('#field-' + field).val(values.basic[field]);
                });

                // Fill in and show track fields
                values.tracks.forEach(function(track, index) {
                    var trackNum = index + 1;
                    var trackSection = $('#track-' + trackNum);
                    
                    if (track) {
                        self.trackFields.forEach(function(field) {
                            $('#track-' + trackNum + '-' + field).val(track[field] || '');
                        });
                        trackSection.show();
                    } else {
                        trackSection.hide();
                    }
                });
            });

            $('#copy-basic-button').on('click', function() {
                var copyText = '';
                self.fields.forEach(function(field) {
                    var value = $('#field-' + field).val();
                    if (value) {
                        copyText += field + ': ' + value + '\n';
                    }
                });
                self.copyToClipboard(copyText, 'Basic information copied!');
            });

            $('#copy-tracks-button').on('click', function() {
                var copyText = '';
                for (var i = 1; i <= 50; i++) {
                    var trackSection = $('#track-' + i);
                    if (trackSection.is(':visible')) {
                        copyText += '\nTrack ' + i + ':\n';
                        self.trackFields.forEach(function(field) {
                            var value = $('#track-' + i + '-' + field).val();
                            if (value) {
                                copyText += field + ': ' + value + '\n';
                            }
                        });
                    }
                }
                self.copyToClipboard(copyText, 'Track information copied!');
            });

            $('#copy-all-button').on('click', function() {
                var basicText = '';
                self.fields.forEach(function(field) {
                    var value = $('#field-' + field).val();
                    if (value) {
                        basicText += field + ': ' + value + '\n';
                    }
                });

                var tracksText = '';
                for (var i = 1; i <= 50; i++) {
                    var trackSection = $('#track-' + i);
                    if (trackSection.is(':visible')) {
                        tracksText += '\nTrack ' + i + ':\n';
                        self.trackFields.forEach(function(field) {
                            var value = $('#track-' + i + '-' + field).val();
                            if (value) {
                                tracksText += field + ': ' + value + '\n';
                            }
                        });
                    }
                }

                self.copyToClipboard(basicText + '\n' + tracksText, 'All information copied!');
            });
        },

        // Helper function for copying to clipboard
        copyToClipboard: function(text, notification) {
            var temp = $('<textarea>')
                .val(text)
                .appendTo('body')
                .select();
            
            document.execCommand('copy');
            temp.remove();
            
            mw.notify(notification);
        }
    };

    // Initialize when document is ready
    $(function() {
        AlbumTemplateParser.init();
    });

})(mediaWiki, jQuery);