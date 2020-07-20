//Code for Template:Ebook on Comment header
//By User:Dai ca superman 
//Readers can create their own epub, mobi, pdf automatically from wiki articles or save pages to Pocket app so they can read it on any devices which have been installed their app even when offline - (One of the most popular 'Read it later' service)
//Epub, Mobi created by Dotepub service: https://dotepub.com/
//Pdf created by Pdf friendly service: https://www.printfriendly.com/
//They two all have Chrome and Wordpress plugin (a.k.a be checked, tested and trusted by their staffs) and be used by thousand of people.
//Print Pdf Friendly: 
//Chrome store: https://chrome.google.com/webstore/detail/print-friendly-pdf/ohlencieiipommannpdfcmfdpjjmeolj
//Wordpress: https://wordpress.org/plugins/printfriendly/
//Dotepub
//Chrome store: https://chrome.google.com/webstore/detail/dotepub/okpfiebkkmjcnodegbbbiellepfhoglm
//Wordpress: https://wordpress.org/plugins/dotepub/
//Code
//Pdf Button 
$(function() {
    if (document.getElementsByClassName("pdf-button")[0] !== null) {
        var pfHeaderImgUrl = '';
        var pfHeaderTagline = '';
        var pfdisableClickToDel = 0;
        var pfHideImages = 0;
        var pfImageDisplayStyle = 'block';
        var pfDisablePDF = 0;
        var pfDisableEmail = 0;
        var pfDisablePrint = 0;
        var pfCustomCSS = 'http://sonako.wikia.com/index.php?title=MediaWiki:Print_Snk.css&action=raw&ctype=text/css&maxage=3600&smaxage=3600';
        var pfBtVersion = '1';
        (function() {
            var js, pf;
            pf = document.createElement('script');
            pf.type = 'text/javascript';
            if ('https:' === document.location.protocol) {
                js = 'https://pf-cdn.printfriendly.com/ssl/main.js';
            } else {
                js = 'http://cdn.printfriendly.com/printfriendly.js';
            }
            pf.src = js;
            document.getElementsByTagName('head')[0].appendChild(pf);
        })();

        $('#WikiaArticleComments .pdf-button').append('<a href="http://www.printfriendly.com" style="color:#6D9F00;text-decoration:none;" class="printfriendly" onclick="window.print();return false;" title="Lưu trang dưới dạng PDF"><img style="border:none;-webkit-box-shadow:none;box-shadow:none;" src="http://cdn.printfriendly.com/pf-button-both.gif" alt="Lưu trang dưới dạng PDF"/></a>');
    }
});

//Epub & Mobi Button

$(function() {
    if (document.getElementsByClassName("epub-button")[0] !== null) {
        $('#WikiaArticleComments .epub-button').append('<a class="dotEPUB" href="http:\/\/dotepub.com" title="Lưu trang dưới dạng Epub & Mobi" data-dotepublang="en" data-dotepublinks="0" data-dotepubformat="ask" data-dotepubtext="Đang chuyển đổi. Hãy đợi trong giây lát!"><img style="border:none;-webkit-box-shadow:none;box-shadow:none;" src="http://dotepub.com/i/but62x20.png" alt="Dotepub"/></a>');
        (function() {
            var prevDef = function(e) {
                if (e) {
                    e.preventDefault();
                } else {
                    window.event.returnValue = false;
                }
            };
            var act = function() {
                for (var i = 0; i < _a.length; i++) {
                    _a[i].onclick = function(e) {
                        _dotEPUB(this);
                        prevDef(e);
                    };
                }
            };
            var deact = function() {
                for (var i = 0; i < _a.length; i++) {
                    _a[i].onclick = function(e) {
                        window.alert('Quá trình chuyển đổi đã xong hoặc đang tiến hành. Hãy đợi trong giây lát.');
                        prevDef(e);
                    };
                }
                window.setTimeout(function() {
                    act();
                }, 5000);
            };
            var _dotEPUB = function(e) {
                var d = document;
                try {
                    if (!d.body || d.body.innerHTML === '') throw (0);
                    if (!document.getElementById('dotepub')) {
                        var dotEPUBcss = d.createElement('link');
                        dotEPUBcss.rel = 'stylesheet';
                        dotEPUBcss.href = '\/\/dotepub.com\/s\/dotEPUB-favlet.css';
                        dotEPUBcss.type = 'text\/css';
                        dotEPUBcss.media = 'screen';
                        d.getElementsByTagName('head')[0].appendChild(dotEPUBcss);
                        var dotEPUBstatus = d.createElement('div');
                        dotEPUBstatus.id = 'dotepub';
                        var text = e.getAttribute('data-dotepubtext') || 'Đang chuyển đổi';
                        var div = d.createElement('div');
                        div.id = 'status';
                        div.innerHTML = '<p>' + text + '<\/p>';
                        dotEPUBstatus.appendChild(div);
                        deact();
                        d.body.appendChild(dotEPUBstatus);
                        var dotEPUB = d.createElement('script');
                        dotEPUB.type = 'text\/javascript';
                        dotEPUB.charset = 'utf-8';
                        var links = e.getAttribute('data-dotepublinks') || '0';
                        var lang = e.getAttribute('data-dotepublang') || 'en';
                        var format = e.getAttribute('data-dotepubformat') || 'ask';
                        var author = e.getAttribute('data-dotepubauthor') || 'null';
                        var title = e.getAttribute('data-dotepubtitle') || 'null';
                        dotEPUB.src = '\/\/dotepub.com\/j\/dotepub.js?v=1.2&s=' + links + '&t=' + format + '&r=' + encodeURIComponent(author) + '&l=' + encodeURIComponent(title) + '&g=' + lang + '&e=Widget';
                        d.getElementsByTagName('head')[0].appendChild(dotEPUB);
                    } else {
                        window.alert('dotEPUB vẫn đang chạy!');
                    }
                } catch (e) {
                    window.alert('Trang này không có nội dung hoặc vẫn chưa tải xong. Hãy đợi cho đến khi trang tải xong.');
                }
            };
            var getE = function() {
                var a = document.getElementsByTagName('a');
                var r = [];
                for (var i = 0; i < a.length; i++) {
                    if (a[i].className == 'dotEPUB') {
                        r.push(a[i]);
                    }
                }
                return r;
            };
            var _a = getE();
            act();
        })();
    }
});