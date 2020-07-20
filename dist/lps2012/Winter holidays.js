function moveIt(obj, imgObj, direction, wscr){
   var newTop = obj.style.top;//Math.floor((Math.random() * 100) + 1) + '%';
   var newLeft = '87%';
   if (direction == 1){
      newLeft = '1%';
   } else {
      if (wscr) {newLeft = '110%';} else {newLeft = '110%';}
   }
   var newDuration = 50000;//Math.floor((Math.random() * 31) + 30);

   $(obj).animate({
      top: newTop,
      left: newLeft,
      }, newDuration, function() {
         $(obj).hide();
         setTimeout(function() { setPosition(obj, imgObj); }, Math.floor((Math.random() * 10001) + 5000));
      }
   );
   //alert ('!!!');
   //obj.style.left = parseInt(imgObj.style.left) - 10 + 'px';
}

function setPosition(obj, imgObj){
   obj.style.left = -20 + '%';
   obj.style.top = 0.93 * $(window).height() - ((($(window).width() / 9.9) / (200/150)) - (($(window).width() / 9.9) / (200/150))*0.3) + 'px';
   $(obj).show();
   moveIt(obj, imgObj, 2, isWideScreen());
}

function isWideScreen(){
   if ((screen.width/screen.height)>(4/3)) {return true;} else {return false;}
}

function init(){
   $(".wds-community-header").toggleClass("bannerWH");
   $("#backgroundLayer1").toggleClass("divBackgroundDay");
   var bkg = 'https://vignette.wikia.nocookie.net/lps2012/images/1/12/LPS_bkg_WH.png/revision/latest?cb=20141225154744';
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
   //obj.style.width = 1988 + 'px';
   obj.style.margin = 'auto';
   imgObj.style.width = $(window).width() + 'px';
   //obj.style.height = 100 + '%';
   obj.style.zIndex = -1;
   /*var deg = 90;
   imgObj.style.webkitTransform = 'rotate('+deg+'deg)'; 
   imgObj.style.mozTransform    = 'rotate('+deg+'deg)'; 
   imgObj.style.msTransform     = 'rotate('+deg+'deg)'; 
   imgObj.style.oTransform      = 'rotate('+deg+'deg)'; 
   imgObj.style.transform       = 'rotate('+deg+'deg)';*/
   //-----
   var bkg2 = 'https://vignette.wikia.nocookie.net/lps2012/images/2/2a/Girlanda.png';
   /*var imgObj2 = document.createElement('img');
   imgObj2.src = bkg2;*/
   var obj2 = document.createElement('div');
   obj2.className = "skiplinkcontainer";
   obj2.innerHTML = "";
   document.getElementsByTagName('body')[0].appendChild(obj2);
   obj2.style.backgroundImage = "url('https://vignette.wikia.nocookie.net/lps2012/images/2/2a/Girlanda.png')";
   obj2.style.left = 0 + 'px';
   obj2.style.top = document.getElementsByClassName('wds-global-navigation-wrapper')[0].getBoundingClientRect().bottom - 5 + 'px';
   obj2.style.height = 30 + 'px';
   obj2.style.width = $(window).width() + 'px';
   obj2.style.backgroundRepeat="repeat-x";
   //obj2.style.backgroundSize = 'contain';
   obj2.style.zIndex = 5000111;
   //obj2.appendChild(imgObj2);

   var S_and_V = 'https://vignette.wikia.nocookie.net/lps2012/images/5/5c/Sunil_and_Vinnie_Sleigh.png/revision/latest?cb=20150223171400';
   var imgObj3 = document.createElement('img');
   imgObj3.style.top = '50px'; 
   imgObj3.style.left = '20px';
   imgObj3.src = S_and_V;
   var obj3 = document.createElement('div');
   obj3.className = "skiplinkcontainer";
   obj3.innerHTML = "";
   //document.getElementsByTagName('div')[2].appendChild(obj3);
   document.getElementsByTagName('body')[0].appendChild(obj3);
   //obj3.appendChild(imgObj3);
   obj3.style.left = -20 + '%';
   obj3.style.top = 0.93 * $(window).height() - ((($(window).width() / 9.9) / (200/150)) - (($(window).width() / 9.9) / (200/150))*0.1) + 'px';
   obj3.style.position = 'fixed';
   obj3.style.backgroundImage = "url('" + S_and_V + "')";
   obj3.style.backgroundSize = 'contain';
   //imgObj3.style.width = $(window).width() + 'px';
   obj3.style.backgroundRepeat = 'no-repeat';
   obj3.style.width = $(window).width() / 9.9 + 'px';
   obj3.style.height = ($(window).width() / 9.9) / (200/150) + 'px';
   //obj3.style.height = 145 + 'px';
   obj3.style.zIndex = 11;
   $(obj3).hide();

   var snow_bkg = 'https://vignette.wikia.nocookie.net/lps2012/images/d/d7/Snow_bkg.png/revision/latest?cb=20150224204106';
   //var imgObj4 = document.createElement('img');
   //imgObj4.style.top = '50px'; 
   //imgObj4.style.left = '20px';
   //imgObj4.src = snow_bkg;
   var obj4 = document.createElement('div');
   obj4.className = "skiplinkcontainer";
   obj4.innerHTML = "";
   //document.getElementsByTagName('div')[2].appendChild(obj4);
   document.getElementsByTagName('body')[0].appendChild(obj4);
   //obj4.appendChild(imgObj4);
   obj4.style.left = 0 + '%';
   obj4.style.top = 0.93 * $(window).height() + 'px';
   obj4.style.position = 'fixed';
   obj4.style.backgroundImage = "url('" + snow_bkg + "')";
   //obj4.style.backgroundSize = '100%';
   obj4.style.backgroundRepeat = 'repeat-x';
   obj4.style.width = $(window).width() + 'px';
   obj4.style.height = 45 + 'px';
   obj4.style.zIndex = 10;
   //obj4.style.height = ($(window).width() / 13.95) / (142/45) + 'px';
   setPosition(obj3, imgObj3);
}