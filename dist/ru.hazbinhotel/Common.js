/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
window.UserTagsJS = {
	modules: {},
	tags: {
		technician: { u: 'Техник' },
		founder: { u: 'Основатель' },
		intern: { u: 'Стажёр' },
		discordMod: { u: 'Модератор Discord' },
		discordAdmin: { u: 'Администратор Discord' },
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
	'JekaKud': ['intern']
}