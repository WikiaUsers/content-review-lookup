/* Any JavaScript here will be loaded for all users on every page load. */
// Imports
importArticles({
    type: 'style',
    articles: [
        'MediaWiki:StaffHighlight.css'
    ]
});

window.rwaOptions = {
	namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 14, 15, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 500, 501, 828, 829],
	refresh: true
};

var PurgeButtonText = 'Refresh',
    ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity", "Blog:Recent_posts"],
    AjaxRCRefreshText = 'Auto-refresh',
    EditIntroButtonText = 'Intro';

//preload line to add user category for special:upload and special:multipleupload
$(function preloadUploadDesc() {
    // check wgCanonicalSpecialPageName for upload page
    if ( [ 'MultipleUpload', 'Upload' ].indexOf( mw.config.get( 'wgCanonicalSpecialPageName' ) ) > -1 ) {
        // append Category:USERNAME to upload desc textarea
        $( '#wpUploadDescription').val( $( '#wpUploadDescription').val() + '[[Category:' + mw.config.get( 'wgUserName' ) + ']]' );
    }
});
 
//edit buttons
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert page"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
            "speedTip": "Strike",
            "tagOpen": "<s>",
            "tagClose": "</s>",
            "sampleText": "Strike-through text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
            "speedTip": "Line break",
            "tagOpen": "<br />",
            "tagClose": "",
            "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
            "speedTip": "Comment visible only for editors",
            "tagOpen": "<!-- ",
            "tagClose": " -->",
            "sampleText": "Insert comment here"
    };
}
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 $(function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
 
/* End of the {{USERNAME}} replacement */
 
/* IRClogin div */
$(function() {
    if ($('#IRClogin').length) {
        var nick;
        if (typeof wgUserName == 'undefined') {
            nick = 'wgusername' + Math.floor(Math.random() * 100);
        } else {
            nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="https://webchat.freenode.net/?nick=' + nick + '&channels=CHBRPW-Chat&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});

/* Portable Infobox JS */
/* Adds parameter brackets ("{{{" and "}}}") prepend and append to the Portable Infobox placeholders */

$('.pi-placeholder').each(function() {
    $(this).prepend("{{{");
    $(this).append("}}}");
});

/* Adds an image placeholder ("File:{{{image}}}|250px]]") if an image is not present in the Portable Infobox */
if ($('.pi-image').length === 0){
    $('.pi-header:first-of-type').after("<div class='pi-image-placeholder'>[[File:{{{image}}}|250px]]</div>");
    $('.pi-image-placeholder').css({
        'font-size': '12px',
        'text-align': 'center',
        'color': '#000000',
    });
}

/* @description Autocorrects any searches for "User:KMO", "User talk:KMO", and "Category:KMO", replacing "KMO" with "KMØ" (workaround [due to the special character "Ø" in the username] to allow all the subpages of those pages to be easily accessible through search). In the case that a user is searching for a User/User talk/Category namespace page that starts with KMO (e.g., User:KMORE, User talk:KMOON, or Category:KMOD), it will undo the autocorrect of "KMØ" back to the original "KMO" */
$("input#searchInput").on("keyup", function() {
    if ($(this).val().trim().toUpperCase() === ("USER:KMO") || $(this).val().trim().toUpperCase() === ("USER TALK:KMO") || $(this).val().trim().toUpperCase() === ("CATEGORY:KMO")) {
        $(this).val($(this).val().replace("KMO", "KMØ"));
    } else if (($(this).val().trim().length === 9 && $(this).val().trim().toUpperCase() !== ("USER:KMØ/") && $(this).val().trim().toUpperCase().indexOf("Ø") !== -1) || ($(this).val().trim().length === 14 && $(this).val().trim().toUpperCase() !== ("USER TALK:KMØ/") && $(this).val().trim().toUpperCase().indexOf("TALK") !== -1 && $(this).val().trim().toUpperCase().indexOf("Ø") !== -1) || ($(this).val().trim().length === 13 && $(this).val().trim().toUpperCase().indexOf("CATEGORY:KMØ") !== -1)) {
        $(this).val($(this).val().replace("KMØ", "KMO"));
    }
});

/* jQuery for automatically loading the current season template for the main page right column and automatically loading the current month template for the main page. */

$(function() {
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        newDate = new Date(),
        currentMonth = month[newDate.getMonth()],
        currentDate = newDate.getDate(),
        currentYear = newDate.getFullYear();

    if ($(".currentmonth").length) {
        $.ajax({
            url : "/index.php?title=Template:" + currentMonth + "_Month&action=render",
            type : "get",
            async: false,
            cache: false,
            timeout: 10000,
            tryCount: 0,
            retryLimit: 5,
            success:  function(monthTemplate) {
                $('.tabber a[title="This Month"]').attr("title", currentMonth + " " + currentYear).text(currentMonth + " " + currentYear);
                $(".currentmonth").replaceWith(monthTemplate);
                $(".tabber:not(.tabberlive)").show().tabber();
            },
            error: function(xhr, textStatus){
                if (textStatus === "timeout" || (xhr.responseText === "" && textStatus === "error")) {
                    this.tryCount++;

                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                        return;
                    }
                    return;
                }
            },
            statusCode: {
                404: function() {
                    $(".currentmonth").text("Unable to load the month template, please reload the page and try again. If this error persists, please contact an administrator!");
                }
            }
        });
    }

    if ($(".currentseason").length) {
        var currentSeason;

        if ((currentMonth === "June" && currentDate >= 21) || currentMonth === "July" || currentMonth === "August" || (currentMonth === "September" && currentDate < 22)) {
            currentSeason = "Summer";
        } else if ((currentMonth === "September" && currentDate >= 22) || currentMonth === "October" || currentMonth === "November" || (currentMonth === "December" && currentDate < 21)) {
            currentSeason = "Autumn";
        } else if ((currentMonth === "December" && currentDate >= 21) || currentMonth === "January" || currentMonth === "February" || (currentMonth === "March" && currentDate < 20)) {
            currentSeason = "Winter";
        } else {
            currentSeason = "Spring";
        }

        $.ajax({
            url : "/index.php?title=Template:Time" + currentSeason + "&action=render",
            type : "get",
            async: false,
            cache: false,
            timeout: 10000,
            tryCount: 0,
            retryLimit: 5,
            success:  function(seasonTemplate) {
                $(".currentseason").replaceWith(seasonTemplate);
            },
            error: function(xhr, textStatus){
                if (textStatus === "timeout" || (xhr.responseText === "" && textStatus === "error")) {
                    this.tryCount++;

                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);

                        return;
                    }

                    return;
                }
            },
            statusCode: {
                404: function() {
                    $(".currentseason").text("Unable to load the season template, please reload the page and try again. If this error persists, please contact an administrator!");
                }
            }
        });
    }
});