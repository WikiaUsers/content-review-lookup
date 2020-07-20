/*Exo Font*/
WebFontConfig = {
	google: { families: [ 'Exo:500,800,500italic,800italic:latin' ] }
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();

window.MessageWallUserTags = {
    tagColor: '#B87333',
    glow: true,
    glowSize: '15px',
    glowColor: '#B87333',
    users: {
        'Original_Authority': 'Bureaucrat',
    }
};

importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});