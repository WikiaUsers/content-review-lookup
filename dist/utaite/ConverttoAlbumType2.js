(function() {
    if (mw.config.get('wgPageName') !== 'Special:BlankPage' || 
        new URLSearchParams(window.location.search).get('blankspecial') !== 'converttoalbumtype2') {
        return;
    }

    // Helper function to convert {{l|...}} to {{LType2|...}}
    function convertLToLType2(text) {
        return text.replace(/\{\{l\|([^}]+)\}\}/g, function(match, content) {
            return '{{LType2|' + content + '}}';
        });
    }

    // Create the interface elements
    function createInterface() {
        var container = document.createElement('div');
        container.style.margin = '20px';
        container.style.padding = '20px';
        container.style.border = '1px solid #ccc';
        container.style.borderRadius = '5px';

        // Title
        var title = document.createElement('h2');
        title.textContent = 'Convert to AlbumType2 Template';
        container.appendChild(title);

        // Input textarea
        var inputLabel = document.createElement('label');
        inputLabel.textContent = 'Input Raw Album Info:';
        inputLabel.style.display = 'block';
        inputLabel.style.marginBottom = '5px';
        container.appendChild(inputLabel);

        var inputArea = document.createElement('textarea');
        inputArea.style.width = '100%';
        inputArea.style.height = '200px';
        inputArea.style.marginBottom = '10px';
        inputArea.id = 'albumInfoInput';
        container.appendChild(inputArea);

        // Convert button
        var convertBtn = document.createElement('button');
        convertBtn.textContent = 'Convert to AlbumType2';
        convertBtn.style.marginBottom = '10px';
        convertBtn.style.padding = '5px 10px';
        convertBtn.onclick = processConversion;
        container.appendChild(convertBtn);

        // Output textarea
        var outputLabel = document.createElement('label');
        outputLabel.textContent = 'Output AlbumType2 Template:';
        outputLabel.style.display = 'block';
        outputLabel.style.marginBottom = '5px';
        container.appendChild(outputLabel);

        var outputArea = document.createElement('textarea');
        outputArea.style.width = '100%';
        outputArea.style.height = '200px';
        outputArea.id = 'albumInfoOutput';
        outputArea.readOnly = true;
        container.appendChild(outputArea);

        // Insert the container into the page
        var contentDiv = document.getElementById('mw-content-text');
        if (contentDiv) {
            contentDiv.appendChild(container);
        }
    }

    // Process the conversion
    function processConversion() {
        var input = document.getElementById('albumInfoInput').value;
        var output = document.getElementById('albumInfoOutput');
        var templateText = '{{AlbumType2\n';

        // Basic album info parsing
        var basicInfo = {
            albumtitle: input.match(/albumtitle:\s*(.+)/),
            image: input.match(/image:\s*(.+)/),
            datereleased: input.match(/datereleased:\s*(.+)/),
            crossfadeyt: input.match(/crossfadeyt:\s*(.+)/),
            streams: input.match(/streams:\s*(.+)/),
            shops: input.match(/shops:\s*(.+)/)
        };

        // Add basic info to template and convert l to LType2
        Object.keys(basicInfo).forEach(function(key) {
            if (basicInfo[key]) {
                var value = convertLToLType2(basicInfo[key][1].trim());
                templateText += '|' + key + ' = ' + value + '\n';
            }
        });

        // Add Spotify album ID if present in streams
        if (basicInfo.streams && basicInfo.streams[1].includes('spotify')) {
            var spotifyId = basicInfo.streams[1].match(/spotify\|([\w\d]+)/);
            if (spotifyId) {
                templateText += '|spotifyalbumid = ' + spotifyId[1] + '\n';
            }
        }

        // Process tracks
        templateText += '\n|track=\n{{Scrollbox|height=600|height-unit=px|\n';

        // Match all track entries
        var trackPattern = /Track\s+(\d+):\s*\ntitle:\s*([^\n]+)(?:\ninfo:\s*([^\n]+))?(?:\nlyricist:\s*([^\n]+))?(?:\ncomposer:\s*([^\n]+))?(?:\narranger:\s*([^\n]+))?/g;
        var match;

        while ((match = trackPattern.exec(input)) !== null) {
            var trackNum = match[1];
            var title = match[2];
            var info = match[3] || '';
            var lyricist = match[4] || '';
            var composer = match[5] || '';
            var arranger = match[6] || '';

            // Format track entry and convert l to LType2
            templateText += '{{Track|' + trackNum + 
                          '|title=' + title.trim() +
                          '|additionalshortinfo=' + convertLToLType2(info.trim());

            if (lyricist) templateText += '|lyricist=' + lyricist.trim();
            if (composer) templateText += '|composer=' + composer.trim();
            if (arranger) templateText += '|arranger=' + arranger.trim();

            templateText += '|collapsible=y|collapsed=y}}\n';
        }

        templateText += '}}\n}}';
        output.value = templateText;
    }

    // Initialize interface when document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createInterface);
    } else {
        createInterface();
    }
})();