//<source lang="javascript">
/** 
 * __NOWYSIWYG__
 *
 * module (Info)Widgets
 * documentation at: http://dev.wikia.com/wiki/InactiveUsers
 * © Peter Coester, 2012
 * 
 */

$(function() {
 
    window.InactiveUsers = function (my) {
 
        my = $.extend({ text: 'inactive' }, my);
 
        if ($('#UserProfileMasthead').length && parseInt($("#UserProfileMasthead .tally").text())) {

            var m, userName = false;
            if (-1 != [2,1200,3,500,501].indexOf(wgNamespaceNumber) && (m = wgPageName.match(/(?:\:|%3[aA])([^\/]+)/))) {
                userName = m[1];
            } else if (-1 != 'Following Contributions'.indexOf(wgCanonicalSpecialPageName)) {
                userName = wgUserName;
            }
            console.log('testing if user %s is active', userName);
            if (!userName) return;
            
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
                        '&ucuser='  + encodeURIComponent(userName) +
                        '&ucstart=' + ISODateNDaysAgo(0) +
                        '&ucend='   + ISODateNDaysAgo(3 * 5);
 
            $.getJSON(apiUrl, function (result) {
               if (typeof result.query != 'undefined' && typeof result.query.usercontribs != 'undefined' &&
                   !result.query.usercontribs.length) {
                   $('#UserProfileMasthead hgroup').append(
                       '<span class="group inactive-user">' + my.text +  '</span>'
                   );
               }
            });
        }
 
        return my;
 
    } ('undefined' == typeof window.InactiveUsers ? {} : window.InactiveUsers);
});

//</source>