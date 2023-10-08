/**
 * Heavily taken from https://dev.fandom.com/wiki/MediaWiki:LinkPreview/code.js
 * and 
 * https://dev.fandom.com/wiki/MediaWiki:Tooltips.js
 *
 * Maintainer: Doubleterrainbow
 **/
(function shTooltipWrapper ($) {
    var urlVars = new URLSearchParams(location.search);
    var Settings = window.shTooltips || {},
        mwc = mw.config.get(['wgScriptPath', 'wgSassParams', 'wgArticlePath']);
    Settings.debug = urlVars.get('debug') || urlVars.get('debug1') || (Settings.debug !== undefined ? Settings.debug : false);

    // killswitch
    Settings.dontrun = urlVars.get('hidetooltips');
    if (Settings.dontrun) return;

    var Defaults = {
        dock: '#mw-content-text, #article-comments',
    };

    var flip = false;
    var cancel = false;
    var hasCreatedLoading = false;
    var currentEl = {}; // {href, ?data}

    var apiUri;

    var lastKnownMousePos = [0, 0];
    // exports
    Settings.shTooltipWrapper = shTooltipWrapper;
    Settings.context = this;
    Settings.f = {init: init, main: main, createuri: createUri, getLinkData: getLinkData,
                addTooltipToWindow: addTooltipToWindow,
                onMouseLeave: onMouseLeave,
                setTooltipPosition: setTooltipPosition,
                parseInfoboxTemplate: parseInfoboxTemplate,
                createTooltipFromTemplate: createTooltipFromTemplate,
                convertTemplateToHTML: convertTemplateToHTML
            };

    mw.loader.using(['mediawiki.util', 'mediawiki.Uri'], init);

    function log () {
        var a = [].slice.call(arguments);
        a.unshift('SHTooltip');
        if (Settings.debug) console.log.apply(this, a);
    }// log

    function init () {
        if (window.shTooltips && window.shTooltips.version) {
            // Init was already called
            log("Init already called");
            return;
        }

        Settings.version = '1.0';

        apiUri = new mw.Uri({path: mwc.wgScriptPath + '/api.php'});
        // show preview delay, ms
        Settings.delay = Settings.delay !== undefined ? Settings.delay : 150;
        // suppress hover events for x ms
        // Settings.throttling = timeout until x
        Settings.throttle = Settings.throttle !== undefined ? Settings.throttle : 100;
        Settings.throttling = false;

        // container (#WikiaMainContent, #mw-content-text etc)
        Settings.dock = !!Settings.dock ? Settings.dock : Defaults.dock;
        // Configured templates for generating custom wikitext tooltips, depending on the template
        Settings.templates = Settings.templates || [];
        // HTML content to put in the tooltip while it's loading
        Settings.loadingContent = Settings.loadingContent;

        Settings.RegExp = Settings.RegExp || {}; // regexps
        // pages 2 ignore
        Settings.RegExp.ipages = Settings.RegExp.ipages || [];
        // links 2 ignore
        Settings.RegExp.ilinks = Settings.RegExp.ilinks || [];
        Settings.RegExp.wiki = Settings.RegExp.wiki || new RegExp('^.*?\/wiki\/', 'i');
        // delete tags
        Settings.RegExp.dtag = Settings.RegExp.dtag || new RegExp('<.*>', 'gm');

        // Get API url
        var href = (new mw.Uri($('link[rel="canonical"]').attr('href'))).path;
        if(typeof href == 'undefined' || !href) {
            console.log('SHTooltips: script couldn\'t find required  link[rel="canonical"]  tag');
            return false;
        }
        href = href.split('/wiki/');
        api = href[0] + '/api.php';

        // ensure #mw-content-text is processed
        Settings.fixContentHook = Settings.fixContentHook !== undefined ? Settings.fixContentHook : true;
        window.shTooltips = Settings;
        var thisPage = (createUri(location) || {}).truepath;
        // should i ignore this page
        if (!thisPage || shouldIgnorePage(thisPage)) {
            mw.hook('wikipage.content').remove(main);
            log('ignore', thisPage);
            return;
        }
        
        Settings.RegExp.ilinks.push(thisPage); // ignore this page
        Settings.RegExp.ilinks.push(new RegExp(apiUri.path)); // ignore unknown
        
        // ajaxrc support
        window.ajaxCallAgain = window.ajaxCallAgain || [];
        window.ajaxCallAgain.push(main);

        mw.hook('wikipage.content').add(main);
        // main();
    } // init
    
    function main ($cont) {
        // main
        log('main', $cont);
        if (Settings.fixContentHook && $cont && $cont.length) {
            Settings.fixContentHook = false;
            if ($cont.selector !== '#mw-content-text') {
                log('main fixcontent', $cont);
                main($('#mw-content-text'));
            }
        }
        var $content, arr = [];
        // gather dock sites to one array
        Settings.dock.split(',').forEach(function (v) {
            var $c = {};
            if ($cont) {
                // if $cont belongs to dock container
                $c = ($cont.is(v) || $cont.parents(v).length) ? $cont : {};
            } else {
                // get whole dock. if main() called w\o params
                $c = $(v);
            }// if $cont. instead of $cont ? .is || .len ? : :
            $.merge(arr, $c);
        });// each dock
        $content = $(arr);
        
        log('main.c:', $content);
        
        $content.find('a').each(function() {
            var $el = $(this);
            $el.off('mouseenter.shtooltip mouseleave.shtooltip');
            $el.on('mouseenter.shtooltip', onMouseEnter);
            // $el.on('mouseover.shtooltip', onMouseOver);
            $el.on('mouseleave.shtooltip', onMouseLeave);
        }); 
        
        if ($('#tooltip-container').length === 0) {
            var container = $('<div id="tooltip-container">')
                .css("position", "fixed").css("z-index", "999");
            $('body').append($(container));
        }
    } // main
    
    function onMouseEnter(ev) {
        trackPosition(ev);
        log('onMouseEnter ', ev, Settings.throttling, currentEl.href);
        cancel = false;
        
        // suppress some events
        if (Settings.throttling) {
            return false;
        }
        Settings.throttling = setTimeout(removeThrottling, Settings.throttle);

        var link = createUri($(ev.currentTarget).attr('href')) || {};
        log('link', link);
 
        if (link && link.truepath && currentEl.href != link.truepath) {
            currentEl.href = link.truepath;
            currentEl.islocal = link.islocal;
            currentEl.interwiki = link.interwiki;
        }
        if (shouldIgnoreLink(currentEl.href)) {
            log('ignoring link', currentEl.href);
            return true;
        } 
        
        setTimeout(getLinkData.bind(this, ev), Settings.delay);
        return false;
    }
    
    function onMouseLeave (ev) {
        log('onMouseLeave ', ev, Settings.throttling, currentEl.href);
        currentEl.href = '';
        cancel = true;
        hasCreatedLoading = false;
        $('.sh-tooltip.loading').hide();
        $('.sh-tooltip').hide();

        removeThrottling();
    }

    function trackPosition (e) {
        lastKnownMousePos = [e.pageX, e.pageY];
        setTooltipPosition(e.pageX, e.pageY);
    }

    function isBalanced(str) {
        var map = {
          '(': ')',
          '[': ']',
          '{': '}',
        };
        var closing = Object.values(map);
        var stack = [];
              
        for (var i = 0; i < str.length; i++) {
          if (map[str[i]]) {
            stack.push(str[i]);
          } else if (closing.includes(str[i]) && str[i] !== map[stack.pop()]) {
            return false;
          }
        }
        return !stack.length;
      }

    function parseInfoboxTemplate (text) {
        var contents = text;

        templateName = undefined;
        regexTemplateName = /\{\{(?:\{1\|)?([\w\s]+)\n\|/g;
        templateNameMatches = regexTemplateName.exec(text);
        if (templateNameMatches !== null && templateNameMatches.length > 1) {
            templateName = templateNameMatches[1];
        }

        params = {};
        var paramLines = contents.split("\n").filter(function(line) { 
            return line.startsWith("|");
        });
        for (var i = 0; i < paramLines.length; i++) {
            var paramName = paramLines[i].split("=")[0].replace("|", "").trim();
            var value = paramLines[i].split("=")[1].trim();

            if (!isBalanced(value)) {
                value = value.replaceAll("{", "").replaceAll("}", "");
            }

            params[paramName] = value;
        }

        return {
            "name": templateName,
            "params": params
        };
    }

    function parseLinkMatch (link) {
        var linkMatches = Settings.templates.filter(function (item) { 
            return item.linkmatch !== undefined; 
        });

        for (var i = 0; i < linkMatches.length; i++) {
            var regex = linkMatches[i].linkmatch;
            var isMatch = regex.test(link);
            if (isMatch) {
                return linkMatches[i].template;
            }
        }
        return undefined;
    }

    function createTooltipFromTemplate(infoboxData) {
        populatedTemplate = '';

        for (var i = 0; i < Settings.templates.length; i++) {
            log("Checking if matches ", Settings.templates[i].templatename);
            if (infoboxData.name !== undefined && 
                Settings.templates[i].templatename == infoboxData.name) {
                var value = Settings.templates[i].template;

                populatedTemplate = value;
                
                var matches = value.match(/<#\s*[a-z0-9_\-]+?\s*#>/gi);
                if(matches) {
                    for(var x=0; x < matches.length; x++) {
                        var paramName = /<#\s*([a-z0-9_\-]+?)\s*#>/i.exec(matches[x])[1];
                        var matchingInfoboxParam = infoboxData.params[paramName];
                        var rx = new RegExp('<#\\s*'+paramName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")+'\\s*#>', 'g');
                        if (matchingInfoboxParam != undefined) {
                            log("replacing", paramName, "with value=", matchingInfoboxParam);
                            populatedTemplate = populatedTemplate.replace(rx, matchingInfoboxParam);
                        } else {
                            log("setting", paramName, "empty");
                            populatedTemplate = populatedTemplate.replace(rx, "");
                        }
                    }
                }
                
            }
        }

        return populatedTemplate;
    }
    
    function createUri (href) {
        var h;
        try {
            h = new mw.Uri(href.toString());
            h.pathname = h.path;
            h.hostname = h.host;
        } catch (e) {
            h = undefined;
            log('createUrl.e', e);
        }
        if (h) {
            try {
                h.truepath = decodeURIComponent(h.pathname.replace(Settings.RegExp.wiki, ''));
                h.interwiki = h.path.split('/wiki/')[0];
                h.islocal = mwc.wgArticlePath.split('/wiki/')[0] === h.interwiki;
            }
            catch (e) {
                h = undefined;
                log('createuri decode.e', e, h, String(h));
            }
        }
        return h;
    }
        
    function removeThrottling() {
        // onMouseEnter helper
        if (Settings.throttling) {
            clearTimeout(Settings.throttling);
            Settings.throttling = false;
        }
    }
    
    function setTooltipPosition(mouseX, mouseY, element) {
        var tooltipHeight = 200;
        var tooltipWidth = 200;
        
        if (element !== undefined) {
            tooltipHeight = element.height();
            tooltipWidth = element.width();
        }
        
        var barH = $('#WikiaBarWrapper').height();
        var offsetX = 30;
        var offsetY = 30;

        var spaceTop = mouseY - offsetX;
        var spaceLeft = mouseX - offsetY;
        var spaceRight = $(window).width() - mouseX - offsetX;
        var spaceBottom = $(window).height() - barH - mouseY - offsetY;
        
        var coordX = mouseX + offsetX;
        var coordY = mouseY + offsetY;
        
        if(spaceRight < tooltipWidth && spaceBottom < tooltipHeight) {
            if(spaceLeft >= tooltipWidth && flip != 'h') {
                coordX = mouseX - tooltipWidth - offsetX;
                flip = 'v';
            } else if(spaceTop >= tooltipHeight) {
                coordY = mouseY - tooltipHeight - offsetY;
                flip = 'h';
            } else {
                coordX = mouseX - tooltipWidth - offsetX;
                coordY = mouseY - tooltipHeight - offsetY;
                flip = 'vh';
            }
        } else {
            flip = false;
        }
        
        coordX = coordX-$(window).scrollLeft();
        coordY = coordY-$(window).scrollTop();
        
        coordX = Math.min(coordX, $(window).width() - tooltipWidth);
        coordY = Math.min(coordY, $(window).height() - tooltipHeight - barH);
        
        log("height =", tooltipHeight, "width =", tooltipWidth);
        log("setting pos to left:", coordX, "top:", coordY);
        $("#tooltip-container").css({left: coordX + 'px', top: coordY + 'px'});

        // Ensure only one tooltip is visible
        if ($(".sh-tooltip").filter(":visible").length > 1) {
            $(".sh-tooltip.loading").hide();
        }
    }
    
    function showExistingTooltip(tooltipId) {
        log("looking for existing " + tooltipId);
        $('.sh-tooltip').hide();
        $('.sh-tooltip.loading').hide();
        $('#' + tooltipId).show();
        setTooltipPosition(lastKnownMousePos[0], lastKnownMousePos[1], $('#' + tooltipId));
        return $('#' + tooltipId).length > 0;
    }
    
    function getLinkData (ev, forcepath) {
        var href = $(ev.currentTarget).attr('href');
        if (!href) return;

        var nuri = createUri(href) || {};
        nuri.truepath = forcepath || nuri.truepath;
        if (!nuri || !nuri.truepath || cancel) {
            log('gp no href', ev, forcepath);
            $('.sh-tooltip').hide();
            $('.sh-tooltip.loading').hide();
            return;
        }

        var tooltipId = 'tooltip-' + nuri.truepath.replace(/[^0-9a-zA-Z]+/g, "-");

        if (showExistingTooltip(tooltipId)) {
            return this;
        }

        if ($('.sh-tooltip').filter(':visible').length === 0 && !hasCreatedLoading) {
            log("Creating loading for el", currentEl.href);
            createLoadingDiv();
        }

        var apiRequest;
        apiRequest = new mw.Uri({path: nuri.interwiki + '/api.php'});
        apiRequest.extend({
            action: 'parse',
            page: nuri.truepath,
            prop: 'wikitext',
            format: 'json',
            section: 0,
            disablepp: '',
            redirects: '',
            // Cache link previews on the CDN for 10 minutes for anonymous users
            smaxage: 600,
            maxage: 600
        });
        log('api request: ', apiRequest.toString());
        
        $.getJSON(apiRequest).done(function(data) {
            // parse: {text: {*: text}}
            if (!data.parse) {
                log('gp apip. no valid data in', data);
                Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
                return this;
            }
            
            var text = data.parse.wikitext['*'];
            log('api wikitext:', text);
            if (!text || cancel) { return; }

            var template = parseLinkMatch(nuri.truepath);

            var summary = "";
            if (template === undefined) {
                var infoboxData = parseInfoboxTemplate(text);
    
                var summaryRegex = /(\n|\s)}}(?:<\/onlyinclude>)?\s*\n/g;
                var summaryParts = text.split(summaryRegex);
                if (summaryParts[summaryParts.length - 1] !== undefined) { 
                    summary = summaryParts[summaryParts.length - 1].split('\n\n')[0];
                }
    
                template = createTooltipFromTemplate(infoboxData);

            }
            
            var pageTitle = nuri.truepath.replaceAll("_", " ");
            template = template.replaceAll("%TEXT%", summary)
                                .replaceAll("%PAGE%", pageTitle)
                                .replaceAll("{{BASEPAGENAME}}", pageTitle)
                                .replaceAll("{{PAGENAME}}", pageTitle);
            
            if (!template) {
                Settings.RegExp.ilinks.push(nuri.truepath);
                $('.sh-tooltip').hide();
                return;
            }
           
            convertTemplateToHTML(tooltipId, nuri.truepath, template, forcepath);

            return this;
        })
        .fail(function(obj, stat, err){
            log('get page data fail', obj, stat, err);
            $('.sh-tooltip').hide();
        });
        return false;
    
    } 

    function addTooltipToWindow(div, divId, target, force) {
        log('sp', div, target, force);
        log('sp div:', div);
        
        if ($('#' + divId).length === 0) {
            $('#tooltip-container').append($(div));
        }
        
        $('.sh-tooltip').hide();
        $('.sh-tooltip.loading').hide();
        $('#' + divId).show();
        setTooltipPosition(lastKnownMousePos[0], lastKnownMousePos[1], $('#' + divId));
    } 
        
    function shouldIgnorePage (name) {
        var a = Settings.RegExp.ipages;
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] instanceof RegExp) {
                if (a[i].test(name)) return true;
            } else {
                if (name === a[i]) return true;
            } // if regexp
        }
        return false;
    }
    
    function shouldIgnoreLink (name) {
        // true if link should be ignore
        var a = Settings.RegExp.ilinks;
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] instanceof RegExp) {
                if (a[i].test(name)) return true;
            } else {
                if (name === a[i]) return true;
            }
        }
        return false;
    }

    function createLoadingDiv() {
        hasCreatedLoading = true;
        var shouldShowTooltip = $('.sh-tooltip').filter(':visible').length === 0 && !cancel;
        if ($('.sh-tooltip.loading').length > 0 && shouldShowTooltip) {
            $('.sh-tooltip.loading').fadeIn("fast");
        } else if (shouldShowTooltip) {
            var div = $('<div class="sh-tooltip loading">');
            
            if (Settings.loadingContent !== undefined) {
                div.html(Settings.loadingContent);
            } else {
                div.css("height", "50px")
                    .css("width", "80px")
                    .css("background", "white")
                    .css("border-radius", "8px")
                    .css("color", "black")
                    .css("padding", "10px")
                    .text("Loading...");
            }
            
            $('#tooltip-container').append(div);
        }
    }

    function convertTemplateToHTML(divId, path, template, forcepath) {
        var div = $('<div class="sh-tooltip">').attr("id", divId);
        var twrap = $('<div>');

        apipage = new mw.Uri({path: api});
        apipage.extend({
            action: 'parse',
            contentmodel: 'wikitext',
            prop: 'text',
            format: 'json',
            disablelimitreport: true,
            text: template,
            // Cache link previews on the CDN for 10 minutes for anonymous users
            smaxage: 600,
            maxage: 600
        });

        $.getJSON(apipage).done(function(data) {
            twrap.html(data.parse.text['*']);
            div.html(twrap);
            if (currentEl.href === path) {
                addTooltipToWindow(div, divId, forcepath ? true : false);
            }
        }).fail(function(obj, stat, err){
            log('parse template fail', obj, stat, err);
            $('.sh-tooltip').hide();
        });
    }

    String.prototype.replaceAll = function(find, replace) {
        var str = this;
        return str.replace(new RegExp(find, 'g'), replace);
    };
})(jQuery);