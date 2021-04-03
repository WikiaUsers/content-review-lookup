/**
 * ListUsers/code2.js
 * @file Displays users with certain user rights in div
 *       <tt>code2.js</tt> allows for the exclusion of users in other rights
 *       groups via the addition of classes to the <tt>.listusers</tt> div.
 *       Also, minor i18n configuration added. Made for Diep.io Wikia.
 * @authors Eizen <dev.wikia.com/wiki/User_talk:Eizen> (code2.js author)
 *          Slyst <dev.wikia.com/wiki/User_talk:Slyst> (original author)
 * @external "mediawiki.util"
 * @external "jQuery"
 * @external "wikia.window"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, require, wk, console */

require(["mw", "wikia.window"], function (mw, wk) {
    "use strict";

    if (window.isListUsersLoaded || !jQuery(".listusers").exists()) {
        return;
    }
    window.isListUsersLoaded = true;

    // Remember to leave $1 placeholder
    var $i18n = {
        "en": {
            talk: "talk",
            contribs: "contribs",
            edits: "edits",
            nogroup: "No user group found.",
            nousers: "No users were found in the $1 group."
        }
    };

    var $lang = jQuery.extend(
        $i18n.en,
        $i18n[wk.wgUserLanguage.split("-")[0]],
        $i18n[wk.wgUserLanguage]
    );

    // Defining custom jQuery method to acquire class list array
    jQuery.fn.getClassList = function () {
        return this[0].className.split(/\s+/);
    };

    var ListUsers = {

        /**
         * @method constructLink
         * @description Method returns an assembled HTML string, specifically a
         *              <tt><a></tt> link element, used in the assembly of user
         *              list elements.
         * @param {string} $href
         * @param {$text}
         * @returns {string}
         */
        constructLink: function ($href, $text) {
            return mw.html.element("a", {
                href: mw.util.getUrl($href),
                title: $text
            }, $text);
        },

        /**
         * @method getExcludedGroups
         * @description The method iterates through the list of element classes
         *              to determine which (if any) user groups to exclude from
         *              view in later stages of the script's HTML assembly.
         * @param {Object[]} $classes - string array of element classes
         * @returns {Object[]} $excludedGroups - string array of excluded groups
         */
        getExcludedGroups: function ($classes) {
            var $excludedGroups = [];

            $classes.forEach(function ($class) {
                switch ($class) {
                case "LU-exclude-bot":
                    $excludedGroups.push("bot");
                    break;
                case "LU-exclude-bureaucrat":
                    $excludedGroups.push("bureaucrat");
                    break;
                case "LU-exclude-chatmoderator":
                    $excludedGroups.push("chatmoderator");
                    break;
                case "LU-exclude-content-moderator":
                    $excludedGroups.push("content-moderator");
                    break;
                case "LU-exclude-rollback":
                    $excludedGroups.push("rollback");
                    break;
                case "LU-exclude-staff":
                    $excludedGroups.push("staff");
                    break;
                case "LU-exclude-sysop":
                    $excludedGroups.push("sysop");
                    break;
                case "LU-exclude-threadmoderator":
                    $excludedGroups.push("threadmoderator");
                    break;
                }
            });

            return $excludedGroups;
        },

        /**
         * @method assembleHMTL
         * @description Method assembles a string of HTML <tt><li></tt> and
         *              <tt><a></tt> elements based upon the wiki's window
         *              variable customization options and returns the string.
         * @param {string} $username
         * @param {int} $editcount
         * @param {string} $html
         */
        assembleHTML: function ($username, $editCount) {
            var $html = "<li>" +
                    this.constructLink("User:" + $username, $username);

            if (this.listUsers.talk) {
                $html += " " +
                    this.constructLink(
                        "User talk:" + $username,
                        "(" + $lang.talk + ")"
                    );
            }

            if (this.listUsers.contribs) {
                $html += " " +
                    this.constructLink(
                        "Special:Contributions/" + $username,
                        "(" + $lang.contribs + ")"
                    );
            }

            if (this.listUsers.editcount) {
                $html += " " + $editCount + " " + $lang.edits;
            }

            $html += "</li>";
            return $html;
        },

        /**
         * @method getUsersList
         * @description getUsersList queries the API to acquire a list of users
         *              who hold a given right. Each user's additional groups
         *              are included in the returned data for use in exclusion.
         * @param {function} callback
         * @param {string} $group
         * @param {Object[]} $excludedGroups - string array of excluded groups
         */
        getUsersList: function (callback, $group, $excludedGroups) {
            var $gmgroups = $group + "|" + $excludedGroups.join("|");
            jQuery.ajax({
                type: "GET",
                url: mw.util.wikiScript("api"),
                data: {
                    action: "query",
                    list: "groupmembers",
                    gmgroups: $gmgroups,
                    gmlimit: this.listUsers.limit,
                    format: "json"
                }
            }).done(function ($data) {
                if (!$data.error) {
                    console.log($data);
                    callback($data, $group, $excludedGroups);
                }
            });
        },

        /**
         * @method handleUsersList
         * @description Method handles the data from the API call in such a way
         *              to only display users who possess the given right and
         *              are not also members of any of the excluded user rights
         *              groups. Once assembled, the html is added to the
         *              <tt>ul</tt> element.
         * @param {json} $data
         * @param {string} $group
         * @param {Object[]} $excludedGroups - string array of excluded groups
         * @returns {void}
         */
        handleUsersList: function ($data, $group, $excludedGroups) {
            var $allUsers = $data.users;
            var $html = "";

            jQuery(".listusers#" + $group).html(mw.html.element("ul", {}));

            if ($allUsers[0].id === 0) {
                jQuery(".listusers#" + $group).html(
                    $lang.nousers.replace("$1", $group)
                );
            } else {
                $allUsers.forEach(function ($user) {
                    var $myName = $user.name;
                    var $myGroups = $user.groups;

                    var $isNotInExcluded = $myGroups.every(function ($right) {
                        return jQuery.inArray($right, $excludedGroups) === -1;
                    });

                    // Testing purposes only
                    console.log(
                        $myName + ": " + "$isNotInExcluded=" + $isNotInExcluded
                    );

                    if ($isNotInExcluded) {
                        $html +=
                            ListUsers.assembleHTML($myName, $user.editcount);
                    }
                });
            }

            jQuery(".listusers#" + $group + " ul").html($html);
        },

        /**
         * @method main
         * @description main method sorts through user groups and
         *              <tt>.listusers</tt> elements, getting group-exclusion
         *              classes and querying the getUsersList method for group
         *              data.
         * @param {Object[]} $groups - string array of user groups
         * @returns {void}
         */
        main: function ($groups) {
            var that = this;
            var $elementClasses;
            var $excludedGroups;

            $groups.forEach(function ($group) {
                jQuery(".listusers").each(function () {
                    $elementClasses = jQuery(this).getClassList();
                    $excludedGroups = that.getExcludedGroups($elementClasses);

                    switch (jQuery(this).attr("id")) {
                    case $group:
                        that.getUsersList(
                            that.handleUsersList,
                            $group,
                            $excludedGroups
                        );
                        break;
                    case "":
                    case undefined:
                        jQuery(this).html($lang.nogroup);
                        break;
                    }
                });
            });
        },

        /**
         * @method init
         * @description init method sets basic preferences via window variable
         *              values, assembles the user rights array, and accounts
         *              for custom user groups. The array is then passed to main
         * @returns {void}
         */
        init: function () {
            this.listUsers = jQuery.extend({
                talk: true,
                contribs: false,
                editcount: false,
                limit: 50,
                active: true
            }, window.listUsers);

            var $userRightsGroups = [
                "staff",
                "helper",
                "voldev",
                "vanguard",
                "council",
                "checkuser",
                "bot",
                "bureaucrat",
                "sysop",
                "content-moderator",
                "threadmoderator",
                "chatmoderator",
                "rollback",
                "content-volunteer",
                "wiki-manager",
                "content-team-member",
                "soap"
            ];

            if (window.listUsers && window.listUsers.customgroups) {
                window.listUserscustomgroups.forEach(function ($customGroup) {
                    $userRightsGroups.push($customGroup);
                });
            }

            this.main($userRightsGroups);
        }
    };

    mw.loader.using("mediawiki.util").then(
        jQuery.proxy(ListUsers.init, ListUsers)
    );
});