/*jslint browser, long */
/*global alert, jQuery, mediaWiki, codeLoad */

(function ($, mw, cl) {
    "use strict";

    var definitonKeys = Object.keys(cl.definitions);
    var groupKeys = Object.keys(cl.groups);
    var prefDescriptionKeys = Object.keys(cl.prefDescriptions);

    var $definitions;
    var definitionCheckboxes = {};
    var definitionGroups = {};
    var definitionPrefs = {};

    // cog icon from Font Awesome Free 5.14.0 by @fontawesome - https://fontawesome.com
    // licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
    var $cogIcon = $("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z' fill='currentcolor'/></svg>");
    var modal = new mw.libs.QDmodal("codeload-modal");

    function notify(msg, options) {
        if (window.BannerNotification && !notify.banner) {
            notify.banner = new window.BannerNotification();
            notify.typeMap = {
                success: "confirm",
                error: "error"
            };
        }

        if (mw.notification) {
            mw.notification.notify(msg, options);
        } else if (notify.banner) {
            notify.banner.hide();
            notify.banner.setContent(msg);
            if (options.type) {
                notify.banner.setType(notify.typeMap[options.type]);
            }
            notify.banner.show();
        } else {
            alert(msg);
        }
    }

    function showPrefsModal(event) {
        var id = event.currentTarget.dataset.id;

        var content = "<table><tbody>";
        Object.keys(definitionPrefs[id]).forEach(function (prefName) {
            var prefValue = definitionPrefs[id][prefName];
            var prefDescription = typeof cl.prefDescriptions[prefName] === "string"
                ? new mw.html.Raw(mw.message("codeload-pref-" + prefName).parse())
                : prefName;
            var inputAttr = {"data-pref": prefName};

            switch (typeof prefValue) {
            case "boolean":
                inputAttr.type = "checkbox";
                inputAttr.checked = prefValue;
                break;
            case "number":
                inputAttr.type = "number";
                inputAttr.value = prefValue;
                break;
            case "string":
                inputAttr.type = "text";
                inputAttr.value = prefValue;
                break;
            default:
                // unrecognised pref type
                return;
            }

            content += "<tr>"
                    + "<td>" + mw.html.element("label", null, prefDescription)
                    + "<td>" + mw.html.element("input", inputAttr);
        });
        content += "</tbody></table>";

        function onModalDone() {
            modal.$content.find("input").each(function (ignore, element) {
                var prefValue = null;

                switch (element.type) {
                case "checkbox":
                    prefValue = element.checked;
                    break;
                case "number":
                    prefValue = parseFloat(element.value);
                    if (isNaN(prefValue)) {
                        prefValue = null;
                    }
                    break;
                case "text":
                    prefValue = element.value;
                    break;
                }

                if (prefValue === null) {
                    // unrecognised pref type or invalid pref value
                    return;
                }

                definitionPrefs[id][element.dataset.pref] = prefValue;
            });

            modal.hide();
        }

        modal.show({
            content: content,
            title: typeof cl.definitions[id].title === "string"
                ? mw.message("codeload-preferences-with-title", cl.definitions[id].title).escaped()
                : mw.message("codeload-preferences").escaped(),
            buttons: [{
                text: mw.message("codeload-done").escaped(),
                handler: onModalDone
            }, {
                text: mw.message("codeload-close").escaped(),
                handler: modal.hide.bind(modal)
            }]
        });
    }

    // calculate new prefs, and save them to local storage/user prefs page
    function setPrefs(event) {
        var newPrefs = {};

        definitonKeys.forEach(function (id) {
            var isEnabled = definitionCheckboxes[id].prop("checked");

            if (!definitionPrefs[id]) {
                // definition has no custom prefs
                newPrefs[id] = isEnabled;
                return;
            }

            newPrefs[id] = {enabled: isEnabled};

            Object.keys(definitionPrefs[id]).forEach(function (prefName) {
                newPrefs[id][prefName] = definitionPrefs[id][prefName];
            });
        });

        cl.setPrefs(JSON.stringify(newPrefs));

        // if user is anon, skip saving to prefs page: they won't have one
        // also skip if shift key is held: useful for temporary script testing
        if (mw.config.get("wgUserName") === null || event.shiftKey) {
            if (cl.localStorageIsUsable) {
                // prefs have been saved to local storage, so show success msg
                notify(mw.message("codeload-save-success").escaped(), {type: "success"});
            } else {
                // need an account to save prefs w/o local storage
                notify(mw.message("codeload-save-anon").escaped(), {type: "error"});
            }

            return;
        }

        // save preferences to the user's prefs page
        $.ajax({
            url: mw.util.wikiScript("api"),
            data: {
                action: "edit",
                format: "json",
                minor: true,
                summary: mw.message("codeload-edit-summary").plain(),
                text: JSON.stringify(newPrefs, null, 4),
                title: cl.userDataPage,
                token: mw.user.tokens.get("csrfToken") || mw.user.tokens.get("editToken")
            },
            dataType: "json",
            type: "POST"
        }).always(function (data) {
            if (data.edit && data.edit.result === "Success") {
                notify(mw.message("codeload-save-success").escaped(), {type: "success"});
            } else {
                notify(mw.message("codeload-save-fail").escaped(), {type: "error"});
            }
        });
    }

    // reset all prefs to definition defaults
    function resetPrefs(event) {
        event.preventDefault();

        definitonKeys.forEach(function (id) {
            definitionCheckboxes[id].prop("checked", cl.definitionEnabled(id, true));

            if (definitionPrefs[id]) {
                definitionPrefs[id] = cl.getScriptPrefs(id, true);
            }
        });
    }

    // add each preference description to mw.messages
    function addPrefMessage(id) {
        if (typeof cl.prefDescriptions[id] === "string") {
            mw.messages.set("codeload-pref-" + id, cl.prefDescriptions[id]);
        }
    }

    // add each definition group to the list
    function addDefinitionGroup(id) {
        if (typeof cl.groups[id] === "string") {
            mw.messages.set("codeload-group-" + id, cl.groups[id]);
        }

        definitionGroups[id] = $("<section>").addClass("hidden").append(
            $("<h2>").msg("codeload-group-" + id)
        );

        $definitions.append(definitionGroups[id]);
    }

    // add each code definition to the list
    function addDefinitionEntry(id) {
        // set up description (+ title, if exists)
        if (typeof cl.definitions[id].description === "string") {
            var description = cl.definitions[id].description;

            if (typeof cl.definitions[id].title === "string") {
                description = mw.message(
                    "codeload-entry",
                    cl.definitions[id].title,
                    description
                ).plain();
            }

            mw.messages.set("codeload-entry-" + id, description);
        }

        definitionCheckboxes[id] = $("<input>").attr({
            type: "checkbox",
            checked: cl.definitionEnabled(id),
            value: id
        });

        var $entry = $("<div>").append(
            $("<label>").append(
                definitionCheckboxes[id],
                $("<span>").msg("codeload-entry-" + id)
            )
        );

        var prefs = cl.getScriptPrefs(id);

        if (Object.keys(prefs).length) {
            definitionPrefs[id] = prefs;

            var titleElement = document.createElementNS("http://www.w3.org/2000/svg", "title");
            titleElement.textContent = typeof cl.definitions[id].title === "string"
                ? mw.message("codeload-preferences-with-title", cl.definitions[id].title).plain()
                : mw.message("codeload-preferences").plain();

            $entry.append(
                $cogIcon.clone()
                    .attr("data-id", id)
                    .append(titleElement)
                    .click(showPrefsModal)
            );
        }

        var $group = definitionGroups[cl.definitions[id].group];

        if (groupKeys.length) {
            if (!$group) {
                // no or unknown group, so add to group 'Other'
                if (!definitionGroups.other) {
                    addDefinitionGroup("other");
                }
                $group = definitionGroups.other;
            }
            $group.append($entry);
        } else {
            $definitions.append($entry);
        }

        if (!cl.definitionAvailable(id)) {
            $entry.addClass("hidden");
        } else if ($group) {
            // entry is shown and is in group, so unhide its group
            $group.removeClass("hidden");
        }
    }

    function main() {
        var $content = $("#mw-content-text");

        // set document title
        var docTitle = document.title.split(" | ");
        docTitle[0] = mw.message("codeload-heading").escaped();
        document.title = docTitle.join(" | ");

        // preserve the notifications element before emptying content
        var $mwNotifArea = $content.find("#mw-notification-area");

        // set content title + blank content space
        $(".page-header__title, #firstHeading").msg("codeload-heading");
        $content.empty();

        // restore notifications element
        $content.append($mwNotifArea);

        // assemble the main elements
        var $intro = $("<header>").msg("codeload-intro");
        $definitions = $("<section>");
        var $buttons = $("<footer>").append(
            $("<span>")
                .attr({
                    "class": "wds-button",
                    id: "codeload-save",
                    title: mw.message("codeload-save-tooltip").escaped()
                })
                .click(setPrefs)
                .msg("codeload-save"),
            " ",
            $("<a>")
                .attr({
                    "class": "wds-button wds-is-secondary",
                    href: "#",
                    title: mw.message("codeload-reset-tooltip").escaped()
                })
                .click(resetPrefs)
                .msg("codeload-reset")
        );

        // additional intro text for admins
        if (mw.config.get("wgUserGroups").indexOf("sysop") !== -1) {
            $intro.append("<br>" + mw.message("codeload-intro-sysop").parse());
        }

        // add custom intro message, if one exists
        var introMessage = mw.message("codeload-intro-custom");
        if (introMessage.exists()) {
            $intro.append("<br><br>" + introMessage.parse());
        }

        // initialise definitions and groups, or add message if no definitons are set
        if (definitonKeys.length) {
            groupKeys.forEach(addDefinitionGroup);
            definitonKeys.forEach(addDefinitionEntry);
            prefDescriptionKeys.forEach(addPrefMessage);
        } else {
            $definitions.msg("codeload-no-definitions");
            $buttons.addClass("hidden");
        }

        // add elements to the page
        $content.append($intro, $definitions, $buttons);
    }

    var mwModules = ["mediawiki.util", "mediawiki.jqueryMsg"];

    if (mw.loader.getState("mediawiki.notification")) {
        mwModules.push("mediawiki.notification");
    }

    $.when(
        cl.messagesReady,
        mw.loader.using(mwModules)
    ).done(function () {
        $(main);
    });
}(jQuery, mediaWiki, codeLoad));