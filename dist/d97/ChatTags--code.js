/**************************************************************************/
//* BBCode parser for Wikia chats as part of the ChatTags script.
//*
//* Copyright 2013 Benjamin Williams <[ Lil' Miss Rarity ]>
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
/**************************************************************************/
 
var chatags = window.chatags || {};
var imagesEnabled = 0;
 
//These should never be touched!
chatags.regexp = {
    master: /\[([^\[\]]{1,})\]([^\[\]]{1,})\[\/([^\[\]]{1,})\]/,
    split: /(\[[^\[\]]{1,}\]|\[\/[^\[\]]{1,}\])/g,
    endTag: /\[\/([^\[\]]{1,})\]/,
    beginTagA: /\[(\S{1,})(\s[^\[\]]{1,})\]/,
    beginTagB: /\[([^\[\]]{1,})\]/
};

//Image toggler function
/*
function toggleImages() {
    if (imagesEnabled === 0) {
        imagesEnabled = 1;
    }
    else {
        imagesEnabled = 0;
    }
}
*/
 
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
    "bg": {
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
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[big\]/,
            "bbReplace": "<span style=\"font-size: 16pt;\">"
        }
    },
    "c": {
        0: {
            "bbFind": /\[\/c\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[c ([^\[\]\\"]{1,})\]/,
            "bbReplace": "<span style=\"color: $1;\">"
        }
    },
    "code": {
        0: {
            "bbFind": /\[\/code\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[code\]/,
            "bbReplace": "<span style=\"font-family: monospace;\">"
        }
    },
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
    "image": {
        0: {
            "bbFind": /\[\/img\]/,
            "bbReplace": "</img>"
        },
        1: {
            "bbFind": /\[img (http|https):\/\/[a-zA-Z0-9'.\-_.~!*';:@&=+$,\/?%##\s.]{1,}(png|jpg|gif)\]/,
            "bbReplace": "<img src=\"$1\" width="200" height="200">"
        }
    },
    "small": {
        0: {
            "bbFind": /\[\/small\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[small\]/,
            "bbReplace": "<span style=\"font-size: 7pt;\">"
        }
    },
    "sub": {
        0: {
            "bbFind": /\[\/sub\]/,
            "bbReplace": "</sub>"
        },
        1: {
            "bbFind": /\[sub\]/,
            "bbReplace": "<sub>"
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
    "sup": {
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
 
        //Run parser
        string = chatags.parse(string);
 
    $("#Chat_" + roomId + " .message:last").html(string);
});

/*
// Toggling images on or off:
document.getElementById("imageToggler").onclick = toggleImages();

//Appending the button
$('#ChatHeader').append('<form style="display:inline-block;position:absolute;top:7px;right:190px;z-index:9001;"><button id="imageToggler" class="secondary">Toggle images</button></form>');// Hello.
*/