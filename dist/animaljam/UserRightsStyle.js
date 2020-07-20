var a = performance.now();
var bureaucrats = [
    "Mooziq",
    "Xytl"
];
 
var admins = [
    "Amberstone",
    "Punkdrummergirl",
    "AutoModerator"
];
 
var custodians = [
    "Mad1303",
    "Star101988"
];
 
var mods = [
    "Lunifer",
    "Pikalil",
    "Darkmuddkip"
];

var usergroups = [bureaucrats, admins, custodians, mods];
if (mw.config.get('wgCanonicalNamespace') == 'Thread') {
    thread = true;
} else {
    thread = false;
}
var style = "<style id='userrights' type='text/css'>";
for (i = 0; i < usergroups.length; i++) {
    for (j = 0; j < usergroups[i].length; j++) {
        switch( i ) {
            case 0: //Bureaucrats
                style += "a[href$=':" + usergroups[i][j] + "'], a[href$='/" + usergroups[i][j] + "'] {color: #CD0000 !important;}";
                style += "img.avatar[alt='" + usergroups[i][j] + "'] {border: 3px ridge #CD0000 !important; border-radius: 5px !important; -webkit-border-radius: 2px !important;}";
                if (thread) {
                    style += ".comments li[data-user='" + usergroups[i][j] + "'] .edited-by:after, body.ns-1201 .edited-by > a.subtle[href='http://animaljam.wikia.com/wiki/" + usergroups[i][j] + "']:after {content: '[Bureaucrat]'; color: #CD0000; padding: 0 5px; margin-left: 3px;}";
                }
                break;
            case 1: //Admins
                style += "a[href$=':" + usergroups[i][j] + "'], a[href$='/" + usergroups[i][j] + "'] {color: #800080 !important;}";
                style += "img.avatar[alt='" + usergroups[i][j] + "'] {border: 3px ridge #800080 !important; border-radius: 5px !important; -webkit-border-radius: 2px !important;}";
                if (thread) {
                    style += ".comments li[data-user='" + usergroups[i][j] + "'] .edited-by:after, body.ns-1201 .edited-by > a.subtle[href='http://animaljam.wikia.com/wiki/" + usergroups[i][j] + "']:after {content: '[Admin]'; color: #800080; padding: 0 5px; margin-left: 3px;}";
                }
                break;
            case 2: //Custodians
                style += "a[href$=':" + usergroups[i][j] + "'], a[href$='/" + usergroups[i][j] + "'] {color: #228C77 !important;}";
                style += "img.avatar[alt='" + usergroups[i][j] + "'] {border: 3px ridge #228C77 !important; border-radius: 5px !important; -webkit-border-radius: 2px !important;}";
                if (thread) {
                    style += ".comments li[data-user='" + usergroups[i][j] + "'] .edited-by:after, body.ns-1201 .edited-by > a.subtle[href='http://animaljam.wikia.com/wiki/" + usergroups[i][j] + "']:after {content: '[Custodian]'; color: #228C77; padding: 0 5px; margin-left: 3px;}";
                }
                break;
            case 3: //Mods
                style += "a[href$=':" + usergroups[i][j] + "'], a[href$='/" + usergroups[i][j] + "'] {color: #1874CD !important;}";
                style += "img.avatar[alt='" + usergroups[i][j] + "'] {border: 3px ridge #1874CD !important; border-radius: 5px !important; -webkit-border-radius: 2px !important;}";
                if (thread) {
                    style += ".comments li[data-user='" + usergroups[i][j] + "'] .edited-by:after, body.ns-1201 .edited-by > a.subtle[href='http://animaljam.wikia.com/wiki/" + usergroups[i][j] + "']:after {content: '[Mod]'; color: #1874CD; padding: 0 5px; margin-left: 3px;}";
                }
                break;
            default:
                console.log("Default");
        }
    }
}
$(function() {
 style += "</style>";
 $('head').append(style);
 console.log("Done! (v1.1)");
 var b = performance.now();
 console.log('It took ' + (b - a) + ' ms.');
});