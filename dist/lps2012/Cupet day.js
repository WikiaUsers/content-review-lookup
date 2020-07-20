var BBL_Dance3 = 'https://vignette.wikia.nocookie.net/lps2012/images/e/ed/Baa_Baa_Lou_Dance3.png/revision/latest?cb=20150214180837';
var BBL_Dance2 = 'https://vignette.wikia.nocookie.net/lps2012/images/9/9b/Baa_Baa_Lou_Dance2.png/revision/latest?cb=20150216170422';

function moveIt(obj, imgObj, direction, wscr){
   $(imgObj).show();
   //alert('!!!');
   var newTop = obj.style.top;//Math.floor((Math.random() * 100) + 1) + '%';
   var newLeft = '87%';
   if (direction == 1){
      newLeft = '0.4%';
   } else {
      if (wscr) {newLeft = '70%';} else {newLeft = '75%';}
   }
   var newDuration = 5000;//Math.floor((Math.random() * 31) + 30);

   $(obj).animate({
      top: newTop,
      left: newLeft,
      }, newDuration, function() {
         $(imgObj).hide();
         setTimeout(function() { setPosition(obj, imgObj); }, Math.floor((Math.random() * 10001) + 5000));
      }
   );
   //alert ('!!!');
   //obj.style.left = parseInt(imgObj.style.left) - 10 + 'px';
}

function isWideScreen(){
   if ((screen.width/screen.height)>(4/3)) {return true;} else {return false;}
}

function setPosition(obj, imgObj){
   var startX = '0';
   var deg = 0;
   var direction = 0;
   //alert('!!!');
   if (Math.floor((Math.random() * 2) + 1) == 1) {
      startX = '30%';
      deg = 0;
      direction = 1;
   } else {
      if (isWideScreen()) {startX = '96%';} else {startX = '90%';}
      deg = 0;
      direction = 2;
   }
   imgObj.style.webkitTransform = 'rotate('+deg+'deg)'; 
   imgObj.style.mozTransform    = 'rotate('+deg+'deg)'; 
   imgObj.style.msTransform     = 'rotate('+deg+'deg)'; 
   imgObj.style.oTransform      = 'rotate('+deg+'deg)'; 
   imgObj.style.transform       = 'rotate('+deg+'deg)';
   var startY = Math.floor((Math.random() * 96) + 5) + '%';
   var character = Math.floor((Math.random() * 2) + 1);
   switch(character){
      case 1:
         imgObj.src = BBL_Dance3;
         break;
      case 2:
         imgObj.src = BBL_Dance2;
         break;
      case 3:
         imgObj.src = Pepper;
         break;
   };
   obj.style.left = startX;
   obj.style.top = startY;
   $(imgObj).hide();
   moveIt(obj, imgObj, direction, isWideScreen());
}

function init(){
   $(".wds-community-header").toggleClass("bannerCD");
   $("#backgroundLayer1").toggleClass("divBackgroundCD");
   //alert('!!!');
   var imgObj = document.createElement('img');
   //imgObj.style.position= 'relative'; 
   imgObj.style.top = '50px'; 
   imgObj.style.left = '20px'; 
   imgObj.src = BBL_Dance3;
   //var obj = document.getElementsByTagName('body');
   //obj[0].appendChild(imgObj);
   var obj = document.createElement('div');
   //var obj = document.getElementsByTagName('div')[3];
   obj.className = "skiplinkcontainer";
   obj.innerHTML = "";
   document.getElementsByTagName('div')[2].appendChild(obj);
   obj.appendChild(imgObj);
   obj.style.left = 80 + '%';//parseInt(imgObj.style.left) - 0 + 'px';
   var deg = 90;
   imgObj.style.webkitTransform = 'rotate('+deg+'deg)'; 
   imgObj.style.mozTransform    = 'rotate('+deg+'deg)'; 
   imgObj.style.msTransform     = 'rotate('+deg+'deg)'; 
   imgObj.style.oTransform      = 'rotate('+deg+'deg)'; 
   imgObj.style.transform       = 'rotate('+deg+'deg)';
   //$(obj).css('-ms-transform', 'rotate(90deg) translateY(-100%)');
   //imgObj.show();
   //alert ('!!!');
   setPosition(obj, imgObj);
}

/*window.onload = function() {
   init();
   appendPlugins();
}*/