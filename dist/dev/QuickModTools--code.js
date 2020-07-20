/*
======================================================================================================================
    this script provides quicker kick and ban tools
======================================================================================================================
    hold ctrl and context menu on a message by a given user to activate
======================================================================================================================
    for more info and credits, visit https://dev.wikia.com/wiki/QuickModTools
======================================================================================================================
*/

// Used files: [[File:QuickModTools alert.gif]]

(function () {
if (
    !$(document.body).hasClass("chatmoderator") ||
    window.QuickModToolsLoaded
) {
    return;
}
window.QuickModToolsLoaded = true;

/* ================================================== *\
    # create objects
\* ================================================== */

QuickModTools = typeof QuickModTools !== "undefined" ? QuickModTools : {};
QuickModTools.quickreasons = $.isArray(QuickModTools.quickreasons) ? QuickModTools.quickreasons : []; // quick reasons
QuickModTools.defbanlength = typeof QuickModTools.defbanlength !== "undefined" ? QuickModTools.defbanlength : 259200; // default ban length
QuickModTools.storage = ""; // user referred to
QuickModTools.fn = typeof QuickModTools.fn !== "undefined" ? QuickModTools.fn : {};
if (typeof QuickModTools.defbanreason !== "string") {
    QuickModTools.defbanreason = new XMLHttpRequest();
    QuickModTools.defbanreason.toString = function() {
        return "Banned using QuickModTools";
    };
    QuickModTools.defbanreason.open("GET", "/wiki/MediaWiki:Chat-log-reason-banadd?action=render&cb=" + new Date().getTime(), true);
    QuickModTools.defbanreason.onload = function() {
        QuickModTools.defbanreason = $(this.responseText).text().trim();
    };
    QuickModTools.defbanreason.send();
}

/* ================================================== *\
    # functions
\* ================================================== */
QuickModTools.fn.kick = function() {
    // kick user
    mainRoom.kick({
        name: QuickModTools.storage
    });
};
QuickModTools.fn.ban = function(time, reason) {
    QuickModTools.fn.closeMenu();
    var a = new models.BanCommand({
        userToBan: QuickModTools.storage,
        time: time,
        reason: reason
    });
    mainRoom.socket.send(a.xport());
    $('#specialmodmodule input[type="text"]').val("");
};
QuickModTools.fn.openMenu = function(user) {
    $("#specialmodmodule .name").html(user);
    QuickModTools.storage = user;
    $("#specialmodmodule").show();
};
QuickModTools.fn.closeMenu = function() {
    $("#specialmodmodule").hide();
};

QuickModTools.fn.time = function(s) {
    var sl = s.toString().toLowerCase(),
        time = {},
        i18n = {
            second: 1,
            minute: 60,
            hour: 3600,
            day: 86400,
            week: 604800,
            month: 2592000,
            year: 31536000
        },
        m = sl.match(/\d+ (second|minute|hour|day|week|month|year)/g);
    if (m === null && /infinity|infinite|indefinite|forever/i.test(sl)) {
        return 31536000000;
    } else if ($.isArray(m)) {
        // found match(es)
        for (var i in m) {
            var a = m[i].split(" ");
            time[a[1]] = Number(a[0]) * i18n[a[1]];
        }
        var timeCount = 0;
        for (var i in time) {
            timeCount += time[i];
        }
        if (timeCount === 0) {
            return QuickModTools.defbanlength; // equal to 0 seconds
        } else {
            return timeCount;
        }
    } else {
        // no matches found - use default time
        return QuickModTools.defbanlength;
    }
};

QuickModTools.fn.glitchPatrol = function(data) {
    if (data.text.search(/[\u0300-\u036f]/) > -1 && data.name !== wgUserName) {
        // contains glitchy text
        var node = $("#Chat_" + mainRoom.roomId + " li:last"),
            firstNotContinued = QuickModTools.fn.firstNotContinued(node);
        if (!$(firstNotContinued).hasClass("quick-mod-tools-glitchy")) {
            var img = $('<img />').attr({
                    height: "12",
                    src: "https://vignette.wikia.nocookie.net/dev/images/c/c7/QuickModTools_alert.gif",
                    title: "Notice! This message contains \"glitchy text\". Characters of this sort are usually posted for spamming."
                }).css({
                    cursor: "help"
                });
            $(firstNotContinued).addClass("quick-mod-tools-glitchy").find(".username").append(img);
        }
    }
};

QuickModTools.fn.firstNotContinued = function(node) {
    if ($(node).hasClass("continued")) {
        return $(node).prevAll("li:not(.continued):first");
    } else {
        return $(node);
    }
};


/* ================================================== *\
    # events and markup modifiers
\* ================================================== */

// on right click - open module if right click && ctrl && user != mod
$("#WikiaPage").on("contextmenu", function(e) {
    if (e.ctrlKey) {
        var msg = false;
        if (typeof $(e.target).attr("data-user") === "string" && $(e.target).parents().eq(1).hasClass("Chat")) {
            // target is the 'li' element itself
            msg = $(e.target);
        } else if ($(e.target).parents(".Chat > ul > [data-user]").length === 1) {
            // a child/descendant of a message
            msg = $(e.target).parents(".Chat > ul > [data-user]");
        }
        if (msg) {
            e.preventDefault();
            QuickModTools.fn.openMenu($(msg).attr("data-user"));
        }
    }
});

// when a new messge is sent - check for "glitchy characters"
// note! consider only applying on the non-continue message and not applying multiple times
QuickModTools.glitchyBind = function(message) {
    var data = JSON.parse(message.data).attrs;
    QuickModTools.fn.glitchPatrol(data);
};
mainRoom.socket.bind('chat:add', QuickModTools.glitchyBind);

// get the default ban module, and once loaded, update the quick tools interface
$.getJSON(window.wgScript + "?action=ajax&rs=ChatAjax&method=BanModal", function(data) {
    var a = data.template.split('<select name=\"expires\">')[1].split("</select>")[0].replace(/<\/option>/g, "</option>\n").replace(/<option value=\'/g, '\t\t<li class="specialmodmodule-ban-li specialmodmodule-label" data-ban="').replace(/\'>/g, "\">").replace(/<\/option>/g, "</li>"),
        b = '<div id="specialmodmodule">\n' +
            '\t<p>User inspected:<br />&nbsp;<span class="name" style="font-family: monotype, arial, sans, sans serif, serif; color: #cc0000;"></span></p>\n' +
            '\t<p>Kicks:</p>\n' +
            '\t<ul id="specialmodmodule-kick">\n' +
                '\t\t<li class="specialmodmodule-label">Kick</li>\n' +
            '\t</ul>\n' +
            '\t<p>Bans:</p>\n' +
            '\t<ul id="specialmodmodule-ban">\n' +
                '\t\t<li id="specialmodmodule-ban-open" class="specialmodmodule-ban-li specialmodmodule-label">Open module</li>' +
                '\t\t<li id="specialmodmodule-ban-time" class="specialmodmodule-dontclose specialmodmodule-textbox"><input type="text" placeholder="Custom length" title="A custom length for the ban" /></li>\n' +
                '\t\t<li id="specialmodmodule-ban-reason" class="specialmodmodule-dontclose specialmodmodule-textbox"><input type="text" placeholder="Custom reason" title="A custom summary for the ban" /></li>\n' +
                a + "\n" +
            '\t</ul>\n' +
        '</div>';
    $("body").prepend(b);
    // check for custom quick reasons. if none exist, use the default
    if (QuickModTools.quickreasons.length > 0) {
        var quickreasons = '';
        for (var i in QuickModTools.quickreasons) {
            quickreasons += '\n\t<li>' + QuickModTools.quickreasons[i] + '</li>';
        }
        $("body").append('<ul id="specialmodmodule-quickreason">' + quickreasons + '\n</ul>');
    } else {
        $("body").append(
            '<ul id="specialmodmodule-quickreason">\n' +
                '\t<li>Misbehaving in chat</li>\n' +
                '\t<li>Spamming/Distrupting chat</li>\n' +
                '\t<li>Trolling/Harassment</li>\n' +
                '\t<li>Sockpuppet</li>\n' +
            '</ul>'
        );
    }
    // kick button
    $("#specialmodmodule ul#specialmodmodule-kick > li").click(function() {
        QuickModTools.fn.kick();
    });
    // buttons for not closing the menu
    $("#specialmodmodule li:not(.specialmodmodule-dontclose)").click(function() {
        QuickModTools.fn.closeMenu();
    });
    // reveal quick reasons list
    $("#specialmodmodule-ban [data-ban]").mouseover(function() {
        $("#specialmodmodule-quickreason").appendTo(this);
    });
    // banning via the lists
    $("#specialmodmodule .specialmodmodule-ban-li").click(function(e) {
        if (typeof $(this).attr("data-ban") == "undefined") {
            mainRoom.ban({
                name: QuickModTools.storage
            });
        } else {
            QuickModTools.fn.ban(
                $(this).attr("data-ban"),
                e.target.parentNode.id == "specialmodmodule-quickreason" ?
                    e.target.innerText : // quick reason
                    ( // reason from input
                        $("#specialmodmodule-ban-reason input").val().length === 0 ?
                        $("#specialmodmodule-ban-reason input").attr("placeholder") : // valid input
                        $("#specialmodmodule-ban-reason input").val() // invalid input - use default message
                    )
            );
        }
    });
    // close interface when pressing the chat's main area
    $("section#WikiaPage").mousedown(function() {
        QuickModTools.fn.closeMenu();
    });
    // custom ban length textbox
    $("#specialmodmodule-ban-time input").keydown(function(e) {
        if (e.keyCode == 13) {
            QuickModTools.fn.ban(
                QuickModTools.fn.time(!$(this).val() ? QuickModTools.defbanlength : $(this).val()),
                $("#specialmodmodule-ban-reason input").val().length > 0 ? $$("#specialmodmodule-ban-reason input").val() : QuickModTools.defbanreason
            );
        } else if (e.keyCode == 9) {
            // jump to reason textbox on tab
            $(this).parent().next().find("input").select();
        }
    });
    // custom ban reason textbox
    $("#specialmodmodule-ban-reason input").keydown(function(e) {
        if (e.keyCode == 13) {
            QuickModTools.fn.ban(
                QuickModTools.fn.time(!$("#specialmodmodule-ban-time input").val() ? QuickModTools.defbanlength : $("#specialmodmodule-ban-time input").val()),
                $(this).val().length > 0 ? $(this).val() : QuickModTools.defbanreason
            );
        }
    });
});

/* ================================================== *\
    # css
\* ================================================== */
importArticle({
    type: 'style',
    article: 'u:dev:MediaWiki:QuickModTools.css'
});

})();