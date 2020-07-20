(function($, mw){
    var mwConfig = {
        "page": mw.config.get('wgPageName'),
        "skin": mw.config.get('skin'),
        "username": mw.config.get('wgUserName'),
        "namespace": (function(ns){
            "use strict";
            var namespace = null;
            ns = (ns) ? Number(ns) : NaN;
            if (isNaN(ns) === false){
                switch (ns){
                    case -2:
                        namespace = "Media";
                        break;
                    case -1:
                        namespace = "Special";
                        break;
                    case 0:
                        namespace = "Main";
                        break;
                    case 1:
                        namespace = "Talk";
                        break;
                    case 2:
                        namespace = "User";
                        break;
                }
            }
            return namespace;
        })(mw.config.get('wgNamespaceNumber')),
    };
    if (mwConfig["page"].indexOf('Main Page') > -1 || mwConfig["page"].indexOf('HTML & CSS Wiki') > -1){
        var mainPage = {
            lcs: {
                content: {},
                fn: {}
            },
            rcs: {
                content: {},
                fn: {}
            },
            ui: {}
        }, html;
        mainPage.ui.content = function(html, id){
            if (html){
                html = '<div class="HTMLCSSMPContent"' + ((id) ? ' id="' + id + '"' : '') + '>' + html + '</div>';
            }
            return html;
        };
        mainPage.ui.browsers = (function(){
            var html = null, browsers = ["IE", "FF", "Chrome", "Safari", "Opera"];
            html = '<footer class="HTMLCSSBrowsers" id="HTMLCSSBrowsers">' + '<nav class="browser-select" id="browser-select">' + '<ul>';
            for (var i = 0; i < browsers.length; i++){
                var browserName = (browsers[i] == "IE") ? 'Internet Explorer' : ((browsers[i] == "FF") ? 'Firefox' : ((browsers[i] == "Chrome") ? 'Google Chrome' : browsers[i]));
                $.get('/wiki/File:' + browsers[i] + 'logo.svg', function(data){
                    var page = $(data),
                        image_cont = page.find('.fullImageLink')[0],
                        image = image_cont.find('img').attr('src');
                    html += '<li data-browser="' + browsers[i] + '"><a href="/wiki/' + browserName.replace(' ', '_') + '"><img src="' + image + '" alt="' + browserName + '" /><span class="browser-tooltip">' + browserName + '</span></a></li>';
                });
            }
            html += '</ul></nav></footer>';
            return html;
        })();
        if (mainPage.lcs.content){
            mainPage.lcs.content["Banner"] = {
                header: false,
                html: (function(){
                    
                })()
            };
            mainPage.lcs.content["Article Count"] = {
                header: false,
                html: ''
            };
            mainPage.lcs.content["Navigation"] = {
                header: true,
                html: ''
            };
        }
    }
})(this.jQuery, this.mediaWiki);