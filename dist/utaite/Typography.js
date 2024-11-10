(function() {
    if (window.DebugTerminalLoaded) {
        return;
    }
    window.DebugTerminalLoaded = true;

    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    function formatOutput(element) {
        var text = element.innerHTML;
        text = text.replace(/&gt;/g, '>');
        text = text.replace(/<br\s*\/?>/gi, '\n');
        return decodeHtml(text);
    }

    function processGroupList(groupListElement) {
        // Get the text content and split into individual groups
        var content = formatOutput(groupListElement);
        var groups = content.split('\n').filter(function(group) {
            return group.trim().length > 0;
        });
        
        // Clear the original content
        groupListElement.innerHTML = '';
        
        return groups;
    }

    function initTypewriter() {
        var output = document.getElementById('output');
        if (!output) return;
        
        var allText = [];
        var children = output.children;
        var groupList = null;
        
        // Process all children
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.id === 'group-list') {
                groupList = processGroupList(child);
                // Add header text before groups
                allText.push({
                    text: 'DETECTED GROUPS:\n==================\n',
                    type: 'text'
                });
                // Add each group as separate item
                groupList.forEach(function(group) {
                    allText.push({
                        text: group + '\n',
                        type: 'group'
                    });
                });
                // Add footer text after groups
                allText.push({
                    text: '　\n==================\n[SYSTEM] Scan complete\n[SYSTEM] All groups successfully mapped\n[STATUS] Ready for gallery generation',
                    type: 'text'
                });
            } else {
                allText.push({
                    text: formatOutput(child) + '\n',
                    type: 'text'
                });
            }
        }
        
        var currentIndex = 0;
        var currentChar = 0;
        var outputText = '';
        
        function typeWriter() {
            if (currentIndex >= allText.length) {
                return;
            }
            
            var current = allText[currentIndex];
            var text = current.text;
            
            if (currentChar < text.length) {
                var char = text.charAt(currentChar);
                if (char === '\n') {
                    outputText += '<br>';
                } else {
                    outputText += char;
                }
                output.innerHTML = outputText;
                currentChar++;
                setTimeout(typeWriter, Math.random() * 30 + 10);
            } else {
                currentIndex++;
                currentChar = 0;
                if (currentIndex < allText.length) {
                    setTimeout(typeWriter, 100);
                }
            }
        }
        
        typeWriter();
    }

    function addBlinkingCursor() {
        var style = document.createElement('style');
        style.textContent = [
            '@keyframes blink {',
            '    0%, 100% { opacity: 1; }',
            '    50% { opacity: 0; }',
            '}',
            '.typewriter {',
            '    animation: blink 1s step-end infinite;',
            '    color: #0f0;',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function init() {
        addBlinkingCursor();
        setTimeout(initTypewriter, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    if (typeof mw !== 'undefined' && mw.hook) {
        mw.hook('wikipage.content').add(init);
    }
})();