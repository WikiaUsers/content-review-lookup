/**
 * PufflesContentReviewSystem.js
 * @file Implements a janked content review system for Puffles Wiki
 * @author Count of Howard <dev.wikia.com/wiki/User_talk:Count_of_Howard>
 * @license Apache-2.0
 * @require "mw"
 * @require "BannerNotification"
 * @require "mediawiki.util"
 * <nowiki>
 */

/*jslint browser */
/*global mw, jQuery, window, BannerNotification */

require(["mw", "BannerNotification"], function (mw, BannerNotification) {
    "use strict";

    var $conf = mw.config.get([
        "stylepath",
        "wgPageName",
        "wgArticleId",
        "wgUserGroups",
        "wgUserLanguage",
        "wgNamespaceNumber"
    ]);

    var $hasRights = /(sysop|content-moderator)/
            .test($conf.wgUserGroups.join(" "));

    if (
        window.isPCRSLoaded ||
        $conf.wgNamespaceNumber !== 0 ||
        !$hasRights
    ) {
        return;
    }
    window.isPCRSLoaded = true;

    var $i18n = {
        "en": {
            demotedButtonText: "Demote",
            promotedButtonText: "Promote",
            demotedEditSummary: "Demoting article to quality review. Disagree? Contact me, an admin, or a content moderator.",
            promotedEditSummary: "Promoting article to fully published status. Disagree? Contact me, an admin, or a content moderator.",
            demotedSuccessBanner: "This article has been demoted.",
            promotedSuccessBanner: "This article has been promoted.",
            errorBanner: "An error was encountered.",
            reloadText: "Getting page..."
        },
        "be": {
            demotedButtonText: "Падзяліць",
            promotedButtonText: "Прасунуць",
            demotedEditSummary: "Падзел артыкула для якаснага агляду. Не згодзен? Звяжыцеся са мной, адміністратарам ці мадэратарам кантэнту.",
            promotedEditSummary: "Пасоўванне артыкула ў цалкам апублікаваны статус. Не згодзен? Звяжыцеся са мной, адміністратарам ці мадэратарам кантэнту.",
            demotedSuccessBanner: "Гэты артыкул быў падзелены.",
            promotedSuccessBanner: "Гэты артыкул быў прасунуты.",
            errorBanner: "Была выяўлена абмыла.",
            reloadText: "Атрыманне старонкі…"
        },
        "ru": {
            demotedButtonText: "Разделить",
            promotedButtonText: "Продвинуть",
            demotedEditSummary: "Разделение статьи для более качественного просмотра. Не согласен? Свяжитесь со мной, администратором или модератором контента.",
            promotedEditSummary: "Продвижение статьи в полностью опубликованный статус. Не согласен? Свяжитесь со мной, администратором или модератором контента.",
            demotedSuccessBanner: "Эта статья была разделена.",
            promotedSuccessBanner: "Эта статья была продвинута.",
            errorBanner: "Была обнаружена ошибка.",
            reloadText: "Получение страницы…"
        },
        "uk": {
            demotedButtonText: "Розділити",
            promotedButtonText: "Просунути",
            demotedEditSummary: "Поділ статті для якісного огляду. Не згоден? Зв'яжіться зі мною, адміністратором або модератором контенту.",
            promotedEditSummary: "Просування статті в повністю опублікований статус. Не згоден? Зв'яжіться зі мною, адміністратором або модератором контенту.",
            demotedSuccessBanner: "Цю статтю було розділено.",
            promotedSuccessBanner: "Цю статтю було просунуто.",
            errorBanner: "Було виявлено помилку.",
            reloadText: "Отримання сторінки…"
        }
    };

    var $lang = jQuery.extend(
        $i18n.en,
        $i18n[$conf.wgUserLanguage.split("-")[0]],
        $i18n[$conf.wgUserLanguage]
    );

    /**
     * @class PCRS
     * @classdesc The central PCRS class
     */
    var PCRS = {
        /**
         * @method showBanner
         * @param {string} $message
         * @param {string} $status
         * @returns {void}
         */
        showBanner: function ($message, $status) {
            var $statusClass = ($status === "error"
                ? "error"
                : "confirm");
            new BannerNotification($message, $statusClass).show();
        },
        /**
         * @method partialReload
         * @returns {void}
         */
        partialReload: function () {
            jQuery("#mw-content-text")
                .load(
                    window.location.href + " #mw-content-text > *",
                    function () {
                        jQuery(".WikiaArticle").stopThrobbing();
                        jQuery("#mw-content-text").fadeToggle(3000);
                    }
                );
        },
        /**
         * @method postContent
         * @param {string} $content
         * @param {string} $summary
         * @param {string} $successBanner
         * @param {string} $action
         * @param {string} $timestamp - optional
         * @param {string} $starttimestamp - optional
         * @param {string} $token - optional
         * @returns {void}
         */
        postContent: function (
            $content,
            $summary,
            $successBanner,
            $action,
            $timestamp,
            $starttimestamp,
            $token
        ) {
            var $params = {
                action: "edit",
                minor: true,
                title: $conf.wgPageName,
                summary: $summary,
                token: mw.user.tokens.get("editToken")
            };

            if ($action === "demote") {
                $params.prependtext = $content;
            } else if ($action === "promote") {
                $params.text = $content;
                $params.basetimestamp = $timestamp;
                $params.startimestamp = $starttimestamp;
                $params.token = $token;
            }

            jQuery.ajax({
                type: "POST",
                url: mw.util.wikiScript("api"),
                data: $params
            }).success(function ($data) {
                PCRS.showBanner($successBanner, "confirm");
                PCRS.partialReload();
            }).fail(function ($data) {
                PCRS.showBanner($lang.errorBanner, "error");
                PCRS.partialReload();
            });
        },
        /**
         * @method constructItem
         * @param {string} $text
         * @returns {mw.html.element}
         */
        constructItem: function ($text) {
            return mw.html.element("li", {
                "id": "PCRS-li"
            }, new mw.html.Raw(
                mw.html.element("a", {
                    "id": "PCRS-a",
                    "href": "#",
                    "title": $text
                }, $text)
            ));
        },
        /**
         * @method postContent
         * @param {string} $content
         * @param {string} $summary
         * @param {string} $banner
         * @param {string} $action
         * @param {string} $timestamp - optional
         * @param {string} $starttimestamp - optional
         * @param {string} $token - optional
         * @returns {void}
         */
        buttonClick: function (
            $content,
            $summary,
            $banner,
            $action,
            $timestamp,
            $starttimestamp,
            $token
        ) {
            jQuery("#PCRS-a").click(function () {
                jQuery("#mw-content-text").fadeToggle(1400);
                jQuery(".WikiaArticle").startThrobbing();
                jQuery("#mw-content-text")
                        .html("<img id='PCRS-throbber' src='" +
                        $conf.stylepath + "/common/images/ajax.gif' /> " +
                        $lang.reloadText);

                PCRS.postContent(
                    $content,
                    $summary,
                    $banner,
                    $action,
                    $timestamp,
                    $starttimestamp,
                    $token
                );
            });
        },
        /**
         * @method getWikitext
         * @param {function} callback
         * @returns {void}
         */
        getWikitext: function (callback) {
            jQuery.ajax({
                type: "GET",
                url: mw.util.wikiScript("api"),
                data: {
                    action: "query",
                    prop: "info|revisions",
                    intoken: "edit",
                    titles: $conf.wgPageName,
                    rvprop: "content|timestamp",
                    rvlimit: "1",
                    indexpageids: "true",
                    format : "json"
                }
            }).done(function ($data) {
                if (!$data.error) {
                    callback($data);
                }
            });
        },
        /**
         * @method handleWikitext
         * @param {json} $data
         * @returns {void}
         */
        handleWikitext: function ($data) {
            var $result = $data.query.pages[$conf.wgArticleId];
            var $text = $result.revisions[0]["*"];
            var $timestamp = $result.revisions[0].timestamp;
            var $starttimestamp = $result.starttimestamp;
            var $token = $result.edittoken;

            $text = $text.replace(/{{demoted}}/g, "");

            PCRS.buttonClick(
                $text,
                $lang.promotedEditSummary,
                $lang.promotedSuccessBanner,
                "promote",
                $timestamp,
                $starttimestamp,
                $token
            );
        },
        /**
         * @method getTemplateData
         * @param {function} callback
         * @returns {void}
         */
        getTemplateData: function (callback) {
            jQuery.ajax({
                type: "GET",
                url: mw.util.wikiScript("api"),
                data: {
                    action: "query",
                    list: "embeddedin",
                    eititle: "Template:demoted",
                    format: "json"
                }
            }).done(function ($data) {
                if (!$data.error) {
                    callback($data);
                }
            });
        },
        /**
         * @method handleTemplateData
         * @param {json} $data
         * @returns {void}
         */
        handleTemplateData: function ($data) {
            var $pages = $data.query.embeddedin;
            var $pagesArray = [];
            var $menuElement;

            $pages.forEach(function ($page) {
                if ($page.ns === 0) {
                    $pagesArray.push($page.title.replace(/ /g,"_"));
                }
            });

            if (jQuery.inArray($conf.wgPageName, $pagesArray) === -1) {
                $menuElement = PCRS.constructItem($lang.demotedButtonText);

                jQuery($menuElement)
                    .prependTo(".page-header__contribution-buttons .wds-list");

                PCRS.buttonClick(
                    PCRS.template,
                    $lang.demotedEditSummary,
                    $lang.demotedSuccessBanner,
                    "demote"
                );
            } else {
                $menuElement = PCRS.constructItem($lang.promotedButtonText);

                jQuery($menuElement)
                    .prependTo(".page-header__contribution-buttons .wds-list");

                PCRS.getWikitext(PCRS.handleWikitext);
            }
        },
        /**
         * @method init
         * @returns {void}
         */
        init: function () {
            this.template = "{{demoted}}";
            this.getTemplateData(this.handleTemplateData);
        }
    };

    mw.loader.using("mediawiki.util").then(PCRS.init);
});