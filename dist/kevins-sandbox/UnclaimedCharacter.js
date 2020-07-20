$(document).ready(function() {
    if (wgCanonicalNamespace !== "") {
        return;
    }
    
    var UnclaimedCharacterSignature = window.UnclaimedCharacterSignature || "{{Unsigned|" + wgUserName + "}}";
    
    $(".WikiaMenuElement").find("a#ca-delete").parent().after('<li><a href="#" id="unclaimed-character">Unclaimed Character</a></li>');
    
    $("#unclaimed-character").click(function() {
        UnclaimedCharacterConfirmation();
    });
    
    function UnclaimedCharacterConfirmation() {
        $.showCustomModal("Unclaimed Character", "Please verify that the page " + wgPageName.replace("_/g", " ") + " you are deleting is an unclaimed character page before continuing with the deletion!", {
            id: "unclaimed-character-confirmation",
            width: 350,
            buttons: [{
                id: "delete-button",
                message: 'Delete',
                handler: function() {
                    $("#unclaimed-character-confirmation").closeModal();
                    UnclaimedCharacterDelete();
                }
            }, {
                id: "cancel-button",
                message: "Cancel",
                defaultButton: true,
                handler: function () {
                    $("#unclaimed-character-confirmation").closeModal();
                    return;
                }
            }]
        });
    }
    
    function UnclaimedCharacterDelete() {
        $.get(mw.util.wikiScript("api"), {
            action: "query",
            titles: wgPageName,
            prop: "revisions",
            rvprop: "user",
            rvdir: "newer",
            rvdiffto: "prev",
            format: "json"
        }, function(data) {
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0];
            
            $.post(mw.util.wikiScript("api"), {
                action: "edit",
                title: "User_talk:" + rv.user,
                section: "new",
                sectiontitle: "Unclaimed Character",
                text: "Hello there!\n\nThis message is to let you know that since your character " + wgPageName.replace(/_/g, " ") + " hasn't gone through our [[Claiming:Camp|claiming process]], the character page has been deleted. In order to create a character and start roleplaying with them, your character must be approved in our [[Claiming:Camp|claiming process]] first.\n\nIf you haven't already, feel free to take a look at our [[Camp Half-Blood Role Playing Wiki:Guide to Getting Started|our guide to getting started]], [[Claiming:Camp#Rules/Guidelines/Worker List|our claiming rules and guidelines]], and [[User blog:YorkieWolf/The 101 On Claims|the 101 on claims]]! Thank you and have a great day!\n\n<span style=\"font-size:75%; font-style:italic;\">(This is an automated message automatically sent with the deletion of your page; if you need any help, do not hesitate to message [[User talk:" + wgUserName + "|me]] or another available [[Template:Our Administrative Team|administrator]]!)</span>''\n\n" + UnclaimedCharacterSignature,
                summary: "Automated message about the deletion of the character page for the unclaimed character " + wgPageName.replace(/_/g, " ") + ".",
                token:  mw.user.tokens.get("editToken")
            }).done(function(done) {
                if (!done.error) {
                    new BannerNotification(rv.user + " has been successfully messaged!", "success").show();
                } else {
                    new BannerNotification("An error occurred while messaging " + rv.user + " (" + done.error.code + " )!", "error").show();
                }
            })
            .fail(function() {
                new BannerNotification("Failed to message " + rv.user + "!", "failure").show();
            });

            new mw.Api().post({
                action: "delete",
                title: wgPageName,
                reason: "Unclaimed Character",
                token: mw.user.tokens.get("editToken")
            }).done(function(done) {
                if (!done.error) {
                    new BannerNotification("The page " + wgPageName.replace(/_/g, " ") + " has been successfully deleted!", "success").show();
                    window.location.pathname = "/wiki/";
                } else {
                    new BannerNotification("An error occurred while deleting the page" + wgPageName.replace(/_/g, " ") + " (" + done.error.code + ")!", "error").show();
                }
            })
            .fail(function() {
                new BannerNotification("Failed to delete the page" + wgPageName.replace("_/g", " ") + ", Please try again!", "failure").show();
            });
        });
    }
});