/* ImprovedTabbers */
    window.ImprovedTabbers = {
        HideHeaderTitle: true,
        HideContentTitle: true,
        HumanReadableAnchor: true,
        SynchroInfoboxes: false,
        SynchroTabbers: false,
    };

/* BackToTopButton */
    window.BackToTopModern = true;

/* LockOldComments */
    window.lockOldComments = (window.lockOldComments || {});
    window.lockOldComments.limit = 90;
        /** translation fix **/
        window.dev = window.dev || {};
        window.dev.i18n = window.dev.i18n || {};
        window.dev.i18n.overrides = window.dev.i18n.overrides || {};
        window.dev.i18n.overrides['LockOldComments'] = window.dev.i18n.overrides['LockOldComments'] || {};
        window.dev.i18n.overrides['LockOldComments']['locked-reply-box'] = "🔒 Этой ветке комментариев более " + window.lockOldComments.limit + " " + (window.lockOldComments.limit > 1 ? 'дней.' : 'дня.') + " Нет необходимости отвечать.";