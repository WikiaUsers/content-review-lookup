// Automatically add {{No license}} to image descriptions where no licence is selected

$(function() {
    var template = '{{No license}}';
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Upload') {
        $('#mw-upload-form .mw-htmlform-submit').on({
            click: function() {
                if ($('.mw-input #wpLicense').val() == '') {
                    $('#wpUploadDescription').val($('#wpUploadDescription').val() + '\n==Licensing==\n' + template);
                }
            }
        });
    }
});

// insertusername id (Template:WATCHINGUSERNAME)

 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);

// IMPORTS: Countdown timer

importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
    ]
});