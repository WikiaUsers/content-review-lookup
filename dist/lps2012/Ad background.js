function init(){
   var bkg = 'https://images.wikia.nocookie.net/__cb20140604124319/lps2012/images/e/e5/Lps_wikia_bg3.jpg';
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