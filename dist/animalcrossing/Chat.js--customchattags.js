
//<syntaxhighlight lang="javascript">
/**************************************************************************/
//* BBCode parser for Wikia chats as part of the ChatTags script.
//*
//* Copyright 2013 Benjamin Williams <[ Lil' Miss Rarity ]>
//* 
//* Script was created by [[User:AnimatedCartoons]]
//* This version is modified by ! for
//* use on Animal Crossing Wiki
//*
//* Version: N/A
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

//These should never be touched!
chatags.regexp = {
    master: /\[([^\[\]]{1,})\]([^\[\]]{1,})\[\/([^\[\]]{1,})\]/,
    split: /(\[[^\[\]]{1,}\]|\[\/[^\[\]]{1,}\])/g,
    endTag: /\[\/([^\[\]]{1,})\]/,
    beginTagA: /\[(\S{1,})(\s[^\[\]]{1,})\]/,
    beginTagB: /\[([^\[\]]{1,})\]/
};

chatags.bbCode = {
    "acronym": {
        0: {
            "bbFind": /\[\/acronym\]/,
            "bbReplace": "</acronym>"
        },
        1: {
            "bbFind": /\[acronym ([^\[\]\;\\"]{1,})\]/,
            "bbReplace": "<acronym title=\"$1\">"
        }
    },
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
            "bbFind": /\[bg ([^\[\]\;\\"]{1,})\]/,
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
            "bbFind": /\[c ([^\[\]\;\\"]{1,})\]/,
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
    "color": {
        0: {
            "bbFind": /\[\/color\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[color ([^\[\]\;\\"]{1,})\]/,
            "bbReplace": "<span style=\"color: $1;\">"
        }
    },
    "courier": {
        0: {
            "bbFind": /\[\/courier\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[courier\]/,
            "bbReplace": "<span style=\"font-family: courier;\">"
        }
    },
    "font": {
        0: {
            "bbFind": /\[\/font\]/,
            "bbReplace": "</span>"
        },
        1: {
            "bbFind": /\[font ([^\[\]\;\\"]{1,})\]/,
            "bbReplace": "<span style=\"font-family: $1;\">"
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
    "left": {
        0: {
            "bbFind": /\[\/left\]/,
            "bbReplace": "</div>"
        },
        1: {
            "bbFind": /\[left\]/,
            "bbReplace": "<div align=\"left\">"
        }
    },
    "nigger": {
        0: {
            "bbFind": /\/nigger/,
            "bbReplace": ""
        },
    },
    "right": {
        0: {
            "bbFind": /\[\/right\]/,
            "bbReplace": "</div>"
        },
        1: {
            "bbFind": /\[right\]/,
            "bbReplace": "<div align=\"right\">"
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
// </syntaxhighlight>