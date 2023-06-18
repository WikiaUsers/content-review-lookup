function link_hide(obj){
	var element = document.getElementById(obj); 
	element.style.display='none';
	return true
}	
 
function mwLinkSuggestButton(){	
	var toolbar = document.getElementById("toolbar");
	if(!toolbar){
		return false
	}
	var button = document.createElement("a");
	button.href = "#";
 
	button.onclick = function () {
	ls_ajax_onload();
	return false;
	};
 
	var add_image=document.createElement('img');
    add_image.src="skins/common/images/button_addlink.png";
 
	toolbar.appendChild(button);
	button.appendChild(add_image);
 
	return true
}
 
var ss_memory = null;
 
function LinkSearchCall() {
	var newdiv = document.getElementById("linksuggest");
 
	if(!newdiv){
		var newdiv = document.createElement("div");
		newdiv.id = "linksuggest";
		newdiv.style.display='block'
 
		var output = document.getElementById("toolbar");
		output.appendChild(newdiv);
	}else{
		newdiv.style.display='block'
	}	
	var x = document.getElementById("link_search_input").value;
 
	if (x == ss_memory) {
        return;
    }
    ss_memory = x;
    if (x.length < 30 && x.length > 2 && x.value != "") {
        sajax_do_call("wfAjaxLinkSuggest", [x], newdiv);
	}
}
 
 
function ls_ajax_onload() {
 
	var newdiv = document.getElementById("linksearch");
	if (!newdiv) {
 
		var newdiv = document.createElement("div");
		newdiv.id = "linksearch";
 
		var output = document.getElementById("toolbar");
		output.appendChild(newdiv);
 
		var search = document.createTextNode("Find Link ");
		newdiv.appendChild(search);
 
		var html = document.createElement("input");
		html.id = "link_search_input";
 
		newdiv.appendChild(html);
 
		var x = document.getElementById( 'link_search_input' );
 
		var hide = document.createElement("a");
		hide.href = "#";
 
		hide.onclick = function () {
			link_hide('linksearch');
                        link_hide('linksuggest');
                        x.value = '';
			return false;
		};
 
		newdiv.appendChild(hide);	
 
		var hide_text = document.createTextNode("(close)");
		hide.appendChild(hide_text);
 
 
	}else{
		var element = document.getElementById('linksearch'); 
		if (element.style.display == 'none') {
			var x = document.getElementById( 'link_search_input' );
			element.style.display='';
		}else{
			element.style.display='none';
			link_hide('linksuggest');
			return false;
		}
	}
 
	document.getElementById( 'link_search_input' ).focus();
	x.onkeyup = function(){
		LinkSearchCall();
    }
}
 
 
function Insertlink(name) {
	var input = document.getElementById("link_search_input");
	input.value = '';
 
	link_hide('linksuggest');
	insertTags('[['+name+']]', '', '');		
}	
 
 
document.onclick=check; 
 
function check(e){ 
	var target = (e && e.target) || (event && event.srcElement); 
	var obj = document.getElementById('linksuggest'); 
	if (obj) {
		var parent = checkParent(target); 
		if(parent){
			obj.style.display='none';
		}	
	} 
} 
 
function checkParent(t){ 
	while(t.parentNode){ 
		if(t==document.getElementById('linksuggest')){ 
			return false 
		} 
		t=t.parentNode 
	} 
	return true 
}