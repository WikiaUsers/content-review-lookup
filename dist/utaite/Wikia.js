// <nowiki>

//-----------------------------------------------------------------------------
//discord chat
//-----------------------------------------------------------------------------
$(function() {
    $('#WikiaRailWrapper').ready(
        function() {
            $('#WikiaRailWrapper').append("<iframe src='https://discordapp.com/widget?id=501976903851180044&theme=light' width='300' height='500' allowtransparency='true' frameborder='0'></iframe>");
        }

    );
});

//-----------------------------------------------------------------------------
//get content of the [[tutorial]] page
//-----------------------------------------------------------------------------
var tutorial;
$(function gettutorial() {
    $.ajax({
        url: 'https://utaite.fandom.com/wiki/Utaite_Wiki:Tutorial',
        success: function(html) {
            tutorial = '<div class="tutorialloader">' + $(html).find('#mw-content-text').html().replace(new RegExp("<a href=", "g"), "<a target=\"_blank\" href=").replace(new RegExp("<a target=\"_blank\" href=\"#", "g"), "<a href=\"#") + '</div>';
        }
    });
});

//-----------------------------------------------------------------------------
// Loads the current source of the page "pagename" (as stored in the database)
// and inserts it at the cursor position
//-----------------------------------------------------------------------------
var startPos;
var endPos;
 
function doPreload(pagename) {
    var loader = new ContentLoader();
    loader.callback = onPreloadArrival;
    loader.send('/index.php?title=' + pagename + '&action=raw&ctype=text/plain');
}
 
function insertAtCursor(myValue) {
    //IE support
    if (document.selection) {
        $textarea.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    } else if ($textarea.prop("selectionStart") === $textarea.val().length && startPos) {
        $textarea.val($textarea.val().substring(0, startPos) +
            myValue +
            $textarea.val().substring(endPos, $textarea.val().length));
    }
    //MOZILLA/NETSCAPE support
    else if ($textarea.prop("selectionStart") || $textarea.prop("selectionStart") == '0') {
        startPos = $textarea.prop("selectionStart");
        endPos = $textarea.prop("selectionEnd");
        $textarea.val($textarea.val().substring(0, startPos) +
            myValue +
            $textarea.val().substring(endPos, $textarea.val().length));
    } else {
        $textarea.val($textarea.val() + myValue);
    }
    //update textarea overlay on insert of templates
    updateTips();
}

//-----------------------------------------------------------------------------
//link to converter in editor, format, and video-> tutorial
//thanks to UltimateSupreme with helping to put it for visual editors as well w:c:Thread:608344
//-----------------------------------------------------------------------------
function addfeatures() {
    icon = "<a style='display:block; color:#000000' href='https://image.online-convert.com/convert-to-png?quality=10' target='_blank' title='Convert Photo'><div><div style='position:absolute; top:4px; width:45px; right:2px'><img src='https://images.wikia.nocookie.net/nicodougasingers/images/6/68/Converter_sprite.png'/></div><span class='cke_label' style='position:absolute; bottom:0px; text-align:center; width:45px; font-size:80%'>Convert</span></div></a><a id='formatter' style='display:block; color:#000000' title='Format Playlist'><div><div style='position:absolute; top:4px; width:45px; right:2px'><img src='https://vignette.wikia.nocookie.net/nicodougasingers/images/e/e3/Formatter_sprite.png/revision/latest?cb=20161215153534'/></div><span class='cke_label' style='position:absolute; bottom:0px; text-align:center; width:45px; font-size:80%'>Format</span></div></a><a class='tutorialicon' style='display:block; color:#000000' title='Load Tutorial'><div><div style='position:absolute; top:4px; width:45px;'><img src='https://vignette.wikia.nocookie.net/nicodougasingers/images/d/df/Tutorial.png/revision/latest?cb=20170411175309'/></div><span class='cke_label' style='position:absolute; bottom:0px; text-align:center; width:45px; font-size:80%'>Tutorial</span></div></a><div id='formatcontent'></div>";
    $('.cke_button.RTEImageButton.cke_button_big').append(icon);
}

