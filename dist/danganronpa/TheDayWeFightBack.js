/* The Day We Fight Back: A Digital Protest */
var dwfb = {
  title: 'The Day We Fight Back: A Digital Protest!',
  text: '<b>Febuary 11, 2014</b> — The Day We Fight Back is a digital protest against mass surveillance.',
  img: 'https://images.wikia.nocookie.net/__cb20140207195944/central/images/thumb/9/9b/W-THE-DAY-WE-FIGHT-BACK_BlogHeader_R2.jpg/300px-W-THE-DAY-WE-FIGHT-BACK_BlogHeader_R2.jpg',
  link: 'http://community.wikia.com/wiki/User_blog:Brandon_Rhea/The_Day_We_Fight_Back:_A_Digital_Protest',
  link2: 'http://community.wikia.com/wiki/User_blog%3ASemanticdrifter%2FDigital_Protest_Against_the_FISA_Improvements_Act',
}
var html = '<table align="center" class="TheDayWeFightBack"><tbody><td><a href="' + dwfb.link + '"><img src="' + dwfb.img + '"/></a></td><td><h1><a href="' + dwfb.link + '">' + dwfb.title + '</a></h1><h3>Proudly participating — Dangan Ronpa Wiki</h3><span>' + dwfb.text + '</span><div align="center"><a href="' + dwfb.link2 + '">Read More</a> • <a href="' + dwfb.link + '">Fight Back!</a></div></td></tbody></table>';
if (mw.config.get('wgPageName') !== 'Dangan_Ronpa_Wiki') {
  $('#WikiaPageHeader').before(html);
} else {
  $('#WikiaMainContent').before(html);
  $('.TheDayWeFightBack').addClass('mainpage');
}