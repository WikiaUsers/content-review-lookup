// 07:15, October 16, 2011 (UTC)
// <source lang="JavaScript">

// Redirects from /User:UserName/skin.js or .css to the user's actual skin page
// Maintainer: [[User:Rappy 4187]]

if (wgPageName == 'User:' + wgUserName.replace(/ /g,'_') + '/skin.css' || wgPageName == 'User:' + wgUserName.replace(/ /g,'_') + '/skin.js') {
     window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + wgPageName.split('/')[1].split('.')[1]);
 }

// END of skin redirect code

// </source>