/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================

/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');

/* Stats */
importScript('MediaWiki:Common.js/stats.js');

/* Clock */
importScript('MediaWiki:Common.js/Clock.js');

/****************************/
/* spoilers by User:Tierrie */
/****************************/
importScriptPage('Content/SpoilersToggle.js', 'scripts');

// *******
// Auto-Refreshing RecentChanges, Logs, Contributions, and WikiActivity (Courtesy of Sactage)
// *******
importScriptPage('AjaxRC/code.js', 'dev');
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'AutoRefresh';

// *****************
// Template:Username
// *****************

$(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});

window.UserBadgesJS = {
	inactive: 0, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: {
        'Slopijoe': ['retired'],
        'Awyman13': ['News Team'],
        'Arks93': ['Founder'], 
    },
	names: {} // Badge display names
};
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

//Username 
var username = wgUserName; 
if (username !== null) { 
    $('#InputUsername').html(username); 
}
//********************************************************************
// Added Multiple Upload Functionality, credit to Gamepedia wiki
//********************************************************************

mw.loader.using(['site', 'mediawiki.util']).then(function() {
	i18n = {
		multiupload: "Upload multiple files:",
		yes: "Yes",
		no: "No",
		sourcefiles: "Source files:",
		uploadfiles: "Upload files",
		nofiles: "Please select some files first.",
		nolicense: "Please select a valid license first.",
		summary: "Summary",
		license: "License",
		uploading: "Uploading files...",
		uploaded: "Uploaded:",
		failed: "Failed:",
		done: "Done."
	};
	if (mw.config.get("wgCanonicalSpecialPageName")!=="Upload") return;	
	$("#wpUploadFile").parent().parent().addClass("regularFileSelect");
	$("tr.regularFileSelect").before('<tr><td class="mw-label">'+i18n.multiupload+'</td><td class="mw-input"><label><input type="radio" name="multipleFiles" value="'+i18n.yes+'" /> '+i18n.yes+'</label> &nbsp; <label><input type="radio" name="multipleFiles" value="'+i18n.no+'" checked="" /> '+i18n.no+'</label></td></tr>');
	$("tr.regularFileSelect").after('<tr class="multipleFileSelect" style="display:none;"><td class="mw-label">'+i18n.sourcefiles+'</td><td class="mw-input"><input type="file" id="multiupload" multiple /></td></tr>');
	$("input[name='wpUpload']").addClass("regularFileSelect");
	$("#wpDestFile").parent().parent().addClass("regularFileSelect");
	$("#wpIgnoreWarning").parent().parent().addClass("regularFileSelect");
	$("input[name='wpUpload']").after('<input type="button" value="'+i18n.uploadfiles+'" class="multipleFileSelect" style="display:none;" id="multiFileSubmit" />');
	$("input[name='multipleFiles']").change(function(){
		if (this.value===i18n.yes) {
			$(".regularFileSelect").hide();
			$(".multipleFileSelect").show();
		}
		else {
			$(".regularFileSelect").show();
			$(".multipleFileSelect").hide();
		}
	});
	$("#multiFileSubmit").click(function() {
		files = $("#multiupload")[0].files;
		if (files.length === 0) {
			alert(i18n.nofiles);
			return false;
		}
		if ($("#wpLicense option:selected").val() === "" && !mw.config.get('UMFBypassLicenseCheck')) {
			alert(i18n.nolicense);
			return false;
		}
		comment = $("#wpUploadDescription").val();
		license = ($("#wpLicense option:selected").val() === "")?"":"\n== "+i18n.license+" ==\n"+$("#wpLicense option:selected").prop("title");
		text = (comment !== "" ? "== " + i18n.summary + " ==\n" + comment : "") + license;
		watch = "preferences";
		if ($("#wpWatchthis").is(":checked")) watch = "watch";
		else watch = "nochange";
		curFile = 0;
		$("#firstHeading").text(i18n.uploading);
		$("#mw-content-text").html("<h3>"+i18n.uploaded+"</h3><ul></ul><div style='display:none;' id='multiUploadFailed'><h3>"+i18n.failed+"</h3><ul></ul></div>");
		function gNF() {
			if(curFile>files.length) {
				$("#mw-content-text").append("<h3>"+i18n.done+"</h3>");
				return;
			}
			if(files[curFile] === undefined) {
				curFile++;
				gNF();
				return;
			}
			fd = new FormData();
			fd.append("action","upload");
			fd.append("token",mw.user.tokens.get('editToken'));
			fd.append("filename",files[curFile].name);
			fd.append("file",files[curFile]);
			fd.append("comment",comment);
			fd.append("text",text);
			fd.append("watchlist",watch);
			fd.append("ignorewarnings",1);
			fd.append("format","json");
			$.ajax({
				url: mw.util.wikiScript('api'),
				method:'POST',
				data:fd,
				cache:false,
				contentType:false,
				processData:false,
				type:'POST'
			}).done(function(d){
				if (d.error == undefined) {
					$("#mw-content-text > ul").append('<li><a href="'+d.upload.imageinfo.descriptionurl+'" target="_blank">'+d.upload.filename+'</a></li>');
				}
				else {
					$("#multiUploadFailed ul").append('<li>'+files[curFile].name+'</li>');
				$("#multiUploadFailed").show();
				}
				curFile++;
				gNF();
			}).fail(function(d) {
				$("#multiUploadFailed ul").append('<li>'+files[curFile].name+'</li>');
				$("#multiUploadFailed").show();
				curFile++;
				gNF();
			});
		}
		gNF();
	});
});
/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Allows intergration with Discord [https://discord.com]
 */
(function() {
    'use strict';
    var mconfig = mw.config.get([
        'wgContentLanguage',
        'wgUserLanguage',
        'wgUserName'
    ]);
    if (window.DiscordIntegratorLoaded) {
        return;
    }
    window.DiscordIntegratorLoaded = true;
    /**
     * Main object
     * @static
     */
    var DiscordIntegrator = {
        /**
         * Configuration for the plugin
         * @property config
         * @type {Object}
         */
        config: (window.DiscordIntegratorConfig || {}).siderail || {},
        /**
         * Preloads translations.
         */
        imported: function(i18n) {
            $.when(
                window.dev.i18n.loadMessages('DiscordIntegrator', {
                    cacheVersion: 3
                }),
                mw.loader.using('mediawiki.api')
            ).then($.proxy(this.preload, this));
        },
        /**
         * Preload resources
         */
        preload: function(i18n) {
            this.i18n = i18n;
            mw.hook('wikipage.content').add($.proxy(this.insertToContent, this));
            this.api = new mw.Api();
            this.api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: [
                    'id',
                    'title',
                    'moduleHeight',
                    'theme',
                    'width',
                    'height',
                    'text',
                    'logged-in',
                    'footer',
                    'username'
                ].map(function(el) {
                    return 'Custom-DiscordIntegrator-config-' + el;
                }).join('|'),
                amlang: mconfig.wgUserLanguage === 'qqx' ?
                    mconfig.wgContentLanguage :
                    mconfig.wgUserLanguage,
                uselang: 'content', // T97096
                smaxage: 300,
                maxage: 300
            }).done($.proxy(function(d) {
                if (!d.error) {
                    d.query.allmessages.forEach(function(el) {
                        if(el['*']) {
                            this.config[el.name.substring(32)] = el['*'];
                        }
                    }, this);
                    this._loading = 0;
                    ['text', 'title', 'footer'].forEach(this.parse, this);
                    if (this._loading === 0) {
                        this.init();
                    }
                }
            }, this));
        },
        /**
         * Parse the configuration that needs to be parsed
         */
        parse: function(msg) {
            if (this.config[msg]) {
                ++this._loading;
                this.api.get({
                    action: 'parse',
                    text: this.config[msg],
                    // Also cache the individual parser outputs of messages for anonymous users.
                    // This can be a bit more aggressive as the cache varies on the
                    // actual message text, which often contains no wikitext at all.
                    smaxage: 86400,
                    maxage: 86400
                }).done($.proxy(function(d) {
                    if (!d.error) {
                        this.config[msg] = d.parse.text['*'];
                        if (--this._loading === 0) {
                            this.init();
                        }
                    }
                }, this));
            }
        },
        /**
         * Initializing
         */
        init: function() {
            if (this.config.id && $('#WikiaRail').length > 0) {
                var clas = $('#WikiaRail').attr('class');
                if (clas) {
                    var classSplit = clas.split(/\s+/);
                    if (classSplit.indexOf('loaded') === -1 && classSplit.indexOf('is-ready') === -1) {
                        $('#WikiaRail').on('afterLoad.rail', $.proxy(this.insertToSiderail, this));
                    } else {
                        this.insertToSiderail();
                    }
                } else {
                    this.insertToSiderail();
                }
            }
        },
        /**
         * Inserting the widget to siderail
         */
        insertToSiderail: function() {
            var filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
            // TODO: Insert some user configuration here
            var el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });
            if (this.config.title) {
                el.append(
                    $('<h2>', {
                        'class': 'activity-heading',
                        html: this.config.title.trim()
                    })
                );
            }
            if (this.config.text) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleText',
                        html: this.config.text
                    })
                );
            }
            el.append(this.generateContent(this.config));
            if (this.config.footer) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleFooter',
                        html: this.config.footer
                    })
                );
            }
            if (filter.length > 0) {
                el.insertAfter(filter);
            } else {
                $('#WikiaRail').prepend(el);
            }
            if (this.config.moduleHeight) {
                mw.util.addCSS('.DiscordIntegratorModule { height: ' + Number(this.config.moduleHeight) + 'px; }');
            }
            mw.hook('DiscordIntegrator.added').fire(el);
        },
        /**
         * Finding the designated places in content
         * in which to place the widget and placing it
         */
        insertToContent: function($content) {
            $content.find('.DiscordIntegrator:not(.loaded)').each($.proxy(function(cabbage, el) {
                el = $(el);
                el.html(this.generateContent(el.data()))
                  .addClass('loaded');
            }, this));
        },
        /**
         * Determines the theme of the widget.
         * @param {string} config Configured theme
         * @return {string} 'light' or 'dark' depending on the wiki theme and configuration
         */
        determineTheme: function(config) {
            // If explicitly configured to light or dark.
            if (config === 'dark') {
                return 'dark';
            }
            if (config === 'light') {
                return 'light';
            }
            // If not configured, and the current FandomDesktop theme is set.
            if ($('body').hasClass('theme-fandomdesktop-light')) {
                return 'light';
            }
            if ($('body').hasClass('theme-fandomdesktop-dark')) {
                return 'dark';
            }
            // Otherwise, default to dark.
            return 'dark';
        },
        /**
         * Generating widget content from an object
         * @return {string} Content of the widget
         */
        generateContent: function(config) {
            if (!config.id || !String(config.id).match(/\d{17,19}/)) {
                return this.i18n.msg('error').parse();
            }
            if (
                (
                    config.loggedIn === true ||
                    Boolean(config['logged-in']) === true &&
                    config['logged-in'] !== 'false' &&
                    config['logged-in'] !== '{{{loggedIn}}}'
                ) && !mconfig.wgUserName
            ) {
                return this.i18n.msg('login').parse();
            }
            var username = config.username === '@disabled' ?
                 '' :
                 config.username === '@function' &&
                 typeof window.DiscordIntegratorGetUsername === 'function' ?
                     window.DiscordIntegratorGetUsername() :
                     config.username || mconfig.wgUserName;
            return mw.html.element('iframe', {
                src: 'https://discord.com/widget?id=' + config.id +
                     '&theme=' + this.determineTheme(config.theme) +
                     '&username=' + encodeURIComponent(username),
                width: config.width || '100%',
                height: config.height || '400px',
                allowtransparency: 'true',
                frameborder: '0',
                title: this.i18n.msg('title').plain()
            });
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    }).then($.proxy(DiscordIntegrator.imported, DiscordIntegrator));
})();