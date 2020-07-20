/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */
/* Makes username template work */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
});

/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
            link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        imagecontrol: {
            link: 'Special:ListUsers/imagecontrol'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};

/* Ajax Refresh */
window.AjaxRCRefreshText = 'Perbarui otomatis';
window.AjaxRCRefreshHoverText = 'Halaman ini akan menyegarkan secara otomatis';
window.ajaxPages = [
    "Istimewa:Perubahan_terbaru",
    "Istimewa:WikiActivity",
    "Istimewa:Daftar_pantauan",
    "Istimewa:Catatan",
    "Istimewa:Kontribusi_pengguna"
];

/* LockForums */
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Untaian ini dianggap diarsipkan karena belum dikomentari dalam lebih dari <expiryDays> hari, mohon jangan goyangkan utas ini!",
    forumName: "Forum",
};

/* MassProtect */
massProtectDelay = 1000;