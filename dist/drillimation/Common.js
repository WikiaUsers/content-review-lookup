/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Tooltips/code.js",
        "w:c:dev:DisplayClock/code.js",
        "w:c:dev:TopEditors/code.js"
    ]
}, {
    type: "style",
    articles: [
        "w:c:hitlerparody:MediaWiki:Flags.css",
        "w:c:dev:DropdownMenu/code.css",
        "w:c:dev:FontAwesome/code.css"
    ]
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

$(function() {
    'use strict';
    if (!$('.youtube').length) return;
    $('.youtube').each(function() {
        var $this = $(this),
            channel = $this.data('channel');
        $.when(
            $.get('http://gdata.youtube.com/feeds/api/users/' + encodeURIComponent(channel) + '/uploads?alt=json'),
            $.get('http://gdata.youtube.com/feeds/api/users/' + encodeURIComponent(channel) + '?v=2&fields=yt:statistics,gd:feedLink&alt=json')
        ).then(function(a, b) {
            function formatNum(n) { // Original source: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
                return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }
            $this
                .find('.channel').html(a[0].feed.author[0].name.$t).end()
                .find('.subscribers').html(formatNum(b[0].entry.yt$statistics.subscriberCount)).end()
                .find('.total-views').html(formatNum(b[0].entry.yt$statistics.totalUploadViews)).end()
                .find('.video').html('<a id="ytlink" href="http://www.youtube.com/watch?v=' + a[0].feed.entry[0].id.$t.substr(42) + '">' + a[0].feed.entry[0].title.$t + '</a> <span class="fa fa-yt-play" style="color:#e52d27"></span><br>'+new Date(a[0].feed.entry[0].published.$t).toUTCString().replace(/ GMT/g, '')).end();
                var x = new Date() - new Date(a[0].feed.entry[0].published.$t);    
                var y = Math.floor(x/(24*3600*1000));
                if (y===0) {
                    document.getElementById("duration").innerHTML = '(Today)';
                } else if (y==1) {
                    document.getElementById("duration").innerHTML = '(Yesterday)';
                } else {
                    document.getElementById("duration").innerHTML = '('+y+' days ago)';
                }
        }); 
    });
});

/******************** Level system ********************/
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        if ($("#UserProfileMasthead").size()) {
            editRanks = {
                1:"LEVEL 1",
                5:"LEVEL 2",
                15:"LEVEL 3",
                30:"LEVEL 4",
                50:"LEVEL 5",
                75:"LEVEL 6",
                105:"LEVEL 7",
                140:"LEVEL 8",
                180:"LEVEL 9",
                225:"LEVEL 10",
                275:"LEVEL 11",
                330:"LEVEL 12",
                390:"LEVEL 13",
                455:"LEVEL 14",
                525:"LEVEL 15",
                600:"LEVEL 16",
                680:"LEVEL 17",
                765:"LEVEL 18",
                855:"LEVEL 19",
                950:"LEVEL 20",
                1050:"LEVEL 21",
                1155:"LEVEL 22",
                1265:"LEVEL 23",
                1380:"LEVEL 24",
                1500:"LEVEL 25",
                1625:"LEVEL 26",
                1755:"LEVEL 27",
                1890:"LEVEL 28",
                2030:"LEVEL 29",
                2175:"LEVEL 30",
                }
            editCount = $("#UserProfileMasthead .tally em").html().replace(",","");
            if (editCount) {
                for(i in editRanks) if (editCount >= parseInt(i)) editRank = editRanks[i];
                $("#UserProfileMasthead hgroup").append($("<span>").addClass("tag").html(editRank));
            }
        }
    }
}
/*
//When looking at a user profile page,
if ($("#UserProfileMasthead").size()) {
    //get the displayed editcount,
    editCount = $("#UserProfileMasthead .tally em").html().replace(",","");
    //compare it to a predefined list of levels,
    editRanks = {
    1:"LEVEL 1",
    10:"LEVEL 2",
    25:"LEVEL 3",
    50:"LEVEL 4",
    90:"LEVEL 5",
    150:"LEVEL 6",
    235:"LEVEL 7",
    350:"LEVEL 8",
    500:"LEVEL 9",
    690:"LEVEL 10",
    925:"LEVEL 11",
    1210:"LEVEL 12",
    1550:"LEVEL 13",
    1950:"LEVEL 14",
    2415:"LEVEL 15",
    2950:"LEVEL 16",
    3560:"LEVEL 17",
    4250:"LEVEL 18",
    5025:"LEVEL 19",
    5890:"LEVEL 20",
    6850:"LEVEL 21",
    7910:"LEVEL 22",
    9075:"LEVEL 23",
    10350:"LEVEL 24",
    11740:"LEVEL 25",
    13250:"LEVEL 26",
    14885:"LEVEL 27",
    16650:"LEVEL 28",
    18550:"LEVEL 29",
    20590:"LEVEL 30",
    22775:"LEVEL 31",
    25110:"LEVEL 32",
    27600:"LEVEL 33",
    30250:"LEVEL 34",
    33065:"LEVEL 35",
    36050:"LEVEL 36",
    39210:"LEVEL 37",
    42550:"LEVEL 38",
    46075:"LEVEL 39",
    49790:"LEVEL 40",
    53700:"LEVEL 41",
    57810:"LEVEL 42",
    62125:"LEVEL 43",
    66650:"LEVEL 44",
    71390:"LEVEL 45",
    76350:"LEVEL 46",
    81535:"LEVEL 47",
    86950:"LEVEL 48",
    93110:"LEVEL 49",
    100000:"LEVEL 50",
    };
    for(i in editRanks) if (editCount >= parseInt(i)) editRank = editRanks[i];
    //and display the corresponding level as a tag.
    if (editCount) $($("<span>").addClass("tag").html(editRank)).appendTo(".masthead-info hgroup");
}

*/