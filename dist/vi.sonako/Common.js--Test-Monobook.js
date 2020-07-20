/* Sidebar submenus */
function MonobookSubmenus() {
	var ports = $('.generated-sidebar');
	$('#p-search').before('<div id="p-generated"><h5>Wiki navigation</h5><div class="pBody"><ul></ul></div></div>');
	var ul = document.getElementById('p-generated').getElementsByTagName('ul')[0];
	for(var i = 0; i < ports.length; i++) {
		var links = '';
		for(var j = 0; j < ports[i].getElementsByTagName('li').length; j++) {links += ports[i].getElementsByTagName('li')[j].outerHTML;}
		ul.innerHTML += '<li onmouseover="window.sidebarpar = this; window.sidebartime = setTimeout(\'ShowMBMenu()\', 300);" onmouseout="window.sidebarpar = undefined; clearTimeout(window.sidebartime);"><div style="position:relative;">' + ports[i].getElementsByTagName('h5')[0].innerHTML + '<span style="float:right;">&raquo;</span></div><ul class="sidebar-subnav" style="position:absolute; left:138px; margin-top:-22px; z-index:99999; background-color:#fff; border:1px solid #000; padding:3px 7px 3px 17px; display:none;">' + links + '</ul></li>';
	}
	ports.remove();
	document.getElementById('p-generated').className = 'generated-sidebar portlet'; //set here to avoid class list loop
}
if(skin != 'oasis') {addOnloadHook(MonobookSubmenus);}
 
function ShowMBMenu() {
	clearTimeout(window.sidebartime); //Clear existing timeout to prevent confusion when moving from one module to another module
	var uls = $('.sidebar-subnav');
	for(var i = 0; i < uls.length; i++) {
		uls[i].style.display = 'none'; //Hide all other modules
		uls[i].parentNode.onmouseover = function(event) {window.sidebarpar = this; ShowMBMenu();}
	}
	window.sidebarpar.getElementsByTagName('ul')[0].style.display = 'block';
	window.sidebarpar.onmouseover = function(event) {window.sidebarpar = undefined; clearTimeout(window.sidebartime);}
	window.sidebarpar.onmouseout = function(event) {window.sidebarpar = this; window.sidebartime = setTimeout('HideMBMenu()', 400);}
}
function HideMBMenu() {
	window.sidebarpar.getElementsByTagName('ul')[0].style.display = 'none';
	window.sidebarpar.onmouseover = function(event) {window.sidebarpar = this; window.sidebartime = setTimeout('ShowMBMenu()', 300);}
	window.sidebarpar.onmouseout = function(event) {window.sibebarpar = undefined; clearTimeout(window.sidebartime);}
}
 
function ExtraPortlets() {
	$('#p-search').before('<div id="p-tools" class="generated-sidebar portlet"><h5>Tools</h5><div class="pBody"><ul><li onmouseover="window.sidebarpar = this; window.sidebartime = setTimeout(\'ShowMBMenu()\', 300);" onmouseout="window.sidebarpar = undefined; clearTimeout(window.sidebartime);"><div style="position:relative;"><a href="/wiki/Special:RecentChanges">Recent changes</a><span style="float:right;">&raquo;</span></div><ul class="sidebar-subnav" style="position:absolute; left:138px; margin-top:-22px; z-index:99999; background-color:#fff; border:1px solid #000; padding:3px 7px 3px 17px; display:none;"><li><a href="/wiki/Special:Log">Log</a></li><li><a href="/wiki/Special:NewPages">New pages</a></li><li><a href="/wiki/Special:NewFiles">New files</a></li></ul></li><li onmouseover="window.sidebarpar = this; window.sidebartime = setTimeout(\'ShowMBMenu()\', 300);" onmouseout="window.sidebarpar = undefined; clearTimeout(window.sidebartime);"><div style="position:relative;"><a href="/wiki/Special:CreatePage">Create page</a><span style="float:right;">&raquo;</span></div><ul class="sidebar-subnav" style="position:absolute; left:138px; margin-top:-22px; z-index:99999; background-color:#fff; border:1px solid #000; padding:3px 7px 3px 17px; display:none;"><li><a href="/wiki/Special:Upload">Upload</a></li><li><a href="/wiki/Special:MultipleUpload">Multiple upload</a></li><li><a href="/wiki/Special:CreateBlogPage">Blog</a></li></ul></li><li onmouseover="window.sidebarpar = this; window.sidebartime = setTimeout(\'ShowMBMenu()\', 300);" onmouseout="window.sidebarpar = undefined; clearTimeout(window.sidebartime);"><div style="position:relative;"><a href="/wiki/Special:ListUsers">List</a><span style="float:right;">&raquo;</span></div><ul class="sidebar-subnav" style="position:absolute; left:138px; margin-top:-22px; z-index:99999; background-color:#fff; border:1px solid #000; padding:3px 7px 3px 17px; display:none;"><li><a href="/wiki/Special:ListUsers/sysop">Admins</a></li><li><a href="/wiki/Special:ListUsers/bureaucrat">Bureaucrats</a></li><li><a href="/wiki/Special:ListUsers/chatmoderator">Chat mods</a></li></ul></li><li><a href="/wiki/Special:SpecialPages">Special pages</a></li><li><a href="javascript:OpenChatWindow();">Chat</a></li></ul></div></div>');
	$('#p-logo').after($('#p-search').detach());
}
if(skin != 'oasis') {addOnloadHook(ExtraPortlets)}