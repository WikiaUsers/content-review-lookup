/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
            link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        imagecontrol: {
            u: 'imagecontrol',
            link: 'Special:ListUsers/imagecontrol'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        },
        commentcontrol: 'Comment Control',
        best: 'Best Contributor',
        wikicouncil: 'Wiki Council',
        helper: 'Wiki Helper'
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};

UserTagsJS.modules.custom = {
    'UmbreonBot': ['bot'],
    'WolfyBot': ['bot'],
    'GoldenMayBot': ['bot'],
    'SeraphinaTheWolf': ['bot'],
    'PurplePuppyLove': ['wikicouncil'],
    'DarknessDragon': ['wikicouncil'],
    'Kittiekittiemeowmeow': ['best'],
    'WolfLinkZelda': ['commentcontrol'],
    'Blossom Powerpuff': ['wikicouncil']
};

/*Locking old blogs*/
window.LockOldBlogs = {
    expiryDays: 14,
    expiryMessage: 'This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days. There is no need to comment here.',
    nonexpiryCategory: 'Never archived blogs'
};

//Custom Edit buttons- Credit to the Club Penguin Wiki
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Youtube_icon.svg/23px-Youtube_icon.svg.png",
        "speedTip": "Embed a YouTube Video",
        "tagOpen": "<nowiki><nowiki><nowiki><nowiki><nowiki><nowiki><youtube>",
        "tagClose": "</youtube></nowiki></nowiki></nowiki></nowiki></nowiki></nowiki>",
        "sampleText": "Video ID"
    };


    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
        "speedTip": "Strike",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Strike-through text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAAAXNSR0IArs4c6QAAAk9QTFRFAAAAgAAAAIAAgIAAAACAgACAAICAwMDAwNzApsrwAAAAQ1l4SGB7a3uQdYijhpixkKO9k6bAl6rEmq3HnrHLo7bQqLvVrb/YsMPds8bgus3nvc/owdTuxNjzydz20uT91+f+////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTECL3QDwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCQccCQrY7AcAAACHSURBVCjPfchZDsMgEATR+jfOhldsSLj/JdNJjIRHKE+IHhW5qSe/Whz52dKRU4Jk/ekxQrTU9x12S33bYLPUQ4Bgqa8rrJb6ssBiqc8zzJb6NMFUlEt9HGEsyqk+DMBwKKe6954TBa/+kFP/BPV7Tfm76rca/Fb9WuNY9UuLo3ddVz194vo3NB0oZdoKj8sAAAAASUVORK5CYII=",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/clubpenguin/images/3/31/HighlightButton.png",
        "speedTip": "Highlight",
        "tagOpen": "<span style='background:yellow'>",
        "tagClose": "</span>",
        "sampleText": "Highlighted text here."
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/5/56/Button_big.png",
        "speedTip": "Large Text",
        "tagOpen": "<big>",
        "tagClose": "</big>",
        "sampleText": "Insert Text Here"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/5/58/Button_small.png",
        "speedTip": "Small Text",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Insert Text Here"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_underline.png",
        "speedTip": "<u>Underline Selected Text</u>",
        "tagOpen": "<u> ",
        "tagClose": " </u>",
        "sampleText": "Insert text to underline!"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCBEoGHtVh6UAAAAMaVRYdENvbW1lbnQAAAAAALyuspkAAAIYSURBVDjLtVW7ihRBFD13uvYxa2hmICIo4scIJgqCoOAPmAhGfoEYGGxiIisL/oCIoIEiGGhiZKDsKLg7jbrs4AxOd92HQVXPw77twqKVnOCcunWq7rkUmZnhP6w797YQBvuAmYGIXARwJO7j7jeEKI3xLjwaFytFr65qTKsai3j71k3cuHYFg8GgxTW4/eghrl+9jGdPn7gaM0MwSoct4mDnE0YHBxiPfyYvjmZv9yvK4R7KctihIQRmbXcj31DFIKJuw5oYqPoaMkNgjm6jAECUIcJuw8w0FxdXQ0QIIgwygxHN0LJ1ZYbEeombaVTzDdTXGBBULZ+GGc6dG1iXuQY139AMrgYwhLqOnW9elkMUYcV988lkkgyIIEZ2FIQgIl21sXn/7qGTmBrarkGE9OZd1s+eO4+NjWNu0S+fd7D/43t6c7cGchRzNmeYrV+4eAknT51e5jJubz3Am9cvoWpg0ZZGU/Ho7QUAMDNijC2OAGhOi6j4GjOEyJxanto8RwDCAo6xzRHBNMdV1NeAEIS5wzcgqnn62ndrhk3/oslp+WPjLAmak9DeOM+5uRoiQmARENJUNti4FxGIyBLX4Hz81deYITSNWVxFEVJWewRRcWPW6xVZW3RoCLT5+EXrm2NmqAhW19Y6h8dMUU0rrPf7Lv/81TuE0WjcWeDXNB46oVXt719dLxDevv/wzz/nlX7AmRPH8RuTxxRrcgmtcAAAAABJRU5ErkJggg==",
        "speedTip": "History table",
        "tagOpen": "{|class=\"wikitable sortable\"\n! scope=\"col\"| Catalog\n! scope=\"col\"| Available from\n! scope=\"col\"| Available until\n|-\n|catalog goes here\n|starting date\n|ending date\n|}",
    };
}

