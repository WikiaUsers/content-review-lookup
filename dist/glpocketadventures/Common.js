/* Auto Collapsible Table */
var ShowHideConfig = { autoCollapse: 0};
importScriptPage('ShowHide/code.js', 'dev');

/* Highlight Admin Message Wall Comments */
$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$="Kyle$calise"]').length;
}).next().css({
    backgroundColor: "orange"
});

/* Set Admin Class */
var admins = ['Kyle$calise', 'Minifede', '-alex48starlings-'];
 
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