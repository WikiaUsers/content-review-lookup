/* possible protected states
full : edit+move=sysop
semi : edit+move=autoconfirmed
none : edit+move=none / edit+move+upload=none / create=none

create-full : create=sysop
create-semi : create=autoconfirmed

move-full : move=sysop, edit+upload=none
move-semi : move=autoconfirmed, edit+upload=none

upload-full : upload=sysop, edit+move=none
upload-semi : upload=autoconfirmed, edit+move=none

full+upload : edit+move+upload=sysop
semi+upload : edit+move+upload=autoconfirmed

hybrid - literally anything else
*/
    
var protectionDescriptions = {
    "full" : "This page is fully protected.",
    "semi" : "This page is semi-protected.",
    
    "create-full" : "This page is create-protected.",
    "create-semi" : "This page is semi-create-protected.",
    
    "move-full" : "This page is move-protected.",
    "move-semi" : "This page is semi-move-protected.",
    
    "upload-full" : "This page is upload-protected.",
    "upload-semi" : "This page is semi-upload-protected.",
    
    "full+upload" : "This page is fully-protected (includes file uploading).",
    "semi+upload" : "This page is semi-protected (includes file uploading).",
    
    "hybrid" : "One or more actions for this page is protected."
};

var protectionIcons = {
    "unknown" : "https://vignette.wikia.nocookie.net/swordburst2/images/c/c9/UnknownProtectionIcon.png",
    
    "full" : "https://vignette.wikia.nocookie.net/swordburst2/images/e/e3/FullProtectionIcon.png",
    "semi" : "https://vignette.wikia.nocookie.net/swordburst2/images/f/f7/SemiProtectionIcon.png",
    
    "create-full" : "https://vignette.wikia.nocookie.net/swordburst2/images/a/a3/CreateProtectionIcon.png",
    "create-semi" : "https://vignette.wikia.nocookie.net/swordburst2/images/a/a3/CreateProtectionIcon.png",
    
    "move-full" : "https://vignette.wikia.nocookie.net/swordburst2/images/6/62/MoveProtectionIcon.png",
    "move-semi" : "https://vignette.wikia.nocookie.net/swordburst2/images/6/62/MoveProtectionIcon.png",
    
    "upload-full" : "https://vignette.wikia.nocookie.net/swordburst2/images/b/b6/UploadProtectionIcon.png",
    "upload-semi" : "https://vignette.wikia.nocookie.net/swordburst2/images/b/b6/UploadProtectionIcon.png",
    
    "full+upload" : "https://vignette.wikia.nocookie.net/swordburst2/images/e/e3/FullProtectionIcon.png",
    "semi+upload" : "https://vignette.wikia.nocookie.net/swordburst2/images/f/f7/SemiProtectionIcon.png"
};

var protectionPageHeaders = {
    "full" : "#Full_protection",
    "semi" : "#Semi-protection",
    
    "create-full" : "#Create_protection",
    "create-semi" : "#Create_protection",
    
    "move-full" : "#Move_protection",
    "move-semi" : "#Move_protection",
    
    "upload-full" : "#Upload_protection",
    "upload-semi" : "#Upload_protection"
};

(function () {
    if (window.protect_icon_loaded) { return true }
    window.protect_icon_loaded = true;
    
    var protectedState;
    
    var config = mw.config.get([
        "wgRestrictionEdit",
        "wgRestrictionMove",
        "wgRestrictionUpload",
        "wgRestrictionCreate",
        "wgNamespaceNumber",
        "wgIsArticle",
        "wgArticleId"
    ]);
    
    if (!config.wgIsArticle) { return }
    
    if (config.wgArticleId === 0) {
        // uncreated pages
        
        var createProtection = config.wgRestrictionCreate ? config.wgRestrictionCreate[0] : null;
        
        if (createProtection == "sysop") {
            protectedState = "create-full";
        } else if (createProtection == "autoconfirmed") {
            protectedState = "create-semi";
        } else if (!createProtection) {
            protectedState = "none";
        }
    } else if (config.wgNamespaceNumber == 6) {
        // files
        
        var editProtection = config.wgRestrictionEdit ? config.wgRestrictionEdit[0] : null;
        var moveProtection = config.wgRestrictionMove ? config.wgRestrictionMove[0] : null;
        var uploadProtection = config.wgRestrictionUpload ? config.wgRestrictionUpload[0] : null;
        
        if (!editProtection && !moveProtection && uploadProtection) {
            if (uploadProtection == "sysop") {
                protectedState = "upload-full";
            } else if (uploadProtection == "autoconfirmed") {
                protectedState = "upload-semi";
            } else {
                protectedState = "none";
            }
        } else if (editProtection && !moveProtection && !uploadProtection) {
            if (editProtection == "sysop") {
                protectedState = "edit-full";
            } else if (editProtection == "autoconfirmed") {
                protectedState = "edit-semi";
            } else {
                protectedState = "none";
            }
        } else if (!editProtection && moveProtection && !uploadProtection) {
            if (moveProtection == "sysop") {
                protectedState = "move-full";
            } else if (moveProtection == "autoconfirmed") {
                protectedState = "move-semi";
            } else {
                protectedState = "none";
            }
        } else {
            if ((editProtection == "sysop") && (moveProtection == "sysop") && (uploadProtection == "sysop")) {
                protectedState = "full+upload";
            } else if ((editProtection == "autoconfirmed") && (moveProtection == "autoconfirmed") && (uploadProtection == "autoconfirmed")) {
                protectedState = "semi+upload";
            } else if (!editProtection && !moveProtection && !uploadProtection) {
                protectedState = "none";
            } else {
                protectedState = "hybrid";
            }
        }
    } else {
        // all other articles
        
        var editProtection = config.wgRestrictionEdit ? config.wgRestrictionEdit[0] : null;
        var moveProtection = config.wgRestrictionMove ? config.wgRestrictionMove[0] : null;
        
        if (editProtection && !moveProtection) {
            if (editProtection == "sysop") {
                protectedState = "edit-full";
            } else if (editProtection == "autoconfirmed") {
                protectedState = "edit-semi";
            } else {
                protectedState = "none";
            }
        } else if (!editProtection && moveProtection) {
            if (moveProtection == "sysop") {
                protectedState = "move-full";
            } else if (moveProtection == "autoconfirmed") {
                protectedState = "move-semi";
            } else {
                protectedState = "none";
            }
        } else {
            if ((editProtection == "sysop") && (moveProtection == "sysop")) {
                protectedState = "full";
            } else if ((editProtection == "autoconfirmed") && (moveProtection == "autoconfirmed")) {
                protectedState = "semi";
            } else if (!editProtection && !moveProtection) {
                protectedState = "none";
            } else {
                protectedState = "hybrid";
            }
        }
    }
    
    if (protectedState == "none") { return }
    
    var protectionStateLink = $("<a href='/wiki/Project:Page_protection" + (protectionPageHeaders[protectedState] || "") + "' title='" + protectionDescriptions[protectedState] + "'></a>").css("margin-top", "1em");
    var protectionStateIcon = $("<img src='" + (protectionIcons[protectedState] || protectionIcons.unknown) + "' width='25' height='25'>");
    
    var content = $(".page-header__separator")[0];
    if (!content) { return true }
    
    protectionStateLink.append(protectionStateIcon);
    protectionStateLink.insertBefore(content);
})();