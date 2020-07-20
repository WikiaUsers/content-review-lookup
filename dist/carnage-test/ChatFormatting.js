require([
    'wikia.window',
    'wikia.document',
    'jquery',
    'mw'
], function(window, document, $, mw){
    var ChatFormat = {
        format: {
            // Heading format
            h1: { pattern: /=(.*)=/g, html: '<h1>$1</h1>' },
            h2: { pattern: /={2}(.*)={2}/g, html: '<h2>$1</h2>' },
            h3: { pattern: /={3}(.*)={3}/g, html: '<h3>$1</h3>' },
            h4: { pattern: /={4}(.*)={4}/g, html: '<h4>$1</h4>' },
            h5: { pattern: /={5}(.*)={5}/g, html: '<h5>$1</h5>' },
            h6: { pattern: /={6}(.*)={6}/g, html: '<h6>$1</h6>' },
            // Horizontal rule
            hr: { pattern: /-{4}/g, html: '<hr />' },
            // Presentation format
            italic: { pattern: /'{2}(.*)'{2}/gm, html: '<div class="italic"></div>', priority: 1 }
            bold: { pattern: /'{3}(.*)'{3}/g, html: '<div class="bold">$1</div>', priority: 0 }
        }
    };
});