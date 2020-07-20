/* Any JavaScript here will be loaded for all users on every page load.
可摺疊範本
*/

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// Documentation on wikipedia at [[Wikipedia:NavFrame|NavFrame]]
 
// set up the words in your language
var NavigationBarHide = '[隱藏]';
var NavigationBarShow = '[顯示]';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 0;
 
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
        }
    NavToggle.firstChild.data = NavigationBarHide;
    }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
            
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
}
 
addOnloadHook(createNavigationBarToggleButton);

// END Dynamic Navigation Bars
// ============================================================

/*
編輯首段
*/

if (wgIsArticle) {
	onloadFuncts.push(function(){
		var caEdit=document.getElementById&&document.getElementById('ca-edit');
		if (!caEdit){return;}
		var caEdit0 = document.createElement('LI');
		var id = caEdit0.id = 'ca-edit-0';
		ta[id] = ['0', '編輯首段'];
		caEdit0.className = caEdit.className;
		caEdit.className = 'istalk';
		var link = document.createElement('A');
		if (caEdit.children) {
			link.href = caEdit.children[0].href + '&section=0';
		} else {
			link.href = caEdit.childNodes[0].href + '&section=0';
		}
		link.appendChild(document.createTextNode('0'));
		caEdit0.appendChild(link); +
		caEdit.parentNode.insertBefore(caEdit0,caEdit.nextSibling);

		var pref;
		if (is_safari || navigator.userAgent.toLowerCase().indexOf('mac') + 1
			|| navigator.userAgent.toLowerCase().indexOf('konqueror') + 1 ) {
			pref = 'control-';
		} else if (is_opera) {
			pref = 'shift-esc-';
		} else if (is_ff2_x11) {
			pref = 'ctrl-shift-';
		} else if (is_ff2_win) {
			pref = 'alt-shift-';
		} else {
			pref = 'alt-';
		}
		link.accessKey = ta[id][0];
		caEdit0.title= ta[id][1]+' ['+pref+ta[id][0]+']';
		//updateTooltipAccessKeys([caEdit0]);
		//akeytt([id]);
	});
}

/*
[[範本:返回上一頁]]
*/

function addBackPage() {
	// iterate over all < span >-elements
	for (var i=0; backLinkSpan = document.getElementsByTagName("span")[i]; i++) {
		if (backLinkSpan.className == "backpage") {
			var link = document.createElement("a");
			link.setAttribute('href', 'javascript:history.back();');
			while (backLinkSpan.childNodes.length > 0) {
				link.appendChild(backLinkSpan.firstChild);
			}
			backLinkSpan.appendChild(link);
		}
	}
}

addOnloadHook(addBackPage);

/*
[[範本:USERNAME]]
*/

function UserNameReplace() {
if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
   for(var i=0; UserName = document.getElementsByTagName("span")[i]; i++) {
       if ((document.getElementById('pt-userpage'))&&(UserName.className == "insertusername")) {
           childNodes = UserName.childNodes;
           for (j=0; j<childNodes.length; j++) {
               UserName.removeChild(childNodes[j]);
           }
           UserName.appendChild(document.createTextNode(wgUserName));
       }
   }
}

addOnloadHook(UserNameReplace);


/*
[[範本:LogoChange]]
*/

function noLogo() {
   if (document.getElementById('nologo')) document.getElementById('p-logo').style.display = 'none';
}
addOnloadHook(noLogo);

/*
閃爍
*/

var flashOk;
function embedFlashMovie(flashOk) {
    mainbody = document.getElementById('bodyContent');
    mainbody.innerHTML = contentTempHolder;
    spancheck = document.getElementsByTagName('span');
    for(i = 0; i < spancheck.length; i ++) {
        if(spancheck[i].getAttribute('id') != 'embedFlashDoc')
            continue;
        obj = spancheck[i].innerHTML.split('@');
        flwidth = obj[0];
        flheight = obj[1];
        flfile = obj[2].replace('fullurl://', 'http://');
        flvars = obj[3]
        showFlash = ' ';
        if(flashOk) {
            showFlash = '<object width="'+ flwidth +'" height="' + flheight + '"';
            showFlash += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
            showFlash += 'codebase="http://fpdownload.macromedia.com/pub/';
            showFlash += 'shockwave/cabs/flash/swflash.cab#version=8,0,0,0">';
            showFlash += '<param name="movie" value="'+ flfile +'" />';
            showFlash += '<param name="allowScriptAccess" value="always" />';
            showFlash += '<embed src="'+ flfile +'" width="'+ flwidth +'" height=';
            showFlash += '"'+ flheight +'" flashvars="'+ flvars +'" allowScriptAccess="always" type="application/x-shockwave-flash" ';
            showFlash += 'pluginspage="http://www.macromedia.com/go/getflashplayer" />';
            showFlash += '</object>';
        } else {
            showFlash = '<a class="plainlinks" href="javascript:embedFlashMovie(true)" onClick="embedFlashMovie(true)">'+flfile+'</a>（按此觀看）';
        }
        spancheck[i].innerHTML = showFlash;
        spancheck[i].style.display = 'inline';
    }
}
var contentTempHolder;
function embedFlashCheck() {
    if(!document.getElementById('embedFlashDoc'))
        return;
    mainbody = document.getElementById('bodyContent');
    contentTempHolder = mainbody.innerHTML;
    if(typeof displayFlashOverride != 'undefined') {
        embedFlashMovie(displayFlashOverride);
        return;
    }
    askmessage = '<div align="center" id="askflash">這條目似乎含有Flash影片，';
    askmessage += '其觸及範圍較廣可能影響到你的電腦安全';
    askmessage += '，你要繼續嗎？<b><a href="javascript:embedFlashMovie(true)" ';
    askmessage += 'onClick="embedFlashMovie(true)">是</a> | <a ';
    askmessage += 'href="javascript:embedFlashMovie(false)" ';
    askmessage += 'onClick="embedFlashMovie(false)">否</a> | <a ';
    askmessage += 'href="/wiki/範本:Flash">';
    askmessage += '不要再顯示這個訊息</a></b></div>';
    embedFlashMovie(false);
    mainbody.innerHTML = askmessage;
}
addOnloadHook(embedFlashCheck);