// ***************
// Chat appearance
// ***************

// Change chat description
if ($('section.ChatModule').length > 0) {
    $.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result) {
        if ($('p.chat-name').length > 0) {
            $('p.chat-name').html(result);
        } else {
            var chatDescInt = setInterval(function() {
                if ($('p.chat-name').length > 0) {
                    $('p.chat-name').html(result);
                    clearInterval(chatDescInt);
                }
            }, 50);
        }
    });
}

// *** Custom user rights icons on userpages ***
if ({
        'User': 1,
        'User_blog': 1,
        'User_talk': 1
    } [mw.config.get('wgCanonicalNamespace')] || mw.config.get('wgPageName').indexOf('Special:Contributions') !== -1) {
    importScript('MediaWiki:Common.js/userRightsIcons.js');
}

// Auto-insert link from anchor on [[Help:Red links]]
// Please report anything that still doesn't work right, it may need more exceptions
$(function() {
    var redlink = window.location.hash;
    if (mw.config.get('wgPageName') === 'Help:Red_links' && redlink !== '') {
        redlink = redlink.slice(1);
        if (redlink.charAt(0) === ':') {
            redlink = redlink.substring(1);
        }
        if (redlink.substr(0, 5) !== 'File:') {
            redlink = redlink.replace(/\./g, '%');
        } else {
            var head = redlink.substring(0, redlink.lastIndexOf('.'));
            var tail = redlink.substring(redlink.lastIndexOf('.'));
            redlink = head.replace(/\./g, '%') + tail;
        }
        $("#insertredlink a").attr("href", "/wiki/" + decodeURIComponent(redlink) + "?action=history");
        $("#insertredlink a").css("font-weight", "bold");
    }
});

// Automatically uncheck "Leave a redirect behind" on files
if (mw.config.get('wgPageName').indexOf('Special:MovePage/File:') !== -1) {
    $('input#wpLeaveRedirect').removeAttr('checked');
}

// Support for multicolumn TOCs
// Usage: <div class="toc-multicol">__TOC__</div>
//needs updating whenever Wikia gets around to fixing the new TOC at least partially
//  changing all #toc ul to #toc ol doesn't quite work
$(window).load(function() {
    if ($(".toc-multicol #toc").size() !== 0) {
        $(function() {
            var x, tdToAppend, listToAppend, showtext = 'show',
                hidetext = 'hide';
            $("#toc").css("width", "100%"); //need to subtract 12px from this for padding for some reason
            $("#toc ul").html("<table><tr><td>" + $("#toc ul").html() + "</td></tr></table>");
            var liList = $("#toc ul li").toArray();

            $('table#toc ul').remove();
            if (liList.length % 3 === 0) {
                x = 0;
            } else {
                x = 3 - (liList.length % 3);
            }
            var perCol = (liList.length + x) / 3;

            for (var colNum = 0; colNum < 3; colNum++) {
                listToAppend = "";
                for (var i = 0 + (colNum * perCol); i < (perCol * (colNum + 1)); i++) {
                    if (typeof(liList[i]) == "undefined") {
                        break;
                    }
                    tempElement = document.createElement("div");
                    tempElement.appendChild(liList[i]);
                    listToAppend += tempElement.innerHTML;
                }
                tdToAppend += '<td style="vertical-align: top; width: 33%;"><ul><table><tbody><tr><td><table><tbody><tr><td><table><tbody><tr><td>' + listToAppend + '</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></ul></td>';
            }

            $('#toc tbody').append('<tr>' + tdToAppend + '</tr>');
            $('#toc tbody tr:eq(0) td').attr("colspan", "3");
            var indentFactor = 10;
            $("head").append("<style>.toclevel-1{padding-left: " + (indentFactor * 1) + "px !important}.toclevel-2{padding-left: " + (indentFactor * 2) + "px !important}.toclevel-3{padding-left: " + (indentFactor * 3) + "px !important}.toclevel-4{padding-left: " + (indentFactor * 4) + "px !important}</style>");
            $("#togglelink").off("click").click(function(e) {
                e.preventDefault();
                $('#toc ul').slideToggle("fast");
                if ($(this).text() === showtext) {
                    $(this).text(hidetext);
                } else {
                    $(this).text(showtext);
                }
            });
            if (!$('#toc ul').is(':hidden') && $('#togglelink').text() === showtext) {
                $('#togglelink').text(hidetext);
            }
        });
    }
});

// Alert contributors when they are editing with their bot flag set
if ((mediaWiki.config.get("wgAction") === "edit" || mediaWiki.config.get("wgAction") === "submit") && mediaWiki.config.get("wgUserGroups").indexOf("bot") !== -1) {
    $("#EditPageHeader").after('<div id="botWarning" style="background-color: red; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set.</div>');
}

//Add a "view source" button when the Edit button goes to Special:SignUp
$(function() {
    var $a = $('a[data-id="edit"]');
    if ($a.length && $a.attr('href').indexOf('Special:SignUp') !== -1) {
        $a.parent().children('ul.WikiaMenuElement').prepend(
            '<li><a href="/wiki/' + mw.config.get('wgPageName') +
            '?action=edit">View source</a></li>'
        );
    }
});

//Fix lazy-loaded tabbified profile images
if ($("div.profile-image img.lzyPlcHld").length > 0) {
    $("div.profile-image img.lzyPlcHld").each(function() {
        $(this).attr("src", $(this).attr("data-src"));
    });
}

// Support for [[Template:Emote]] by Bobogoobo
if ($('.emote-template').length || $('#WikiaArticleComments').length) {
    $(function() {
        function emotify($this) {
            var emote = $this.text();
            var url = emotes.match(
                new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' +
                    emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + //escape specials, from MDN
                    ')', 'i'));
            if (url) {
                url = url[1];
                $this.html($('<img />', {
                    'src': url,
                    'alt': emote
                }));
            }
        }

        var emotes = '';
        $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' +
            '&rvprop=content&format=json',
            function(data) {
                emotes = data.query.pages['28113'].revisions[0]['*'];
                // 28113 is the wgArticleId of MediaWiki:Emoticons

                $('.emote-template').each(function() {
                    emotify($(this));
                });
            });

        $('#WikiaArticleFooter').on('DOMNodeInserted', function() {
            if ($('.emote-template').length === $('.emote-template img').length) {
                return;
            }

            $('#WikiaArticleFooter .emote-template').each(function() {
                if (!($(this).children('img').length)) {
                    emotify($(this));
                }
            });
        });
    });
}