/*if statement to check if a license has been selected or not before adding image*/ 

if (mw.config.get("wgCanonicalSpecialPageName") != "Upload" && mw.config.get("wgCanonicalSpecialPageName") != "MultipleUpload") {
        mw.util.addCSS('label[for="wpLicense"].notValid:after {\
                content: \" \";\
                display: inline-block;\
                height: 16px;\
                width: 16px;\
                margin-left: 2px;\
                background: url(\'http://www.famfamfam.com/lab/icons/mini/icons/icon_alert.gif\') bottom no-repeat;\
        }');
        function uploadPopupLicense() {
                $("section#UploadPhotosWrapper .options").show();
                $("section#UploadPhotosWrapper .advanced").hide();
                $('label[for="wpLicense"]').addClass("notValid");
                $("select#wpLicense").css("outline","1px solid #c00");
                $('section#UploadPhotosWrapper input[type="submit"]').attr("disabled","disabled");
        }
        $('body').on('DOMNodeInserted', '#UploadPhotosWrapper', function(ev) {
                if (ev.target.id === 'UploadPhotosWrapper') {
                        $("select#wpLicense").click(function() {
                                if ($(this).val() != "") {
                                        $('label[for="wpLicense"]').removeClass("notValid");
                                        $("select#wpLicense").css("outline","none");
                                        $('section#UploadPhotosWrapper input[type="submit"]').removeAttr("disabled");
                                }
                        });
                        $('section#UploadPhotosWrapper input[type="submit"]').mouseover(function() {
                                if ($("select#wpLicense").val() == "") {
                                        return uploadPopupLicense();
                                }
                        });
                }
        });
}


/*social media icons*/ 

var SocialMediaButtons = { 
        position: "top",
        colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');