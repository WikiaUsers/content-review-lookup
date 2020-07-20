/* Any JavaScript here will be loaded for all users on every page load. */
WikiaEnableNewCreatepage = false;

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();


function BuildHovers() {
   var divs = document.getElementsByTagName("div");
   for (var i = 0; CampDiv = divs[i]; i++) {
      if(hasClass(CampDiv, "adv32")) {
         CampDiv.setAttribute('onmouseover','ShowCamp(this)');
         CampDiv.setAttribute('onmouseout','HideCamp(this)');
      }
   }
}

$( BuildHovers );

function ShowCamp(camp) {
   var campid = camp.id + "_u";
   //alert(campid);
   document.getElementById(campid).style.display = 'block';
}

function HideCamp(camp) {
   var campid = camp.id + "_u";
   document.getElementById(campid).style.display = 'none';
}