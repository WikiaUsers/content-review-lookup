/* check if ad skin is defined */
if ($('#ad-skin').html() === "") {
isNs112 = $("body").hasClass("ns-112");
isHalo = $("body").hasClass("page-Portal_Halo");
isFSS = $("body").hasClass("page-Geschichte_Flat_Share_Society_-_Die_Chaostage");

pbgm_thema = $("#geschichtenthema").text();
pbgm_name = $("#geschichtenname").text();

/* custom backgrounds here */
// halo start
if (pbgm_thema.indexOf("Halo") > -1) {
console.log("halo1");

if (isNs112 || isHalo) {
console.log("halo2");

$("body")
.append('<style>'
+ 'body:after, body:before {'
+ 'background-image: url("https://images.wikia.nocookie.net/meerundmehr/images/c/c9/Background_mum-haloportal_Kopie.jpg") !important;'
+ '}'
+ 'body.background-dynamic.skin-oasis, body.background-dynamic.skin-oasis .background-image-gradient, body.background-dynamic.skin-oasis.background-fixed:after, body.background-dynamic.skin-oasis.background-fixed:before, body.background-dynamic.skin-oasis .background-image-gradient:before, body.background-dynamic.skin-oasis .background-image-gradient:after {'
+ 'background-image: none;'
+ 'background-color: #00030c;'
+ '}'
+ 'body.page-Geschichte_Halo_-_Heavy_Price, body.mainpage, body.page-MeerUndMehr_Portale {'
+ 'background: inherit !important;'
+ '}' 
+ '</style>');

}
}
// halo end
// fss start
else if (pbgm_name.indexOf("Flat Share Society - Die Chaostage") > -1) {

console.log("background = fss");

$("body")
.append('<style>'
+ 'body:after, body:before {'
+ 'background-image: url("https://images.wikia.nocookie.net/meerundmehr/images/2/25/Background_demum-fss2.jpg") !important;'
+ 'background-color: #e9f7fc;'
+ '}'
+ 'body.background-dynamic.skin-oasis, body.background-dynamic.skin-oasis .background-image-gradient, body.background-dynamic.skin-oasis.background-fixed:after, body.background-dynamic.skin-oasis.background-fixed:before, body.background-dynamic.skin-oasis .background-image-gradient:before, body.background-dynamic.skin-oasis .background-image-gradient:after {'
+ 'background-image: none;'
+ 'background-color: #e9f7fc;'
+ '}'
+ 'body.mainpage, body.page-MeerUndMehr_Portale {'
+ 'background: inherit !important;'
+ '}' 
// special fss 
+ 'body:before { background-position: -55px 0; } body:after { background-position: +55px 0; }'
+ 'body.page-Geschichte_Flat_Share_Society_-_Die_Chaostage .WikiaPageContentWrapper article, body.page-Geschichte_Flat_Share_Society_-_Die_Chaostage .WikiaPage .WikiaPageBackground {'
+ 'background: url("https://images.wikia.nocookie.net/__cb20140516162914/meerundmehr/images/7/78/Fss2_article_bg.jpg") no-repeat center 235px #E5E8C9;'
+ '}'
//special fss end
+ '</style>');

}
// fss ende
// tlp start
else if (pbgm_name.indexOf("The lost pages") > -1) {

console.log("background = tlp");

$("body")
.append('<style>'
+ 'body:after, body:before {'
+ 'background-image: url("https://images.wikia.nocookie.net/meerundmehr/images/9/9b/Background_mum-tlp.JPG") !important;'
+ 'background-color: #000;'
+ '}'
+ 'body.background-dynamic.skin-oasis, body.background-dynamic.skin-oasis .background-image-gradient, body.background-dynamic.skin-oasis.background-fixed:after, body.background-dynamic.skin-oasis.background-fixed:before, body.background-dynamic.skin-oasis .background-image-gradient:before, body.background-dynamic.skin-oasis .background-image-gradient:after {'
+ 'background-image: none;'
+ 'background-color: #000;'
+ '}'
+ 'body.mainpage, body.page-MeerUndMehr_Portale {'
+ 'background: inherit !important;'
+ '}' 
+ '</style>');

}
// tlp ende
// all other pages
else {

$("body")
.append('<style>'
+ '.background-image-gradient, body:before, body:after {'
+ 'opacity: 0;'
+ '}'
+ 'body.mediawiki {'
+ 'background: url(https://images.wikia.nocookie.net/__cb20140901144057/meerundmehr/images/5/50/Wiki-background) !important;'
+ '}'
+ '</style>');

}
/* end of if adskin */
}