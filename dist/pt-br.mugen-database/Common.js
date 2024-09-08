/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

window.UserTagsJS = {
	modules: {},
	tags: {
		 gud: 'Enzima Azul'
	}
};

// Add custom groups to several users
UserTagsJS.modules.custom = {

        'Gudine': ['gud']
};

UserTagsJS.modules.metafilter = {
	founder: ['gud']
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:SignatureCheck/code.js",
        "w:c:dev:UserTags/code.js"
    ]
});