function init(){
   var bkg = 'https://vignette.wikia.nocookie.net/lps2012/images/7/7e/PF_Background.png/revision/latest?cb=20150329182257';
   var imgObj = document.createElement('img');
   imgObj.style.top = '50px'; 
   imgObj.style.left = '20px';
   imgObj.src = bkg;
   var obj = document.createElement('div');
   obj.className = "skiplinkcontainer";
   obj.innerHTML = "";
   document.getElementsByTagName('div')[2].appendChild(obj);
   obj.appendChild(imgObj);
   obj.style.left = 0 + '%';
   obj.style.backgroundSize = 'contain';
   imgObj.style.width = $(window).width() + 'px';
   //obj.style.height = 100 + '%';
   obj.style.zIndex = -1;
   /*var deg = 90;
   imgObj.style.webkitTransform = 'rotate('+deg+'deg)'; 
   imgObj.style.mozTransform    = 'rotate('+deg+'deg)'; 
   imgObj.style.msTransform     = 'rotate('+deg+'deg)'; 
   imgObj.style.oTransform      = 'rotate('+deg+'deg)'; 
   imgObj.style.transform       = 'rotate('+deg+'deg)';*/
}