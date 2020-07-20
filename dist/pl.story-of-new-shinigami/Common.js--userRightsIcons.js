// <source lang="JavaScript">
 
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
   // BUREAUCRATS
  
  rights["Night Vision"]              = ["Założyciel", "Biurokrata"],
  rights["Shizuka Akane"]              = ["Administrator"]
   

   // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
$(function() {
 
    window.InactiveUsers = function (my, debug) {
 
        if (!$('#UserProfileMasthead').length) return;
 
        function getUserName () {
            var m;
            if (-1 < [2,3,500,501,1200].indexOf(wgNamespaceNumber) && (m = wgTitle.match(/^([^\/]+)/))) {
                return m[1];
            } else if (-1 == wgNamespaceNumber && -1 < ['Contributions','Following'].indexOf(wgCanonicalSpecialPageName)) {
                var lastPart = location.pathname.split('/').pop();
                if (lastPart.length && lastPart != wgPageName) {
                    return decodeURIComponent(lastPart.replace(/_/g, ' '));
                }
                return wgUserName;
            }
            return false;
        }
 
        var userName = getUserName();
        if (debug) console.log(userName);
        if (!userName) return;
 
        my = $.extend({ text: 'Inactive', gone: [], months: 1 }, my);
 
        function labelAsInactive () {
            $('#UserProfileMasthead hgroup').append(
                '<span class="group inactive-user">' + my.text +  '</span>'
            );
        }
 
        if (-1 < my.gone.indexOf(userName)) {
            labelAsInactive();
        } else {
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
                        '&ucend='   + ISODateNDaysAgo(30 * Math.max(1, parseInt(my.months)));
 
            $.getJSON(apiUrl, function (result) {
                if (debug) console.log(result);
                if (result.hasOwnProperty('query') &&
                    result.query.hasOwnProperty('usercontribs') && 
                    !result.query.usercontribs.length
                ) {
                    labelAsInactive();
                }
            });
        }
 
        return my;
 
    } (window.hasOwnProperty('InactiveUsers') ? window.InactiveUsers : {}, false);
});
// </source>