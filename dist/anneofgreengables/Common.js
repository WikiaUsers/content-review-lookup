/* Any JavaScript here will be loaded for all users on every page load. */

/* User Tags (admin, bureaucrat, etc.) */
/* Message Wall Greeting Button */
/* Tabs */

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:UserTags/code.js',
        'w:dev:WallGreetingButton/code.js',
        'w:dev:MediaWiki:Tabs/code.js'
    ]
});

/* Enables use of spoiler tag: */
/* Section Hide folder functionality */

function toggleSection(toggleObj, id, showtext, hidetext) {
  var e = document.getElementById('sectionblock'+id);
  if(toggleObj.innerHTML == showtext) {
    toggleObj.innerHTML = hidetext;
    e.style.display = 'block';
  }
  else {
    toggleObj.innerHTML = showtext;
    e.style.display = 'none';
  }

}

function toggleAllSections(toggleObj, showtext, hidetext, showall, hideall) {
  if (toggleObj.innerHTML == hideall) {
    $( ".hidelink" ).each( function (i, val) {
      if (val.innerHTML == hidetext) {
        val.onclick();
      }
    });
    toggleObj.innerHTML = showall;
  }
  else {
    $( ".hidelink" ).each( function (i, val) {
      if (val.innerHTML == showtext) {
        val.onclick();
      }
    });
    toggleObj.innerHTML = hideall;
  }
}

/* Adds 'Edit intro' button on dropdown */
importScriptPage('EditIntroButton/code.js', 'dev');

/* Modifies tabview */
+function(a,b,c,d){function e(a){var b=a[p],c=typeof b,e=c==m;if(g(b)?(u=b,t=q,e=r):c==l&&v.push(b),e)return e;try{a[p]=d}catch(f){}try{delete a[p],a[p]=d}catch(f){}}function f(){t=q;var a=0,b=v;for(v=[];a<b.length;a++)try{b[a]()}catch(c){}}function g(a){try{if(a&&((a.name||a.displayName||"").toString().toLowerCase()==o||k!=typeof a.$$&&k!=typeof a.addStyle&&k!=typeof a.addScript))return q}catch(b){}return r}function h(){return t}function i(a){var b=typeof a,c=b==l,d=a===!0;if(c||"object"==b||d)if(d||g(a))f();else if(c)if(t)try{a()}catch(e){}else v.push(a)}function j(){return u=u||a[n]||b[n],!t&&!u&&z++<50?setTimeout(j,20):void f()}var k="undefined",l="function",m="boolean",n="wikiMod",o="wikimod",p="onWikiModReady",q=!0,r=!1,s=c.defineProperty,t=r,u,v=[],w,x,y=0,z=0;if(x=e(a)?a:d,x=e(b)?b:x,x&&typeof x[p]==m&&v.length){var A=v;for(v=[];y<A.length;y++)try{x[p]=A[y]}catch(B){}try{if(x[p]=f,x[p]!==f&&typeof x[p]==m)return j()}catch(B){}}if(!x){w={get:h,set:i,enumerable:q,configurable:r};try{s(a,p,w),k==typeof b[p]&&s(b,p,w)}catch(B){}}j()}(this,window,Object);

importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');
importScriptPage('User:Jgjake2/js/TabView_Edit_Buttons.js', 'deadisland');

/* Adds RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Alters infoboxes */
function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();
 
	if(node == null)
		node = document;
 
	if(tag == null)
		tag = '*';
 
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);
 
	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
 
	return classElements;
}
 
function ClassTester(className)
{
	this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
 
ClassTester.prototype.isMatch = function(element)
{
	return this.regex.test(element.className);
}

$( getElementsByClass );

function addAlternatingRowColors() {
	var infoboxes = getElementsByClass('infobox', document.getElementById('content'));
 
	if( infoboxes.length == 0 )
		return;
 
	for( var k = 0; k < infoboxes.length; k++ ) {
		var infobox = infoboxes[k];
 
		var rows = infobox.getElementsByTagName('tr');
		var changeColor = false;
 
		for( var i = 0; i < rows.length; i++ ) {
			if(rows[i].className.indexOf('infoboxstopalt') != -1)
			break;
 
			var ths = rows[i].getElementsByTagName('th');
 
			if( ths.length > 0 ) {
				continue;
			}
 
			if(changeColor)
				rows[i].style.backgroundColor = '#f9f9f9';
			changeColor = !changeColor;
		}
	}
}

$( addAlternatingRowColors );