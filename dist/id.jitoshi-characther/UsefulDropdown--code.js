// <nowiki>
;(function($, mw) {
    'use strict';
    if (
        mw.config.get('wgNamespaceNumber') !== 0 ||
        window.UsefulDropdownLoaded
    ) {
        return;
    }
    window.UsefulDropdownLoaded = true;

    var msg;
    var wgPageName = mw.config.get('wgPageName');

	function init() {
        $('.page-header__contribution-buttons, .skin-fandomdesktop .page-header__actions').append("<div class=\"wds-button-group\" style=\"vertical-align: top\">" +
            "<a href=\"javascript:void(0)\" class=\"wds-button wds-is-text page-header__action-button has-label collapsible\" id=\"usful\">" +
            "<span>" + msg('buttonTitle').escape() + "</span>" +
            "</a>" +
            "<div class=\"wds-dropdown\">" +
            "<div class=\"wds-dropdown__toggle wds-button wds-is-text page-header__action-button\">" +
            "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown__toggle-chevron\" id=\"wds-icons-dropdown-tiny\"><path d=\"M6 9l4-5H2\" fill-rule=\"evenodd\"></path></svg></div>" +
            "<div class=\"wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned\">" +
            "<ul class=\"wds-list wds-is-linked\">" +
            "<li><a id=\"num1\" href=\"javascript:void(0)\">" + msg('protect').escape() + "</a></li>" +
            "<li><a id=\"num2\" href=\"javascript:void(0)\">" + msg('ajaxContent').escape() + "</a></li>" +
            "<li><a id=\"num7\" href=\"javascript:void(0)\">" + msg('quickDelete').escape() + "</a></li>" +
            "<li><a id=\"num8\" href=\"javascript:void(0)\">" + msg('quickMove').escape() + "</a></li>" +
            "<li><a id=\"num3\" href=\"javascript:void(0)\">" + msg('stubTemplate').escape() + "</a></li>" +
            "<li><a id=\"num4\" href=\"javascript:void(0)\">" + msg('deleteTemplate').escape() + "</a></li>" +
            "<li><a id=\"num5\" href=\"javascript:void(0)\">" + msg('addCustomTemplate').escape() + "</a></li>" +
            "</ul>" +
            "</div></div></div>");
        // Protection 
        $('a#num1').click(function() {
            var protectiontime = prompt('Expiry:');
            var protectionreason = prompt('Protection Reason:');
            if (protectiontime) {
                new mw.Api().postWithEditToken({
                    action: 'protect',
                    title: wgPageName,
                    reason: protectionreason,
                    expiry: protectiontime,
                    protections: 'edit=sysop'
                }).done(function(d) {
                    if (d.error) {
                        new BannerNotification('Error while protecting article: ' + d.error.code, 'error').show();
                    } else {
                        new BannerNotification('Successfully protected article', 'success').show();
                    }
                }).fail(function() {
                    new BannerNotification('Error while protecting article', 'error').show();
                });
            }
        });

        // AJAX refresh
        $('a#num2').on("click", function refreshArticle() {
            var $temp = $('<div>');
            $temp.load(window.location.href + ' #mw-content-text', function() {
                    var $newContent = $temp.children('#mw-content-text');
                    if ($newContent.length) {
                        $('#mw-content-text').replaceWith($newContent);
                        mw.util.$content = $newContent;
                        mw.hook('wikipage.content').fire($newContent);

                    }
                }

            );
            $temp.remove();
            new BannerNotification(msg('contentRefreshed').escape(), 'success').show();
        });

        // Adding stub template
        $('a#num3').click(function() {
            new mw.Api().postWithEditToken({
                action: 'edit',
                title: wgPageName,
                summary: "Adding to help needed.",
                prependtext: "{{stub}} \n"
            }).done(function(d) {
                if (d.error) {
                    new BannerNotification('Error adding template: ' + d.error.code, 'error').show();
                } else {
                    new BannerNotification('Successfully added to help needed!', 'success').show();
                }
            }).fail(function() {
                new BannerNotification('Error while adding template', 'error').show();
            });
        });

        // adding deletion template 
        $('a#num4').click(function() {
            new mw.Api().postWithEditToken({
                action: 'edit',
                title: wgPageName,
                summary: "Adding to candiates for deletion",
                prependtext: "{{delete}} \n"
            }).done(function(d) {
                if (d.error) {
                    new BannerNotification('Error adding template: ' + d.error.code, 'error').show();
                } else {
                    new BannerNotification('Successfully added to candidates for deletion!', 'success').show();
                }
            }).fail(function() {
                new BannerNotification('Error while adding template', 'error').show();
            });
        });

        //Adding ability to have any other template via an input box.

        // adding deletion template 
        $('a#num5').click(function() {
            var templateName = prompt('Template Name:');
            if (templateName === null) {
                return;
            }
            new mw.Api().postWithEditToken({
                action: 'edit',
                title: wgPageName,
                summary: "Adding template",
                prependtext: "{{" + templateName + "}} \n"
            }).done(function(d) {
                if (d.error) {
                    new BannerNotification('Error adding template: ' + d.error.code, 'error').show();
                } else {
                    new BannerNotification('Successfully added template!', 'success').show();
                }
            }).fail(function() {
                new BannerNotification('Error while adding template', 'error').show();
            });
        });

        // Quick Deletion of article
        $('a#num7').click(function() {
            new mw.Api().postWithEditToken({
                    action: 'delete',
                    title: wgPageName,
                    reason: "Housekeeping"
                })
                .done(function() {
                    location.reload();
                });
        });

        // Modal box for moving articles 
        function modalBox() {
            $('body').prepend('<div style="background: rgba(0, 0, 0, 0.75); width: 100%; height: 100%; z-index: 100; position: fixed;"></div>');
            $('body').append('<div style="width: 400px;background: white;border-bottom: 4px solid black; border-top: 4px solid black; ;z-index: 999999;position: fixed;top: 50%;left: 50%;height: 200px;display: block;transform: translate(-50%, -50%); text-align:center; line-height: 200px; font-size: 15px; overflow: auto;">Page has Successfully been moved — Redirecting now.');
        }
        // Quickly moving an article within the same page
        $('a#num8').click(function() {
            var articleDestination = prompt('Move to?');
            if (articleDestination === null) {
                return;
            }
            var moveReason = prompt('Move Reason?');
            if (moveReason === null) {
                return;
            }
            new mw.Api().postWithEditToken({
                action: 'move',
                from: wgPageName,
                to: articleDestination,
                reason: moveReason,
                movetalk: 'no',
                noredirect: '1'
            }).done(function() {
                modalBox();
                window.setTimeout(function() {
                    window.location.href = mw.util.getUrl(articleDestination);
                }, 2000);
            });
        });
    }

    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('UsefulDropdown').done(function(i18no) {
            msg = i18no.msg;
            init();
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

})(window.jQuery, window.mediaWiki);
// </nowiki>