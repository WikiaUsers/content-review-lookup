// This script scans a page for misuse of any custom template, and replaces content of pages if it finds errors.
$(function() {
    // Some jQuery thing
    if (!(mw.config.get('wgNamespaceNumber') in [-1, 8])) {
        templates = {
            'Doggies': '.doggies-text:not(.broken-template-example) :is(span.new, a.new), .doggies-container a.new'
            // Object that stores template name, and broken link CSS selector(s)
        }
        failed = []
        for (var template in templates) {
            if ($(templates[template]).length > 0) {
                failed.push({'Name': template, 'Items': $(templates[template])});
                /* $(templates[template]) returns an array that contains all elements that can be selected by templates[template]
                This just adds stuff to failed if there are any broken links
                $(templates[template]) is done here so that you can get specific error messages below */
            }
        }
        if (failed.length > 0) {
            $(".mw-parser-output").text('').append($('<div>').append('Template Error').addClass('template-error'))
            /* mw-parser-output is the class of the div that holds all of the content of the page.
            It is used to cause as much disruption as possible without breaking core functionality of the site.
            .text(thing) replaces all of the selector's content with thing. The rest of the code should be
            kind of self-explanatory to anyone with basic HTML knowledge */
            errors = $('<div>').addClass('template-error-content').append($('<p>').append('The following problems were encountered when parsing custom templates:').addClass('template-error-message'))
            $.each((failed), function(_, template) {
                var $div = $('<div>')
                $div.append($('<p>').append(template['Name'] + ':'))
                var $ul = $('<ul>')
                $.each(template['Items'], function(_, link) {
                    $ul.append($('<li>').append(link.title))
                    // For each element in template['Items'], this creates an <li> item displaying a message explaining the error
                    // MediaWiki's pretty good so the data in the title attribute is enough of an explanation
                })
                $div.append($ul)
                $(errors).append($div)
            $(".mw-parser-output").append(errors)
            })
        }
    }
});