
// <source lang="JavaScript">
 
// CODE WRITTEN BY User:Rappy_4187 (http://c.wikia.com/wiki/User:Rappy_4187)
 
function addMastheadTags() {
  var rights = {};

  rights["Mysiek44"]                  = ["Główny Administrator","Założyciel"];
  rights["BrunoTomek"]                  = ["Założyciel","Główny Administrator","Biurokrata"];
 
  if (wgCanonicalSpecialPageName == "Contributions") {
    var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
  } else { var user = wgTitle; }
 
  if (typeof rights[user] != "undefined") {
    $('.UserProfileMasthead .masthead-info span.tag').remove();
    for( var i=0, len=rights[user].length; i < len; i++) {
       $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
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
 
        my = $.extend({ text: 'nieaktywny', gone: [], months: 1 }, my);
 
        function labelAsInactive () {
            $('#UserProfileMasthead hgroup').append(
                '<span class="tag inactive-user" style="margin-left: 10px !important">' + my.text +  '</span>'
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