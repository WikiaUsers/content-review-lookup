importArticle( { type: 'script', article: 'u:dev:DisplayTimer/code.js' } );

// Insert username
$(function() {
 if (wgAction === 'view' && wgUserName !== null) {
     $('.insertusername').text(wgUserName);
 }
});