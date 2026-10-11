// 与[[w:c:dev:MediaWiki:WallGreeting.js]]完全等效，有做大量优化

(function ($, mw) {
    'use strict';
    const user = mw.config.get('wgTitle'),
        username = mw.config.get('wgUserName'),
        groups = mw.config.get('wgUserGroups'),
        page = mw.config.get('wgFormattedNamespaces')[2] + ':' + user + '/问候语';
    if (mw.config.get('wgNamespaceNumber') !== 1200 || window.UserGreeting) return;
    window.UserGreeting = true;
    const Greeting = {
        init() {
            mw.hook('wikipage.content').add(() => {
                const target = $('#MessageWall');
                if (target.length) this.load(target);
            });
        },
        load(target) {
            new mw.Api().get({
                action: 'parse',
                page,
                prop: 'text',
                disabletoc: true,
                formatversion: 2
            }).done(data => {
                if (!data.parse || !data.parse.text) return;
                this.render(target, data.parse.text);
            });
        },
        render(target, html) {
            if ($('#MessageWallGreeting').length) return;
            const wrapper = $('<section>', {
                id: 'MessageWallGreeting',
                class: 'MessageWallGreeting'
            }).append($('<div>', {
                id: 'MessageWallGreetingContent',
                class: 'MessageWallGreetingContent',
                html
            }));
            target.before(wrapper);
            mw.hook('wikipage.content').fire(wrapper);
            if (this.canEdit()) this.renderButton(wrapper);
        },
        canEdit() {
            return username === user || groups.some(group => ['bureaucrat', 'sysop'].includes(group));
        },
        renderButton(wrapper) {
            const button = $('<a>', {
                class: 'wds-button MessageWallEditButton',
                html: '<span class="edit-button-text">编辑问候语</span>',
                href: mw.util.getUrl(page, { action: 'edit' })
            });
            mw.hook('dev.wds').add(() => { button.prepend(window.dev.wds.icon('pencil-small')); });
            $('<div>', { class: 'MessageWallButtons' }).css({
                marginBottom: '1em',
                textAlign: $('body').hasClass('sitedir-rtl') ? 'left' : 'right'
            }).append(button).prependTo(wrapper);
        }
    };
    Greeting.init();
})(jQuery, mediaWiki);