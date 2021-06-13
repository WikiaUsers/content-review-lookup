/* A script that makes Template:Buildmenu function as if it were one of Total Annihilation's actual build menus */

if ($('div#build-menu')[0]) {
	$('body').append('<span id="sound" style="display:none;"></span>');
	var bmPage = 1;
	buildMenu(1, bmPage);
}
if ($('div#build-menu')[1]) {
	$('div#build-menu:eq(1)').prop('id',"build-menu2");
}
if ($('div#build-menu2')[0]) {
	var bm2Page = 1;
	buildMenu(2, bm2Page);
}

$('div#buildmenul, div#buildmenur').click(function() {
    document.getElementById('sound').innerHTML = '<audio src="https://vignette.wikia.nocookie.net/totalannihilation/images/f/fb/BUTSCRO1.ogg/revision/latest" autoplay=""></audio>';
});

$('div#buildmenul:eq(0)').click(function() {
    buildMenu(1, bmPage -= 1);
});

$('div#buildmenur:eq(0)').click(function() {
    buildMenu(1, bmPage += 1);
});

$('div#buildmenul:eq(1)').click(function() {
    buildMenu(2, bm2Page -= 1);
});

$('div#buildmenur:eq(1)').click(function() {
    buildMenu(2, bm2Page += 1);
});

function buildMenu(id, page) {
	var numMenus;
	if(id == 1){
		numMenus = document.getElementById('build-menu').getElementsByClassName("buildmenupage");
		if(page > numMenus.length) {bmPage = 1}    
		if(page < 1) {bmPage = numMenus.length}
		for(i = 0; i < numMenus.length; i++) {
			numMenus[i].style.zIndex = "0";  
		}
		numMenus[bmPage-1].style.zIndex = "1";
	}else{
		numMenus = document.getElementById('build-menu2').getElementsByClassName("buildmenupage");
		if(page > numMenus.length) {bm2Page = 1}    
		if(page < 1) {bm2Page = numMenus.length}
		for(i = 0; i < numMenus.length; i++) {
			numMenus[i].style.zIndex = "0";  
		}
		numMenus[bm2Page-1].style.zIndex = "1";
	}
}