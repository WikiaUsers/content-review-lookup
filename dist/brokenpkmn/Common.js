/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
importArticles( {
	type: 'script',
	articles: [
		'ShowHide/code.js',
		'CollapsibleInfobox/code.js',
		'DemoScripts.js'
	]
} );
 
$( function () {
	// loads [[MediaWiki:Geshi.css]] on Thread namespace as necessary
	// as it's not loaded by default
	// @example <http://dev.wikia.com/wiki/Thread:5735>
	// @todo check if this is needed for Message_Wall too
	// @todo submit a bug report for this too
	if ( mw.config.get( 'wgNamespaceNumber' ) === 1201 && $( '.mw-geshi' ).length ) {
		mw.loader.load( 'ext.geshi.local' );
	}
} );
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
Skip to ContentSkip to Wiki NavigationSkip to Site Navigation
 		
  
2

Start a wikia
 
On the Wiki
Wiki Activity
Random page
Videos
Photos
Chat
Forum
Scripts
Lua
Wikia Code
Volunteer Developers
 Contribute   Share Watchlist	 Random page	 Recent changes
DemoScripts.js   View source    Talk1 829PAGES ON
THIS WIKI
//
/*jshint curly:false, jquery:true, browser:true */
/*global mediaWiki:true, importScriptURI:true, importArticles:true, importScriptPage:true, importScript:true, dev:true*/
 