//-----------------------------------------------------------------------------
//Custom YT & TM player
//-----------------------------------------------------------------------------
$(function loader() {
    if (document.querySelector('.ytvideo') !== null) {
        load(".ytvideo",
            "<div style='width: 300px; overflow: hidden; height: 200px; margin-top: 5px; margin-bottom: 5px; margin-right: 5px; position:relative; top:0; border: 3px solid #0f0f0f; border-radius:10px'><iframe width='300' height='200' src='https://www.youtube.com/embed/",
            "?version=3&hl=en_US&theme=dark&color=white&loop=1&showinfo=0&autohide=0&disablekb=1&autoplay=0' frameborder='0' allowfullscreen=0></iframe></div>");
    }
    if (document.querySelector('.ytsample') !== null) {
        load(".ytsample",
            "<div style='width: 202px; overflow: hidden; height: 21px; margin-top: 5px; margin-bottom: 5px; margin-right: 5px; position:relative; top:0; border: 3px solid #0f0f0f; border-radius:10px'><iframe width='202px' height='21' src='https://www.youtube.com/embed/",
            "?version=3&hl=en_US&theme=dark&color=white&loop=1&showinfo=0&autohide=0&disablekb=1&autoplay=0' frameborder='0' allowfullscreen=0></iframe></div>");
    }
    if (document.querySelector('.tmsample') !== null) {
        load(".tmsample",
            "<source lang='html4strict'><div style='height:21px; width:202px; overflow:hidden; margin-top: 5px; margin-bottom: 5px; margin-right: 5px; background:#000000; border: 3px solid #0f0f0f; border-radius:10px'><audio controls='controls' style='width:202px'><source src='https://",
            "' type='audio/mp3'/></audio></div></source>");
    }
});

function load(sample, template1, template2) {
    $(sample).first().ready(function() {
        var id = document.querySelector(sample).title;
        $(sample).first().append(template1 + id + template2);
    });
    if ($(sample).length >= 2) {
        $(sample).eq(1).ready(function() {
            var id = document.querySelectorAll(sample)[1].title;
            $(sample).eq(1).append(template1 + id + template2);
        });
    }
    if ($(sample).length >= 3) {
        $(sample).eq(2).ready(function() {
            var id = document.querySelectorAll(sample)[2].title;
            $(sample).eq(2).append(template1 + id + template2);
        });
    }
    if ($(sample).length >= 4) {
        $(sample).eq(3).ready(function() {
            var id = document.querySelectorAll(sample)[3].title;
            $(sample).eq(3).append(template1 + id + template2);
        });
    }
}

