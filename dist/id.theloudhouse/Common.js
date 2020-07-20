/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */

/* Makes username template work */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
});


/* LockForums */
window.LockForums = {
    expiryDays: 60,
    expiryMessage: "Untaian ini dianggap diarsipkan karena belum dikomentari dalam lebih dari <expiryDays> hari, mohon jangan goyangkan utas ini!",
    forumName: "Forum"
};

SpoilerAlert = {
    'class': "Spoiler",
};

// BEGIN ListUsers
window.listUsers = {
    talk: true,
    contribs: true,
    editcount: true
};

/*TLH Quiz*/
var quizName = "Kuis The Loud House";
var quizLang = "id";
var resultsTextArray = [
    "Kamu harus menonton lebih banyak The Loud House...",
    "Tidak buruk, kamu tahu banyak tentang The Loud House.",
    "WOW! Kamu adalah ahli The Loud House!"
];
var questions = [

    ["Berapa saudara perempuan yang dimiliki Lincoln?",
        "10",
        "7",
        "4",
        "Dia tidak punya saudara perempuan."
    ],

    ["Di mana Keluarga Loud tinggal?",
        "Royal Woods",
        "Michigan",
        "Washington",
        "New Orleans"
    ],

    ["Siapa teman terbaik Lincoln?",
        "Clyde McBride",
        "Rusty Spokes",
        "Liam",
        "Zach"
    ],

    ["Yang merupakan episode pertama dari seri ini?",
        "Left in the Dark",
        "Get the Message",
        "Heavy Meddle",
        "Making the Case"
    ],

    ["Siapa yang membuat seri?",
        "Chris Savino",
        "Kyle Marshall",
        "Alec Schwimmer",
        "Karla Sakas Shropshire"
    ],

    ["Apa urutan usia saudari Loud? Tua ke muda.",
        "Lori, Leni, Luna, Luan, Lynn, Lucy, Lana, Lola, Lisa dan Lily.",
        "Lily, Lola, Lucy, Luan, Leni, Lisa, Lana, Lynn, Luna dan Lori.",
        "Luna, Lucy, Lisa, Leni, Lynn, Lola, Lori, Luan, Lana dan Lily.",
        "Lily, Lisa, Lola, Lana, Lucy, Lynn, Luan, Luna, Leni dan Lori."
    ],

    ["Bagaimana spesial Natal dari The Loud House disebut?",
        "11 Louds a Leapin",
        "Christmas at the Louds",
        "The Loud Christmas",
        "Loudly Christmas"
    ],

    ["Kapan serial dimulai?",
        "2 Mei 2016",
        "1 Agustus 2016",
        "27 September 2016",
        "1 Maret 2016"
    ],

    ["Apa yang membuat Lincoln senang?",
        "Bermain permainan video, membaca komik dan berada bersama saudara-saudara perempuannya.",
        "Tidur seharian.",
        "Menguasai dunia!",
        "Menonton TV dan bermain olahraga."
    ],

    ["Apa nama pacar perempuan Lincoln?",
        "Ronnie Anne",
        "Christina",
        "Amalia",
        "Tabby"
    ]

];

/* User Tags sec. 1*/
window.UserTagsJS = {
    tags: {
        // group: { associated tag data }
        founder: {
            u: 'Pendiri',
            order: -1 / 0
        },
        bureaucrat: {
            u: 'Birokrat',
            link: 'Project:Staf Wiki#Birokrat',
            order: -1 / 0
        },
        sysop: {
            u: 'Pengurus',
            link: 'Project:Staf Wiki#Pengurus',
            order: -1 / 0
        },
        chatmoderator: {
            u: 'Moderator Obrolan',
            link: 'Project:Staf Wiki#Moderator_Obrolan',
            order: -1 / 0
        },
        adopter: {
            u: 'Pengadopsi Wiki',
            link: 'Project:Staf Wiki#Pengadopsi_Wiki',
            order: -1 / 0
        },
        usermonth: {
            u: 'Pengguna Bulanan',
            order: -1 / 0
        },
        vstf: {
            u: 'VSTF',
            order: -1 / 0
        },
        staff: {
            u: 'Staf',
            order: -1 / 0
        },
        councilor: 'Penasihat',
        facebook: 'Manajer Facebook',
        twitter: {
            u: 'Manajer Twitter',
            link: 'Project:Staf Wiki#Manajer_Twitter',
            order: -1 / 0
        },
        google: 'Manajer Google+',
        assistant: 'Asisten',
        skype: 'Admin Skype',
        permdisabled: 'Akun yang Dinonaktifkan secara Permanen',
        admincrat: {
            u: 'Adminkrat',
            link: 'Project:Staf Wiki#Adminkrat'
        },
        supportadmin: {
            u: 'Pengurus Dukungan',
            link: 'Project:Staf Wiki#Pengurus_Dukungan',
            order: -1 / 0
        },
        patroller: {
            u: 'Pematroli',
            link: 'Project:Staf Wiki#Pematroli',
            order: -1 / 0
        },
        formeradmin: {
            u: 'Mantan Pengurus',
            link: 'Project:Staf Wiki#Mantan_Pengurus',
            order: -1 / 0
        },
        'bot-global': {
            u: 'Bot Wikia',
            link: 'Project:Staf Wiki#Bot_Wikia',
            order: -1 / 0
        },
        bot: {
            u: 'Bot',
            link: 'Project:Staf Wiki#Akun_Bot',
            order: -1 / 0
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

/* User Tags sec. 2 */
UserTagsJS.modules.custom = {
    'TrueGuy': ['founder'],
    'Ivan the Brony Kaiju': ['bureaucrat', 'sysop'],
    'Arifin.wijaya': ['bureaucrat', 'sysop'],
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback', 'bannedfromchat', 'bot', 'bot-global', 'moderator'];

$(function() {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    $("#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */