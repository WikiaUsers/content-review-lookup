/* shining-armor.wikia.com/wiki/MediaWiki:ChatTags/code.js */

var chatags = window.chatags || {};
 
chatags.tags = {
    'a':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/a]', '</a>');
                 } else {
                     try {
                         t = t.split(' ');
                         s = s.replace('[a ' + t[1] + ']', '<a href="//' + mw.html.escape(t[1]) + '">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'acronym':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/acronym]', '</acronym>');
                 } else {
                     s = s.replace('[acronym]', '<acronym ');
                 }
                 return s;
             },
    't':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/t]', '">');
                 } else {
                     s = s.replace('[t]', 'title="');
                 }
                 return s;
             },
    'b':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/b]', '</span>');
                 } else {
                     s = s.replace('[b]', '<span style="font-weight:bold;">');
                 }
                 return s;
             },
    'bg':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/bg]', '</span>');
                 } else {
                     try {
                         t = t.split(' ');
                         s = s.replace('[bg ' + t[1] + ']', '<span style="background-color:' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'big':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/big]', '</span>');
                 } else {
                     s = s.replace('[big]', '<span style="font-size:16pt;">');
                 }
                 return s;
             },
    'c':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/c]', '</span>');
                 } else {
                     try {
                         t = t.split(' ');
                         s = s.replace('[c ' + t[1] + ']', '<span style="color:' + mw.html.escape(t[1]) + ' !important;">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'color':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/color]', '</span>');
                 } else {
                     try {
                         t = t.split(' ');
                         s = s.replace('[color ' + t[1] + ']', '<span style="color:' + mw.html.escape(t[1]) + ' !important;;">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'code':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/code]', '</span>');
                 } else {
                     s = s.replace('[code]', '<span style="font-family:monospace;">');
                 }
                 return s;
             },
    'i':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/i]', '</span>');
                 } else {
                     s = s.replace('[i]', '<span style="font-style:italic;">');
                 }
                 return s;
             },
    'left':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/left]', '</div>');
                 } else {
                     s = s.replace('[left]', '<div align="left">');
                 }
                 return s;
             },
    'right':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/right]', '</div>');
                 } else {
                     s = s.replace('[right]', '<div align="right">');
                 }
                 return s;
             },
    's':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/s]', '</span>');
                } else {
                    s = s.replace('[s]', '<span style="text-decoration:line-through;">');
                }
                return s;
            },
    'small': function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/small]', '</span>');
                } else {
                    s = s.replace('[small]', '<span style="font-size:7pt;">');
                }
                return s;
            },
    'sp':  function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sp]', '</div></div></div>');
                } else {
                    s = s.replace('[sp]', '<div style="margin-top:5px"><div style="margin-bottom:2px"> <input class="spoilerbutton" type="button" value="Показать" style="margin:0px;padding:0px 7px;height:initial;" onclick="if (this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display != \'\') { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'\';      this.innerText = \'\'; this.value = \'Скрыть\'; } else { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'none\'; this.innerText = \'\'; this.value = \'Показать\'; }" /></div><div class="alt2" style="border-bottom: 1px dashed grey"><div style="display: none;">');
                }
                return s;
            },
    'spoiler':  function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/spoiler]', '</div></div></div>');
                } else {
                    s = s.replace('[spoiler]', '<div style="margin-top:5px"><div style="margin-bottom:2px"> <input class="spoilerbutton" type="button" value="Показать" style="margin:0px;padding:0px 7px;height:initial;" onclick="if (this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display != \'\') { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'\';      this.innerText = \'\'; this.value = \'Скрыть\'; } else { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'none\'; this.innerText = \'\'; this.value = \'Показать\'; }" /></div><div class="alt2" style="border-bottom: 1px dashed grey"><div style="display: none;">');
                }
                return s;
            },
    'sub':  function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sub]', '</sub>');
                } else {
                    s = s.replace('[sub]', '<sub>');
                }
                return s;
            },
    'sup':  function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sup]', '</sup>');
                } else {
                    s = s.replace('[sup]', '<sup>');
                }
                return s;
            },
    'u':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/u]', '</span>');
                } else {
                    s = s.replace('[u]', '<span style="text-decoration:underline;">');
                }
                return s;
            },
    'sh':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sh]', '</strong>\]</span>');
                } else {
                    s = s.replace('[sh]', '<span class="Shake">\[<strong>');
                }
                return s;
            },
    'shake':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/shake]', '</strong>\]</span>');
                } else {
                    s = s.replace('[shake]', '<span class="Shake">\[<strong>');
                }
                return s;
            },
    'sh1':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sh1]', '</strong></span>');
                } else {
                    s = s.replace('[sh1]', '<span class="Shake1"><strong>');
                }
                return s;
            },
    'shake1':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/shake1]', '</strong></span>');
                } else {
                    s = s.replace('[shake1]', '<span class="Shake1"><strong>');
                }
                return s;
            },
    'span': function(s, t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/span]', '</span>');
                } else {
                    s = s.replace('[span]', '<span class="chattagstyle" ');
                }
                return s;
                }, 
    'style': function(s, t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/style]', '">');
                } else {
                    s = s.replace('[style]', 'style="');
                }
                return s;
                },
