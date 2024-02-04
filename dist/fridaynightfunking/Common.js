/* Any JavaScript here will be loaded for all users on every page load. */
/* Configuration for [[w:c:dev:AddRailModule]] */
window.AddRailModule = [{
    // DiscordRailModule
    page: 'Template:RailModule',
    prepend: true,
    maxAge: 86400,
}, {
/* Configuration for [[w:c:dev:AddRailModule]] */
    // {{DiscussionsRailModule}}
    page: 'Template:DiscussionsRailModule',
    maxAge: 86400,
}];
/* Configuration for SpoilerWarning */
window.SpoilerAlertJS = {
    question: 'This area contains scary spoilers! You still wanna see it?',
    yes: 'Yup!',
    no: 'Better not!',
    fadeDelay: 1000
};
/* Changing Favico */
$(function() {
 
  var possibleFavicons = [
    'static.wikia.nocookie.net/fridaynightfunking/images/images/2/2c/Nikku.ico/revision/latest?cb=20240129073820',
    'static.wikia.nocookie.net/fridaynightfunking/images/3/33/Skarlet.ico/revision/latest?cb=20240129073819',
    'static.wikia.nocookie.net/fridaynightfunking/images/b/bd/Ourple.ico/revision/latest?cb=20240129073818',
    'static.wikia.nocookie.net/fridaynightfunking/images/2/20/CerealGuy.ico/revision/latest?cb=20240129073817',
    'static.wikia.nocookie.net/fridaynightfunking/images/d/df/Whitty.ico/revision/latest?cb=20240129073815',
    'static.wikia.nocookie.net/fridaynightfunking/images/f/f9/Tricky.ico/revision/latest?cb=20240129073814',
    'static.wikia.nocookie.net/fridaynightfunking/images/5/5f/RedImpostor.ico/latest?cb=20240129073813',
    'static.wikia.nocookie.net/fridaynightfunking/images/d/d9/HorrorMario.ico/revision/latest?cb=20240129073812',
  ];
 
  var favicon = possibleFavicons[Math.floor(Math.random() * possibleFavicons.length)];
  $('link[rel="shortcut icon"]').attr('href', favicon);
});