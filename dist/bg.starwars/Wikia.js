/**** Wikia.js START ****/

// INACTIVE USER
InactiveUsers = { text: 'неактивен' }; 
 
// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
function showEnTitle() {
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv === null || enTitleDiv === undefined)
    return;

  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;

  //don't add it on a category page
  var isACategoryPage = document.getElementById('mw-pages');
  if(isACategoryPage !== null && isACategoryPage !== undefined)
    return;
  
  //check if the header exists
  var header = document.getElementById('WikiaPageHeader');  
  if(header === null || header === undefined)
    return;

  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}

// Make infobox rows with altering background for better readability
function addAlternatingRowColors() {
  var infoboxes = document.getElementsByClassName('infobox');
  if(infoboxes.length === 0)
    return;

  for(var k = 0; k < infoboxes.length; k++) {
    var infobox = infoboxes[k];
    var rows = infobox.getElementsByTagName('tr');
    var changeColor = false;

    for(var i = 0; i < rows.length; i++) {
      if(rows[i].className.indexOf('infoboxstopalt') != -1)
        break;
 
      var ths = rows[i].getElementsByTagName('th');
 
      if(ths.length > 0) {
        changeColor = true;
        continue;
      }
 
      if(changeColor)
        rows[i].style.backgroundImage="url(https://images.wikia.nocookie.net/starwars/bg/images/4/47/Background-transparent-black-row_alt.png)";
 
      changeColor = !changeColor;
    }
  }
}

$(function() {
  // add the original english title as a subtitle.
  showEnTitle(); 

  // add infoboxes altering rows background
  addAlternatingRowColors(); 

function NoArticleTextFix() {
	var noarticletext = document.getElementsByClassName('noarticletext');
	if (noarticletext.length != 0) {
		var search = document.getElementById('WikiaSearch');
		if (search != null) {
			search.style.marginBottom = "10px";
		}
	}
}
$( NoArticleTextFix );

function fixPNGs(){
  if(jQuery.browser.msie && jQuery.browser.version < 9){ 
    var i;
    //alert(document.images.length);
    for(i in document.images){
      if(document.images[i].src){
        var imgSrc = document.images[i].src;
        if(imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG'){
        document.images[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + imgSrc + "')";
        }
      }
    }   
  }
}
$( fixPNGs );

/**** Wikia.js END ****/