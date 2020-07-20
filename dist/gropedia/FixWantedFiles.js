/*
 * Changes Special:WantedFiles links from edit to upload
 */
 
$(function() {
    if ("Special" == wgCanonicalNamespace && /WantedFiles/i.test(wgCanonicalSpecialPageName)) {
        $('ol.special a.new').each(function() {
            var m = $(this).attr('href').match(/(?:wiki\/|title=)File:([^&?]+)/);
            if (m) {
                $(this).attr({
                    href: '/wiki/Special:Upload?wpDestFile=' + m[1],
                    title: 'Upload ' + m[1]
                });
            }
        });
    }
});