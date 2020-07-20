/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* Tags */

window.UserTagsJS = {
	modules: {},
	tags: {
		iwik: { u:'Iwik' },
		techpro: { u:'Technik-Profi'},
		sysop: { m:'Administrator',f:'Administratorin'},
		chatmod: { m:'Chat-Moderator',f:'Chat-Moderatorin'},
		bureaucrat: { m:'Bürokrat', f:'Bürokratin' },
		threadmod: { m:'Threadmoderator', f:'Threadmoderatorin'},
		editor_month: { m:'Bearbeiter des Monats', f:'Bearbeiterin des Monats'},
		iwik_month: { u:'Iwik des Monats'}
	}
};

UserTagsJS.modules.custom = {
	'Trollocool': ['techpro',],
	'Roterhund07': ['techpro'],
	'Grünfell':['iwik_month']
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* */
importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

$(function () 
{ 
  var d = new Date(); 
  if (d.getHours() <= 6) 
  { 
    document.body.style.backgroundImage = "url('http:images4.fanpop.com/image/photos/18200000/Night-Guard-teddybear64-18220939-1280-800.jpg')"; 
  } 
  else if (d.getHours() <= 12) 
  { 
    document.body.style.backgroundImage = "url('http://livehdwallpaper.com/wp-content/uploads/2014/10/Morning-Photography-Awesome.jpg')"; 
  } 
  else if (d.getHours() < 18) 
  { 
    document.body.style.backgroundImage = "url('https://wallpaperscraft.com/image/hills_green_summer_light_sun_midday_shadows_sky_clearly_tranquillity_63419_2560x1600.jpg')"; 
  } else if (d.getHours() < 24) 
  { 
    document.body.style.backgroundImage = "url('https://secure.static.tumblr.com/8c2a34fc82eef37bd20b94ee9ba04c79/55pqm7j/OFdmsorc9/tumblr_static_3d-sun-rising-3d-sun-rising-1920x1200.jpeg')"; 
  }
});