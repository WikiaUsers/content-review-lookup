/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:"Hazbin_Hotel_Вики:Бюрократы" },
		sysop: { link:"Hazbin_Hotel_Вики:Администраторы" },
		'content-moderator': { link:"Hazbin_Hotel_Вики:Модераторы_контента" },
		threadmoderator: { link:"Hazbin_Hotel_Вики:Модераторы_сообщества" },
		bot: { link:"Hazbin_Hotel_Вики:Боты" },
		
		technician: { u: 'Техник' },
		founder: { u: 'Основатель' },
		intern: { u: 'Стажёр', link:"Hazbin_Hotel_Вики:Стажёры" },
		discordMod: { u: 'Модератор Discord', link:"Hazbin_Hotel_Вики:Модераторы_Discord" },
		discordAdmin: { u: 'Администратор Discord', link:"Hazbin_Hotel_Вики:Администраторы_Discord" },
		translator: { u: 'Переводчик' }
	},
	getNameByTag: function (tag) {
        return this.tags[tag].u;
    }
};



UserTagsJS.modules.custom = {
	'Voidan Dether': ['founder'],
	'Terabait24': ['technician'],
	'Никитин Арсений': ['technician'],
	'Merzlyak': ['discordMod'],
	'Kostinger': ['discordMod'],
	'TimurKhan': ['discordMod'],
	'Владыка Аларак': ['intern'],
	'IamNotFreddy': ['discordAdmin'],
	'LeraBE': ['discordMod'],
	'Lubitel obnimashek': ['intern'],
	'JustAccount': ['intern'],
	'Swit4er': ['translator'],
	'Fleshka5856': ['intern']
}

/* ========== Выделение комментариев статусников ========== */
setInterval(function () {
    $('.wds-avatar a[href$="Voidan%20Dether"]').closest('.Reply, .Reply_body__PM9kM').addClass('bur');
    $('.wds-avatar a[href$="Swit4er"]').closest('.Reply, .Reply_body__PM9kM').addClass('bur');
    $('.wds-avatar a[href$="Terabait24"]').closest('.Reply, .Reply_body__PM9kM').addClass('admin');
    $('.wds-avatar a[href$="%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B8%D0%BD%20%D0%90%D1%80%D1%81%D0%B5%D0%BD%D0%B8%D0%B9"]').closest('.Reply, .Reply_body__PM9kM').addClass('admin');
    $('.wds-avatar a[href$="Merzlyak"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="Kostinger"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="TimurKhan"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="%D0%92%D0%BB%D0%B0%D0%B4%D1%8B%D0%BA%D0%B0%20%D0%90%D0%BB%D0%B0%D1%80%D0%B0%D0%BA"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="IamNotFreddy"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordAdmin');
    $('.wds-avatar a[href$="LeraBE"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="Lubitel%20obnimashek"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="JustAccount"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="Fleshka5856"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="Creepy%20Owl "]').closest('.Reply, .Reply_body__PM9kM').addClass('contMod');
    $('.wds-avatar a[href$="Lefsy"]').closest('.Reply, .Reply_body__PM9kM').addClass('contMod');
    $('.wds-avatar a[href$="Lich%20night"]').closest('.Reply, .Reply_body__PM9kM').addClass('threadmod');
}, 500 );