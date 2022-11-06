/* jshint curly:false, jquery:true, browser:true */
/* global mediaWiki:true, importArticles:true, importArticle:true, dev:true */

;(function ($, mw, cfg) {
    'use strict';
    
    var urlVars = new URLSearchParams(location.search);
    // killswitch & dblrun protection
    if (urlVars.get('nodemo') || cfg.loaded) return;
    cfg.loaded = true;
    
    var includes = {
        /**
         * a-z ordered
         * 
         * possible fields:
         *
         * - selector: element(s) to look for in the page
         * - page: name of the page
         * - subpages: exclude subpages when set to false (defaults to true)
         * - exec: callback to execute when selector or page are detected
         * - styles: stylesheet(s) to load when selector or page are detected
         * - scripts: script(s) to load when selector or page are detected
         * - disabledByDefault: demo only loads with a `demo` parameter in the URL
         *
         **/
		
		AccentColorButtons: {
			page: 'AccentColorButtons',
			styles: 'MediaWiki:AccentColorButtons.css'
		},
		
		Accordion: {
			page: 'Accordion',
			styles: 'MediaWiki:Accordion.css'
		},
		
        ActivityFeedMimic: {
            page: 'ActivityFeedMimic',
            styles: 'MediaWiki:ActivityFeedMimic.css'
        },
		
        BackToTopButton: {
            page: 'BackToTopButton',
            scripts: 'MediaWiki:BackToTopButton/code.js',
            exec: function () {
                window.BackToTopModern = true;
            }
        },
        
        BalancedDiscord: {
			page: 'BalancedDiscord',
			styles: 'MediaWiki:BalancedDiscord.css'
		},
		
		BalancedGlobalNavigation: {
			page: 'BalancedGlobalNavigation',
			styles: 'MediaWiki:BalancedGlobalNavigation.css'
		},
		
		BalancedPageBottom: {
			page: 'BalancedPageBottom',
			styles: 'MediaWiki:BalancedPageBottom.css'
		},
		
		BalancedScrollbar: {
			page: 'BalancedScrollbar',
			styles: 'MediaWiki:BalancedScrollbar.css'
		},
		
		BalancedUCX: {
			page: 'BalancedUCX',
			styles: 'MediaWiki:BalancedUCX.css'
		},
		
		BringExternalLinkIconsBack: {
			page: 'BringExternalLinkIconsBack',
			styles: 'MediaWiki:BringExternalLinkIconsBack.css'
		},
		
        CalendarWidget: {
            page: 'Global_Lua_Modules/Calendar_widget',
            styles: 'MediaWiki:Global_Lua_Modules/Calendar_widget.css'
        },

		ClassicDevWikiTheme: {
			page: 'ClassicDevWikiTheme',
			styles: 'MediaWiki:ClassicDevWikiTheme.css'
		},
		
		CodeblockLineNumbers: {
			page: 'MediaWiki:CodeblockLineNumbers/code.js',
			styles: 'MediaWiki:CodeblockLineNumbers/code.js'
		},
		
        Contextlink: {
            selector: '.context-link',
            styles: 'MediaWiki:Global_Lua_Modules/Context-link.css'
        },
		
		CSS3Tooltip: {
            page: 'CSS3Tooltip',
            styles: 'MediaWiki:CSS3Tooltip.css'
        },
		
        DataTables: {
            selector: '.datatable',
            scripts: 'MediaWiki:DataTables.js'
        },
		
        DiscordBanner: {
            page: 'DiscordBanner',
            scripts: 'MediaWiki:DiscordBanner.js',
            exec: function () {
                window.DiscordBannerSettings = {
                    inviteLink: 'wPrVUj4'
                };
                console.log('[DemoScripts] We\'re on the DiscordBanner page, so I hid the Discord rail module.');
                mw.util.addCSS('#WikiaRail .discord-module { display: none; }');
            }
        },
        
        DiscordGlobalFooter: {
            page: 'DiscordGlobalFooter',
            styles: 'MediaWiki:DiscordGlobalFooter.css'
        },
        
        DiscordTheme: {
            page: 'DiscordTheme',
            styles: 'MediaWiki:DiscordTheme.css'
        },
        
        DiscussionsActivity: {
            page: 'Special:DiscussionsActivity',
            scripts: 'MediaWiki:DiscussionsActivity.js'
        },

        DiscussionsFeed: {
            page: 'Special:DiscussionsFeed',
            scripts: 'MediaWiki:DiscussionsFeed.js'
        },

        DiscussionsRC: {
            page: 'Special:DiscussionsRC',
            scripts: 'MediaWiki:DiscussionsRC.js'
        },

        Doqs: {
        	page: 'Doqs/demo',
        	styles: 'MediaWiki:Doqs.css'
        },
		
        DropdownMenu: {
            selector: '.custom-dropdown',
            styles: 'MediaWiki:DropdownMenu.css'
        },
        
        DynamicOldNav: {
            page: 'DynamicOldNav',
            styles: 'MediaWiki:DynamicOldNav.css'
        },
        
		EditcountTab: {
			page: 'User:Puxlit',
			scripts: 'MediaWiki:EditcountTab.js'
		},
		
		EditcountTag: {
			page: 'User:Wikia',
			scripts: 'MediaWiki:EditcountTag/code.js'
		},
		
		EditorColorPicker: {
			page: 'Special:EditorColorPicker',
			scripts: 'MediaWiki:EditorColorPicker.js'
		},
        
        EmeraldGlobalNav: {
            page: 'EmeraldGlobalNav',
            styles: 'MediaWiki:EmeraldGlobalNav.css'
        },
        
        ExternalIcons: {
            page: 'ExternalIcons',
            styles: 'MediaWiki:ExternalIcons.css'
        },
        
        FadedDropdowns: {
            page: 'FadedDropdowns',
            styles: 'MediaWiki:FadedDropdowns.css'
        },
		
        FandomIcons: {
            page: 'FandomIcons',
            styles: 'MediaWiki:FandomIcons.css'
        },
		
        Fandom95: {
            page: 'Fandom95',
            styles: 'MediaWiki:Fandom95.css',
            disabledByDefault: true
        },
		
        FandomXP: {
            page: 'FandomXP',
            styles: 'MediaWiki:FandomXP.css'
        },
        
        FanFeedEnhancements: {
            page: 'FanFeedEnhancements',
            styles: 'MediaWiki:FanFeedEnhancements.css'
        },
        
        FANSUN: {
            page: 'FANSUN',
            styles: 'MediaWiki:FANSUN.css'
        },
		
        FastFileDelete: {
            page: 'FastFileDelete',
            scripts: 'MediaWiki:FastFileDelete.js',
            exec: function () {
                (window.dev = window.dev || {}).fastFileDelete = window.dev.fastFileDelete || {};
                window.dev.fastFileDelete.groups = '\\*';
            }
        },
        
        FatButton: {
            page: 'FatButton',
            styles: 'MediaWiki:FatButton.css'
        },
		
		FileLogs: {
			page: 'File:QQX_Oasis.png',
			scripts: 'MediaWiki:FileLogs.js'
		},
		
		Flags: {
			selector: '.flag-icon',
			scripts: 'MediaWiki:Flags/code.js'
		},
        
        FloatingTitle: {
            page: 'FloatingTitle',
            styles: 'MediaWiki:FloatingTitle.css'
        },
		
		GamepediaTheme: {
			page: 'GamepediaTheme',
			scripts: 'MediaWiki:GamepediaNav.js',
			styles: ['MediaWiki:GamepediaNav.css','MediaWiki:GamepediaToolbar.css','MediaWiki:GamepediaDiscord.css'],
			exec: function() {
				$('body').addClass('is-gamepedia');
			}
		},
		
		GlobalNavDarkTheme: {
			page: 'GlobalNavDarkTheme',
			styles: 'MediaWiki:GlobalNavDarkTheme.css'
		},
		
        GlobalNavigationIcons: {
            page: 'GlobalNavigationIcons',
            styles: 'MediaWiki:GlobalNavigationIcons.css'
        },
        
        GradientHeader: {
            page: 'GradientHeader',
            styles: 'MediaWiki:GradientHeader.css'
        },
        
        Heimu: {
            page: 'Heimu',
            styles: 'MediaWiki:Heimu.css'
        },
        
        HorizontalMCF: {
            page: 'HorizontalMCF',
            styles: 'MediaWiki:HorizontalMCF.css'
        },
		
        HydraRevived: {
            page: 'HydraRevived',
            scripts: 'MediaWiki:HydraRevived.js',
            styles: ['MediaWiki:HydraRevived/main.css', 'MediaWiki:HydraRevived/preload.css']
        },
		
        InfoWidgets: {
            selector: '#infowidgets-demo',
            styles: 'MediaWiki:InfoWidgets/demo.css',
            scripts: 'MediaWiki:InfoWidgets/demo.js'
        },
		
		InterlanguageFlags: {
			page: 'InterlanguageFlags',
			styles: 'MediaWiki:InterlanguageFlags.css'
		},
		
        Katsuragi: {
            page: 'Katsuragi',
            styles: 'MediaWiki:Katsuragi.css'
        },
		
        Less: {
            selector: 'body.page-MediaWiki_Custom-Less_test_less, body.page-MediaWiki_Custom-Less_test_css',
            scripts: 'MediaWiki:Less/code.2.js',
            exec: function () {
                // example config used for testing
                window.lessOpts = [{
                    target: 'MediaWiki:Custom-Less/test.css',
                    source: 'MediaWiki:Custom-Less/test.less',
                    load: [
                        'MediaWiki:Custom-Less/test.css',
                        'MediaWiki:Custom-Less/test.less'
                    ],
                    header: 'MediaWiki:Custom-less-header'
                }];
                window.lessConfig = {
                    allowed: ['user']
                };
            }
        },
        
        LeafyStrap: {
        	page: 'LeafyStrap/demo',
        	styles: 'MediaWiki:LeafyStrap.css'
        },
        
	    ListGroupMembers: {
			page: 'Special:BlankPage',
			scripts: 'MediaWiki:ListGroupMembers.js'
		},
		
		LocalNavExploreIcons: {
			page: 'LocalNavExploreIcons',
			scripts: 'MediaWiki:LocalNavExploreIcons.css'
		},
		
		MastheadGender: {
			page: 'User:Kirkburn',
			scripts: 'MediaWiki:MastheadGender/code.js'
		},
		
		MastheadRightsBadge: {
			page: 'User:Fandom',
			scripts: 'MediaWiki:MastheadRightsBadge.js'
		},
		
        Mbox: {
            selector: '.mbox',
            styles: 'MediaWiki:Global_Lua_Modules/Mbox.css'
        },
		
        MiniComplete: {
            page: 'MiniComplete',
            exec: function () {
                mw.loader.implement( 'minicomplete',
                    [ '/load.php?mode=articles&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AMediaWiki%3AColors%2Fcode.js%7Cu%3Adev%3AMediaWiki%3AMiniComplete%2Fcode.js&only=scripts' ],
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
        },
        
        MinimalTestModeAlert: {
            page: 'MinimalTestModeAlert',
            scripts: 'MediaWiki:MinimalTestModeAlert.js',
            exec: function() {
                // This variable doesn't seem to affect anything else
                mw.config.set('wgIsTestModeEnabled', true);
            }
        },
        
        MinutelyWider: {
        	page: 'MinutelyWider',
        	scripts: 'MediaWiki:MinutelyWider.css'
        },
        
        MisspelledPage: {
            // Cannot be moved to JSON, does not match base page name.
            page: 'MisspelledPlge',
            scripts: 'MediaWiki:MisspelledPage/code.js'
        },
        
        ModernWikiNavigation: {
            page: 'ModernWikiNavigation',
            styles: 'MediaWiki:ModernWikiNavigation.css'
        },
		
	    MoreSocialLinks: {
			page: 'User:KockaAdmiralac',
			scripts: 'MediaWiki:MoreSocialLinks.js'
		},
		
		MultipleActivity: {
			page: 'Special:MultipleActivity',
			scripts: 'MediaWiki:MultipleActivity.js'
		},
		
        Navbox: {
            page: 'Global_Lua_Modules/Navbox',
            styles: 'MediaWiki:Global_Lua_Modules/Navbox.css',
        },
        
        NavboxBuilder: {
            selector: '.navbox .navbox-table-wrapper',
            styles: 'MediaWiki:Global_Lua_Modules/NavboxBuilder.css'
        },
        
        NoGlobalNav: {
        	page: 'NoGlobalNav',
        	styles: 'MediaWiki:NoGlobalNav.css',
        	scripts: 'MediaWiki:NoGlobalNav.js'
        },
        
        OasisRevived: {
            page: 'OasisRevived',
            styles: 'MediaWiki:OasisRevived.css',
            scripts: 'MediaWiki:OasisRevived.js',
            disabledByDefault: true
        },
        
        Obfuscator: {
        	page: 'Obfuscator/demo',
        	styles: 'MediaWiki:Obfuscator.css'
        },
        
        OldFandomColors: {
            page: 'OldFandomColors',
            styles: 'MediaWiki:OldFandomColors.css',
            scripts: 'MediaWiki:OldFandomColors.js'
        },
        
        OldWikiaBar: {
            page: 'OldWikiaBar',
            styles: 'MediaWiki:OldWikiaBar.css'
        },
		
        PortableNavbox: {
            selector: '.portable-infobox.pi-theme-navbox',
            styles: 'MediaWiki:PortableNavbox.css'
        },
		
	    ProfileTags: {
			page: 'User:Rappy',
			scripts: 'MediaWiki:ProfileTags.js'
		},
		
	    ProtectionIcons: {
			page: 'Module:Sandbox',
			scripts: 'MediaWiki:ProtectionIcons.js'
		},
		
        ProgressBar: {
            page: 'ProgressBar',
            styles: 'MediaWiki:ProgressBar.css'
        },
		
        PseudoMonobook: {
            page: 'PseudoMonobook',
            styles: 'MediaWiki:PseudoMonobook.css'
        },
		
        QuickLogs: {
            page: 'Special:Contributions/Wikia',
            scripts: 'MediaWiki:QuickLogs/code.js'
        },
		
        Quote: {
            selector: '.pull-quote',
            styles: 'MediaWiki:Global_Lua_Modules/Quote.css'
        },
		
        ReferencePopups: {
            page: 'ReferencePopups/demo',
            scripts: 'MediaWiki:ReferencePopups/custom.js',
            styles: 'MediaWiki:ReferencePopups/demo.css',
            subpages: false
        },
        
        ResponsiveMobile: {
            page: 'ResponsiveMobile',
            styles: 'MediaWiki:ResponsiveMobile.css'
        },
        
        SpoilerBlur: {
        	page: 'SpoilerBlur',
        	styles: 'MediaWiki:SpoilerBlur.css'
        },
		
	    SearchSuggest: {
			page: 'Special:Search',
			scripts: 'MediaWiki:SearchSuggest/code.js'
		},
		
        SnowStorm: {
            page: 'SnowStorm/Demo',
            scripts: 'MediaWiki:SnowStorm.js',
            styles: 'MediaWiki:SnowStorm/demo.css'
        },
		
        SnowStorm1: {
            page: 'SnowStorm/Demo1',
            scripts: ['MediaWiki:SnowStorm.js/DemoSettings1.js' , 'MediaWiki:SnowStorm.js'],
            styles: 'MediaWiki:SnowStorm/demo.css'
        },
		
        SnowStormCSS: {
            page: 'SnowStormCSS',
            styles: 'MediaWiki:SnowStormCSS.css'
        },
		
        Standard_Edit_Summary: {
            page: 'Standard_Edit_Summary',
            scripts: 'MediaWiki:Standard_Edit_Summary/code.js',
            exec: function() {
                (window.dev = window.dev || {}).editSummaries = {
                    select: 'MediaWiki:Custom-StandardEditSummaries'
                };
            }
        },
        
        Stella: {
        	page: 'Special:BlankPage',
        	scripts: 'MediaWiki:Stella.js'
        },
        
        Tabber: {
            page: 'Global_Lua_Modules/Tabber',
            styles: 'MediaWiki:Global_Lua_Modules/Tabber.css'
        },
		
        TableHash: {
            page: 'TableHash',
            scripts: 'MediaWiki:TableHash.js',
            styles: 'MediaWiki:TableHash.css'
        },
        
        ThemeColorClasses: {
        	page: 'ThemeColorClasses',
        	styles: 'MediaWiki:ThemeColorClasses.css'
        },
        
        TimedSlider: {
            page: 'TimedSlider',
            scripts: 'MediaWiki:TimedSlider/code.js',
            styles: 'MediaWiki:TimedSlider.css'
        },
		
        Tooltips: {
            page: 'Tooltips',
            scripts: 'MediaWiki:Tooltips.js',
            styles: 'MediaWiki:Tooltips.css',
            exec: function () {
                window.tooltips_list = [
                    {
                        classname: 'custom-tooltip-text',
                        text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed"
                    }, {
                        classname: 'custom-tooltip-parse',
                        parse: '{|style="white-space:nowrap;"\n!Parameter:\n|<#parameter#>\n|-\n!Lc:\n|{'+'{lc:<#parameter#>}}\n|-\n!Uc:\n|{'+'{uc:<#parameter#>}}\n|-\n!PAGENAME:\n|{'+'{PAGENAME}}\n|}'
                    }
                ];
                window.tooltips_config = { offsetX: 15, offsetY: 15 };
            }
        },
		
        TopGlobalNav: {
            page: 'TopGlobalNav', 
            styles: 'MediaWiki:TopGlobalNav.css'
        },
        TZclock: {
            page: 'TZclock',
            scripts: 'MediaWiki:TZclock.js',
            styles: 'MediaWiki:TZclock.css'
        },
		
        UpgradedToolbar: {
            page: 'UpgradedToolbar',
            styles: 'MediaWiki:UpgradedToolbar.css'
        },
		
        UserActivityTab: {
            page: 'User:' + mw.config.get('wgUserName'),
            scripts: 'MediaWiki:UserActivityTab/code.js'
        },
        
        UserAnimations: {
            page: 'UserAnimations',
            styles: 'MediaWiki:UserAnimations.css'
        },
        
        UserAvatarLink: {
            page: 'UserAvatarLink',
            scripts: ['MediaWiki:UserAvatarLink.js', 'MediaWiki:User_Avatar_Finder/code.js']
        },
		
	    UserStatus: {
			page: 'User:SapphireSonata',
			scripts: 'MediaWiki:UserStatus/demo.js'
		},
		
        /* // Disabled in Favour of ProfileTags
        UserTags: {
            exec: function () {
                window.UserTagsJS = {
                    modules: {
                        mwGroups: ['bureaucrat', 'rollback', 'sysop', 'bot', 'bot-global'],
                        metafilter: {
                            sysop: ['bureaucrat']
                        }
                    }
                };
            },
            scripts: 'MediaWiki:UserTags/code.js'
        },*/

        WantedPagesFilter: {
            page: 'WantedPagesFilter',
            scripts: 'MediaWiki:WantedPagesFilter/code.js',
            exec: function () {
                mw.config.set('wgCanonicalSpecialPageName', 'Wantedpages');
            }
        },
        
        WikiaCommunityCentralTheme: {
        	page: 'WikiaCommunityCentralTheme',
        	styles: 'MediaWiki:WikiaCommunityCentralTheme.css'
        },
        
	    WikiActivity: {
			page: 'Special:WikiActivity',
	        scripts: 'MediaWiki:WikiActivity.js'
	    },
	    
	    WikiaNavigationBarStyle: {
	    	page: 'WikiaNavigationBarStyle',
	    	styles: 'MediaWiki:WikiaNavigationBarStyle.css'
	    },

        Wikificator: {
            page: 'Wikificator',
            scripts: 'MediaWiki:Wikificator.js',
            exec: function () {
                if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1) return;
                mw.loader.load('jquery.textSelection');
                window.wikificator = window.wikificator || {};
                window.wikificator.forced = true;
                var t = $('#wpTextbox1').text();
                $('#wpTextbox1').replaceWith($('<textarea>', {id: 'wpTextbox1', value: t, text: t, style: 'width:inherit;min-width:50%;height:inherit;min-height:100px;'}));
            }
        },
      
        WikiForum: {
            page: 'WikiForum',
            scripts: [
                'MediaWiki:WikiForum/core.js',
                'MediaWiki:WikiForum/theme/default.js',
                'MediaWiki:WikiForum/loader/default.js'
            ],
            exec: function () {
                mw.hook('WikiForum').add(function (Core) {
                    var conf = mw.config.get();
                    if (
                      !conf.wgPageName.startsWith('WikiForum/demo') ||
                      conf.wgAction !== 'view'
                    ) return;
                    Core.renderer.fromPage(conf.wgPageName);
                });
            },
        }
    };

    function merge (other) {
        /*jshint validthis:true*/
        var self = this;

        if (Array.isArray(other)) {
            other.forEach(function (elem) {
                if (self.indexOf(elem) === -1) {
                    self.push(elem);
                }
            });
        } else {
            self.push(other);
        }
    }

    $.get(mw.util.wikiScript('api'), {
        action: 'query',
        format: 'json',
        titles: 'MediaWiki:Custom-DemoScripts.json',
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main',
        indexpageids: 1
    }).always(function(data) {
        if (typeof data === 'object') {
            data = JSON.parse(data.query.pages[data.query.pageids[0]].revisions[0].slots.main['*']);
            $.each(data, function() {
                this.restricted = 1;
            });
            // keep includes on top and preserve it from overwriting by data
            includes = $.extend(true, {}, includes, data, includes);
        }
        $(function () {
            var scripts = [],
                styles = [],
                page = mw.config.get('wgPageName'),
                basepage = page.replace(/\/.*/, '');

            scripts.merge = merge;
            styles.merge = merge;

            $.each(includes, function (name, actions) {
                var pageRestriction = new RegExp('^MediaWiki:' + basepage + '(/.*)*\\.js$');
                if (actions.restricted) {
                    actions.selector = '#mw-content-text ' + (actions.selector || '').split(',')[0];
                    if (actions.scripts) {
                        if (actions.scripts instanceof Array) {
                            actions.disabled = actions.disabled || !actions.scripts.every(function(v) {
                                return (!/\|/.test(v) && pageRestriction.test(v));
                            });
                        } else {
                            actions.disabled = actions.disabled ||
                                (!(!/\|/.test(actions.scripts) && pageRestriction.test(actions.scripts)));
                        }
                    }
                }

                if (actions.disabled) {
                    return;
                }

                if (actions.disabledByDefault && !urlVars.get('demo')) {
                    return;
                }

                if (actions.selector && !$(actions.selector).length) {
                    return;
                }

                if (actions.page && actions.page !== page && (actions.subpages === false || actions.page !== basepage)) {
                    return;
                }

                if (actions.exec && !actions.restricted) {
                    actions.exec();
                }

                if (actions.styles && !actions.restricted) {
                    styles.merge(actions.styles);
                }

                if (actions.scripts) {
                    scripts.merge(actions.scripts);
                }
            });
            if (scripts.length) {
                importArticles({ type: 'script', articles: scripts });
            }
            if (styles.length) {
                importArticles({ type: 'style', articles: styles });
            }
        });
    });
}(jQuery, mediaWiki, (window.dev = window.dev || {}).demoscripts = window.dev.demoscripts || {}));