

/* ChatReports.js is a script made for active VSTF Reporters.
 * It's planned to have VSTFReports three buttons in one modal window.
 * Author: Anonminati
 * 
 * If you've got a suggestion or found a bug, contact Anonminati!
 */

$(function() {
    "use strict";
    var ChatDeveloperTools = {
        createLink: function(link, title) {
            return $("<a>", {
                href: (function() {
                    if (link.indexOf("global") !== -1) {
                        return "https://community.wikia.com/wiki/Special:MyPage/" + link;
                    } else if (link.indexOf("MediaWiki") !== -1) {
                        return mw.util.getUrl(link);
                    } else {
                        switch(link) {
                            case "ScriptDoc": return "https://c.wikia.com/wiki/User:Anonster";
                            case "ScriptCode": return "https://dev.wikia.com/wiki/MediaWiki:ChatDeveloperTools.js";
                            case "ScriptI18n": return "https://dev.wikia.com/wiki/MediaWiki:Custom-ChatDeveloperTools/i18n.json";
                            default: return mw.util.getUrl("Special:MyPage/") + link;
                        }
                    }
                })(),
                target: "_blank",
                text: title
            });
        },
        createSection: function(obj) {
            var collection = [], counter = 0;
            for (var key in obj) {
                collection.push(this.createLink(key, obj[key]));
                counter++;
                if (counter !== Object.keys(obj).length) {
                    collection.push(" • ");
                }
            }
            return collection;
        },
        createSectionsObject: function() {
            var sections = {
                
            };
            if (/sysop|content-volunteer|vstf|staff|helper/.test(mw.config.get("wgUserGroups").join())) {
                sections.admintools = {
                    Block: this.i18n.msg("block").plain(),
                    UserRights: this.i18n.msg("userrights").plain(),
                    ThemeDesigner: this.i18n.msg("themedesigner").plain(),
                    Insights: this.i18n.msg("insights").plain()
                };
            }
            sections.thisscript = {
                ScriptDoc: this.i18n.msg("thisdoc").plain(),
                ScriptCode: this.i18n.msg("thiscode").plain(),
                ScriptI18n: this.i18n.msg("thisi18n").plain()
            };
            return sections;
        },
        createContent: function() {
            var sections = [], sectionsObj = this.createSectionsObject();
            for (var key in sectionsObj) {
                sections.push(this.createSection(sectionsObj[key]));
            }
            return sections;
        },
        fillUpContent: function(element) {
            var sections = this.createContent(), sectionsObj = this.createSectionsObject(), counter = 0;
            var $div;
            for (var key in sectionsObj) {
                $div = element.append(
                    $("<span>").append(
                        $("<b>", {text: this.i18n.msg(key).plain()}), ": ", sections[counter]
                    )
                );
                counter++;
                if (counter !== Object.keys(sectionsObj).length) {
                    $div.append($("<br/>"));
                }
            }
            return $div;
        },
        showModal: function() {
            $.showCustomModal(
                this.i18n.msg("modaltitle").plain(),
                this.fillUpContent($("<div>")),
                {
                    id: "ChatReports"
                }
            ).css({
                width: "auto",
                height: "auto",
                "margin-left": "-303px"
            });
        }
    };

    var preloaded = 0;
    function preload() {
        if (++preloaded === 1) {
            new dev.chat.Button({
                name: "DevToolls",
                attr: {
                    text: ChatDeveloperTools.i18n.msg("modalbutton").plain(),
                    click: function() {
                        ChatDeveloperTools.showModal();
                    }
                }
            });
        }
    }
    mw.hook("dev.i18n").add(function(i18nd) {
        i18nd.loadMessages("ChatDeveloperTools").then(function(i18n) {
            ChatDeveloperTools.i18n = i18n;
            preload();
        });
    });
 
    importArticles({
        type: "script",
        articles: [
            "u:dev:Chat-js.js",
            "u:dev:MediaWiki:I18n-js/code.js"
        ]
    });
});