/* Name:    DiscordModule 1.0.52
 * Author:  Сибирский Смотритель (Siberian Specules)
 * Idea:    Your Own Waifu
 * Testers: TrJVoRoN
 * settings: .dev.discordmodule; supposed to be per-user
 ** .usenick: show nick instead of username (doesn't respect a-z order)
*/
 
!function (userSettings) {
    /*global require module list*/
    var moduleList = ['jquery', 'mw', 'wikia.ui.factory', 'BannerNotification', 'wikia.window', 'ext.wikia.design-system.loading-spinner'];
    /* require callback */
    function rcallback ($, mw, uiFactory, BannerNotification, window, Spinner) {
        'use strict';
        
        var cfg = mw.config.get([
            'wgPageName',
            'wgUserLanguage',
            'wgUserName',
            'wgUserGroups'
        ]);
         
        if (
            (!$('#WikiaRail').length) &&
            !$('.discord-container').length &&
            cfg.wgPageName !== "MediaWiki:Custom-Discord-Module-Settings"
        ) {
            return;
        }
        
        if (!Spinner) {
            // spinner emulation
            Spinner = function(){return{html:''}};
        }
        
        var i18n = {
            // language list - start
            en: {
                description: "[https://discordapp.com/ Discord] is a free application for public discussions outside Fandom. " +
                             "[[wikipedia:Discord (software)|Get more in Wikipedia]]",
                online: "Online:",
                join: "Join",
                onlinelist: "Users online",
                instruction: "To get server ID you need to go this path (need administrator rights):<br/>" +
                             "Server settings > Widget > Server ID<br/>" +
                             "Also here you need to turn on widget and choose the channel to invite if you want users to be coming on your server.",
                descriptionForm: "Module description",
                supportsWikitext: "supports wikitext",
                placeholder: "Information about Discord by default",
                useSvg: "Use custom image (CSS change required)",
                flags: "Other parameters",
                showGuideline: "Do not show custom description",
                showForAnonym: "Do not show for anonyms",
                showServerName: "Do not show server name",
                railPosition: "Position below the rail",
                generateHTML: "Generate HTML",
                saveSettings: "Save",
                reset: "Reset",
                successChange: 'Successfully saved',
                errorChange: 'An error occurred',
                refresh: 'R',
                refreshTitle: 'Refresh',
                showRefresh: 'Hide "Refresh" button',
                refreshClass: 'Additional classes for "Refresh" button'
            },
            be: {
                description: "[https://discordapp.com/ Discord] – дармовы дадатак для публічнага камунікавання па-за Фэндома. " +
                             "[[wikipedia:be:Discord|Падрабязней у Вікіпедыі]]",
                online: "У сеціве:",
                join: "Увайсці",
                onlinelist: "Карыстачы анлайн",
                instruction: "Каб атрымаць ID сервера, трэба прайсці:<br/>" +
                             "Налады сервера > Віджэт > ID Сервера<br/>" +
                             "Тамсама трэба ўключыць віджэт і выбраць канал, калі хочаце, каб людзі прыходзілі на сервер.",
                descriptionForm: "Апісанне",
                supportsWikitext: "падтрымвае вікі-тэкст",
                placeholder: "Па змаўчанні будуць выведзена інфармацыя пра Дыскорд",
                useSvg: "Скарыстаць уласную выяву (патрабуюцца змены CSS)",
                flags: "Іншыя параметры",
                showForAnonym: "Не паказваць ананімам",
                showServerName: "Не паказваць імя сервера",
                showGuideline: "Не паказваць апісанне",
                railPosition: "Пазіцыянаваць знізу рэйла",
                generateHTML: "Згенераваць HTML",
                saveSettings: "Захаваць",
                reset: "Скінуць",
                successChange: 'Змены захаваны',
                errorChange: 'Абмыла захавання',
                refreshTitle: 'Абнавіць'
            },
            es: {
                description: "[https://discordapp.com/ Discord] es un aplicación gratis para discusiones públicas fuera de Fandom. " +
                             "[[wikipedia:es:Discord|Leer más en Wikipedia]]",
                online: "En Línea:",
                join: "Unirse",
                onlinelist: "Usuarios en línea",
                instruction: "Para obtener la ID del servidor, usa esta ruta (se necesita ser un administrador):<br/>" +
                             "Ajustes del Servidor > Widget > ID del Servidor<br/>" +
                             "Aquí también se necesita encender el widget y elegir el canal de entrada si quieres que otros usuarios se unan a tu servidor.",
                descriptionForm: "La descripción del módulo",
                supportsWikitext: "permite wikitext",
                placeholder: "Información de Discord por defecto",
                useSvg: "Usar una imagen personalizada (se requiere un cambio de CSS)",
                flags: "Otros parámetros",
                showGuideline: "No mostrar la descripción personalizada",
                showForAnonym: "No mostrar para usuarios anónimos",
                showServerName: "No mostrar el nombre del servidor",
                railPosition: "Colocar a debajo del carril derecho",
                generateHTML: "Generar HTML",
                saveSettings: "Guardar",
                reset: "Restablecer",
                successChange: 'Guardado exitosamente',
                errorChange: 'Un error ha ocurrido'
            },
            fr: {
                description: "[https://discordapp.com/ Discord] est une application gratuite pour des discussions publiques en dehors de Fandom " +
                             "[[wikipedia:fr:Discord (logiciel)|Plus d'informations sur wikipédia]]",
                online: "En ligne:",
                join: "Rejoindre",
                onlinelist: "Utilisateurs en ligne",
                instruction: "Pour recevoir l\'identifiant du serveur, utiliser ce chemin d'accès (vous avez besoin des permissions administrateur):<br/>" +
                             "Paramètres du serveur > Widget > Identifiant du serveur (ID)<br/>" +
                             "Vous avez aussi besoin d'activer le widget pour le serveur et choisir le salon dans lequel vous voulez inviter les personnes.",
                descriptionForm: "Description du module",
                supportsWikitext: "supporte le wikitext",
                placeholder: "Information à propos de Discord par défaut",
                useSvg: "Utiliser une image personnalisée (Nécessite de modifier du CSS)",
                flags: "Autres paramètres",
                showGuideline: "Ne pas montrer la description personnalisée",
                showForAnonym: "Ne pas montrer pour les anonymes",
                showServerName: "Ne pas montrer le nom du serveur",
                railPosition: "Position sous la barre latérale",
                generateHTML: "Genérer le HTML",
                reset: "Réinitialiser",
                successChange: 'Sauvegardé avec succès',
                errorChange: 'Un erreur s\'est produite',
            },
            pl: {
                description: "[https://discordapp.com/ Discord] jest aplikacją używaną do komunikacji poza Fandomem. " +
                             "[[wikipedia:pl:Discord|Dowiedz się więcej]] (Wikipedia)",
                online: "Online:",
                join: "Dołącz",
                onlinelist: "Użytkownicy online",
                instruction: "Aby uzyskać ID serwera wejdź tutaj (wymaga uprawnień administratora):<br/>" +
                             "Ustawienia serwera > Widget > ID serwera<br/>" +
                             "W tym miejscu możesz również włączyć widget Discorda i wybrać kanał, na który będą dołączać użytkownicy.",
                descriptionForm: "Opis modułu",
                supportsWikitext: "wspiera wikitekst",
                placeholder: "Domyślnie krótka informacja na temat Discorda",
                useSvg: "Użyj własnego obrazu (wymaga zmian w CSS)",
                flags: "Inne ustawienia",
                showGuideline: "Nie pokazuj niestandardowego opisu",
                showForAnonym: "Nie pokazuj niezalogowanym",
                showServerName: "Nie pokazuj nazwy serwera",
                railPosition: "Umieść pod koniec prawej kolumny",
                generateHTML: "Wygeneruj kod HTML",
                saveSettings: "Zapisz",
                reset: "Wyczyść",
                successChange: 'Pomyślnie zapisano',
                errorChange: 'Wystąpił błąd'
            },
            ru: {
                description: "[https://discordapp.com/ Discord] — бесплатное приложение для публичного общения вне Фэндома. " +
                             "[[wikipedia:ru:Discord|Подробнее в Википедии]]",
                online: "В сети:",
                join: "Войти",
                onlinelist: "Пользователи онлайн",
                instruction: "Чтобы получить ID сервера, нужно пройти:<br/>" +
                             "Настройки сервера > Виджет > ID Сервера<br/>" +
                             "Там же надо включить виджет и выбрать канал, если хотите, чтобы люди приходили на сервер.",
                descriptionForm: "Описание",
                supportsWikitext: "поддерживает викитекст",
                placeholder: "По умолчанию будут выведена информация о Дискорде",
                useSvg: "Использовать собственное изображение (требуются изменения CSS)",
                flags: "Другие параметры",
                showForAnonym: "Не показывать анонимам",
                showServerName: "Не показывать имя сервера",
                showGuideline: "Не показывать описание",
                railPosition: "Позиционировать снизу рельсы",
                generateHTML: "Сгенерировать HTML",
                saveSettings: "Сохранить",
                reset: "Сбросить",
                successChange: 'Изменения сохранены',
                errorChange: 'Ошибка сохранения',
                refreshTitle: 'Обновить',
                showRefresh: 'Скрыть кнопку "Обновить"',
                refreshClass: 'Дополнительные классы для кнопки "Обновить"'
            },
            tr: {
                description: "[https://discordapp.com/ Discord], Fandom dışındaki kamuoyu tartışmaları için ücretsiz bir uygulamadır. " +
                             "[[wikipedia:Discord (software)|Vikipedi'den daha fazlasını alın]]",
                online: "Çevrimiçi:",
                join: "Katıl",
                onlinelist: "Kullanıcılar çevrimiçi",
                instruction: "Sunucu kimliğini almak için bu yola gitmeniz gerekir (yönetici haklarına ihtiyacınız var):<br/>" +
                             "Sunucu ayarları> Widget > Sunucu Kimliği<br/>" +
                             "Ayrıca burada kullanıcıların sunucunuza gelmesini istiyorsanız widget'ı açmanız ve davet edilecek kanalı seçmeniz gerekir.",
                descriptionForm: "Modül açıklaması",
                supportsWikitext: "wiki metnini destekliyor",
                placeholder: "Varsayılan olarak Discord hakkında bilgi",
                useSvg: "Özel resim kullan (CSS değişikliği gerekli)",
                flags: "Diğer parametreler",
                showGuideline: "Özel açıklama gösterme",
                showForAnonym: "Anonimler için gösterme",
                showServerName: "Sunucu adını gösterme",
                railPosition: "Rayın altına yerleştirin",
                generateHTML: "HTML oluştur",
                saveSettings: "Kaydet",
                reset: "Sıfırla",
                successChange: 'Başarılıyla kaydedildi',
                errorChange: 'Bir hata oluştu',
                refresh: 'Y',
                refreshTitle: 'Yenile',
                showRefresh: '"Yenile" düğmesini gizle',
                refreshClass: '"Yenile" düğmesi için ek sınıflar'
            },
            uk: {
                description: "[https://discordapp.com/ Discord] – безкоштовний додаток для публічного спілкування поза Фендому. " +
                             "[[wikipedia:uk:Discord|Докладніше у Вікіпедії]]",
                online: "В мережі:",
                join: "Увійти",
                onlinelist: "Користувачі онлайн",
                instruction: "Аби отримати ID сервера, потрібно пройти:<br/>" +
                             "Налаштування сервера > Віджет > ID Сервера<br/>" +
                             "Там же треба включити віджет й обрати канал, якщо хочете, щоб люди приходили на сервер.",
                descriptionForm: "Опис",
                supportsWikitext: "підтримує вікі-текст",
                placeholder: "За замовчуванням буде виведено інформацію про Дискорд",
                useSvg: "Використовувати власне зображення (потрібні зміни CSS)",
                flags: "Інші параметри",
                showForAnonym: "Не показувати анонімам",
                showServerName: "Не показувати ім\'я сервера",
                showGuideline: "Не показувати опис",
                railPosition: "Позиціонувати знизу рейлу",
                generateHTML: "Згенерувати HTML",
                saveSettings: "Зберегти",
                reset: "Скинути",
                successChange: 'Зміни збережені',
                errorChange: 'Помилка збереження',
                refreshTitle: 'Оновити'
            }
            // language list - stop
        };
        var lang = cfg.wgUserLanguage;
        var translateList = typeof i18n[lang] !== 'undefined' ? i18n[lang] : i18n.en;
         
        // Translations
        function translate(text) {
            for (var k in i18n.en) {
                text = text.replace(new RegExp("\\(" + k + "\\)", "gi"), translateList[k] || i18n.en[k]);
            }
            return text;
        }
         
        var defaultSettings = {
            id: '',
            customDescription: "",
            railPosition: "prepend",
            refreshClass: '',
            showGuideline: true,
            showForAnonym: true,
            showRefresh: true,
            showServerName: true,
            useSvg: true
        };
         
        // Settings from MediaWiki
        function init(callback) {
            var settings = {};
            $.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    action: "raw",
                    title: "MediaWiki:Custom-Discord-Module-Settings",
                },
                success: function(settings) {
                    if (typeof settings.missing === 'undefined') {
                        try {
                            settings = JSON.parse(settings);
                        }
                        catch (ex) {
                            console.log('discord module: can\'t parse json', {ex: ex, data: settings});
                            settings = window.DiscordModuleSettings || {};
                        }
                    } else {
                        settings = window.DiscordModuleSettings || {};
                    }
         
                    callback(settings);
                },
                error: function() {
                    callback({});
                }
            });
        }
         
        // Discord Guild Data
        function getData(settings, container) {
            var id = typeof container.selector.data("id") !== 'undefined' ? 
                container.selector.data("id") : settings.id;
            var discordJSON = "https://discordapp.com/api/servers/" + id + "/embed.json";
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    try {
                        var data = JSON.parse(request.responseText);
                        if (typeof data.name === undefined)
                            container.showError("Configuration Error: wrong server ID");
         
                        buildModule(data, settings, container);
                    } catch (e) {
                        container.showError(e);
                    }
                } else if (request.readyState == 4) {
                    container.showError("Configuration Error");
                }
            };
            request.open("GET", discordJSON, true);
            request.send();
        }
         
        // Generate block with guild info and join link
        function buildModule(data, settings, container) {
            settings = $.extend({}, defaultSettings, settings, container.getData());
            if (
                typeof settings.showForAnonym !== "boolean" || 
                typeof settings.showServerName !== "boolean" || 
                typeof settings.showGuideline !== "boolean" || 
                typeof settings.useSvg !== "boolean" || 
                typeof settings.customDescription !== "string" ||
                typeof settings.refreshClass !== 'string' ||
                typeof settings.showRefresh !== 'boolean'
            ) {
                return container.showError("Configuration Error: wrong type");
            }
            if (settings.showForAnonym === false && !cfg.wgUserName) {
                container.remove();
                return;
            }
         
            function loadModule(description) {
                var image = !settings.useSvg ? 
                '<div class="discord-icon"></div>' : 
                '<svg xmlns="http://www.w3.org/2000/svg" class="discord-svg" width="20" height="20" viewBox="0 0 240 245">' + 
                    '<path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/>' +
                    '<path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/>' +
                '</svg>';
         
                var $module = $('<div class="discord-content">' +
                    '<h2 class="discord-header has-icon">' +
                        image + 
                        (settings.showServerName ? mw.html.escape(data.name) : 'Discord') + 
                    '</h2>' +
                    (description || '') +
                    '<div class="discord-connect">' +
                        (data.instant_invite ? 
                        '<a class="discord-join wds-is-squished wds-button wds-is-secondary">(join)</a>' : 
                        '') +
                        '<a class="discord-online">(online) <span class="discord-counter">?</span></a>' +
                    '</div>' +
                '</div>'),
                    $refresh = $('<a>', {
                        href: '#',
                        class: 'discord-refresh ' + (settings.refreshClass || ''),
                        text: translate('(refresh)'),
                        title: translate('(refreshTitle)'),
                        style: 'float:right'
                    });
                $('body').off('click.discordrefresh');
                if (settings.showRefresh) {
                    $('body').on('click.discordrefresh', '.discord-refresh', function (e) {
                        e.preventDefault();
                        getData(settings, container);
                        return false;
                    });
                    $module.find('.discord-connect').append($refresh);
                }
                $module.find('.discord-join').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
                $module.find('.discord-counter').text(data.presence_count || data.members.length);
                $module.html(translate( $module[0].innerHTML ));
         
                var avatarsLoaded = false,
                    $members = $('<ul class="discord-list"></ul>');
                data.members.forEach(function (v) {
                    var memberName = v.username.replace(/\s/g, '_'),
                        memberNick = v.nick ? v.nick.replace(/\s/g, '_') : memberName;
                    var $member = $('<li>', {
                        'class': 'discord-member discord-member-' + (userSettings.usenick ? memberNick : memberName)
                    }).append(
                        $('<div>', { 'class': 'discord-avatar' }).append(
                            $('<img>')
                        )
                    );
                    $member.append(
                        mw.html.escape(userSettings.usenick ? v.nick || v.username : v.username)
                        + (v.bot ? '<span class="discord-bot">BOT</span>' : '')
                    );
                    // add title to member
                    if (v.nick) {
                        $member.attr('title', userSettings.usenick ? v.username : v.nick);
                    }
                    $member.find('.discord-avatar').addClass("discord-" + v.status);
                    //$member.find('img').attr("src", v.avatar_url);
                    $member.attr('data-avatar', v.avatar_url);
                    if (v.game) {
                        $member.append(
                            $('<span>', {
                                class: 'discord-member-game',
                                text: v.game.name,
                            })
                        );
                    }
        
                    $members.append($member);
                });
         
                $module.find('.discord-online').click(function(e) {
                    e.preventDefault();
                    uiFactory.init(['modal']).then(function(uiModal) {
                        // add avatars
                        if (!avatarsLoaded) {
                            avatarsLoaded = true;
                            $members.find('.discord-member').each(function () {
                                var $member = $(this);
                                $member.find('img').attr('src', $member.attr('data-avatar'));
                            });
                        }
                        uiModal.createComponent({
                            type: 'default',
                            vars: {
                                id: 'discord-list-modal',
                                title: translate('(onlinelist)'),
                                content: $members.html(),
                                size: 'small'
                            }
                        }, function(modal) {
                            modal.$element.keydown(function(e) {
                                if (e.which == 27) {
                                    e.preventDefault();
                                    modal.trigger("close");
                                }
                            });
                            modal.bind("reset", function(e) {
                                e.preventDefault();
                                modal.trigger("close");
                            });
                            modal.show();
                            mw.hook('discordmodule.modal.show').fire(modal.$content);
                        });
                    });
                });
         
                container.fill($module, settings.railPosition);
            }
         
            if (settings.showGuideline) {
                var description = '<p class="discord-guideline">' +
                                (settings.customDescription || translate("(description)")) +
                            '</p>';
                parseWikitext(description, loadModule);
            } else {
                loadModule(false);
            }
        }
         
        // Settings form
        function visualSettings(settings) {
            var $form = $(translate('<div class="discord-settings">' +
                '<form id="ds-id">' +
                    '<label for="ds-form-id">ID:</label>' +
                    '<input id="ds-form-id" name="id"/>' +
                    '<div class="ds-id-instruction">(instruction)</div>' +
                '</form>' +
                '<form id="ds-description">' +
                    '<div class="ds-header">(descriptionForm) <small>((supportsWikitext))</small></div>' +
                    '<textarea id="ds-description-input" name="customDescription" placeholder="(placeholder)"></textarea>' +
                '</form>' +
                '<form id="ds-refresh-class">' +
                    '<div class="ds-header">(refreshClass) </div>' +
                    '<textarea id="ds-refresh-class-input" name="refreshClass"></textarea>' +
                '</form>' +
                '<form id="ds-flags">' +
                    '<div class="ds-header">(flags)</div>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="useSvg"/>' +
                        '<span class="ds-label">(useSvg)</span>' +
                    '</label>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="showForAnonym"/>' +
                        '<span class="ds-label">(showForAnonym)</span>' +
                    '</label>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="showServerName"/>' +
                        '<span class="ds-label">(showServerName)</span>' +
                    '</label>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="showGuideline"/>' +
                        '<span class="ds-label">(showGuideline)</span>' +
                    '</label>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="showRefresh"/>' +
                        '<span class="ds-label">(showRefresh)</span>' +
                    '</label>' +
                '</form>' +
                '<form id="ds-buttons">' +
                    (cfg.wgUserGroups.indexOf('sysop') !== -1 ? 
                    '<a class="wds-button wds-is-squished ds-save">(saveSettings)</a>' : 
                    '') +
                    '<a class="wds-is-secondary wds-button wds-is-squished ds-reset">(reset)</a>' +
                    '<a class="wds-is-secondary wds-button wds-is-squished ds-html">(generateHTML)</a>' +
                '</form>' +
                '<textarea class="ds-generated" style="display: none;"></textarea>' +
            '</div>'));
         
            s2v(settings, $form);
            $form.find('.ds-save').click(function () {
                $.ajax({
                    url: mw.util.wikiScript('api'),
                    type: 'POST',
                    data: {
                        action: "edit",
                        title: "MediaWiki:Custom-Discord-Module-Settings",
                        token: mw.user.tokens.get('editToken'),
                        text: JSON.stringify(v2s($form)),
                        summary: "Editing settings",
                        recreate: true
                    },
                    success: function() {
                        new BannerNotification(translate('(successChange)'), 'confirm').show();
                    },
                    error: function(e) {
                        new BannerNotification(translate('(errorChange)'), 'error').show();
                        console.error(e);
                    }
                });
            });
         
            $form.find('.ds-reset').click(function() {
                s2v(settings, $form);
            });
         
            $form.find('.ds-html').click(function () {
                var data = v2s($form);
                Object.keys(data).map(function(key) {
                    data["data-" + key.replace(/([A-Z])/g, '-$1')] = data[key];
                    delete data[key];
                });
         
                $form.find('.ds-generated').val(
                    $('<div/>').append(
                        $('<div class="discord-container"> </div>').attr( data )
                    ).html()
                ).show();
            });
         
            $('#mw-content-text').before($form);
        }
         
        // Settings to visual
        function s2v(settings, selector) { 
            selector.find('#ds-form-id').val( getAttr("id") );
            selector.find('#ds-description-input').val( getAttr("customDescription") );
            selector.find('#ds-refresh-class-input').val( getAttr("refreshClass") );
        
            ["showForAnonym", "showGuideline", "useSvg", "showServerName", 'showRefresh']
            .forEach(function(v) {
                checkIf( !getAttr(v), v );
            });
         
            function getAttr(attr) {
                if (typeof settings[attr] !== 'undefined')
                    return settings[attr];
                return defaultSettings[attr];
            }
         
            function checkIf(condition, checkbox) {
                var $checkbox = selector.find('[name="' + checkbox + '"]');
                if (condition)
                    $checkbox.prop('checked', true);
                else
                    $checkbox.prop('checked', false);
            }
        }
         
        // Visual to settings
        function v2s(selector) { 
            return selector.find("#ds-id, #ds-description, #ds-flags, #ds-refresh-class")
                .serializeArray()
                .map(function(v) {
                    if (
                        v.value === "on" &&
                        ["showForAnonym", "showGuideline", "useSvg", "showServerName", 'showRefresh']
                        .indexOf(v.name) != -1
                    ) { 
                        v.value = false;
                    }
         
                    return [v.name, v.value];
                })
                .reduce(function(obj, pair) {
                    obj[pair[0]] = pair[1];
                    return obj;
                }, {});
        }
         
        // Container's object: rail section or block in content
        function Container(type, selector) {
            this.type = type;
            if (type == "box") {
                this.selector = $(selector).addClass("rail-module");
            } else {
                var newSelector = $('<div class="discord-module rail-module"></div>');
                $(selector).prepend(newSelector);
                this.selector = newSelector;
            }
            this.fill(this.preload);
        }
        
        Container.prototype.remove = function() {
            if (this.selector && this.selector instanceof jQuery) this.selector.remove();
        };
        
        Container.prototype.preload = $(
        '<div class="discord-preload">' + new Spinner(38, 2).html.replace('wds-block', 'wds-spinner__block').replace('wds-path', 'wds-spinner__stroke') + '</div>');
         
        Container.prototype.getData = function() {
            if (this.type === "rail") return {};
            return this.selector.data();
        };
         
        Container.prototype.fill = function(content) {
            this.selector.html(content);
            mw.hook('discordmodule.fill').fire(this.selector instanceof jQuery ? this.selector : $(this.selector));
        };
         
        Container.prototype.showError = function(text) {
            this.fill(
                '<div class="discord-error">' + 
                    text + '<br/>' + 
                    '<a href="?action=purge">Reload?</a>' + 
                '</div>', 
            'prepend');
        };
         
        // Wikitext parser
        function parseWikitext(text, callback) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'GET',
                data: {
                    action: "parse",
                    contentmodel: "wikitext",
                    text: text,
                    format: 'json'
                },
                success: function(data) {
                    callback(data.parse.text['*']);
                }
            });
        }
         
        // Run
        init(function(settings) {
            window.importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:DiscordModule/style.css'
            });
         
            if ( $('#WikiaRail').length ) {
                getData( settings, new Container('rail', '#WikiaRail') );
            }
         
            if ( $('.discord-container').length ) {
                $('.discord-container').each(function() {
                    getData( settings, new Container('box', $(this)) );
                });
            }
         
            if ( cfg.wgPageName === "MediaWiki:Custom-Discord-Module-Settings" ) {
                visualSettings(settings);
            }
        });
     
    }// rcallback
    
    /* require error handler */
    function rerrHandler(error) {
        console.warn('DiscordModule require error', error);
        if (error === 'Module ext.wikia.design-system.loading-spinner is not defined.') {
            // try to restore after spinner error
            moduleList.splice(-1);
            require(moduleList, rcallback, rerrHandler);
        }
    }
    
    /*global require */
    require(moduleList, rcallback, rerrHandler);
}((window.dev = window.dev || {}).discordmodule = window.dev.discordmodule || {});