//-----------------------------------------------------------------------------
//Playlist Formatter
//-----------------------------------------------------------------------------
function formatcaller() {
    $('.tutorialicon').click(function() {
        if ($('.tutorialicon').hasClass('tutorialopen')) {
            $('.tutorialicon').removeClass('tutorialopen');
            $('#tutorialcontent').empty();
            return;
        }
        $('.tutorialicon').addClass('tutorialopen');
        $('#tutorialcontent').append(tutorial);
    });

    $('#formatter').click(function() {
        if ($('#formatter').hasClass('formatteropen')) {
            $('#formatter').removeClass('formatteropen');
            $('#formatcontent').empty();
            return;
        }
        $('#formatter').addClass('formatteropen');
        $('#formatcontent').html("<div id='formatwindow'><img src='https://images.wikia.nocookie.net/__cb1481713639/common/skins/oasis/images/icon_close.png'></button><br><span>NND mylists</span><br><input type='text' name='nnd' placeholder='7359936 25396393 31424334 13892546 26633779'><br><span>BB userspace</span><br><input type='text' name='bb' placeholder='11073'><br><span>YT usernames</span><br><input type='text' name='ytun' placeholder='splendiferousfantasy'><br><span>YT channels</span><br><input type='text' name='ytch' placeholder='UCMsNS10PzxzEayT7UHS4p6g'><br><span>YT playlists</span><br><input type='text' name='ytpl' placeholder='PLOA7lc-qUd88NjN4adz8Di8ZHT6jwIFrS PLOA7lc-qUd8_mcFeaVAKWKbg9FSy35SIV'><br><span>SoundCloud ID</span><br><input type='text' name='sc' placeholder='sumashu missingnumber'><br><br><input type='button' value='Format!'></div>");
        format();
    });

    function song(title, yt, nnd, sc, bb, date) {
        this.title = title;
        this.yt = yt;
        this.nnd = nnd;
        this.sc = sc;
        this.bb = bb;
        this.date = date;
    }

    function format() {
        $('#formatwindow input[type=button]').click(function() {
            var nnd = [];
            var ytun = [];
            var ytch = [];
            var ytpl = [];
            var sc = [];
            var bb = [];
            var list = [];
            var listsc = [];

            if (!$('input[name=nnd]').val() === '') {
                nnd = $('input[name=nnd]').val().split(" ");
                for (var i = 0; i < nnd.length; i++) {
                    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20title%2CpubDate%2Clink%20from%20rss%20where%20url%3D'http%3A%2F%2Fwww.nicovideo.jp%2Fmylist%2F" + nnd[i] + "%2Fvideo%3Frss%3D2.0'&diagnostics=true";
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "xml",
                        success: function(xml) {
                            $(xml).find('item').each(function() {
                                list.push(new song($(this).find('title').text(), '', $(this).find('link').text().split("/watch/")[1], '', '', $(this).find('pubDate').text().split(' ')[3] + '.' + getmon($(this).find('pubDate').text().split(' ')[2]) + '.' + $(this).find('pubDate').text().split(' ')[1]));
                            });
                        }
                    });
                }
            }
            if (!$('input[name=bb]').val() === '') {
                bb = $('input[name=bb]').val().split(" ");
                var token = " ";
                for (var i = 0; i < bb.length; i++) {
                    //find number of pages then call bbformat on all pages
                    //console.log('calling bb ajax');
                    //changed to yquery
                    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fspace.bilibili.com%2Fajax%2Fmember%2FgetSubmitVideos%3Fmid%3D" + bb[i] + "'&diagnostics=true";
                    //console.log('current url: '+url);
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "xml",
                        success: function(xml) {
                            //console.log('bilibili ajax successful');
                            var pages = $(xml).find('pages').text();
                            for (var j = 0; j <= pages; j++) {
                                bbformat("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fspace.bilibili.com%2Fajax%2Fmember%2FgetSubmitVideos%3Fmid%3D" + $(xml).find('mid:eq(0)').text() + "%26page%3D", j, list);
                            }
                        }
                    });


                }
            }
            if (!$('input[name=ytch]').val() === '') {
                ytch = $('input[name=ytch]').val().split(" ");
                var token = " ";
                for (var i = 0; i < ytch.length; i++) {
                    ytchformat(ytch[i], '', list);
                }
            }
            if (!$('input[name=ytun]').val() === '') {
                ytun = $('input[name=ytun]').val().split(" ");
                var token = " ";
                for (var i = 0; i < ytun.length; i++) {
                    ytunformat(ytun[i], '', list);
                }
            }
            if (!$('input[name=ytpl]').val() === '') {
                ytpl = $('input[name=ytpl]').val().split(" ");
                var token = " ";
                for (var i = 0; i < ytpl.length; i++) {
                    ytplformat(ytpl[i], '', list);
                }
            }
            if (!$('input[name=sc]').val() === '') {
                sc = $('input[name=sc]').val().split(" ");
                var url = " ";
                for (var i = 0; i < sc.length; i++) {
                    url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fapi.soundcloud.com%2Fresolve.json%3Furl%3Dhttp%3A%2F%2Fsoundcloud.com%2F" + sc[i] + "%2Ftracks%26client_id%3D2t9loNQH90kzJcsFCODdigxfp325aq4z'&diagnostics=true";
                    //console.log('calling sc ajax');	
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "xml",
                        success: function(xml) {
                            $(xml).find('json').find('json').each(function() {
                                listsc.push(new song($(this).find('title').text(), '', '', $(this).find('permalink_url:eq(1)').text(), '', $(this).find('created_at').text().split(' ')[0].replace('/', '.').replace('/', '.')));
                            });
                        }
                    });
                }
            }

            $(document).ajaxStop(function() {
                list.sort(function(a, b) {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                });
                list.sort(function(a, b) {
                    if (a.date < b.date) return -1;
                    if (a.date > b.date) return 1;
                    return 0;
                });
                for (var i = 0; i < list.length - 1; i++) {
                    if ((list[i + 1].title == list[i].title) && (list[i + 1].date == list[i].date)) {
                        if (list[i + 1].nnd !== '') {
                            list[i].nnd = list[i + 1].nnd;
                        } else {
                            list[i].yt = list[i + 1].yt;
                        }
                        list.splice(i + 1, 1);
                        i--;
                    }
                }
                var rmv = ['【歌ってみた】', 'を歌ってみた', '歌ってみた', '(english cover)', 'english cover', 'cover', 'english', 'vers.', 'ver.', 'vers', 'ver', 'french', 'german', 'chinese', 'spanish', 'rap', 'screamo', 'piano', 'tv size', 'tv-size', 'acapella', 'a capella', 'short', 'band', 'acoustic', 'arrange', 'parody', '替え歌ってみた', '替え歌', '--', '- -'];
                var out = '==List of Covered Songs==\n{{Playlist|content = \n';
                var ver = '';
                for (var i = 0; i < list.length; i++) {
                    ver = verformat(list[i].title);
                    for (var j = 0; j < rmv.length; j++) {
                        list[i].title = list[i].title.replace(new RegExp(" \\b" + rmv[j] + "\\b", "ig"), " ").replace(new RegExp("　\\b" + rmv[j] + "\\b", "ig"), " ").replace(new RegExp("\\b" + rmv[j] + "\\b", "ig"), " ");
                    }
                    list[i].title = list[i].title.replace('ENG', '');

                    list[i].title = list[i].title.replace('　', ' ').replace('|', '-').replace('[', '「').replace(']', '」').replace('()', '').replace('--', '').replace('- -', '').replace('  ', ' ');

                    list[i].title = list[i].title.trim();

                    list[i].title = list[i].title.replace('Private video', '(Private video)').replace('Deleted video', '(Deleted video)');


                    if (list[i].yt !== '' && list[i].nnd !== '') {
                        out = out.concat("# \"[https://www.youtube.com/watch?v=" + list[i].yt + " " + list[i].title + "]\" {{nnd|" + list[i].nnd + "}}" + ver + " (" + list[i].date + ")\n");
                    } else if (list[i].yt !== '' && list[i].nnd === '') {
                        out = out.concat("# \"[https://www.youtube.com/watch?v=" + list[i].yt + " " + list[i].title + "]\" " + ver + " (" + list[i].date + ")\n");
                    } else if (list[i].yt === '' && list[i].nnd !== '') {
                        out = out.concat("# \" " + list[i].title + "\" {{nnd|" + list[i].nnd + "}}" + ver + " (" + list[i].date + ")\n");
                    }
                    /*else if (list[i].bb != '' && list[i].nnd != '') {
                        out = out.concat("# \"[https://www.bilibili.com/video/" + list[i].bb + " " + list[i].title + "]\" {{nnd|" + list[i].nnd + "}}" + ver + " (" + list[i].date + ")\n")
                    }
                    else {
                        out = out.concat("# \"[https://www.bilibili.com/video/" + list[i].bb + " " + list[i].title + "]\" " + ver + " (" + list[i].date + ")\n")
                    } */
                }
                out = out.concat('}}\n');
                var outsc = '===Songs on SoundCloud===\n{{Playlist|notice = soundcloud|content = \n';
                for (var i = 0; i < listsc.length; i++) {
                    ver = verformat(listsc[i].title);

                    for (var j = 0; j < rmv.length; j++) {
                        listsc[i].title = listsc[i].title.replace(new RegExp(" \\b" + rmv[j] + "\\b", "ig"), " ").replace(new RegExp("　\\b" + rmv[j] + "\\b", "ig"), " ").replace(new RegExp("\\b" + rmv[j] + "\\b", "ig"), " ");
                    }
                    listsc[i].title = listsc[i].title.replace('　', ' ').replace('|', '-').replace('[', '「').replace(']', '」').replace('()', '').replace('--', '').replace('  ', ' ');
                    outsc = outsc.concat("# \"[" + listsc[i].sc + " " + listsc[i].title + "]\" " + ver + " (" + listsc[i].date + ")\n");
                }
                outsc = outsc.concat('}}\n');
                if (listsc.length <= 0) {
                    outsc = '';
                }

                $('#formatcontent').html("<div id='formatwindow'><img src='https://images.wikia.nocookie.net/__cb1481713639/common/skins/oasis/images/icon_close.png'></button><textarea readonly name=res>" + out + outsc + "</textarea></div>");
                $('#formatwindow .close').click(function() {
                    $('#formatcontent').empty();
                });
            });
        });
    }

    function verformat(title) {
        var tmp = ' -';
        var t = '';
        if (title.toLowerCase().indexOf('english') > -1 || title.indexOf('英語') > -1 || title.indexOf('ENG') > -1) {
            tmp += 'English ';
        }
        if (title.toLowerCase().indexOf('french') > -1 || title.toLowerCase().indexOf('français') > -1) {
            tmp += 'French ';
        }
        if (title.toLowerCase().indexOf('german') > -1 || title.toLowerCase().indexOf('deutsch') > -1) {
            tmp += 'German ';
        }
        if (title.toLowerCase().indexOf('chinese') > -1 || title.indexOf('中文') > -1) {
            tmp += 'Chinese ';
        }
        if (title.toLowerCase().indexOf('spanish') > -1 || title.toLowerCase().indexOf('español') > -1) {
            tmp += 'Spanish ';
        }
        if (title.toLowerCase().indexOf('indonesia') > -1) {
            tmp += 'Indonesian ';
        }
        if (title.toLowerCase().indexOf('rap') > -1) {
            tmp += 'Rap ';
        }
        if (title.toLowerCase().indexOf('screamo') > -1) {
            tmp += 'Screamo ';
        }
        if (title.toLowerCase().indexOf('piano') > -1 || title.indexOf('ピアノ') > -1) {
            tmp += 'Piano ';
        }
        if (title.toLowerCase().indexOf('tv size') > -1 || title.toLowerCase().indexOf('tv-size') > -1) {
            tmp += 'TV size ';
        }
        if (title.toLowerCase().indexOf('acapella') > -1 || title.toLowerCase().indexOf('a capella') > -1) {
            tmp += 'Acapella ';
        }
        if (title.toLowerCase().indexOf('short') > -1) {
            tmp += 'Short ';
        }
        if (title.toLowerCase().indexOf('band') > -1 || title.indexOf('バンド') > -1) {
            if (title.toLowerCase().indexOf('band edition') > -1) {
                t = ' -Band edition-';
            } else {
                tmp += 'Band ';
            }
        }
        if (title.toLowerCase().indexOf('acoustic') > -1) {
            tmp += 'Acoustic ';
        }
        if (title.toLowerCase().indexOf('arrange') > -1 || title.indexOf('アレンジ') > -1) {
            tmp += 'Arrange ';
        }
        if (title.toLowerCase().indexOf('parody') > -1 || title.indexOf('替え歌') > -1) {
            tmp += 'Parody ';
        }
        if (tmp == ' -') {
            return '' + t;
        }
        return tmp + 'ver.-' + t;
    }

    function ytunformat(url, token, list) {
        var u = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'https%3A%2F%2Fwww.googleapis.com%2Fyoutube%2Fv3%2Fchannels%3Fkey%3DAIzaSyD5bC5qiEP-_25Llg2ciYNM9sW-WP6a6ck%26part%3Did%26forUsername%3D" + url + "'&diagnostics=true";
        //console.log('calling yt ajax');
        //console.log('function url: '+url);
        //console.log('current url: '+u);
        $.ajax({
            type: "GET",
            url: u,
            dataType: "xml",
            success: function(xml) {
                //console.log('yt username ajax successful');
                $(xml).find('items').each(function() {
                    var id = $(this).find('id').text();
                    var uu = id;
                    if (token === '') {} else {
                        uu = id + "%26pageToken%3D" + token;
                    }
                    uu = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'https%3A%2F%2Fwww.googleapis.com%2Fyoutube%2Fv3%2Fsearch%3Forder%3Ddate%26part%3Dsnippet%26maxResults%3D50%26key%3DAIzaSyD5bC5qiEP-_25Llg2ciYNM9sW-WP6a6ck%26channelId%3D" + uu + "'&diagnostics=true";
                    //console.log('calling yt chid ajax');
                    //console.log('function url: '+url);
                    //console.log('current url: '+uu);
                    $.ajax({
                        type: "GET",
                        url: uu,
                        dataType: "xml",
                        success: function(xml) {
                            var token = " ";
                            token = $(xml).find('nextPageToken').text();
                            //console.log("token='"+token+"'");
                            $(xml).find('items').each(function() {
                                //console.log("check if id=null"+$(this).find('videoId').text())
                                var tmp = " ";
                                tmp = $(this).find('videoId').text();
                                if (tmp != " ") {
                                    list.push(new song($(this).find('title').text(), $(this).find('videoId').text(), '', '', '', $(this).find('publishedAt').text().split('T')[0].replace('-', '.').replace('-', '.')));
                                }
                            });
                            if (token != " ") {
                                ytchformat(id, token, list);
                                //console.log("token='"+token+"'");
                                //console.log("token not empty");
                            }
                        }
                    });
                });
            }
        });
    }

    function ytchformat(url, token, list) {
        var u = url;
        if (token === '') {} else {
            u = url + "%26pageToken%3D" + token;
        }
        u = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'https%3A%2F%2Fwww.googleapis.com%2Fyoutube%2Fv3%2Fsearch%3Forder%3Ddate%26part%3Dsnippet%26maxResults%3D50%26key%3DAIzaSyD5bC5qiEP-_25Llg2ciYNM9sW-WP6a6ck%26channelId%3D" + u + "'&diagnostics=true";
        //console.log('calling yt chid ajax');
        //console.log('function url: '+url);
        //console.log('current url: '+u);
        $.ajax({
            type: "GET",
            url: u,
            dataType: "xml",
            success: function(xml) {
                var token = " ";
                token = $(xml).find('nextPageToken').text();
                //console.log("token='"+token+"'");
                $(xml).find('items').each(function() {
                    //console.log("check if id=null"+$(this).find('videoId').text())
                    var tmp = " ";
                    tmp = $(this).find('videoId').text();
                    if (tmp != " ") {
                        //console.log($(this).find('title').text());
                        //console.log($(this).find('videoId').text());
                        //console.log($(this).find('publishedAt').text());
                        list.push(new song($(this).find('title').text(), $(this).find('videoId').text(), '', '', '', $(this).find('publishedAt').text().split('T')[0].replace('-', '.').replace('-', '.')));
                    }
                });
                if (token != " ") {
                    ytchformat(url, token, list);
                    //console.log("token='"+token+"'");
                    //console.log("token not empty");
                }
            }
        });
    }

    function ytplformat(url, token, list) {
        var u = url;
        if (token === '') {} else {
            u = url + "%26pageToken%3D" + token;
        }
        u = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'https%3A%2F%2Fwww.googleapis.com%2Fyoutube%2Fv3%2FplaylistItems%3Fpart%3Dsnippet%26key%3DAIzaSyD5bC5qiEP-_25Llg2ciYNM9sW-WP6a6ck%26playlistId%3D" + u + "'&diagnostics=true";
        //console.log('calling yt chid ajax');
        //console.log('function url: '+url);
        //console.log('current url: '+u);
        $.ajax({
            type: "GET",
            url: u,
            dataType: "xml",
            success: function(xml) {
                var token = " ";
                token = $(xml).find('nextPageToken').text();
                //console.log("token='"+token+"'");
                $(xml).find('items').each(function() {
                    //console.log("check if id=null"+$(this).find('videoId').text())
                    var tmp = " ";
                    tmp = $(this).find('videoId').text();
                    if (tmp != " ") {
                        list.push(new song($(this).find('title').text(), $(this).find('videoId').text(), '', '', '', $(this).find('publishedAt').text().split('T')[0].replace('-', '.').replace('-', '.')));
                    }
                });
                if (token != " ") {
                    ytplformat(url, token, list);
                    //console.log("token='"+token+"'");
                    //console.log("token not empty");
                }
            }
        });
    }

    function bbformat(url, page, list) {
        //console.log('calling bb ajax');
        //console.log('bbformat called with url:'+url+page);
        //console.log('function url: '+url+page+"'&diagnostics=true");
        $.ajax({
            type: "GET",
            url: url + page + "'&diagnostics=true",
            dataType: "xml",
            success: function(xml) {
                $(xml).find('vlist').each(function() {
                    var d = new Date(parseInt($(this).find('created').text()) * 1000);
                    list.push(new song($(this).find('title').text(), '', '', '', 'av' + $(this).find('aid').text(), d.getFullYear() + "." + ("0" + d.getMonth()).slice(-2) + "." + ("0" + d.getDate()).slice(-2)));
                });
            }
        });
    }

    function getmon(mon) {
        switch (mon) {
            case 'Jan':
                return '01';
            case 'Feb':
                return '02';
            case 'Mar':
                return '03';
            case 'Apr':
                return '04';
            case 'May':
                return '05';
            case 'Jun':
                return '06';
            case 'Jul':
                return '07';
            case 'Aug':
                return '08';
            case 'Sep':
                return '09';
            case 'Oct':
                return '10';
            case 'Nov':
                return '11';
            case 'Dec':
                return '12';
        }
    }
}

