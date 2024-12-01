var AlbumCleaner = {
    config: {
        basicFields: [
            'albumtitle',
            'albumartist',
            'image',
            'datereleased',
            'crossfadeyt',
            'crossfadennd',
            'streams',
            'shops',
            'download'
        ],
        trackFields: [
            'title',
            'info',
            'utaite',
            'lyricist',
            'composer',
            'arranger'
        ],
        maxTracks: 50
    },

    init: function() {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('blankspecial') !== 'albumcleaner') {
            return;
        }

        this.createInterface();
        this.bindEvents();
    },

    createInterface: function() {
        var html = [
            '<div id="albumCleaner" style="margin: 20px;">',
                '<h2>Album Template Field Cleaner</h2>',
                '<div style="margin-bottom: 10px;">',
                '<p>Parse your clean album code data  <a href="https://utaite.fandom.com/wiki/Special:BlankPage?blankspecial=albumparser" target="_blank">here</a>!</p>',
                    '<label for="inputTemplate">Input Album Template:</label><br>',
                    '<textarea id="inputTemplate" rows="15" style="width: 100%; font-family: monospace;"></textarea>',
                '</div>',
                '<div style="margin: 10px 0;">',
                    '<button id="cleanButton">Clean Template</button>',
                '</div>',
                '<div>',
                    '<label for="outputTemplate">Cleaned Template:</label><br>',
                    '<textarea id="outputTemplate" rows="15" style="width: 100%; font-family: monospace;"></textarea>',
                '</div>',
            '</div>'
        ].join('');

        document.getElementById('mw-content-text').innerHTML = html;
    },

    bindEvents: function() {
        var cleanButton = document.getElementById('cleanButton');
        if (cleanButton) {
            cleanButton.onclick = this.handleClean.bind(this);
        }
    },

    extractField: function(template, fieldName) {
        // Look for field start with a lookahead for equals sign
        var pattern = '\\|\\s*' + fieldName + '\\s*=\\s*([^|]*(?:\\{\\{[^}]*\\}\\}[^|]*)*(?:\\[[^\\]]*\\][^|]*)*(?:\\([^)]*\\)[^|]*)*)(?=\\|\\w+\\s*=|}}$)';
        var matches = template.match(new RegExp(pattern));
        return matches ? matches[1].trim() : '';
    },

    formatTemplate: function(input) {
        // First, normalize the input by removing extra whitespace but preserving content
        input = input.replace(/\s*\n\s*/g, '\n').trim();
        
        var output = ['{{Album'];
        var self = this;
        
        // Process basic fields
        this.config.basicFields.forEach(function(field) {
            var value = self.extractField(input, field);
            if (value) {
                output.push('|' + field + '=' + value);
            }
        });
        
        output.push(''); // Add blank line before tracks
        
        // Process tracks
        for (var i = 1; i <= this.config.maxTracks; i++) {
            var trackFields = [];
            var hasTrackInfo = false;
            
            // Get all track fields in specified order
            this.config.trackFields.forEach(function(field) {
                var fieldName = 'track' + i + field;
                var value = self.extractField(input, fieldName);
                if (value) {
                    trackFields.push('|' + fieldName + '=' + value);
                    hasTrackInfo = true;
                }
            });
            
            // If track exists, add all its fields with a blank line after
            if (hasTrackInfo) {
                output = output.concat(trackFields);
                output.push(''); // Add blank line between tracks
            }
        }
        
        if (output[output.length - 1] === '') {
            output.pop(); // Remove the last blank line
        }
        output.push('}}');
        
        return output.join('\n');
    },

    handleClean: function() {
        var input = document.getElementById('inputTemplate').value;
        if (!input) {
            alert('Please enter an Album template to clean.');
            return;
        }

        var cleanedTemplate = this.formatTemplate(input);
        document.getElementById('outputTemplate').value = cleanedTemplate;
    }
};

// Initialize when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        AlbumCleaner.init();
    });
} else {
    AlbumCleaner.init();
}