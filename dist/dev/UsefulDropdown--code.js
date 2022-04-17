// <nowiki>
$(function() {
            if (
                mw.config.get('wgNamespaceNumber') !== 0 ||
                window.UsefulDropdownLoaded
            ) {
                return;
            }
            window.UsefulDropdownLoaded = true;

            var i18n = {
                en: { // English
                    buttonTitle: 'Useful',
                    protect: 'Protect',
                    ajaxContent: 'AJAX Refresh',
                    quickDelete: 'Quick Delete',
                    stubTemplate: '+Stub',
                    deleteTemplate: '+Delete',
                    addCustomTemplate: '+Custom Template',
                    contentRefreshed: 'Content Refreshed!',
                    quickMove: 'Quick Move'
                },
                be: { // Belarusian 
                    buttonTitle: 'Карысныя функцыі',
                    protect: 'Абараніць',
                    ajaxContent: 'AJAX-абнаўленне',
                    quickDelete: 'Хуткае выдаленне',
                    stubTemplate: 'Дадаць шаблон Stub',
                    deleteTemplate: 'Дадаць шаблон Delete',
                    addCustomTemplate: 'Карыстацкі шаблон',
                    contentRefreshed: 'Змесціва абноўлена!'
                },
                fr: { // French 
                    buttonTitle: 'Utile',
                    protect: 'Protéger',
                    ajaxContent: 'Contenu Ajax',
                    quickDelete: 'Suppression rapide',
                    stubTemplate: 'Modèle de stub',
                    deleteTemplate: 'Modèle de suppression', // is this correct? Idek
                    addCustomTemplate: 'Ajouter un modèle personnalisé',
                    contentRefreshed: 'Contenu actualisé'
                },
                pl: { // Polish
                    buttonTitle: 'Przydatne',
                    protect: 'Zabezpiecz',
                    ajaxContent: 'AJAX Refresh',
                    quickDelete: 'Szybkie usuwanie',
                    stubTemplate: '+Zalążek',
                    deleteTemplate: '+EK',
                    addCustomTemplate: '+Inny szablon',
                    contentRefreshed: 'Treść odświeżona!'
                },
                ru: { // Russian 
                    buttonTitle: 'Полезные функции',
                    protect: 'Защитить',
                    ajaxContent: 'AJAX-обновление',
                    quickDelete: 'Быстрое удаление',
                    stubTemplate: 'Добавить шаблон Stub',
                    deleteTemplate: 'Добавить шаблон Delete',
                    addCustomTemplate: 'Пользовательский шаблон',
                    contentRefreshed: 'Содержимое обновлено!'
                },
                tr: { // Turkish
                    buttonTitle: 'Yararlı',
                    protect: 'Koru',
                    ajaxContent: 'AJAX Yenileme',
                    quickDelete: 'Hızlı Silme',
                    stubTemplate: '+Taslak',
                    deleteTemplate: '+Sil',
                    addCustomTemplate: '+Özel Şablon',
                    contentRefreshed: 'İçerik Yenilendi!',
                    quickMove: 'Hızlı Taşıma'
                },
                uk: { // Ukrainian 
                    buttonTitle: 'Корисні функції',
                    protect: 'Захистити',
                    ajaxContent: 'AJAX-оновлення',
                    quickDelete: 'Швидке вилучення',
                    stubTemplate: 'Додати шаблон Stub',
                    deleteTemplate: 'Додати шаблон Delete',
                    addCustomTemplate: 'Користувацький шаблон',
                    contentRefreshed: 'Вміст оновлено!'
                },
                zh: { // Chinese
                    buttonTitle: '快捷工具',
                    protect: '保护页面',
                    ajaxContent: 'AJAX刷新',
                    quickDelete: '快速删除页面',
                    stubTemplate: '在页面内添加 {{stub}}',
                    deleteTemplate: '在页面内添加 {{delete}}',
                    addCustomTemplate: '在页面内添加自定义模板',
                    contentRefreshed: '内容刷新成功！',
                    quickMove: '快速移动页面'
                },
                'zh-hans': { // Chinese-Simplified
                    buttonTitle: '快捷工具',
                    protect: '保护页面',
                    ajaxContent: 'AJAX刷新',
                    quickDelete: '快速删除页面',
                    stubTemplate: '在页面内添加 {{stub}}',
                    deleteTemplate: '在页面内添加 {{delete}}',
                    addCustomTemplate: '在页面内添加自定义模板',
                    contentRefreshed: '内容刷新成功！',
                    quickMove: '快速移动页面'
                },
                'zh-hant': { // Chinese-Traditional
                    buttonTitle: '快捷工具',
                    protect: '保護頁面',
                    ajaxContent: 'AJAX刷新',
                    quickDelete: '快速刪除',
                    stubTemplate: '+小作品模板',
                    deleteTemplate: '+刪除模板',
                    addCustomTemplate: '自訂模板',
                    contentRefreshed: '內容刷新成功！'
                },
                'zh-hk': { // Chinese-Hong Kong
                    buttonTitle: '快捷工具',
                    protect: '保護頁面',
                    ajaxContent: 'AJAX刷新',
                    quickDelete: '快速刪除',
                    stubTemplate: '+小作品模板',
                    deleteTemplate: '+刪除模板',
                    addCustomTemplate: '自訂模板',
                    contentRefreshed: '內容刷新成功！'
                },
                'zh-tw': { // Chinese-Taiwan
                    buttonTitle: '快捷工具',
                    protect: '保護頁面',
                    ajaxContent: 'AJAX刷新',
                    quickDelete: '快速刪除',
                    stubTemplate: '+小作品模板',
                    deleteTemplate: '+刪除模板',
                    addCustomTemplate: '自訂模板',
                    contentRefreshed: '內容刷新成功！'
                }
            };


            var lang = mw.config.get('wgUserLanguage'),
                elementContent = $.extend(i18n.en, i18n[lang.split('-')[0]], i18n[lang]);

            $('.page-header__contribution-buttons, .skin-fandomdesktop .page-header__actions').append("<div class=\"wds-button-group\" style=\"vertical-align: top\">" +
                "<a href=\"javascript:void(0)\" class=\"wds-button wds-is-text page-header__action-button has-label collapsible\" id=\"usful\">" +
                "<span>" + elementContent.buttonTitle + "</span>" +
                "</a>" +
                "<div class=\"wds-dropdown\">" +
                "<div class=\"wds-dropdown__toggle wds-button wds-is-text page-header__action-button\">" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" class=\"wds-icon wds-icon-tiny wds-dropdown__toggle-chevron\" id=\"wds-icons-dropdown-tiny\"><path d=\"M6 9l4-5H2\" fill-rule=\"evenodd\"></path></svg></div>" +
                "<div class=\"wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned\">" +
                "<ul class=\"wds-list wds-is-linked\">" +
                "<li><a id=\"num1\" href=\"javascript:void(0)\">" + elementContent.protect + "</a></li>" +
                "<li><a id=\"num2\" href=\"javascript:void(0)\">" + elementContent.ajaxContent + "</a></li>" +
                "<li><a id=\"num7\" href=\"javascript:void(0)\">" + elementContent.quickDelete + "</a></li>" +
                "<li><a id=\"num8\" href=\"javascript:void(0)\">" + elementContent.quickMove + "</a></li>" +
                "<li><a id=\"num3\" href=\"javascript:void(0)\">" + elementContent.stubTemplate + "</a></li>" +
                "<li><a id=\"num4\" href=\"javascript:void(0)\">" + elementContent.deleteTemplate + "</a></li>" +
                "<li><a id=\"num5\" href=\"javascript:void(0)\">" + elementContent.addCustomTemplate + "</a></li>" +
                "</ul>" +
                "</div></div></div>");
            // Protection 
            $('a#num1').click(function() {
                var protectiontime = prompt('Expiry:');
                var protectionreason = prompt('Protection Reason:');
                if (protectiontime) {
                    new mw.Api().postWithEditToken({
                        action: 'protect',
                        title: mw.config.get('wgPageName'),
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
                new BannerNotification(elementContent.contentRefreshed, 'success').show();
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
                    from: mw.config.get('wgPageName'),
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

});
// </nowiki>