// User tags
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Birokrat',
        },
        'sysop': {
            u: 'Pengurus',
        },
        'content-moderator': {
            u: 'Konten Moderator',
        },
        'rollback': {
            u: 'Pengawas',
        },
        'poweruser': {
            u: 'Pengguna terkonfirmasi otomatis',
        },
        'autoconfirmed-user': {
            u: 'Pengguna terkonfirmasi otomatis',
        },
        'user': {
            u: 'Pengguna',
        },
        'newuser': {
            u: 'Pengguna baru'
        },
        inactive: {
            u: 'Tidak Aktif',
            title: 'Pengguna belum mengedit selama 30 hari terakhir'
        },
        blocked: {
            u: 'Diblokir',
            link: 'User_blog:Nfxl/Introducing_Wiki_Rules_and_Blocking_Policies'
        },
    },
    modules: {
        stopblocked: false,
        inactive: 30,
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'rollback',
            'users',
            'autoconfirmed-user',
            'bots',
            'bot-global',
            'blocked',
            'nonuser'
        ],
        autoconfirmed: true,
        newuser:true,
        metafilter: {
            'content-moderator': ['bureaucrat'],
            rollback: [
                'bureaucrat',
                'content-moderator'
            ],
            threadmoderator: ['content-moderator'],
            users: [
                'bureaucrat',
                'sysop',
                'content-moderator',
                'rollback',
                'translator',
                'newuser',
                'inactive',
                'blocked'
            ],
            bots: ['bot-global'],
            newuser: ['inactive'],
            bureaucrat: ['inactive'],
            sysop: ['inactive'],
            founder: ['inactive'],
            blocked: ['inactive'],
            poweruser: ['newuser']
        },
    },
};