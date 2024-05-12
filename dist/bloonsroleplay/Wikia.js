/**************************************************************************/
//* BBCode parser for Wikia chats as part of the ChatTags script.
//*
//* Copyright 2013 Benjamin Williams <[ Shining-Armor ]>
//* 
//* Script was created by [[User:AnimatedCartoons]]
//*
//* Version: v0.1.6
//*
//* This program is free software: you can redistribute it and/or modify
//* it under the terms of the GNU General Public License as published by
//* the Free Software Foundation, either version 3 of the License, or
//* (at your option) any later version.
//*
//* This program is distributed in the hope that it will be useful,
//* but WITHOUT ANY WARRANTY; without even the implied warranty of
//* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//* GNU General Public License for more details.
//*                                                                   
//* You should have received a copy of the GNU General Public License 
//* along with this program.  If not, see <http://www.gnu.org/licenses/>.
//*
//* Please keep this notice intact when distributing all or part of this
//* piece of software.
/**************************************************************************/
 
var chatags = window.chatags || {};
 
//These should never be touched!
chatags.regexp = {
    master: /\[([^\[\]]{1,})\]([^\[\]]{1,})\[\/([^\[\]]{1,})\]/,
    split: /(\[[^\[\]]{1,}\]|\[\/[^\[\]]{1,}\])/g,
    endTag: /\[\/([^\[\]]{1,})\]/,
    beginTagA: /\[(\S{1,})(\s[^\[\]]{1,})\]/,
    beginTagB: /\[([^\[\]]{1,})\]/
};
 
chatags.bbCode = {
    "b": {
        0: {
            "bbFind": /\[\/b\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[b\]/,
            "bbReplace": "<span style=\"font-weight: bold;\">"
        }
    },
    /*"bg": {
        0: {
            "bbFind": /\[\/bg\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[bg ([^\[\]\\"]{1,})\]/,
            "bbReplace": "<span style=\"background-color: $1;\">"
        }
    },
    "big": {
        0: {
            "bbFind": /\[\/big\]/,
            "bbReplace": "</big>"
        },
        1: {
            "bbFind": /\[big\]/,
            "bbReplace": "<big>"
        }
    },*/
    "c": {
        0: {
            "bbFind": /\[\/c\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[c ([^\[\]\\"]{1,})\]/,
            "bbReplace": "<span style=\"color: $1;\">"
        }
    },/*
    "ɔ": {
        0: {
            "bbFind": /\[\/ɔ\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[ɔ\]/,
            "bbReplace": "<span style=\"font-variant:small-caps;\">"
        }
    },
  */"code": {
        0: {
            "bbFind": /\[\/code\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[code\]/,
            "bbReplace": "<span style=\"font-family: monospace;\">"
        }
    },
    "font": {
        0: {
            "bbFind": /\[\/font\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[font ([^\[\]\\"]{1,})\]/,
            "bbReplace": "<span style=\"font-family: \'$1\';\">"
        }
    },
    /*"fl": {
        0: {
            "bbFind": /\[\/fl\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[fl\]/,
            "bbReplace": "<span class=\"fakelink\">"
        }
    }, */
    "i": {
        0: {
            "bbFind": /\[\/i\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[i\]/,
            "bbReplace": "<span style=\"font-style: italic;\">"
        }
    },
    "o": {
        0: {
            "bbFind": /\[\/o\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[o\]/,
            "bbReplace": "<span style=\"text-decoration: overline;\">"
        }
    },
    /*"small": {
        0: {
            "bbFind": /\[\/small\]/,
            "bbReplace": "</small>"
        },
        1: {
            "bbFind": /\[small\]/,
            "bbReplace": "<small>"
        }
    },*/
    "sub": {
        0: {
            "bbFind": /\[\/sub\]/,
            "bbReplace": "</sub>"
        },
        1: {
            "bbFind": /\[sub\]/,
            "bbReplace": "<sub style=\"vertical-align:-50%;\">"
        }
    },
    "s": {
        0: {
            "bbFind": /\[\/s\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[s\]/,
            "bbReplace": "<span style=\"text-decoration: line-through;\">"
        }
    },
  /*"sp": {
        0: {
            "bbFind": /\[\/sp\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[sp\]/,
            "bbReplace": "<input type=\"button\" class=\"button\" value=\"Show Spoiler\"/><span class=\"spoiler\">"
        }
    },
  */"sup": {
        0: {
            "bbFind": /\[\/sup\]/,
            "bbReplace": "</sup>"
        },
        1: {
            "bbFind": /\[sup\]/,
            "bbReplace": "<sup>"
        }
    },
    "u": {
        0: {
            "bbFind": /\[\/u\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[u\]/,
            "bbReplace": "<span style=\"text-decoration: underline;\">"
        }
    }
};
 
 
chatags.parse = function(string) {
 
    if (string.match(chatags.regexp.master)) {
 
        var matches = string.match(chatags.regexp.split);
        var keys = [];
        var vals = [];
 
        //Populates keys and vals with data about the bbcode
        for (var i = 0; i < matches.length; i++) {
 
            var match = matches[i];
 
            if (match.indexOf("/") == 1) {
 
                match = match.replace(chatags.regexp.endTag, "$1");
 
                keys.push(match);
                vals.push(0);
            } else if (match.indexOf("/") == -1) {
 
                if (match.indexOf(" ") > -1) {
 
                    match = match.replace(chatags.regexp.beginTagA, "$1");
                } else {
 
                    match = match.replace(chatags.regexp.beginTagB, "$1");
                }
 
                keys.push(match);
                vals.push(1);
            } else {
 
                continue;
            }
        }
 
        for (var i = 0; i < keys.length; i++) {
 
 
            if (typeof chatags.bbCode[keys[i]] === "undefined") {
 
                continue;
            } else {
 
                var f = chatags.bbCode[keys[i]][vals[i]]["bbFind"];
                var r = chatags.bbCode[keys[i]][vals[i]]["bbReplace"];
 
                string = string.replace(f, r);
            }
        }
    }
 
    return string;
};
 
//Run parser on new message
mainRoom.model.chats.bind("afteradd", function(c) {

    var string = $("#Chat_" + roomId + " .message:last").html();
 
        string = chatags.parse(string);
 
    $("#Chat_" + roomId + " .message:last").html(string);
});
//Spoiler Things
$('input.button').click(function () {

    $(this).next('span.spoiler').fadeToggle(100);

    $(this).attr('value', $(this).attr('value') == "Show Spoiler" ? "Hide Spoiler" : "Show Spoiler");

});