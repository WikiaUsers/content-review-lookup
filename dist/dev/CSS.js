/**
 * CSS — Custom CSS Injection System
 * Also referred to as tCSS to avoid ambiguity.
 *
 * Author: 0.Phixley ([[User:0.Phixley]])
 *
 * References:
 * - [[w:c:zh.backrooms:MediaWiki:Common.js]]
 *   Originally written by [[User:HyperNervie]],
 *   subsequently modified by [[User:0.Phixley]].
 * - [[w:c:backrooms:MediaWiki:Common.js]]
 *   Written and maintained by [[User:Pexy0]].
 *
 * Security Considerations:
 * - This script is designed exclusively for CSS injection. It does
 *   not provide arbitrary HTML injection or JavaScript execution.
 *   CSS content is passed to MediaWiki's mw.util.addCSS() API rather
 *   than being interpreted as HTML or JavaScript.
 *
 * - All CSS injected through this script must comply with Fandom's
 *   Customization Policy ([[w:Customization policy]]), which governs
 *   the use of custom CSS and prohibits abusive styling practices.
 *
 * - Because CSS is inherently flexible and complex, I cannot enforce
 *   Fandom's Customization Policy at the script level without also risking
 *   the rejection of styles that do not interfere with readability and
 *   may even improve the user experience. Preventing the misuse of CSS
 *   can be a challenging task; however, this does not make the script
 *   itself technically unsafe. Much like how any user can insert `<div 
 *   style="position:fixed;z-index:99999;width:100%;height:100%;background:
 *	 #000;"></div>` into wikitext to maliciously obscure an entire page,
 *   such abuses cannot be comprehensively prevented at the point where CSS
 *   is injected. Ultimately, this script can only serve its intended purpose
 *   when used responsibly.
 *
 * Description:
 * - tCSS provides a flexible way to add custom CSS to individual wiki
 *   pages without modifying site-wide CSS or even requiring a
 *   dedicated CSS page.
 *
 * - When used with templates, CSS can be embedded alongside template
 *   content and automatically carried over wherever the template is
 *   transcluded. This provides a convenient solution for small,
 *   scattered styles that are useful for improving presentation but
 *   are only relevant to particular templates or pages, eliminating
 *   the need to decide where such styles should otherwise be stored.
 *
 * Components:
 * - Core: Identifies designated HTML elements and injects their CSS
 *   content into the page using MediaWiki's mw.util.addCSS() API.
 * - Configuration: Provides an interface in the Admin Dashboard
 *   for managing the system's settings through a JSON configuration
 *   page.
 *
 * - Core and Configuration are independent components and can be
 *   used separately.
 */

// Core
((w, mw, $) => {
    w.tCSS = w.tCSS || {};

    const cp = w.tCSS.configPage || 'MediaWiki:Custom-CSS.json',
        cacheKey = `tCSS:${mw.config.get('wgDBname')}:${cp}`,
        cacheTTL = 30 * 1000,
        isConfig = value => value && typeof value === 'object' && !Array.isArray(value),
        readCache = () => {
            try {
                const cache = JSON.parse(localStorage.getItem(cacheKey));
                return cache && Number.isFinite(cache.timestamp) &&
                    typeof cache.exists === 'boolean' &&
                    (!cache.exists || isConfig(cache.config))
                    ? cache
                    : null;
            } catch (e) {
                return null;
            }
        },
        writeCache = (exists, config) => {
            try {
                localStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    exists,
                    config: exists ? config : null
                }));
            } catch (e) { }
        },
        fetchConfig = () => $.getJSON(mw.util.wikiScript('index'), {
            title: cp,
            action: 'raw'
        }).done(r => {
            if (isConfig(r)) writeCache(true, r);
        }).fail(xhr => {
            if (xhr.status === 404) writeCache(false);
        });

    const initCore = config => {
        if (isConfig(config)) $.extend(w.tCSS, config);

        (() => {
            w.tCSS = w.tCSS || {};
            w.tCSS = $.extend({
                enable: true,
                allowedTags: ['span'], className: 'import-css', cssAttr: 'css',
                markSource: true, sourceAttr: 'source',
                markCategory: false, categoryName: 'Custom CSS injected',
                useMaster: false, masterName: 'css-toggler',
                useTrigger: false, triggerAttr: 'trigger', triggerPrefix: 'csstrigger', triggerDefault: false,
                useTimer: false, timerName: 'timer', timerDefault: false
            }, w.tCSS);

            const cf = w.tCSS;

            if (!cf.enable || (cf.markCategory && !mw.config.get('wgCategories').includes(cf.categoryName))) return;

            const s = cf.allowedTags.map(t => `${t}.${cf.className}`).join(','),
                m = `.${cf.masterName}`;

            let mE = true;

            mw.hook('wikipage.content').add($c => {
                if (cf.useMaster) $c.find(m).addBack(m)
                    .css('cursor', 'pointer')
                    .off('click.tCSSMaster')
                    .on('click.tCSSMaster', () => (
                        mE = !mE,
                        $(`style.${cf.className}`).each(function () {
                            $(this).data('tCSSUpdate')();
                        })
                    ));

                $c.find(s).addBack(s).each(function () {
                    const $t = $(this);

                    if ($t.data('tCSSProcessed')) return;

                    const c = mw.util.addCSS($t.attr(`data-${cf.cssAttr}`)),
                        $s = $(c.ownerNode).addClass(cf.className);

                    if (cf.markSource) $s.attr(`data-${cf.sourceAttr}`, $t.attr(`data-${cf.sourceAttr}`));

                    const tr = cf.useTrigger ? ($t.attr(`data-${cf.triggerAttr}`) || '').trim() : '',
                        $tr = tr ? $(`.${cf.triggerPrefix}-${tr}`).css('cursor', 'pointer') : $(),
                        tiV = cf.useTimer ? $t.attr(`data-${cf.timerName}`) : '',
                        tiN = Number(tiV),
                        hTi = tiV !== undefined && tiV !== '' && Number.isFinite(tiN);

                    let trE = !tr || cf.triggerDefault,
                        tiE = !hTi || cf.timerDefault;

                    const u = () => {
                        c.disabled = !mE || !trE || !tiE;
                    };

                    if (cf.useMaster) $s.data('tCSSUpdate', u);
                    if ($tr.length) $tr.on('click.tCSSTrigger', () => (trE = !trE, u()));
                    if (hTi) setTimeout(() => (tiE = !cf.timerDefault, u()), tiN * 1000);

                    u();
                    $t.data('tCSSProcessed', true);
                });
            });
        })();
    };

    const cache = readCache();

    if (cache) {
        initCore(cache.exists ? cache.config : null);

        if (Date.now() - cache.timestamp >= cacheTTL) fetchConfig();
    } else {
        fetchConfig()
            .done(r => initCore(isConfig(r) ? r : null))
            .fail(() => initCore(null));
    }
})(window, mediaWiki, jQuery);

