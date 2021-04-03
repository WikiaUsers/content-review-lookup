/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

/* Thêm mã ngoài */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultiUpload/code.js',
        'u:love-live:MediaWiki:UserTags.js',
        //'u:love-live:MediaWiki:PjTab.js',
    ]
});

/* User's Page Style */
/* Emil */
if (wgPageName == "Thành_viên:Hoangominh01" || wgPageName == "Tường_tin_nhắn:Hoangominh01" || wgPageName == "Blog_thành_viên:Hoangominh01" || wgPageName == "Đặc_biệt:Đóng_góp/Hoangominh01" ) {
    $('body').append('<link rel="stylesheet" type="text/css" href="https://love-live.fandom.com/vi/load.php?mode=articles&only=styles&articles=MediaWiki:Thành_viên:Hoangominh01/user.css">');
}

/* Page Style */
mw.hook('wikipage.content').add(function() {
  if (mw.config.get('wgCategories').indexOf("Love Live!") > -1) {
    $('body').append('<link rel="stylesheet" type="text/css" href="https://love-live.fandom.com/vi/load.php?mode=articles&only=styles&articles=MediaWiki:MusePageStyle.css">');
  }
});
 
  
  /* Add Railmodule */
  window.AddRailModule = [
    {page: 'Bản mẫu:Calendar/Current', prepend: true},
];

 /* MainPage Menu Tabber*/
 mw.hook('wikipage.content').add(function() {
	$("a[title='Love Live! ']").html('<img style="-webkit-user-select: none;margin: auto;width: 110px;" src="https://static.wikia.nocookie.net/love-live/images/2/22/Love_Live%21_Logo.png/revision/latest?cb=20200904041255&path-prefix=vi">');
	$("a[title='Love Live! Sunshine ']").html('<img style="-webkit-user-select: none;margin: auto;width: 100px;" src="https://static.wikia.nocookie.net/love-live/images/c/c0/Love_Live%21_Sunshine_Logo.png/revision/latest?cb=20200904041205&path-prefix=vi">');
	$("a[title='Love Live! SuperStar ']").html('<img style="-webkit-user-select: none;margin: auto;width: 100px;" src="https://static.wikia.nocookie.net/love-live/images/5/54/Love_Live%21_Super_Star_Logo.png/revision/latest?cb=20200904041224&path-prefix=vi">');
	$("a[title='Love Live! Nijigaku ']").html('<img style="-webkit-user-select: none;margin: auto;width: 100px;" src="https://static.wikia.nocookie.net/love-live/images/7/79/Love_Live%21_NijiGaku_Logo.png/revision/latest?cb=20201227125638&path-prefix=vi">');
});