/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

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