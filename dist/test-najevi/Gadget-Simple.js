// Simply insert HTML at any DIV tag with a prescribed class
jQuery(document).ready( function() {
    $("div .simpleGadget").prepend("<p>Paragraph before.</p><p>Paragraph after.</p>");
});