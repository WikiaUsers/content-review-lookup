var chatags = typeof chatags !== 'undefined' ? chatags : {};
 
chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : true;
chatags.youtube = typeof chatags.youtube !== 'undefined' ? chatags.youtube : true;
chatags.vk = typeof chatags.vk !== 'undefined' ? chatags.vk : true;
chatags.coub = typeof chatags.coub !== 'undefined' ? chatags.coub : true;
chatags.dailymotion = typeof chatags.dailymotion !== 'undefined' ? chatags.dailymotion : true;
chatags.vimeo = typeof chatags.vimeo !== 'undefined' ? chatags.vimeo : true;
chatags.vine = typeof chatags.vine !== 'undefined' ? chatags.vine : true;
 
chatags.tags = {
    'a':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/a]', '</a>');
                 } else {
                     try {
                         t = t.split(' ');
                         s = s.replace('[a="' + t[1] + '"]', '<a href="//' + mw.html.escape(t[1]) + '">');
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
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[bg="' + t[1] + '"]', '<span style="background-color:' + mw.html.escape(t[1]) + ' !important;">');
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
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[c="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ' !important;">');
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
                         s = s.replace('[color="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ' !important;">');
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
    'font':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/font]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[font="' + t[1] + '"]', '<span style="font-family:' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
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
    'sp1':  function (s,t) {
            if (t.charAt(0) === '/') {
                s = s.replace('[/sp1]', '</div></div>');
            } else {
                s = s.replace('[sp1]', '<div class="chatSpoiler"><div class="header" onclick="if($(this).next().is(\':hidden\')){$(this).next().fadeIn(200);}else{$(this).next().fadeOut(200);}">Показать</div><div class="content">');
            }
            return s;
        },
    'spoiler1':  function (s,t) {
            if (t.charAt(0) === '/') {
                s = s.replace('[/spoiler1]', '</div></div>');
            } else {
                s = s.replace('[spoiler1]', '<div class="chatSpoiler"><div class="header" onclick="if($(this).next().is(\':hidden\')){$(this).next().fadeIn(200);}else{$(this).next().fadeOut(200);}">Показать</div><div class="content">');
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
                 if (chatags.images !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[img="' + t[1] + '"]', '<img class="chatags-image" src="http://' + mw.html.escape(t[1]) + '" />');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'yt':   function (s,t) {
                 if (chatags.youtube !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[yt="' + t[1] + '"]', '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'youtube':   function (s,t) {
                 if (chatags.youtube !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[youtube="' + t[1] + '"]', '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
     'vk':   function (s,t) {
                 if (chatags.vk !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         t[2] = t[2].replace('"', '');
                         t[3] = t[3].replace('"', '');
                         s = s.replace('[vk="' + t[1] + '"="' + t[2] + '"="' + t[3] + '"]', '<iframe src="//vk.com/video_ext.php?oid=' + mw.html.escape(t[1]) + '&id=' + mw.html.escape(t[2]) + '&hash=' + mw.html.escape(t[3]) + '" width="455.25" height="270" frameborder="0" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
     'coub':   function (s,t) {
                 if (chatags.coub !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[coub="' + t[1] + '"]', '<iframe src="//coub.com/embed/' + mw.html.escape(t[1]) + '?muted=false&autostart=false&originalSize=false&hideTopBar=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="480" height="270"></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
     'dm':   function (s,t) {
                 if (chatags.dailymotion !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[dm="' + t[1] + '"]', '<iframe frameborder="0" width="480" height="270" src="//www.dailymotion.com/embed/video/' + mw.html.escape(t[1]) + '" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
     'dailymotion':   function (s,t) {
                 if (chatags.dailymotion !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[dailymotion="' + t[1] + '"]', '<iframe frameborder="0" width="480" height="270" src="//www.dailymotion.com/embed/video/' + mw.html.escape(t[1]) + '" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'vimeo':   function (s,t) {
                 if (chatags.vimeo !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[vimeo="' + t[1] + '"]', '<iframe src="https://player.vimeo.com/video/' + mw.html.escape(t[1]) + '?portrait=0" width="480" height="270" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'vine':   function (s,t) {
                 if (chatags.vine !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[vine="' + t[1] + '"]', '<iframe src="https://vine.co/v/' + mw.html.escape(t[1]) + '/embed/simple" width="390" height="390" frameborder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             }
};
 
chatags.parser = function (s) {
    var t = s.match(/\[([^\[\];]*)\]/g);
    var tg = '';
    var TAG_LIMIT = 50;
 
    if (!t) return s;
 
    t = t.slice(0, TAG_LIMIT);
 
    for (var i = 0; i < t.length; i++) {
        tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];
 
        try {
            tg = tg.split('="')[0];
        } catch(e) { console.log(e) }
 
        if (typeof chatags.tags[tg] !== 'undefined') {
            s = chatags.tags[tg](s, t[i].replace('[', '').replace(']', ''));
        }
    }
    return s;
};
 
chatags.init = function() {
    if (typeof window.mainRoom !== 'undefined') {
        $('head').append('<style>' + chatags.css + '</style>');
 
        window.mainRoom.model.chats.bind("afteradd", function(c) {
            if (typeof window.mainRoom.roomId === "undefined")
                return;
            var string = $("#Chat_" + window.mainRoom.roomId + " .message:last").html();
 
            string = chatags.parser(string);
            $("#Chat_" + window.mainRoom.roomId + " .message:last").html(string);
        });
    }
};
 
$(document).ready(function() {
    chatags.init();
 });