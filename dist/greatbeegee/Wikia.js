$(function() {
 
    if (!$('#UserProfileMasthead').length) return;
 
    if (!parseInt($("#UserProfileMasthead .tally").text())) return;
 
    var userName  = $("#UserProfileMasthead h1").text();
 
    function ISODateNDaysAgo (days) {
        function pad (n) { return n < 10 ? '0' + n : n; }  
        function ISODateString (d) {  
            return    d.getUTCFullYear() + '-'  
                + pad(d.getUTCMonth()+1) + '-'  
                + pad(d.getUTCDate())    + 'T'  
                + pad(d.getUTCHours())   + ':'  
                + pad(d.getUTCMinutes()) + ':'  
                + pad(d.getUTCSeconds()) + 'Z';
        }
        return ISODateString(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
    }
 
    var apiUrl = '/api.php?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
                 '&ucuser='  + userName +
                 '&ucstart=' + ISODateNDaysAgo(0) +
                 '&ucend='   + ISODateNDaysAgo(3 * 30);
 
    $.getJSON(apiUrl, function (result) {
        if (typeof result.query != 'undefined' && typeof result.query.usercontribs != 'undefined' &&
            !result.query.usercontribs.length) {
            $('<span class="group inactive-user">INACTIVE</span>').appendTo('#UserProfileMasthead hgroup');
        }
    });
});