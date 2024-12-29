(function() {
    'use strict';
    
    // Check if we're on an edit page
    function isEditPage() {
        var url = window.location.href;
        //console.log('Checking if edit page:', url);
        //return url.indexOf('?action=edit') !== -1 || url.indexOf('?veaction=editsource') !== -1;
        return 1;
    }

  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
    // Categories and their symbols
   var categories = {
       generalSymbols: {
           title: "General Symbols",
           icon: "🔣",
           symbols: ["(", ")", "/", "?", "!", ":", "'", "\"", "*", "&", "+", "#", "@", "}", "{", "\\", "]", "[", "&", "^", "~", "•"]
       },
    	commonInserts: {
    		title: 'Common Inserts',
    		icon: '📝',
    		symbols: ['–', '—', '…', '°', '≈', '≠', '≤', '≥', '±', '−', '×', '÷', '←', '→', '·', '§']
    	},
    	wikiMarkup: {
    		title: 'Wiki Markup',
    		icon: '🔧',
    		symbols: ['{{}}', '|', '[]', '[[]]', '[[Category:]]', '<!-- -->', '<nowiki></nowiki>', '<pre></pre>', '<code></code>', '<s></s>', '<gallery></gallery>', '#REDIRECT [[]]']
    	},
    	talkPages: {
    		title: 'Talk Pages',
    		icon: '💬',
    		symbols: ['[[User:Username|Username]] ([[User talk:Username|talk]])', '[[User:Username|Username]] ([[User talk:Username|talk]]) 06:12, 26 December 2024 (UTC)', '06:12, 26 December 2024 (UTC)', '[[User:Makudoumee|Makudoumee]] ([[User talk:Makudoumee|talk]])', '[[User:Makudoumee|Makudoumee]] ([[User talk:Makudoumee|talk]]) 11:23, 26 December 2024 (UTC)', '11:23, 26 December 2024 (UTC)']
    	},
    	specialChars: {
    		title: 'Special Characters',
    		icon: '✨',
    		symbols: ['¦', '~', '|', '¡', '¿', '†', '‡', '↔', '↑', '↓', '•', '¶', '¹', '²', '³', '½', '⅓', '⅔', '¼', '¾', '⅛', '⅜', '⅝', '⅞', '∞']
    	},
    	currency: {
    		title: 'Currency',
    		icon: '💰',
    		symbols: ['¤', '₳', '฿', '₵', '¢', '₡', '₢', '$', '₫', '₯', '€', '₠', '₣', 'ƒ', '₴', '₭', '₤', 'ℳ', '₥', '₦', '№', '₧', '₰', '£', '៛', '₨', '₪', '৳', '₮', '₩', '¥']
    	},
    	cards: {
    		title: 'Card Suits',
    		icon: '🎴',
    		symbols: ['♠', '♣', '♥', '♦']
    	},
    	math: {
    		title: 'Math',
    		icon: '🔢',
    		symbols: ['−', '×', '÷', '←', '↑', '→', '↓', '§', '|', '²', '√', 'π']
    	},
    	templates: {
    		title: 'Templates',
    		icon: '📋',
    		symbols: ['{{Delete|}}', '{{t|}}', '{{subst:}}']
    	},
    	// New categories added
    	macrons: {
    		title: 'Macrons',
    		icon: '🔤',
    		symbols: ['ā', 'ī', 'ū', 'ē', 'ō', 'Ā', 'Ī', 'Ū', 'Ē', 'Ō']
    	},
    	quotationMarks: {
    		title: 'Quotation Marks',
    		icon: '💭',
    		symbols: ['"', "'", '«', '»'
    		]
    	},
    	ipaConsonants: {
    		title: 'IPA Consonants',
    		icon: '🗣️',
    		symbols: ['t̪', 'd̪', 'ʈ', 'ɖ', 'ɟ', 'ɡ', 'ɢ', 'ʡ', 'ʔ', 'ɸ', 'ʃ', 'ʒ', 'ɕ', 'ʑ', 'ʂ', 'ʐ', 'ʝ', 'ɣ', 'ʁ', 'ʕ', 'ʜ', 'ʢ', 'ɦ']
    	},
    	ipaNasals: {
    		title: 'IPA Nasals',
    		icon: '👃',
    		symbols: ['ɱ', 'ɳ', 'ɲ', 'ŋ', 'ɴ']
    	},
    	ipaVowels: {
    		title: 'IPA Vowels',
    		icon: '👄',
    		symbols: ['ɨ', 'ʉ', 'ɯ', 'ɪ', 'ʏ', 'ʊ', 'ɘ', 'ɵ', 'ɤ', 'ə', 'ɚ', 'ɛ', 'ɜ', 'ɝ', 'ɞ', 'ʌ', 'ɔ', 'ɐ', 'ɶ', 'ɑ', 'ɒ']
    	},
    	ipaModifiers: {
    		title: 'IPA Modifiers',
    		icon: '🔄',
    		symbols: ['ʰ', 'ʷ', 'ʲ', 'ˠ', 'ˤ', 'ⁿ', 'ˡ', 'ˈ', 'ˌ', 'ː', 'ˑ', '̪']
    	},
    	clicks: {
    		title: 'Click Consonants',
    		icon: '👆',
    		symbols: ['ʘ', 'ǀ', 'ǃ', 'ǂ', 'ǁ']
    	},
    	htmlEntities: {
    		title: 'HTML Entities',
    		icon: '🌐',
    		symbols: ['&nbsp;']
    	}
    };

  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
// Helper function to expand all categories
function expandAllCategories(container) {
    var categories = container.querySelectorAll('.edittools-category');
    categories.forEach(function(category) {
        var symbolsContainer = category.querySelector('.edittools-symbols');
        var toggle = category.querySelector('.category-toggle');
        if (symbolsContainer && toggle) {
            symbolsContainer.classList.remove('collapsed');
            toggle.textContent = '▼';
            toggle.classList.remove('collapsed');
        }
    });
}

// Helper function to collapse all categories
function collapseAllCategories(container) {
    var categories = container.querySelectorAll('.edittools-category');
    categories.forEach(function(category) {
        var symbolsContainer = category.querySelector('.edittools-symbols');
        var toggle = category.querySelector('.category-toggle');
        if (symbolsContainer && toggle) {
            symbolsContainer.classList.add('collapsed');
            toggle.textContent = '▲';
            toggle.classList.add('collapsed');
        }
    });
}
  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
    function createToaster() {
        var toaster = document.createElement('div');
        toaster.className = 'edittools-toaster';
        document.body.appendChild(toaster);
        return toaster;
    }

    function showToast(message, duration) {
        var toaster = document.querySelector('.edittools-toaster');
        if (!toaster) {
            toaster = createToaster();
        }
        
        toaster.textContent = message;
        toaster.classList.add('show');
        
        setTimeout(function() {
            toaster.classList.remove('show');
        }, duration || 2000);
    }

  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
    function handleSymbolClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        var symbol = this.getAttribute('data-symbol');
        var textarea = document.createElement('textarea');
        textarea.value = symbol;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        try {
            textarea.select();
            document.execCommand('copy');
            showToast('Copied: ' + symbol);
            
            // Visual feedback
            this.classList.add('symbol-clicked');
            setTimeout(function() {
                this.classList.remove('symbol-clicked');
            }.bind(this), 200);
        } catch (err) {
            showToast('Failed to copy symbol');
            console.error('Copy failed:', err);
        } finally {
            document.body.removeChild(textarea);
        }
    }

  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
    function createEditTools() {
        var container = document.createElement('div');
        container.id = 'custom-edittools';
        container.className = 'edittools-container minimized';
        
        var resizeHandle = document.createElement('div');
        resizeHandle.className = 'edittools-resize-handle';
        resizeHandle.innerHTML = '<div class="resize-line"></div><div class="resize-line"></div>';
        
        var innerContainer = document.createElement('div');
        innerContainer.className = 'edittools-inner';
        
        var wrapper = document.createElement('div');
        wrapper.className = 'edittools-wrapper';
        
        var titleBar = document.createElement('div');
        titleBar.className = 'edittools-title-bar';
        titleBar.innerHTML = 
            '<div class="edittools-title-section">' +
                '<span class="edittools-icon">🛠️</span>' +
                '<span class="edittools-title">Edit Tools</span>' +
            '</div>' +
            '<div class="edittools-controls">' +
                '<button class="edittools-minimize" title="Maximize"><i class="fa-regular fa-window-maximize"></i></button>' +
                '<button class="edittools-toggle" title="Show"><i class="fas fa-chevron-up"></i></button>' +
            '</div>';

        // Create the helpful links section
        var helpfulLinks = document.createElement('div');
        helpfulLinks.className = 'edittools-helpful-links';
        helpfulLinks.innerHTML = 
            '<div class="helpful-links-header">' +
                '<span class="helpful-links-title">役に立つかも。。。</span>' +
                '<span class="helpful-links-subtitle">These might be helpful...</span>' +
            '</div>' +
            '<div class="helpful-links-container">' +
                '<a href="/wiki/Tutorial"  target="_blank" rel="noopener noreferrer" class="helpful-link">Tutorial</a>' +  
                '<a href="/wiki/Requirements"  target="_blank" rel="noopener noreferrer" class="helpful-link">Requirements</a>' +              
                '<a href="/wiki/Template:Singer/doc"  target="_blank" rel="noopener noreferrer" class="helpful-link">Singer Documentation</a>' +
                '<a href="/wiki/Template:Album/doc"  target="_blank" rel="noopener noreferrer" class="helpful-link">Album Documentation</a>' +
                '<a href="/wiki/Template:Gallery/doc"  target="_blank" rel="noopener noreferrer" class="helpful-link">Gallery Documentation</a>' +
            '</div>';
        
        var content = document.createElement('div');
        content.className = 'edittools-content collapsed';
        
        var searchBar = document.createElement('div');
        searchBar.className = 'edittools-search';
        searchBar.innerHTML = 
            '<input type="text" placeholder="Search symbols..." class="edittools-search-input">' +
            '<span class="edittools-search-icon">🔍</span>';
        
        // Append elements in the correct order
        wrapper.appendChild(titleBar);
        wrapper.appendChild(helpfulLinks);  // Add helpful links directly under title bar
        content.appendChild(searchBar);     // Search bar goes in content div
        
        // Add categories to content div
        Object.keys(categories).forEach(function(key) {
            var category = categories[key];
            var section = createCategory(category.title, category.symbols, category.icon);
            content.appendChild(section);
        });

        wrapper.appendChild(content);       // Add content div to wrapper
        innerContainer.appendChild(wrapper);
        container.appendChild(resizeHandle);
        container.appendChild(innerContainer);
        
        addStyles();
        addEventListeners(container);
        
        return container;
    }

  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
    function createCategory(title, symbols, icon) {
        var section = document.createElement('div');
        section.className = 'edittools-category';
        
        var header = document.createElement('div');
        header.className = 'edittools-category-header';
        header.innerHTML = 
            '<div class="category-title">' +
                '<span class="category-icon">' + icon + '</span>' +
                '<span>' + title + '</span>' +
            '</div>' +
            '<span style="" class="category-toggle">▼</span>';
        
        var symbolContainer = document.createElement('div');
        symbolContainer.className = 'edittools-symbols';
        
        symbols.forEach(function(symbol) {
            var button = document.createElement('button');
            button.className = 'edittools-symbol';
            button.textContent = symbol;
            button.setAttribute('data-symbol', symbol);
            button.setAttribute('title', 'Click to copy: ' + symbol);
            symbolContainer.appendChild(button);
        });
        
        section.appendChild(header);
        section.appendChild(symbolContainer);
        return section;
    }

  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
function addStyles() {
    var css = [
        ':root {',
        '    /* Light theme variables */',
        '    --background-color: #ffffff;',
        '    --border-color: #e0e0e0;',
        '    --primary-color: #2196f3;',
        '    --text-color: #000000;',
        '    --secondary-bg: #f5f5f5;',
        '    --hover-bg: rgba(255,255,255,0.2);',
        '    --shadow-color: rgba(0,0,0,0.1);',
        '    --icon-color: #757575;',
        '    --scrollbar-track: #f1f1f1;',
        '    --scrollbar-thumb: #bdbdbd;',
        '    --scrollbar-thumb-hover: #9e9e9e;',
        '    --toaster-bg: #323232;',
        '    --toaster-text: white;',
        '    --symbol-hover-bg: #f5f5f5;',
        '    --symbol-clicked-bg: #e3f2fd;',
        '}',
        '',
        'body[data-theme="dark"] {',
        '    /* Dark theme variables */',
        '    --background-color: rgba(40, 53, 122, 1);',
        '    --border-color: rgba(255, 255, 255, 0.1);',
        '    --primary-color: #64b5f6;',
        '    --text-color: #ffffff;',
        '    --secondary-bg: rgba(30, 41, 99, 1);',
        '    --hover-bg: rgba(255,255,255,0.1);',
        '    --shadow-color: rgba(0,0,0,0.3);',
        '    --icon-color: #a0a0a0;',
        '    --scrollbar-track: rgba(30, 41, 99, 1);',
        '    --scrollbar-thumb: rgba(80, 96, 173, 1);',
        '    --scrollbar-thumb-hover: rgba(100, 116, 193, 1);',
        '    --toaster-bg: #1a237e;',
        '    --toaster-text: #ffffff;',
        '    --symbol-hover-bg: rgba(30, 41, 99, 1);',
        '    --symbol-clicked-bg: rgba(50, 63, 143, 1);',
        '}',
        '',
        '.edittools-container {',
        '    position: fixed;',
        '    bottom: 0;',
        '    left: 0;',
        '    right: 0;',
        '    background: var(--background-color);',
        '    border-top: 2px solid var(--primary-color);',
        '    box-shadow: 0 -2px 10px var(--shadow-color);',
        '    z-index: 1000;',
        '    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
        '    height: 300px;',
        '    min-height: 50px;',
        '    max-height: 80vh;',
        '    transition: height 0.3s ease;',
        '    color: var(--text-color);',
        '}',
        '',
        '.edittools-resize-handle {',
        '    position: absolute;',
        '    top: 0;',
        '    left: 0;',
        '    right: 0;',
        '    height: 6px;',
        '    background: var(--secondary-bg);',
        '    cursor: ns-resize;',
        '    z-index: 1001;',
        '    display: flex;',
        '    flex-direction: column;',
        '    justify-content: center;',
        '    gap: 2px;',
        '}',
        '',
        '.resize-line {',
        '    height: 1px;',
        '    background: var(--border-color);',
        '    width: 40px;',
        '    margin: 0 auto;',
        '}',
        '',
        '.edittools-inner {',
        '    position: absolute;',
        '    top: 6px;',
        '    left: 0;',
        '    right: 0;',
        '    bottom: 0;',
        '    overflow: auto;',
        '}',
        '',
        '.edittools-container.minimized {',
        '    height: 40px !important;',
        '    resize: none;',
        '    overflow: hidden;',
        '}',
        '',
        '.edittools-wrapper {',
        '    max-width: 1200px;',
        '    margin: 0 auto;',
        '    padding: 10px;',
        '}',
        '',
        '.edittools-title-bar {',
        '    display: flex;',
        '    justify-content: space-between;',
        '    align-items: center;',
        '    padding: 8px 16px;',
        '    background: var(--primary-color);',
        '    color: var(--toaster-text);',
        '    border-radius: 4px;',
        '    margin-bottom: 10px;',
        '    cursor: ns-resize;',
        '}',
        '',
        '.edittools-title-section {',
        '    display: flex;',
        '    align-items: center;',
        '    gap: 8px;',
        '}',
        '',
        '.edittools-icon {',
        '    font-size: 1.2em;',
        '}',
        '',
        '.edittools-title {',
        '    font-weight: 500;',
        '    font-size: 1.1em;',
        '}',
        '',
        '.edittools-controls button {',
        '    background: none;',
        '    border: none;',
        '    color: var(--toaster-text);',
        '    cursor: pointer;',
        '    padding: 4px 8px;',
        '    margin-left: 8px;',
        '    border-radius: 3px;',
        '    transition: background-color 0.2s;',
        '}',
        '',
        '.edittools-controls button:hover {',
        '    background: var(--hover-bg);',
        '}',
        '',
        '.edittools-search {',
        '    position: relative;',
        '    margin-bottom: 15px;',
        '    display: flex;',
        '    align-items: center;',
        '}',
        '',
        '.edittools-search-input {',
        '    width: 100%;',
        '    padding: 8px 35px 8px 12px;',
        '    border: 1px solid var(--border-color);',
        '    border-radius: 4px;',
        '    font-size: 14px;',
        '    transition: border-color 0.2s;',
        '    background: var(--background-color);',
        '    color: var(--text-color);',
        '}',
        '',
        '.edittools-search-input:focus {',
        '    border-color: var(--primary-color);',
        '    outline: none;',
        '}',
        '',
        '.edittools-search-icon {',
        '    position: absolute;',
        '    right: 10px;',
        '    pointer-events: none;',
        '    color: var(--icon-color);',
        '}',
        '',
        '.edittools-content {',
        '    display: flex;',
        '    flex-wrap: wrap;',
        '    gap: 15px;',
        '    padding: 10px;',
        '}',
        '',
        '.edittools-content.collapsed {',
        '    display: none;',
        '}',
        '', 
        '.category-toggle {',
        '    cursor: pointer;',
        '    user-select: none;',
        '}',
        '',
        '.category-toggle.collapsed {',
        '    transform: rotate(-90deg);',
        '}',
        '',
        '.edittools-category {',
        '    flex: 1;',
        '    min-width: 250px;',
        '    background: var(--background-color);',
        '    border: 1px solid var(--border-color);',
        '    border-radius: 4px;',
        '    overflow: hidden;',
        '    transition: box-shadow 0.2s;',
        '}',
        '',
        '.edittools-category:hover {',
        '    box-shadow: 0 2px 8px var(--shadow-color);',
        '}',
        '',
        '.edittools-category-header {',
        '    display: flex;',
        '    justify-content: space-between;',
        '    align-items: center;',
        '    padding: 10px;',
        '    background: var(--secondary-bg);',
        '    border-bottom: 1px solid var(--border-color);',
        '}',
        '',
        '.category-title {',
        '    display: flex;',
        '    align-items: center;',
        '    gap: 8px;',
        '    font-weight: 500;',
        '}',
        '',
        '.category-icon {',
        '    font-size: 1.2em;',
        '}',
        '',
        '.edittools-symbols {',
        '    padding: 10px;',
        '    display: flex;',
        '    flex-wrap: wrap;',
        '    gap: 5px;',
        '}',
        '',
        '.edittools-symbol {',
        '    padding: 6px 12px;',
        '    background: var(--background-color);',
        '    border: 1px solid var(--border-color);',
        '    border-radius: 3px;',
        '    cursor: pointer;',
        '    font-family: monospace;',
        '    transition: all 0.2s;',
        '    color: var(--text-color);',
        '}',
        '',
        '.edittools-symbols.collapsed {',
        '    display: none !important;',
        '}',
        '',
        '.category-toggle {',
        '    cursor: pointer;',
        '    user-select: none;',
        '}',
        '',
        '.edittools-symbol:hover {',
        '    background: var(--symbol-hover-bg);',
        '    border-color: var(--primary-color);',
        '}',
        '',
        '.symbol-clicked {',
        '    background: var(--symbol-clicked-bg) !important;',
        '    transform: scale(0.95);',
        '}',
        '',
        '.collapsed .edittools-symbols,',
        '.collapsed .edittools-content {',
        '    display: none;',
        '}',
        '',
    '.edittools-helpful-links {',
    '    padding: 10px;',
    '    border-bottom: 1px solid var(--border-color);',
    '    background: var(--secondary-bg);',
    '}',
    '',
    '.helpful-links-header {',
    '    text-align: center;',
    '    margin-bottom: 10px;',
    '}',
    '',
    '.helpful-links-title {',
    '    display: block;',
    '    font-size: 16px;',
    '    font-weight: 600;',
    '    color: var(--text-color);',
    '    margin-bottom: 2px;',
    '}',
    '',
    '.helpful-links-subtitle {',
    '    font-size: 12px;',
    '    color: var(--icon-color);',
    '}',
    '',
    '.helpful-links-container {',
    '    display: flex;',
    '    flex-wrap: wrap;',
    '    gap: 6px;',
    '    justify-content: center;',
    '}',
    '',
    '.helpful-link {',
    '    display: inline-block;',
    '    padding: 4px 10px;',
    '    background: var(--background-color);',
    '    color: var(--primary-color);',
    '    text-decoration: none;',
    '    border: 1px solid var(--border-color);',
    '    border-radius: 3px;',
    '    font-size: 13px;',
    '    transition: all 0.2s;',
    '}',
    '',
    '.helpful-link:hover {',
    '    background: var(--primary-color);',
    '    color: white;',
    '    border-color: var(--primary-color);',
    '}',
    '',
    '.helpful-link:active {',
    '    transform: translateY(1px);',
    '}',
    '',
    '@media (max-width: 768px) {',
    '    .helpful-links-container {',
    '        flex-direction: column;',
    '        align-items: stretch;',
    '    }',
    '    ',
    '    .helpful-link {',
    '        text-align: center;',
    '    }',
    '}',
        '',
        '.edittools-toaster {',
        '    position: fixed;',
        '    bottom: 350px;',
        '    left: 50%;',
        '    transform: translateX(-50%);',
        '    background: var(--toaster-bg);',
        '    color: var(--toaster-text);',
        '    padding: 10px 20px;',
        '    border-radius: 4px;',
        '    font-size: 14px;',
        '    opacity: 0;',
        '    transition: opacity 0.3s ease;',
        '    z-index: 1001;',
        '    pointer-events: none;',
        '    box-shadow: 0 2px 5px var(--shadow-color);',
        '}',
        '',
        '.edittools-toaster.show {',
        '    opacity: 1;',
        '}',
        '',
        '.edittools-inner::-webkit-scrollbar {',
        '    width: 8px;',
        '}',
        '',
        '.edittools-inner::-webkit-scrollbar-track {',
        '    background: var(--scrollbar-track);',
        '    border-radius: 4px;',
        '}',
        '',
        '.edittools-inner::-webkit-scrollbar-thumb {',
        '    background: var(--scrollbar-thumb);',
        '    border-radius: 4px;',
        '}',
        '',
        '.edittools-inner::-webkit-scrollbar-thumb:hover {',
        '    background: var(--scrollbar-thumb-hover);',
        '}',
        '',
        '.category-toggle {',
        '    transition: transform 0.3s ease;',
        '}',
        '',
       '.category-toggle.collapsed {',
        '    transform: rotate(-90deg);',
        '}',
        '',
        '@media (max-width: 768px) {',
        '    .edittools-category {',
        '        min-width: 100%;',
        '    }',
        '',
        '    .edittools-title-bar {',
        '        padding: 6px 12px;',
        '    }',
        '',
        '    .edittools-symbol {',
        '        padding: 4px 8px;',
        '    }',
        '}'
    ].join('\n');
    
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}
  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
    function addEventListeners(container) {
        // Resize functionality
        var resizeHandle = container.querySelector('.edittools-resize-handle');
        var isResizing = false;
        var startY = 0;
        var startHeight = 0;
        
        function handleMouseMove(e) {
            if (!isResizing) return;
            var deltaY = startY - e.clientY;
            var newHeight = Math.min(Math.max(startHeight + deltaY, 50), window.innerHeight * 0.8);
            container.style.height = newHeight + 'px';
        }
        
        function handleMouseUp() {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resizeHandle.classList.remove('active');
        }
        
        resizeHandle.addEventListener('mousedown', function(e) {
            isResizing = true;
            startY = e.clientY;
            startHeight = container.offsetHeight;
            resizeHandle.classList.add('active');
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            e.preventDefault();
        });

        // Search functionality
        var searchInput = container.querySelector('.edittools-search-input');
        searchInput.addEventListener('input', function() {
            var searchTerm = this.value.toLowerCase();
            var symbols = container.querySelectorAll('.edittools-symbol');
            
            symbols.forEach(function(symbol) {
                var text = symbol.textContent.toLowerCase();
                var parent = symbol.closest('.edittools-category');
                
                if (text.includes(searchTerm)) {
                    symbol.style.display = '';
                    parent.style.display = '';
                } else {
                    symbol.style.display = 'none';
                }
                
                // Hide categories with no visible symbols
                var visibleSymbols = parent.querySelectorAll('.edittools-symbol[style=""]');
                if (visibleSymbols.length === 0) {
                    parent.style.display = 'none';
                }
            });
        });

        // Main toggle (show/hide)
        container.querySelector('.edittools-toggle').addEventListener('click', function() {
            container.querySelector('.edittools-content').classList.toggle('collapsed');
            var icon = this.querySelector('i');
    
            if (container.querySelector('.edittools-content').classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                this.setAttribute('title', 'Show');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                this.setAttribute('title', 'Hide');
            }
        });

        // Minimize button
container.querySelector('.edittools-minimize').addEventListener('click', function() {
    container.classList.toggle('minimized');
    const icon = this.querySelector('i');

    if (container.classList.contains('minimized')) {
        icon.classList.remove('fa-window-minimize');
        icon.classList.add('fa-window-maximize');
        this.setAttribute('title', 'Maximize');
        container.querySelector('.edittools-content').classList.add('collapsed');
        container.querySelector('.edittools-toggle').textContent = '▼';
        collapseAllCategories(container);
    } else {
        icon.classList.remove('fa-window-maximize');
        icon.classList.add('fa-window-minimize');
        this.setAttribute('title', 'Minimize');
        expandAllCategories(container);
    }
});

        // Category toggles
        var categoryToggles = container.querySelectorAll('.category-toggle');
        categoryToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                var category = this.closest('.edittools-category');
                var symbolsContainer = category.querySelector('.edittools-symbols');
                
                if (symbolsContainer) {
                    // Toggle the collapsed class on the symbols container
                    symbolsContainer.classList.toggle('collapsed');
                    
                    // Update the toggle arrow
                    this.textContent = symbolsContainer.classList.contains('collapsed') ? '▲' : '▼';
                }
            });
        });

        // Symbol buttons
        var symbolButtons = container.querySelectorAll('.edittools-symbol');
        symbolButtons.forEach(function(button) {
            button.removeEventListener('click', handleSymbolClick);
            button.addEventListener('click', handleSymbolClick);
        });

        // Double-click on title bar to toggle maximize
        container.querySelector('.edittools-title-bar').addEventListener('dblclick', function() {
    if (container.style.height === '80vh') {
        container.style.height = '300px';
        collapseAllCategories(container);
    } else {
        container.style.height = '80vh';
        expandAllCategories(container);
    }
});

        // Prevent text selection during resize
        container.addEventListener('mousedown', function(e) {
            if (isResizing) {
                e.preventDefault();
            }
        });
    }

  //  <!--------------------------------------------------------------------------------------------------------------------------------------------------------------->
    function init() {
        if (isEditPage()) {
            var observer = new MutationObserver(function(mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    var mutation = mutations[i];
                    if (mutation.addedNodes.length) {
                        var editors = document.querySelectorAll('.cm-editor, .ve-ce-surface');
                        if (editors.length) {
                            if (!document.getElementById('custom-edittools')) {
                                var editTools = createEditTools();
                                document.body.appendChild(editTools);
                                createToaster();
                            }
                            observer.disconnect();
                            break;
                        }
                    }
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();