/* Tabber */

addOnloadHook(mainpageTabs)
function mainpageTabs() {
  if(!document.getElementById('tabbyHead') || !document.getElementById('tabbyBoxes')) return
  var box = document.getElementById('tabbyBoxes')
  tabbyBoxen = getElementsByClassName(document, 'div', 'tabbyBox');  //global
  tabbyLinks = document.getElementById('tabbyHead').getElementsByTagName('a')
  showbox(0);

  if(tabbyLinks.length < tabbyBoxen.length) {
    var len = tabbyLinks.length;
  } else {
    var len = tabbyBoxen.length;
  }

  for(var i=0;i<len;i++) {
    tabbyLinks[i].href = 'javascript:showbox("' + i + '");'
    tabbyLinks[i].title = 'click to display'
  }

}

function showbox(num) {
  for(var i=0;i<tabbyBoxen.length;i++) {
    if(i==num) {
      tabbyBoxen[i].style.display = 'block';
    } else {
      tabbyBoxen[i].style.display = 'none';
    }
  }
  for(var i=0;i<tabbyLinks.length;i++) {
    if(i==num) {
      tabbyLinks[i].className = 'selected';
    } else {
      tabbyLinks[i].className = '';
    }
  }
}