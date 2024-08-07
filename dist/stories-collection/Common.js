function append_link(source) {
    var elements = document.querySelectorAll('div[data-source="' + source + '"] .pi-data-value');
    elements.forEach(function(element) {
        var text = element.innerHTML;
        if (text) {
            var values = text.split('<br>');
            element.innerHTML = '';
            values.forEach(function(value, index) {
                var trimmed_value = value.trim();
                var linkText = trimmed_value;
                var extraText = '';

                var parenIndex = trimmed_value.indexOf('(');
                if (parenIndex !== -1) {
                    linkText = trimmed_value.substring(0, parenIndex).trim();
                    extraText = ' ' + trimmed_value.substring(parenIndex);
                }
                
                var category_link = document.createElement('a');
                category_link.href = '/wiki/Category:' + encodeURIComponent(linkText);
                category_link.textContent = linkText;
                
                if (index > 0) {
                    element.appendChild(document.createElement('br'));
                }
                
                element.appendChild(category_link);
                
                if (extraText) {
                    element.appendChild(document.createTextNode(extraText));
                }
            });
        }
    });
}

append_link('type');
append_link('status');
append_link('vital_status');
append_link('gender');
append_link('genre');

var anchors = document.querySelectorAll('a');

var abbreviations = [
    'MLS', 'COL', 'CLS', 'USS', 'BV',
    'HSP', 'SFS', 'ORC', 'RPB', 'VPVA',
    'EDAH', 'RUIC', 'TBS', 'MG', 'KDG',
    'OISBI', 'SOLE', 'TM', 'TRK', 'PMU',
    'ORV', 'WAF', 'MSSDK', 'TLR', 'NSMH',
    'IOTG', 'JTTN', 'JTTS', 'JTTE', 'JTTW',
    'JTTWA', 'ACO', 'BOT', 'DBSS', 'BTTH',
    'MU', 'TGR', 'HSR', 'VY', 'AR',
    'SD', 'DXD', 'SSSM', 'TRREG', 'RPS'
];

var pattern = new RegExp('\\s*\\(\\s*(' + abbreviations.join('|') + ')\\s*\\)\\s*', 'g');

anchors.forEach(function(anchor) {
    anchor.childNodes.forEach(function(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(pattern, '');
        }
    });
});

var toctext_spans = document.querySelectorAll('span.toctext');
toctext_spans.forEach(function(text) {
    text.childNodes.forEach(function(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(pattern, '');
        }
    });
});

var title_spans = document.querySelectorAll('span.mw-page-title-main');
title_spans.forEach(function(text) {
    text.childNodes.forEach(function(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(pattern, '');
        }
    });
});

var paragraphs = document.querySelectorAll('p');

paragraphs.forEach(function(paragraph) {
    var textContent = paragraph.textContent.trim();
    var only_br = paragraph.innerHTML.trim() === '<br>';
    if (textContent === '' && only_br) {
        paragraph.style.display = 'none';
    }

    var next_element = paragraph.nextElementSibling;
    if (next_element && next_element.tagName.toLowerCase() === 'ul') {
        paragraph.style.marginBottom = '0';
    }
});