/*-----------------------------------------------------------------------------
//Tutorial Hints
//-----------------------------------------------------------------------------
var $textarea; //also used by Templates
var $highlights;

var tips = {};

function getTips() {
    $.ajax({
        url: 'https://utaite.fandom.com/wiki/MediaWiki:Tips.js?action=raw',
        success: function(html) {
            tips = JSON.parse(html);
            updateTips();
        }
    });
}

function applyHighlights(text) {
    if (!text) {
        return;
    }
    text = "<span class='notutorialinfo'>!<span class='tutorialtooltip'></span></span>" +
        text
        .replace(/</g, '&lt;')
        .replace(/\n/g, "\n<span class='notutorialinfo'>!<span class='tutorialtooltip'></span></span>") +
        "\r\n";
    var t = "";
    for (var i in tips) {
        if (tips.hasOwnProperty(i)) {
            text = text.replace(
                new RegExp(
                    "(^|\n)<span class='(.*)tutorialinfo'>!<span class='tutorialtooltip'>(.*)</span></span>(.*)" + i.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "(.*)\n", "g"
                ),
                "$1<span class='tutorialinfo'>!<span class='tutorialtooltip'>$3" + (tips[i].length === 1 ? tips[tips[i]] : tips[i]).join('\n')
                .replace(/'/g, "&#39")
                .replace(/"/g, "&quot;")
                .replace(new RegExp("<small>", "g"), "&lt;small&gt;")
                .replace(new RegExp("</small>", "g"), "&lt;/small&gt;")
                .replace(new RegExp("<ref>", "g"), "&lt;ref&gt;")
                .replace(new RegExp("</ref>", "g"), "&lt;/ref&gt;")
                .replace(new RegExp("<br>", "g"), "&lt;br&gt;")
                .replace(new RegExp("<tabber>", "g"), "&lt;tabber&gt;")
                .replace(new RegExp("</tabber>", "g"), "&lt;/tabber&gt;")
                .replace(new RegExp("<span style=info>", "g"), "<span style='color:#179e0a; font-size:larger'>")
                .replace(new RegExp("<span style=use>", "g"), "<span style='color:#0a689e; font-size:larger'>")
                .replace(new RegExp("<span style=ex>", "g"), "<span style='color:#9e0a9b; font-size:larger'>")
                .replace(new RegExp("<span style=imp>", "g"), "<span style='color:red; font-size:larger'>")
                .replace(new RegExp("<span style=ph>", "g"), "<span style='color:#707070'>") +
                "</span></span>$4" + i + "$5\n"
            );
        }
    }
    return text;
}
var time = 0;

function handleInput() {
    if (time + 1500 < Date.now()) {
        time = Date.now();
        updateTips();
    }
}

function updateTips() {
    var text = $textarea.val();
    var highlightedText = applyHighlights(text);
    $highlights.html(highlightedText);
}

function handleScroll(e) {
    if (e.target.scrollTop - $textarea.scrollTop() > 100 || $textarea.scrollTop() - e.target.scrollTop > 100) $textarea.scrollTop(e.target.scrollTop);
    $highlights.scrollTop(e.target.scrollTop);
}

function bindEvents() {
    $textarea.on({
        'input': handleInput,
        'scroll': handleScroll,
        'click': function(e) {
            startPos = $textarea.prop("selectionStart");
            endPos = $textarea.prop("selectionEnd");
        }
    });
    $highlights.on({
        'focus': function(e) {
            e.preventDefault();
        },
        'scroll': handleScroll
    });
}
*/

//execute scripts when visual editor is loaded or when document.ready
$(function() {
    $('#mw-content-text').prepend("<div id='textareaoverlay'></div>");
    $highlights = $('#textareaoverlay');
    if (window.CKEDITOR) {
        CKEDITOR.on("instanceReady", function() {
            $(".cke_button__modesource").on({
                'click': switchToSource,
            });
            //if visual editor, switch to source editor by default
            $("#cke_1_contents").ready(function() {
                $(".cke_button__modesource").eq(0).trigger('click');
            });
            customPreloadTemplates();
            addfeatures();
            formatcaller();
        });
    } else {
        customPreloadTemplates();
        addfeatures();
        formatcaller();
        $textarea = $('#wpTextbox1');
        // Currently commented out above.
        // bindEvents();
        //getTips();
    }
});

function switchToSource(e) {
    var checkTextAreaExists = setInterval(function() {
        if ($('#cke_1_contents textarea').length) {
            clearInterval(checkTextAreaExists);
            $textarea = $('#cke_1_contents textarea');
            // Currently commented out above.
            // bindEvents();
            //getTips();
        }
    }, 500);
}