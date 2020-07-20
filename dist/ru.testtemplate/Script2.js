 function getRand(min, max){
      return Math.round(Math.random()*(max-min))+min;
     }

     var images = new Array(
     "https://bugaga.ru/uploads/posts/2014-06/1402471536_prikoly-6.jpg", 
     "https://www.sunhome.ru/i/wallpapers/37/prikolnie-kartinki-oboi-na-rabochii-stol.orig.jpg"
     );
     var lo = 0;
     var hi = images.length-1;
     var num = getRand(lo, hi);
     console.log(num);
     var bg = document.getElementsByClassName("bg");
     bg[0].style.backgroundImage = "url("+images[num]+")";