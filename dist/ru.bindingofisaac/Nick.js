intervalName = setInterval(adminname,500);
function adminname(){
if ($('.Reply_body__3woA9, #MessageWall .Reply').length){
clearInterval(intervalName);
$($('a[href|="/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:TRJ-VoRoN"]').closest('.Reply_body__3woA9, #MessageWall .Reply')).css({"border-left": "4px solid #7139a2"});
$($('a[href|="/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:DarkGreeD"]').closest('.Reply_body__3woA9, #MessageWall .Reply')).css({"border-left": "4px solid #2d63c7"});
$($('a[href|="/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:WingdingAster0"]').closest('.Reply_body__3woA9, #MessageWall .Reply')).css({"border-left": "4px solid #7139a2"});
}
}