// Configuration
((w, mw, $) => {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' || !mw.config.get('wgUserGroups').includes('sysop')) return;

    const configPage = w.tCSS && w.tCSS.configPage || 'MediaWiki:Custom-CSS.json',
        api = new mw.Api(),
        defaults = {
            enable: true,
            allowedTags: ['span'], className: 'import-css', cssAttr: 'css',
            markSource: true, sourceAttr: 'source',
            markCategory: false, categoryName: 'Custom CSS injected',
            useMaster: false, masterName: 'css-toggler',
            useTrigger: false, triggerAttr: 'trigger', triggerPrefix: 'csstrigger', triggerDefault: false,
            useTimer: false, timerName: 'timer', timerDefault: false
        },
        fields = [
            ['allowedTags', 'array'], ['className', 'string'], ['cssAttr', 'string'],
            ['markSource', 'boolean'], ['sourceAttr', 'string'],
            ['markCategory', 'boolean'], ['categoryName', 'string'],
            ['useMaster', 'boolean'], ['masterName', 'string'],
            ['useTrigger', 'boolean'], ['triggerAttr', 'string'], ['triggerPrefix', 'string'], ['triggerDefault', 'boolean'],
            ['useTimer', 'boolean'], ['timerName', 'string'], ['timerDefault', 'boolean']
        ],
        dependencies = {
            sourceAttr: 'markSource',
            categoryName: 'markCategory',
            masterName: 'useMaster',
            triggerAttr: 'useTrigger',
            triggerPrefix: 'useTrigger',
            triggerDefault: 'useTrigger',
            timerName: 'useTimer',
            timerDefault: 'useTimer'
        },
        cacheKey = `tCSS:${mw.config.get('wgDBname')}:${configPage}`;

    const readConfig = () => api.get({
        action: 'query',
        prop: 'revisions',
        titles: configPage,
        rvprop: 'content',
        rvslots: 'main',
        formatversion: 2
    }).then(data => {
        const revision = data.query.pages[0].revisions,
            content = revision ? revision[0].slots.main.content : '';

        return content.trim() ? JSON.parse(content) : {};
    });

    const writeCache = config => {
        try {
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: Date.now(),
                exists: true,
                config
            }));
        } catch (e) { }
    };

    const i18nReady = $.getScript('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:I18n-js/code.js&only=scripts')
        .then(() => window.dev.i18n.loadMessages('CSS', { cacheVersion: 1 })),
        uiReady = mw.loader.using(['oojs-ui-core', 'oojs-ui-widgets']),
        domReady = $.Deferred();

    $(() => domReady.resolve());

    const configReady = readConfig();

    $.when(i18nReady, uiReady, domReady).done(i18n => {
        const msg = key => i18n.msg(key).plain(),
            saveConfig = config => api.postWithToken('csrf', {
                action: 'edit',
                title: configPage,
                text: JSON.stringify(config, null, 4),
                contentmodel: 'json',
                summary: msg('edit-summary')
            }),
            $list = $('ul.wiki-features__list');

        if (!$list.length) return;

        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:CSS/style.css'
        });

        const $toggleItem = $(`
                <li>
                    <div class="wiki-features__label">
                        <span class="tCSS-label"></span>
                        <div class="wds-dropdown wiki-features__description">
                            <svg class="wds-icon wds-icon-tiny" aria-hidden="true">
                                <use xlink:href="#wds-icons-question-small"></use>
                            </svg>
                            <div class="wds-dropdown__content wds-is-right-aligned">
                                <span class="tCSS-description-before"></span>
                                <a href="https://dev.fandom.com/wiki/CSS"
                                    class="extiw" title="w:c:dev:CSS"></a>
                                <span class="tCSS-description-after"></span>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" id="wiki-features__tCSS"
                        class="wds-toggle__input" disabled>
                    <label for="wiki-features__tCSS"
                        class="wds-toggle__label"></label>
                </li>
            `),
            $panel = $(`
                <section class="control-section tCSS-panel">
                    <header class="tCSS-panel__heading"><h1></h1></header>
                    <div class="tCSS-panel__fields"></div>
                    <div class="tCSS-panel__footer">
                        <span class="tCSS-panel__status"></span>
                    </div>
                </section>
            `),
            $toggle = $toggleItem.find('input'),
            $fields = $panel.find('.tCSS-panel__fields'),
            $footer = $panel.find('.tCSS-panel__footer'),
            $status = $panel.find('.tCSS-panel__status'),
            $submit = new OO.ui.ButtonInputWidget({
                label: msg('submit'),
                flags: ['primary', 'progressive']
            }),
            widgets = {};

        $toggleItem.find('.tCSS-label').text(msg('enable-label'));
        $toggleItem.find('.tCSS-description-before').text(msg('enable-description-before'));
        $toggleItem.find('a').text(msg('enable-description-link'));
        $toggleItem.find('.tCSS-description-after').text(msg('enable-description-after'));

        $panel.find('h1').text(msg('panel-title'));
        $footer.append($submit.$element);

        const updateDependencies = () => {
            Object.keys(dependencies).forEach(key => {
                widgets[key].setDisabled(
                    !widgets[dependencies[key]].isSelected()
                );
            });
        };

        const renderFields = config => {
            const rows = [];

            fields.forEach(([key, type]) => {
                const label = msg('option-' + key),
                    widget = type === 'boolean'
                        ? new OO.ui.CheckboxInputWidget({
                            selected: !!config[key]
                        })
                        : new OO.ui.TextInputWidget({
                            value: type === 'array'
                                ? config[key].join(', ')
                                : config[key]
                        }),
                    $label = $('<label>', {
                        class: 'tCSS-panel__label',
                        for: 'tCSS-' + key
                    }).text(label);

                if (type === 'boolean')
                    widget.on('change', updateDependencies);

                widget.$element.attr('data-key', key)
                    .find('input').attr({
                        id: 'tCSS-' + key,
                        'aria-label': label
                    });

                widgets[key] = widget;

                rows.push(
                    $('<div class="tCSS-panel__row">')
                        .append($label, widget.$element)[0]
                );
            });

            $fields.append(rows);
            updateDependencies();
        };

        $('#AdminDashboardGeneral').append($panel);
        $list.prepend($toggleItem);

        configReady.done(saved => {
            const config = $.extend({}, defaults, w.tCSS, saved);

            delete config.configPage;
            w.tCSS = $.extend(w.tCSS || {}, config);

            $toggle.prop('checked', config.enable !== false).prop('disabled', false);
            $panel.toggleClass('tCSS-panel--disabled', config.enable === false);

            renderFields(config);
        }).fail(() => {
            $status.text(msg('load-error'));
            $toggle.prop('disabled', false);
            $submit.setDisabled(true);
        });

        $toggle.on('change.tCSS', function () {
            const enabled = this.checked;

            $toggle.prop('disabled', true);

            readConfig().then(saved => {
                saved.enable = enabled;
                return saveConfig(saved).then(() => saved);
            }).done(saved => {
                w.tCSS.enable = enabled;
                writeCache(saved);

                $panel.toggleClass('tCSS-panel--disabled', !enabled);
                $toggle.prop('disabled', false);
                $status.text('');
            }).fail(() => {
                $toggle.prop('checked', !enabled).prop('disabled', false);
                $status.text(msg('save-error'));
            });
        });

        $submit.on('click', () => {
            const values = {};

            try {
                fields.forEach(([key, type]) => {
                    const widget = widgets[key];

                    values[key] = type === 'boolean'
                        ? widget.isSelected()
                        : widget.getValue();

                    if (type === 'array')
                        values[key] = values[key].split(',')
                            .map(item => item.trim()).filter(Boolean);
                });
            } catch (e) {
                $status.text(msg('invalid-value'));
                return;
            }

            $submit.setDisabled(true);
            $status.text(msg('saving'));

            readConfig().then(saved => {
                const output = $.extend({}, defaults, w.tCSS, saved, values);

                delete output.configPage;
                return saveConfig(output).then(() => output);
            }).done(output => {
                w.tCSS = $.extend(w.tCSS || {}, output);
                writeCache(output);

                $status.text(msg('saved'));
                $submit.setDisabled(false);
            }).fail(() => {
                $status.text(msg('save-error'));
                $submit.setDisabled(false);
            });
        });
    });
})(window, mediaWiki, jQuery);