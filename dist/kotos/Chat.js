window.ChatStatus = {
	statuses: {
		afk: "Abducted by Jumping Swords",
		edit: "Can't you see I'm working here?",
		food: "Food good. Food important. Me food have",
		silent: "Taken by the Silence/living in the bushes",
		procrastinating: "Currently Located in the Procrastination Station",
		heavenpiercing: "Piercing the Heavens, probably with a Drill",
		tired: "Running on fumes and spare bits of grammer",
		afk2: "Out rounding the horn, please leave a message",
		watching: "Watching/gushing over/dying over a show",
		cool: "Coolest person in this hemisphere"
	},
	debug: false
};


importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:ChatStatus/code.js",
        'u:kocka:MediaWiki:Emoticons/code.js',
        "u:shining-armor:MediaWiki:ChatTags/code.js"
     ]
});