;(function ($, mw) {
 
    'use strict';
 
    //if (mw.config.get('wgAction') !== 'view') return;
 
    function jsDoc () {
        window.WebFontConfig = {
            google: { families: [ 'Scada', 'Oxygen+Mono' ] }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
                '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        }());
    }
 
    function spoilerAlert () {
        var demo = $('#SpoilerAlertDemo');
        demo.empty();
        $('<button>Clear cookie and reload</button>').appendTo(demo).css({
            width: '200px',
            margin: '200px auto'
        }).click(function () {
            $.storage.del('SpoilerAlertJS');
            location.reload();
        });
        $('<p>' +
            'This page is a demo for ' +
            '<a href="http://dev.wikia.com/wiki/SpoilerAlert">SpoilerAlert</a>' +
            '</p>').appendTo(demo).css({
            textAlign: 'center',
            fontSize: '0.8em'
        });
        window.SpoilerAlert = { isSpoiler: function () { return true; } };
        importScriptPage('SpoilerAlert/code.js', 'dev');
    }
 
    function botoneraPopups () {
        importScriptURI('http://dev.wikia.com/wiki/BotoneraPopups/Code/en.js?action=raw&ctype=text/javascript&templates=expand');
    }
 
    function userTags() {
        window.UserTagsJS = {
            modules: {
                mwGroups: ['bureaucrat', 'rollback', 'sysop', 'bot', 'bot-global', 'codeeditor'],
                metafilter: {
                    sysop: ['bureaucrat']
                }
            },
            tags: {
                codeeditor: { u: 'Code Editor', order: 0 }
            }
        };
    }
 
    function wikimarks () {
        $('head').append('<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Chela+One|Sancreek&text=Wikima*rks"><style type="text/css">#mw-content-text .wikimarks-logo{font-family: "Chela One",sans-serif; font-size:1.1em;font-style:normal;font-variant:normal;font-weight:400;opacity:.9;line-height:1.5em}#mw-content-text .wikimarks-star1{position: relative; width: 0.7em; display: inline-block}#mw-content-text .wikimarks-star2{position: absolute; left: -0.06em; top: -0.45em; font-size: 2.2em; font-family: Sancreek,sans-serif}</style>');
    }
 
    function miniComplete() {
        mw.loader.implement( 'minicomplete',
            [ '/load.php?debug=false&lang=en&mode=articles&skin=oasis&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AColors%2Fcode.js%7Cu%3Adev%3AMiniComplete%2Fcode.js&only=scripts' ],
                {}, {} );
 
        $( '#minicomplete-demo' )
        .empty()
        .append(
            $( '<textarea>' )
            .attr( {
                id: 'minicomplete-textarea',
                placeholder: 'Try the MiniComplete demo here!'
            } )
            .css( {
                // 100% forces the far right edge to be cut off by
                // .WikiaArticle {overflow:hidden;} (set in oasis.scss)
                width: '98.3%',
                height: '80px',
                resize: 'none',
                padding: '2px 5px'
            } )
        );
 
        mw.loader.using( [ 'mediawiki.api', 'minicomplete' ], function () {
            dev.minicomplete.load( '#minicomplete-textarea' );
        } );
    }
 
    var includes = {
 
        /**
         * possible fields:
         *
         * - selector: element(s) to look for in the page
         * - page: name of the page
         * - exec: callback to execute      when selector or page are detected
         * - styles: stylesheet(s) to load  when selector or page are detected
         * - scripts: script(s)  to load    when selector or page are detected
         *
         */
 
        JsDoc: {
            selector: '#js-doc',
            exec: jsDoc,
            styles: ['Documentation.css']
        },
 
        InfoWidgets: {
            selector: '#infowidgets-demo',
            styles: ['InfoWidgets/demo.css'],
            scripts: ['InfoWidgets/demo.js']
        },
 
        SpoilerAlert: {
            selector: '#SpoilerAlertDemo',
            exec: spoilerAlert
        },
 
        BotoneraPopups: {
            page: 'BotoneraPopups',
            exec: botoneraPopups,
            styles: ['BotoneraPopups/code.css']
        },
 
        Preferences: {
            page: 'Preferences',
            scripts: ['Preferences/FloatingReference.js']
        },
 
        PrettyTable: {
            selector: '.pretty-table',
            styles: ['PrettyTable.css']
        },
 
        UserTags: {
            selector: '#UserProfileMasthead, body.skin-monobook.ns-2, body.skin-monobook.ns-3',
            exec: userTags,
            scripts: ['UserTags/code.js'],
            styles: ['User:Lunarity/masthead.css']
        },
 
        ReferencePopups: {
            page: 'ReferencePopups/demo',
            scripts: ['ReferencePopups/custom.js'],
            styles: ['ReferencePopups/demo/styles.css']
        },
 
        Colors: {
            page: 'Colors',
            scripts: ['Preferences/FloatingReference.js']
        },
 
        Wikimarks: {
            page: 'Wikimarks',
            styles: ['Wikimarks/Slideshow.css'],
            scripts: ['Wikimarks/Slideshow.js']
        },
 
        WikimarksLogo: {
            selector: '.wikimarks-logo',
            exec: wikimarks
        },
 
        FloatingToc: {
            page: 'FloatingToc',
            scripts: ['FloatingToc/code.js']
        },
 
        Countdown: {
            page: 'Countdown',
            scripts: ['Countdown/code.js']
        },
 
        PortableCSSPad: {
            page: 'PortableCSSPad',
            scripts: ['PortableCSSPad/code.js']
        },
 
        StarRatings: {
            page: 'StarRatings',
            scripts: ['StarRatings/code.js']
        },
 
        StarRatingsUi: {
            selector: '.rating-widget',
            scripts: ['StarRatings/ui.js']
        },
 
        DropdownMenu: {
            selector: '.custom-dropdown',
            styles: ['DropdownMenu/code.css']
        },
 
        Shadow: {
            page: 'Shadow',
            scripts: ['Textinputs_jquery.js', 'Shadow/code.js', 'Shadow/demo.js']
            //scripts: ['Textinputs_jquery.js']
        },
 
        ViewSource: {
            page: 'View_Source',
            scripts: ['View_Source/code.js']
        },
 
        EditSummary: {
            page: 'Standard_Edit_Summary',
            scripts: ['Standard_Edit_Summary/code.js']
        },
 
        TimedSlider: {
            page: 'TimedSlider',
            scripts: ['TimedSlider/code.js'],
            styles: ['TimedSlider/style.css']
        },
 
        HeaderLinks: {
            page: 'HeaderLinks',
            scripts: ['HeaderLinks/code.js']
        },
 
        NullEditButton: {
            page: 'NullEditButton',
            scripts: ['NullEditButton/code.js']
        },
 
        ExternalImageLoader: {
            page: 'ExternalImageLoader',
            scripts: ['ExternalImageLoader/code.js']
        },
 
        MiniComplete: {
            page: 'MiniComplete',
            exec: miniComplete
        },
 
        Tooltips: {
            page: 'Tooltips',
            scripts: ['Tooltips/code.js'],
            styles: ['Tooltips/code.css'],
            exec: function() {
                window.tooltips_list=[{classname:'custom-tooltip-text',text:"Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed"},{classname:'custom-tooltip-parse',parse:'{|style="white-space:nowrap;"\n!Parameter:\n|<#parameter#>\n|-\n!Lc:\n|{'+'{lc:<#parameter#>}}\n|-\n!Uc:\n|{'+'{uc:<#parameter#>}}\n|-\n!PAGENAME:\n|{'+'{PAGENAME}}\n|}'}];
                window.tooltips_config = {offsetX: 15,offsetY: 15}
            }
        },
 
        VoiceDictation: {
            scripts:['Voice_Dictation/voice.js']
        },
 
        ListUsers: {
            page: 'ListUsers',
            scripts: ['ListUsers/code.js']
        },
        LastEdited: {
            page: 'LastEdited',
            scripts: ['LastEdited/code.js']
        }
    };
 
    function merge (other) {
        /*jshint validthis:true*/
        for (var i = 0; i < other.length; i++) {
            if ($.inArray(other[i], this) === -1) {
                this.push(other[i]);
            }
        }
    }
 
    $(function ($) {
        var scripts = [], styles = [],
            page = mw.config.get('wgPageName');
        scripts.merge = merge; styles.merge = merge;
        $.each(includes, function (name, actions) {
            if (actions.selector && !$(actions.selector).length) return;
            if (actions.page && page !== actions.page) return;
            if (actions.exec) actions.exec();
            if (actions.styles) styles.merge(actions.styles);
            if (actions.scripts) scripts.merge(actions.scripts);
        });
        if (scripts.length) {
            importArticles({ type: 'script', articles: scripts });
        }
        if (styles.length) {
            importArticles({ type: 'style', articles: styles });
        }
 
    });
}(jQuery, mediaWiki));
/*******************
 * Navboxes
 *******************/
.navbox {
    width: 100%;
    background: white;
    color: black;
    margin: 1em auto;
    font-size: 84%;
    clear: both;
    padding: 2px;
    border-spacing: 0;
    border: 1px solid #AAA;
}
 
/* Merges navboxes that are directly under eachother */
.navbox + .navbox {
    margin-top: -11px;
}
 
.navbox .navbox-title {
    background: #CCF;
    color: black;
    font-weight: bold;
}
 
.navbox .navbox-vde {
    float:left;
    width:65px;
}
 
.navbox .navbox-title-padright {
    padding-right: 65px;
}
 
.navbox .navbox-title-padleft {
    padding-left: 65px;
}
 
.navbox .navbox-subgroup {
    border-spacing: 0;
    width: 100%;
}
 
.navbox .navbox-gutter {
    height: 2px;
}
 
.navbox .navbox-subgroup .navbox-gutter {
    background: white;
}
 
.navbox .navbox-section-row > td {
    padding: 0;
    height: 100%;
}
 
.navbox .navbox-section {
    width: 100%;
    border-spacing: 0;
}
 
.navbox .navbox-above,
.navbox .navbox-below {
    background: #DDF;
    text-align: center;
}
 
.navbox .navbox-image {
    background: white;
    text-align: center;
}
 
.navbox .navbox-group,
.navbox .navbox-header {
    background: #DDF;
    color: black;
    font-weight: bold;
    height: 100%;
    padding: 2px 4px;
}
 
.navbox .navbox-header-collapsible {
    padding-left: 65px;
}
 
.navbox .navbox-group {
    text-align: right;
    padding-right: 1em;
    min-width: 150px;
}
 
.navbox .navbox-group,
.navbox .navbox-image-left {
    border-right: 2px solid white;
}
 
.navbox-image-right {
    border-left: 2px solid white;
}
 
.navbox .navbox-list {
    background: white;
    color: black;
    width: 100%;
    height: 100%;
    padding: 0;
}
 
.navbox .alt > .navbox-list {
    background: #F7F7F7;
}
 
.navbox .navbox-list div {
    padding: 0px 4px;
}
 
.navbox .navbox-list.no-group {
    text-align: center;
    padding-top: 2px;
    padding-bottom: 2px;
}
 
.navbox .mw-collapsible-toggle {
    width: 65px;
}
 
/* hlist */
.hlist ul {
    margin: 0;
    list-style: none;
}
 
.hlist li, .hlist ul ul {
    display: inline;
}
 
.hlist li a {
    white-space: nowrap;
}
 
.hlist ul ul:before {
    content: "("
}
 
.hlist ul ul:after {
    content: ")"
}
 
.hlist li:after {
    content: " • ";
}
 
.hlist ul ul li:after {
    content: "/";
}
 
.hlist li:last-child:after, .hlist ul ul li:last-child:after {
    content: none;
}

$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.brokenpkmn.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.brokenpkmn.wikia.com:MediaWiki:CountDown.css"]
	});
});