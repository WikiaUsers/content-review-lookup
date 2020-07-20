// Used files: [[File:Icon-gear-black.png]] [[File:Icon-gear-white.png]]
/*jslint browser, long */
/*global require */

require([
    "jquery",
    "mw",
    "fosl.codeload",
    "wikia.ui.factory",
    "BannerNotification",
    "wikia.window"
], function ($, mw, cl, uiFactory, Banner, context) {
    "use strict";

    var definitonKeys = Object.keys(cl.definitions);
    var groupKeys = Object.keys(cl.groups);
    var prefDescriptionKeys = Object.keys(cl.prefDescriptions);

    var $definitions;
    var definitionCheckboxes = {};
    var definitionGroups = {};
    var definitionPrefs = {};

    var banner = new Banner();
    var gearIconUrl = $(document.body).hasClass("oasis-dark-theme")
        ? "//images.wikia.nocookie.net/dev/images/2/25/Icon-gear-white.png"
        : "//images.wikia.nocookie.net/dev/images/a/af/Icon-gear-black.png";
    var uiModalFactory;

    function showPrefsModal(event) {
        if (!uiModalFactory) {
            uiFactory.init("modal").then(function (uiModal) {
                uiModalFactory = uiModal;
                showPrefsModal(event);
            });
            return;
        }

        var id = event.target.dataset.id;

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

        var modalVars = {
            closeText: mw.message("codeload-close").escaped(),
            content: content,
            id: "codeload-modal",
            size: "medium",
            title: typeof cl.definitions[id].title === "string"
                ? mw.message("codeload-preferences-with-title", cl.definitions[id].title).escaped()
                : mw.message("codeload-preferences").escaped(),
            buttons: [{
                vars: {
                    value: mw.message("codeload-done").escaped(),
                    classes: ["", ""],
                    data: [{
                        key: "event",
                        value: "done"
                    }]
                }
            }, {
                vars: {
                    value: mw.message("codeload-close").escaped(),
                    data: [{
                        key: "event",
                        value: "close"
                    }]
                }
            }]
        };

        uiModalFactory.createComponent({vars: modalVars}, function (modal) {
            modal.bind("done", function () {
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
                modal.trigger("close");
            });
            modal.show();
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
            banner.hide();

            if (cl.localStorageIsUsable) {
                // prefs have been saved to local storage, so show success msg
                banner
                    .setContent(mw.message("codeload-save-success").escaped())
                    .setType("confirm");
            } else {
                // need an account to save prefs w/o local storage
                banner
                    .setContent(mw.message("codeload-save-anon").escaped())
                    .setType("notify");
            }

            banner.show();
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
                token: mw.user.tokens.get("editToken")
            },
            dataType: "json",
            type: "POST"
        }).always(function (data) {
            banner.hide();

            if (data.edit && data.edit.result === "Success") {
                banner
                    .setContent(mw.message("codeload-save-success").escaped())
                    .setType("confirm");
            } else {
                banner
                    .setContent(mw.message("codeload-save-fail").escaped())
                    .setType("error");
            }

            banner.show();
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

            $entry.append(
                $("<img>")
                    .attr({
                        "data-id": id,
                        src: gearIconUrl,
                        title: typeof cl.definitions[id].title === "string"
                            ? mw.message("codeload-preferences-with-title", cl.definitions[id].title).escaped()
                            : mw.message("codeload-preferences").escaped()
                    })
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

        // set content title + blank content space
        $(".page-header__title, #firstHeading").msg("codeload-heading");
        $content.empty();

        // style
        // (temporary: they should already be imported by main script, but
        //   main script may not be current due to caching)
        context.importArticles({
            type: "style",
            articles: ["u:dev:MediaWiki:CodeLoad.js/preferences.css"]
        });

        // assemble the main elements
        var $intro = $("<header>").msg("codeload-intro");
        $definitions = $("<section>");
        var $buttons = $("<footer>").append(
            $("<span>")
                .attr({
                    "class": "button",
                    "id": "codeload-save",
                    "title": mw.message("codeload-save-tooltip").escaped()
                })
                .click(setPrefs)
                .msg("codeload-save"),
            " ",
            $("<a>")
                .attr({
                    "href": "#",
                    "title": mw.message("codeload-reset-tooltip").escaped()
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

    $.when(
        cl.messagesReady,
        mw.loader.using(["mediawiki.util", "mediawiki.jqueryMsg"])
    ).done(function () {
        $(main);
    });
});