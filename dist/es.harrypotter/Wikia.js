var SocialMediaButtons = {
    position: "top", 
    colorScheme: "color", 
    buttonSize: "35px", 
    wikiTwitterAccount: "hp_wiki"
}; 

importScriptPage('SocialIcons/code.js','dev');

$(function () {
	var a = $('<a></a>').text('Discusiones').attr({'class':'subnav-2a', title:'Acceder a la página de discusiones', href:'http://es.harrypotter.wikia.com/d/f', id:'discussions-menuitem'}).wrap('<li></li>');
	$('#WikiHeader').children('nav').children('ul').children('li').eq(0).children('ul').append(a.parent());
});