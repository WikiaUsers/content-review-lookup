/* Any JavaScript here will be loaded for all users on every page load. */
// Imports
EditIntroButtonText = 'Intro';

$(".kevin-and-mel-wedding").replaceWith('<iframe src="http://www.arewethere.yt/Kevin-and-Mels-Wedding/59461.htm?type=embed" width="90%" height="400" frameborder="0" style="display:block; margin:0 auto;"></iframe>');

importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:EditIntroButton/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:DupIsemageList/code.js',
        'u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:BackToTopButton/code.js']
}, {
    type: "style",
    articles: [
        "MediaWiki:KevinWordBubble.css",
        "MediaWiki:KevinWordBubble2.css",
        "MediaWiki:KevinWordBubbleGenII.css",
        "MediaWiki:StaffHighlight.css"
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};

////////////////////////////////////////////////////////////////////////////////

$(function() {
    var Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        NewDate = new Date(),
        CurrentMonth = Month[NewDate.getMonth()],
        CurrentDate = NewDate.getDate(),
        CurrentYear = NewDate.getFullYear();
        
    $.ajax({
        url : "/index.php?title=Template:" + CurrentMonth + "_Month&action=render",
        type : "get",
        async: false,
        cache: false,
        timeout: 10000,
        tryCount: 0,
        retryLimit: 5,
        success:  function(MonthTemplate) {
            $('div.tabber > div.tabbertab[title="This Month"]').attr("title", CurrentMonth + " " + CurrentYear);
            $(".currentmonth").replaceWith(MonthTemplate);
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
    
    if ($(".currentseason").length) {
        var CurrentSeason;
        
        if (CurrentMonth === "June" && CurrentDate >= 20) {
            CurrentSeason = "Summer";
        } else if (CurrentMonth === "July" || CurrentMonth === "August") {
            CurrentSeason = "Summer";
        } else if (CurrentMonth === "September" && CurrentDate < 22) {
            CurrentSeason = "Summer";
        } else if (CurrentMonth === "September" && CurrentDate >= 22) {
            CurrentSeason = "Autumn";
        } else if (CurrentMonth === "October" || CurrentMonth === "November") {
            CurrentSeason = "Autumn";
        } else if (CurrentMonth === "December" && CurrentDate < 21) {
            CurrentSeason = "Autumn";
        } else if (CurrentMonth === "December" && CurrentDate >= 21) {
            CurrentSeason = "Winter";
        } else if (CurrentMonth === "January" || CurrentMonth === "February") {
            CurrentSeason = "Winter";
        } else if (CurrentMonth === "March" && CurrentDate < 20) {
            CurrentSeason = "Winter";
        } else {
            CurrentSeason = "Spring";
        }
    
        $.ajax({
            url : "/index.php?title=Template:Time" + CurrentSeason + "&action=render",
            type : "get",
            async: false,
            cache: false,
            timeout: 10000,
            tryCount: 0,
            retryLimit: 5,
            success:  function(SeasonTemplate) {
                $(".currentseason").replaceWith(SeasonTemplate);
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

////////////////////////////////////////////////////////////////////////////////
/*
new mw.Api().get({
    action: 'query',
    list: 'categorymembers',
    cmtitle: 'Category:Characters',
    cmlimit: 5000,
    cb: new Date().getTime()
}).done(function(d) {
    var data = d.query;
    for (var i in data.categorymembers) {
        currentpage = data.categorymembers[i].title;

        new mw.Api().get({
            action: 'query',
            prop: 'revisions',
            titles: wgPageName,
            rvprop: 'timestamp',
            rvdiffto: 'prev',
            format: 'json'
        }, function(d) {
            for (var i in d.query.pages) {
                var rv = d.query.pages[i].revisions[0];
                console.log(rv);
            }
        });
   }
});
*/

$(function() {
    var RoleplayArchiver = '\
        <form method="" name="" class="WikiaForm"> \
            <fieldset> \
                <p style="text-align:center;">To report an error/bug or simply to leave any suggestions or concerns regarding this script, please contact the script\'s creator <a href="/wiki/User_talk:Kevin_Mo" rel="nofollow" style="color:#d32a46;">Kevin</a>.</p> \
            </fieldset> \
        </form>';
    
    $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-rpa">Roleplay Archiver</a></li>');

    $('#t-rpa').click(function() {
        $.showCustomModal("Roleplay Archiver", RoleplayArchiver, {
            id: "roleplay-archiver-modal",
            width: 500,
            buttons: [{
                id: "begin-archive-button",
                message: "Begin Archive",
                defaultButton: true,
                handler: function () {
                  RoleplayArchive();
                  $("#roleplay-archiver-modal").closeModal();
                }
            }, {
                message: "Exit",
                handler: function() {
                  $("#roleplay-archiver-modal").closeModal();
                }
            }]
        });
    });
    
    function RoleplayArchive() {
        $.get(mw.util.wikiScript("api"), {
                action: "query",
                titles: mw.config.get("wgPageName"),
                prop: "revisions",
                rvprop: "timestamp",
                rvdiffto: "prev",
                format: "json"
            }, function(data) {
                for (var i in data.query.pages) break;
                
                var rv = data.query.pages[i].revisions[0],
                    LastEditMonth = new Date(rv.timestamp).toUTCString().substring(8, 11),
                    CurrentMonth = new Date().getMonth();
                    
                    var LastEditMonthArray = new Array();
                        LastEditMonthArray["Jan"] = "1";
                        LastEditMonthArray["Feb"] = "2";
                        LastEditMonthArray["Mar"] = "3";
                        LastEditMonthArray["Apr"] = "4";
                        LastEditMonthArray["May"] = "5";
                        LastEditMonthArray["Jun"] = "6";
                        LastEditMonthArray["Jul"] = "7";
                        LastEditMonthArray["Aug"] = "8";
                        LastEditMonthArray["Sep"] = "9";
                        LastEditMonthArray["Oct"] = "10";
                        LastEditMonthArray["Nov"] = "11";
                        LastEditMonthArray["Dec"] = "12";
                        
                    var CurrentMonthArray = new Array();
                        CurrentMonthArray[0] = "1";
                        CurrentMonthArray[1] = "2";
                        CurrentMonthArray[2] = "3";
                        CurrentMonthArray[3] = "4";
                        CurrentMonthArray[4] = "5";
                        CurrentMonthArray[5] = "6";
                        CurrentMonthArray[6] = "7";
                        CurrentMonthArray[7] = "8";
                        CurrentMonthArray[8] = "9";
                        CurrentMonthArray[9] = "10";
                        CurrentMonthArray[10] = "11";
                        CurrentMonthArray[11] = "12";
                
                // if (CurrentMonthArray[CurrentMonth] - LastEditMonthArray[LastEditMonth] >= 1) {
                    var OldPageName = wgPageName.replace("_", " "),
                        NewPageName = "Archived Roleplay:" + wgPageName.replace("_", " "),
                        config = {
                          action: "move",
                          from: OldPageName,
                          to: NewPageName,
                          noredirect: "",
                          reason: "Test!",
                          bot: true,
                          token: mw.user.tokens.get("editToken")
                        };
                        new mw.Api().post(config)
                // }
        });
    }
    
    $(function() {
        $.ajax({
            url: "/Special:Editcount/Kevin_Mo/",
            success: function(EditCountData) {
                var EditCount = $(EditCountData).find("table.TablePager > tbody > tr:nth-of-type(2) > th.ecrowright:first-of-type").text().replace(",", "");
            }
        });
    });
});

/**
 * Collapsible tables
 *
 * Allows tables to be collapsed, showing only the header. See  [[Wikipedia:NavFrame]].
 *
 * @version 2.0.3 (2014-03-14)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
 * is supported in MediaWiki core.
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createClickHandler( tableIndex ) {
    return function ( e ) {
        e.preventDefault();
        collapseTable( tableIndex );
    };
}
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;
 
    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) {
                continue;
            }
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) {
                continue;
            }
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
            // Styles are declared in [[MediaWiki:Common.css]]
            Button.className = 'collapseButton';
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', createClickHandler( tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
            ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
        ) {
            collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( createCollapseButtons );

importScriptPage('DupImageList/code.js', 'dev');

/* @description Autocorrects any searches for "User:KMO", "User talk:KMO", and "Category:KMO", replacing "KMO" with "KMØ" (workaround [due to the special character "Ø" in the username] to allow all the subpages of those pages to be easily accessible through search). In the case that a user is searching for a User/User talk/Category namespace page that starts with KMO (e.g., User:KMORE, User talk:KMOON, or Category:KMOD), it will undo the autocorrect of "KMØ" back to the original "KMO" */
$("input#searchInput").on("keyup", function() {
    if ($(this).val().trim().toUpperCase() === ("USER:KMO") || $(this).val().trim().toUpperCase() === ("USER TALK:KMO") || $(this).val().trim().toUpperCase() === ("CATEGORY:KMO") || $(this).val().trim().toUpperCase() === ("CATEGORY:CLAIMED BY KMO") || $(this).val().trim().toUpperCase() === ("CATEGORY:APPROVED BY KMO")) {
        $(this).val($(this).val().replace("KMO", "KMØ"));
    } else if (($(this).val().trim().length === 9 && $(this).val().trim().toUpperCase() !== ("USER:KMØ/") && $(this).val().trim().toUpperCase().indexOf("Ø") !== -1) || ($(this).val().trim().length === 14 && $(this).val().trim().toUpperCase() !== ("USER TALK:KMØ/") && $(this).val().trim().toUpperCase().indexOf("TALK") !== -1 && $(this).val().trim().toUpperCase().indexOf("Ø") !== -1) || ($(this).val().trim().length === 13 && $(this).val().trim().toUpperCase().indexOf("CATEGORY:KMØ") !== -1) || ((($(this).val().trim().length === 24 &&  $(this).val().trim().toUpperCase().indexOf("CATEGORY:APPROVED BY KMØ") === -1) || $(this).val().trim().length === 25) && $(this).val().trim().toUpperCase().indexOf("Ø") !== -1)) {
        $(this).val($(this).val().replace("KMØ", "KMO"));
    }
});