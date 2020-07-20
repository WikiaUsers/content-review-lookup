//Komi Personalisation Changes
var admins = ['Komikoza'];
 
(function (admins) {
 
    if (!admins.length) return;
    if ('view' !== ($.getUrlVar('action') || 'view')) return;
 
    var adminsRegex = [];
    for (var i = 0; i < admins.length; i++) {
        adminsRegex.push(admins[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
    }
    adminsRegex = adminsRegex.join('|');
 
    function addClassToComments () {
        var regex = new RegExp('^(?:' + adminsRegex + ')$', 'i');
        $('ul.comments li')
        .filter(function () {
            return regex.test(
                $(this).attr('data-user')
            );
        })
        .addClass('admin');
    }
 
    function addClassToWall () {
        var regex = new RegExp('(?:' + adminsRegex + ')$', 'i');
        $('ul.comments li')
        .filter(function () {
            return regex.test(
                $(this).children('.speech-bubble-avatar')
                .children('a').attr('href')
            );
        })
        .addClass('admin');
    }
 
    function addClassToProfilePage () {
        var regex = new RegExp('(?:' + adminsRegex + ')(?:/|$)', 'i');
        if (regex.test(wgTitle)) {
            $('#UserProfileMasthead').addClass('admin');
        }    
    }
 
    $(function  () {
        if (wgCanonicalNamespace == "Thread" || wgCanonicalNamespace == "Message_Wall") {
            addClassToWall();
        } else if ($('ul.comments li').length) {
            addClassToComments();
        }
        if ($('#UserProfileMasthead').length) {
            addClassToProfilePage();
        }
    });
 
}(admins));

// credits to CALLOFDUTY4
$(function() {
 var rights = {};
 rights["Promenius"] = ["Rollbacker"];

if (wgPageName == "Special:Contributions"){
newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
unfinishedTitle = newTitle;
 
while (unfinishedTitle.search("_") > 0){
unfinishedTitle = unfinishedTitle.replace("_", " ");
}
 
userName = unfinishedTitle;
 
}else{
userName = wgTitle;
}
 
 if (typeof rights[wgTitle] != "undefined") {
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});