/*
*      Медиа
*/
    'img':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[img ' + t[1] + ']', '<img class="chatags-image" src="//' + mw.html.escape(t[1]) + '" />');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'yt':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[yt ' + t[1] + ']', '<iframe width="420" height="236.25" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'youtube':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[youtube ' + t[1] + ']', '<iframe width="420" height="236.25" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
     'vk':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[vk ' + t[1] + ' ' + t[2] + ' ' + t[3] + ']', '<iframe src="//vk.com/video_ext.php?oid=' + mw.html.escape(t[1]) + '&id=' + mw.html.escape(t[2]) + '&hash=' + mw.html.escape(t[3]) + '" width="455.25" height="270" frameborder="0"></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
     'coub':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[coub ' + t[1] + ']', '<iframe src="//coub.com/embed/' + mw.html.escape(t[1]) + '?muted=false&autostart=false&originalSize=false&hideTopBar=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="480" height="270"></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
     'dm':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[dm ' + t[1] + ']', '<iframe frameborder="0" width="480" height="270" src="//www.dailymotion.com/embed/video/' + mw.html.escape(t[1]) + '" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
     'dailymotion':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[dailymotion ' + t[1] + ']', '<iframe frameborder="0" width="480" height="270" src="//www.dailymotion.com/embed/video/' + mw.html.escape(t[1]) + '" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'vimeo':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[vimeo ' + t[1] + ']', '<iframe src="https://player.vimeo.com/video/' + mw.html.escape(t[1]) + '?portrait=0" width="480" height="270" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'vine':   function (s,t) {
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split(' ');
                         s = s.replace('[vine ' + t[1] + ']', '<iframe src="https://vine.co/v/' + mw.html.escape(t[1]) + '/embed/simple" width="390" height="390" frameborder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             }
};
 
chatags.parser = function (s) {
    var t = s.match(/\[([^\[\];]*)\]/g);
    var tg = '';
 
    if (!t) return s;
 
    for (var i = 0; i < t.length; i++) {
        tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];
 
        try {
            tg = tg.split(' ')[0];
        } catch(e) {}
 
        if (typeof chatags.tags[tg] !== 'undefined') {
            s = chatags.tags[tg](s, t[i].replace('[', '').replace(']', ''));
        }
    }
    return s;
};
 
chatags.init = function() {
    if (typeof window.mainRoom !== 'undefined') {
        window.mainRoom.model.chats.bind("afteradd", function(c) {
            var string = $("#Chat_" + roomId + " .message:last").html();
            string = chatags.parser(string);
            $("#Chat_" + roomId + " .message:last").html(string);
        });
    }
};
 
$(document).ready(function() { chatags.init(); });