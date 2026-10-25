/**
 * UsernameAvailability/code.js (revised)
 * @file Lets users check whether a username already exists, from a modal
 *       opened through the "My Tools" menu.
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen> (original script)
 * @external "mediawiki.util"
 * @external "mediawiki.api"
 * @external "mediawiki.Title"
 * @external "jQuery"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, jQuery, importArticles, dev */

(function ($, mw) {
    "use strict";

    if (
        window.isUsernameAvailabilityLoaded ||
        $("#usernameavailability-a").length !== 0
    ) {
        return;
    }
    window.isUsernameAvailabilityLoaded = true;

    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:I18n-js/code.js",
            "u:dev:MediaWiki:ShowCustomModal.js"
        ]
    });

    var MAX_LENGTH = 30;

    // Characters that can never be part of a username
    var INVALID_CHARS = /[#<>\[\]|{}\/@:]/;

    var TOOLS_MENU = "#my-tools-menu";
    var COMMUNITY_CONTRIBS = "https://community.fandom.com/wiki/Special:Contributions/";
    var i18n;

    function normalize(name) {
        return String(name)
            .replace(/_/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function comparable(name) {
        return normalize(name).toLowerCase();
    }

    function formatDate(iso) {
        var date;

        if (!iso) {
            return "";
        }

        date = new Date(iso);
        if (isNaN(date.getTime())) {
            return String(iso);
        }

        try {
            return date.toLocaleDateString(mw.config.get("wgContentLanguage"), {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC"
            });
        } catch (e) {
            return date.toISOString().slice(0, 10);
        }
    }

    function warn(message, detail) {
        if (window.console && window.console.warn) {
            window.console.warn("[UsernameAvailability] " + message, detail || "");
        }
    }

    function log(html) {
        $("#ua-log").prepend(html + "<br />");
    }

    // Primary lookup
    function lookupModern(name) {
        return new mw.Api().get({
            action: "query",
            list: "users",
            ususers: name,
            usprop: "registration"
        }).then(function (data) {
            var user = data && data.query && data.query.users &&
                data.query.users[0];

            if (!user) {
                return $.Deferred().reject("empty-response").promise();
            }
            if (user.invalid !== undefined) {
                return {status: "invalid", name: name};
            }
            if (user.missing !== undefined) {
                return {status: "unclaimed", name: user.name || name};
            }
            return {
                status: "exists",
                name: user.name,
                registration: formatDate(user.registration)
            };
        });
    }


    // Fallback lookup
    function lookupLegacy(name) {
        var server = mw.config.get("wgServer");

        return $.ajax({
            url: server + "/wikia.php",
            dataType: "json",
            data: {
                controller: "UserApiController",
                method: "getUsersByName",
                query: name
            }
        }).then(function (data) {
            var users = (data && data.users) || [];
            var wanted = comparable(name);
            var match = null;
            var i;
            var dfd;

            for (i = 0; i < users.length; i += 1) {
                if (comparable(users[i].name) === wanted) {
                    match = users[i];
                    break;
                }
            }

            if (!match) {
                return {status: "unclaimed", name: name};
            }

            dfd = $.Deferred();
            $.ajax({
                url: server + "/wikia.php",
                dataType: "json",
                data: {
                    controller: "UserProfile",
                    method: "getUserData",
                    userId: match.id,
                    format: "json"
                }
            }).done(function (profile) {
                dfd.resolve({
                    status: "exists",
                    name: match.name,
                    registration: (profile && profile.userData &&
                        profile.userData.registration) || ""
                });
            }).fail(function () {
                dfd.resolve({
                    status: "exists",
                    name: match.name,
                    registration: ""
                });
            });
            return dfd.promise();
        });
    }

    function lookup(name) {
        var dfd = $.Deferred();

        lookupModern(name).done(function (result) {
            dfd.resolve(result);
        }).fail(function (code) {
            warn("Standard API failed, trying legacy endpoint.", code);
            lookupLegacy(name).done(function (result) {
                dfd.resolve(result);
            }).fail(function (err) {
                dfd.reject(err);
            });
        });

        return dfd.promise();
    }


    function handleResult(result) {
        var link;
        var verify;

        if (result.status === "invalid") {
            log(i18n.msg("modalError").escape());
            return;
        }

        // getUrl() encodes the title
        link = mw.html.element("a", {
            target: "_blank",
            rel: "noopener",
            href: mw.util.getUrl("User:" + result.name)
        }, result.name);

        if (result.status === "exists") {
            log(
                i18n.msg("modalExists", link).escape() +
                (result.registration
                    ? "&nbsp;(" + mw.html.escape(result.registration) + ")"
                    : "")
            );
            return;
        }

        verify = mw.html.element("a", {
            target: "_blank",
            rel: "noopener",
            href: COMMUNITY_CONTRIBS + mw.util.wikiUrlencode(result.name),
            title: i18n.msg("modalVerify").plain()
        }, "?");

        log(i18n.msg("modalUnclaimed", link).escape() + "&nbsp;[" + verify + "]");
    }

    function search() {
        var $input = $("#ua-input-value");
        var name = normalize($input.val() || "");

        if (
            !name ||
            name.length > MAX_LENGTH ||
            INVALID_CHARS.test(name) ||
            !mw.Title.newFromText(name)
        ) {
            log(i18n.msg("modalError").escape());
            return;
        }

        $input.val("").focus();

        lookup(name).done(handleResult).fail(function (err) {
            warn("Lookup failed.", err);
            log(i18n.msg("modalLookupFailed").escape());
        });
    }

    function buildModalHTML() {
        return "<div id='ua-modal-body'>" +
            "<p>" + i18n.msg("modalTitle").escape() + "<br />" +
            "<input type='text' id='ua-input-value' autocomplete='off' " +
            "maxlength='" + MAX_LENGTH + "' placeholder='" +
            i18n.msg("modalSearch").escape() + "' />" +
            "</p><hr />" +
            "</div>" +
            "<div id='ua-log'></div>";
    }

    function displayModal() {
        var $modal = dev.showCustomModal(i18n.msg("itemTitle").escape(), {
            id: "ua-modal",
            content: buildModalHTML(),
            buttons: [{
                message: i18n.msg("modalCancel").escape(),
                handler: function () {
                    dev.showCustomModal.closeModal($modal);
                }
            }, {
                message: i18n.msg("modalSearch").escape(),
                handler: search
            }]
        });

        setTimeout(function () {
            $("#ua-input-value").focus();
        }, 100);
    }

    function constructItem(text) {
        return mw.html.element("li", {
            "class": "overflow",
            "id": "usernameavailability-li"
        }, new mw.html.Raw(
            mw.html.element("a", {
                "id": "usernameavailability-a",
                "href": "#",
                "title": text
            }, text)
        ));
    }

    function init(lang) {
        var $item;

        i18n = lang;
        i18n.useContentLang();

        mw.util.addCSS(
            "#ua-modal { width: 500px !important; }" +
            "#ua-input-value { height: 30px; width: 100%; padding: 0 5px;" +
                "box-sizing: border-box; }" +
            "#ua-log { height: 100px; width: 100%; box-sizing: border-box;" +
                "border: 1px solid var(--theme-border-color, #ccc);" +
                "font-family: monospace; background: transparent;" +
                "color: inherit; overflow: auto; padding: 5px; }"
        );

        $(document)
            .off("keydown.usernameAvailability")
            .on("keydown.usernameAvailability", "#ua-input-value", function (e) {
                if (e.which === 13) {
                    e.preventDefault();
                    search();
                }
            });

        $item = $(constructItem(i18n.msg("itemTitle").plain()));
        $item.on("click", "a", function (e) {
            e.preventDefault();
            displayModal();
        });
        $(TOOLS_MENU).prepend($item);
    }

    mw.hook("dev.showCustomModal").add(function () {
        mw.hook("dev.i18n").add(function (i18nLib) {
            $.when(
                i18nLib.loadMessages("UsernameAvailability"),
                mw.loader.using([
                    "mediawiki.util",
                    "mediawiki.api",
                    "mediawiki.Title"
                ])
            ).done(function (lang) {
                init(lang);
            }).fail(function (err) {
                warn("Could not load dependencies.", err);
            });
        });
    });
}(jQuery, window.mediaWiki));