// Theme customization from 9pm to 6am
$(function () {
 var d = new Date();
 if (d.getHours() < 6) {
  document.body.className += ' night';
 } 
 else if (d.getHours() > 21) {
  document.body.className += ' night';
 }
});

window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'SQFWNZw',
    prependToRail: false
};