/* Any JavaScript here will be loaded for all users on every page load. */

//Reduce category page listings to one column by Bobogoobo
$(function() {
    if (mw.config.get('wgCanonicalNamespace') !== 'Category') {
        return;
    }
 
    var html = '';
    for (var i = 0; i < 3; i++) {
        html += $('#mw-pages table:first td')[i].innerHTML;
    }
    html = html.replace(/\<\/ul\>.*cont\.\<\/h3\>\n\<ul\>/g, '');
    $('#mw-pages table tr:first').html('<td style="width:100%;">' + html + '</td>');
});