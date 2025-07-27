// <pre>
// Configuration for [[MediaWiki:ImportJS]]
window.AutoCreateUserPagesConfig = {
	content: {
		2: '{{subst:newuser}}', // {{newuser}}
		3: '{{subst:welcome}}', // {{welcome}}
	},
	summary: 'Script: Creating user+talkpage on first edit',
	notify: '<a href="/wiki/User_talk:$2">Welcome to Memory Alpha!</a>'
};

window.globalFileUsageConfig = {
	'show_subdomain_if_different': true,
	'lang': [
		'bg',
		'cs',
		'de',
		'eo',
		'es',
		'fr',
		'it',
		'ja',
		'nl',
		'pl',
		'pt',
		'ru',
		'sr',
		'sv',
		'zh',
		'en:mu-memory-alpha',
		'en:ma-test',
	],
};

// Trivia code
    $(function () {
        $('#WikiaRail').append("<div class='typeform-widget' data-url='https://form.typeform.com/to/T9eJf1yy' style='width: 100%; height: 775px;margin-top:20px'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });
// </pre>