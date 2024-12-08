function append_link(source) {
    var elements = document.querySelectorAll('div[data-source="' + source + '"] .pi-data-value');
    elements.forEach(function(element) {
        var text = element.innerHTML;
        if (text) {
            var values = text.split('<br>');
            element.innerHTML = '';
            values.forEach(function(value, index) {
                var trimmed_value = value.trim();
                var link_text = trimmed_value;
                var extra_text = '';

                var parent_index = trimmed_value.indexOf('(');
                if (parent_index !== -1) {
                    link_text = trimmed_value.substring(0, parent_index).trim();
                    extra_text = ' ' + trimmed_value.substring(parent_index);
                }
                
                var category_link = document.createElement('a');
                category_link.href = '/wiki/Category:' + encodeURIComponent(link_text);
                category_link.textContent = link_text;
                
                if (index > 0) {
                    element.appendChild(document.createElement('br'));
                }
                
                element.appendChild(category_link);
                
                if (extra_text) {
                    element.appendChild(document.createTextNode(extra_text));
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
    'COL', 'MG', 'KDG', 'OISBI', 'SLI',
    'EDAH', 'RPB', 'SPSF', 'IOTG', 'NSMH',
    'BV', 'DGBS', 'SFC', 'ORAC', 'BAS',
    'RBS', 'MLS', 'USS', 'TRREG', 'SOLE',
    'MKSM', 'TLR', 'HOTD', 'YNY', 'KNY',
    'NNT', 'NNM', 'JTN', 'JTE', 'JTS',
    'JTW', 'ACO', 'LKSM', 'VH', 'QTSM',
    'SG', 'RQ', 'DISD', 'DXD', 'BBGD',
    'HRMY', 'NKNSG', 'LB', 'RNC', 'IMA', 
    'YGK', 'OD', 'DDDN', 'SNV', 'MSSH', 
    'BOT', 'OGH,'
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